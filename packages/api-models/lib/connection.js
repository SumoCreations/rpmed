const SEPARATOR = '||||';
const DEFAULT_LIMIT = 100;
// The required attributes to generate a hashed key for paginated queries.
export const ATTRIBUTE_KEYS = {
    ALL: [],
    DEFAULT: ['partitionKey', 'sortKey'],
    GSI_1: ['partitionKey', 'sortKey', 'indexSortKey'],
    GSI_2: ['partitionKey', 'sortKey', 'secondaryIndexSortKey'],
    GSI_3: ['partitionKey', 'indexSortKey'],
    GSI_4: ['partitionKey', 'secondaryIndexSortKey'],
};
export const attributesForIndex = (index) => ATTRIBUTE_KEYS[index];
/**
 * Generates the applicable dynamo DB query attributes related to a ConnectionPayload described
 * by an incomming API request.
 * @param connection A connection payload from an incomming request.
 * @param cursorCount A multiplier to the limit in case we are generating multiple pages of results.
 */
export const makeConnection = (connection, cursorCount) => {
    if (!connection) {
        return {
            ExclusiveStartKey: null,
            Limit: DEFAULT_LIMIT,
        };
    }
    const limit = (connection === null || connection === void 0 ? void 0 : connection.first) || (connection === null || connection === void 0 ? void 0 : connection.last) || DEFAULT_LIMIT;
    return {
        ExclusiveStartKey: parseLastEvaluatedKey((connection === null || connection === void 0 ? void 0 : connection.before) || (connection === null || connection === void 0 ? void 0 : connection.after)),
        Limit: cursorCount > 0 ? limit * cursorCount : limit,
    };
};
/**
 * Converts an object into a hashed string for use as a cursor in a pagination result.
 * @param lastEvaluatedKey An object representing the node to hash.
 * @param index Specifies which attributes to use in the hash string based on the index.
 */
export const hashLastEvaluatedKey = (lastEvaluatedKey, index) => lastEvaluatedKey
    ? Object.keys(lastEvaluatedKey)
        .filter((k) => index && ATTRIBUTE_KEYS[index].length > 0
        ? ATTRIBUTE_KEYS[index].includes(k)
        : true)
        .reduce((p, c) => [...p, c, lastEvaluatedKey[c]], [])
        .flat()
        .join(SEPARATOR)
    : null;
/**
 * Reduces a hashed string into a useable key object.
 * @param lastKeyHash A hashed string cursor.
 */
export const parseLastEvaluatedKey = (lastKeyHash) => {
    if (!lastKeyHash || lastKeyHash.length < 6) {
        return null;
    }
    const chunks = lastKeyHash.split(SEPARATOR);
    const attributes = chunks.filter((_, i) => !(i % 2));
    const values = chunks.filter((_, i) => i % 2);
    return attributes.reduce((p, c, i) => (Object.assign(Object.assign({}, p), { [c]: values[i] })), {});
};
/**
 * Returns a query result that supports pagination via the connection spec.
 * @param query Allows customization of the index name, table, and expression values.
 * @param client A locally configured DynamoDB DocumentClient instance.
 */
export function connectedQuery(query, client) {
    return async (connection) => {
        const scanForward = typeof query.ScanIndexForward === 'boolean'
            ? query.ScanIndexForward
            : true;
        try {
            const indexName = (query.IndexName || 'DEFAULT');
            const defaultConnection = makeConnection(connection);
            const fetchResults = (cursor, cursorCount, descending) => {
                return client
                    .query(Object.assign(Object.assign(Object.assign({}, makeConnection(Object.assign(Object.assign({}, connection), { after: !descending && cursor ? cursor : connection === null || connection === void 0 ? void 0 : connection.after, before: descending && cursor ? cursor : connection === null || connection === void 0 ? void 0 : connection.before }), cursorCount)), query), { ScanIndexForward: descending ? !scanForward : scanForward }))
                    .promise();
            };
            const result = await fetchResults(undefined, undefined, (connection === null || connection === void 0 ? void 0 : connection.before) ? true : false);
            const endCursor = result.Items && result.Items[0]
                ? hashLastEvaluatedKey(result.Items[result.Items.length - 1], indexName)
                : '';
            const startCursor = result.Items && result.Items[0]
                ? hashLastEvaluatedKey(result.Items[0], indexName)
                : '';
            const hasNextPage = result.LastEvaluatedKey ? true : false;
            const hasNextPages = async (args) => {
                const models = await fetchResults(endCursor, args.amount);
                const pageSize = defaultConnection.Limit;
                const initialPage = hasNextPage ? [{ cursor: endCursor }] : [];
                return [
                    // We need to inject the end cursor as a page since it will be omitted
                    // from the results which are already beyond the end cursor.
                    ...initialPage,
                    ...models.Items.filter((_, i) => {
                        return !((i + 1) % pageSize);
                    }).map((m) => ({
                        cursor: hashLastEvaluatedKey(m, indexName),
                    })),
                ];
            };
            const hasPreviousPage = (connection === null || connection === void 0 ? void 0 : connection.before) || (connection === null || connection === void 0 ? void 0 : connection.after) ? true : false;
            const hasPreviousPages = async (args) => {
                const models = await fetchResults(startCursor, args.amount, true);
                const pageSize = defaultConnection.Limit;
                const initialPage = hasPreviousPage ? [{ cursor: '' }] : [];
                return [
                    // Inject a blank cursor for the first page if we're beyond an initial result.
                    ...initialPage,
                    ...models.Items.reverse()
                        // We ignore the final item as it is actually the current page when parsing
                        // reversed results.
                        .filter((_, i) => !((i + 1) % pageSize) && i + 1 < models.Items.length)
                        .map((m) => ({
                        cursor: hashLastEvaluatedKey(m, indexName),
                    })),
                ];
            };
            return {
                nodes: result.Items ? result.Items : [],
                pageInfo: {
                    endCursor,
                    hasNextPage,
                    hasNextPages: hasNextPages,
                    hasPreviousPage,
                    hasPreviousPages: hasPreviousPages,
                    startCursor,
                },
            };
        }
        catch (e) {
            // tslint:disable-next-line
            console.log('Could not fetch results...');
            // tslint:disable-next-line
            console.log(e);
            return {
                nodes: [],
                pageInfo: {
                    endCursor: '',
                    hasNextPage: false,
                    hasNextPages: [],
                    hasPreviousPage: false,
                    hasPreviousPages: [],
                    startCursor: '',
                },
            };
        }
    };
}
/**
 * Returns a query result that supports pagination via the connection spec.
 * Be sure to note that a scan is EXPENSIVE and it also is unidirectional so
 * the previous page and nex/previous page meta info is not returned by this
 * funcion. To perform further scans you can use the startCursor and endCursor
 * properties returned on the connection to continue traversing the table.
 * @param scan Allows customization of the index name, table, and expression values.
 * @param client A locally configured DynamoDB DocumentClient instance.
 */
export function connectedScan(scan, client) {
    return async (connection) => {
        try {
            const indexName = (scan.IndexName || 'DEFAULT');
            const fetchResults = (cursor, cursorCount) => {
                return client
                    .scan(Object.assign(Object.assign({}, makeConnection(Object.assign(Object.assign({}, connection), { after: cursor ? cursor : connection === null || connection === void 0 ? void 0 : connection.after }), cursorCount)), scan))
                    .promise();
            };
            const result = await fetchResults(undefined, undefined);
            const endCursor = result.Items && result.Items[0]
                ? hashLastEvaluatedKey(result.Items[result.Items.length - 1], indexName)
                : '';
            const startCursor = result.Items && result.Items[0]
                ? hashLastEvaluatedKey(result.Items[0], indexName)
                : '';
            const hasNextPage = result.LastEvaluatedKey ? true : false;
            return {
                nodes: result.Items ? result.Items : [],
                pageInfo: {
                    endCursor,
                    hasNextPage,
                    hasNextPages: [],
                    hasPreviousPage: false,
                    hasPreviousPages: [],
                    startCursor,
                },
            };
        }
        catch (e) {
            // tslint:disable-next-line
            console.log('Could not fetch results...');
            // tslint:disable-next-line
            console.log(e);
            return {
                nodes: [],
                pageInfo: {
                    endCursor: '',
                    hasNextPage: false,
                    hasNextPages: [],
                    hasPreviousPage: false,
                    hasPreviousPages: [],
                    startCursor: '',
                },
            };
        }
    };
}
//# sourceMappingURL=connection.js.map