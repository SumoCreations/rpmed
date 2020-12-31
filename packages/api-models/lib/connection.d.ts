import { DynamoDB } from 'aws-sdk';
import { ConnectionPayload, PageInfo } from './types';
export interface ConnectedQuery<T> {
    nodes: T[];
    pageInfo: PageInfo;
}
export declare const ATTRIBUTE_KEYS: {
    ALL: any[];
    DEFAULT: string[];
    GSI_1: string[];
    GSI_2: string[];
    GSI_3: string[];
    GSI_4: string[];
};
declare type IndexKeySet = 'DEFAULT' | 'ALL' | 'GSI_1' | 'GSI_2' | 'GSI_3' | 'GSI_4';
export declare const attributesForIndex: (index: IndexKeySet) => any[] | string[];
/**
 * Generates the applicable dynamo DB query attributes related to a ConnectionPayload described
 * by an incomming API request.
 * @param connection A connection payload from an incomming request.
 * @param cursorCount A multiplier to the limit in case we are generating multiple pages of results.
 */
export declare const makeConnection: (connection?: ConnectionPayload, cursorCount?: number) => {
    ExclusiveStartKey: {};
    Limit: number;
};
/**
 * Converts an object into a hashed string for use as a cursor in a pagination result.
 * @param lastEvaluatedKey An object representing the node to hash.
 * @param index Specifies which attributes to use in the hash string based on the index.
 */
export declare const hashLastEvaluatedKey: (lastEvaluatedKey?: object, index?: IndexKeySet) => string;
/**
 * Reduces a hashed string into a useable key object.
 * @param lastKeyHash A hashed string cursor.
 */
export declare const parseLastEvaluatedKey: (lastKeyHash?: string) => {};
/**
 * Returns a query result that supports pagination via the connection spec.
 * @param query Allows customization of the index name, table, and expression values.
 * @param client A locally configured DynamoDB DocumentClient instance.
 */
export declare function connectedQuery<T>(query: DynamoDB.DocumentClient.QueryInput, client: DynamoDB.DocumentClient): (connection?: ConnectionPayload) => Promise<ConnectedQuery<T>>;
/**
 * Returns a query result that supports pagination via the connection spec.
 * Be sure to note that a scan is EXPENSIVE and it also is unidirectional so
 * the previous page and nex/previous page meta info is not returned by this
 * funcion. To perform further scans you can use the startCursor and endCursor
 * properties returned on the connection to continue traversing the table.
 * @param scan Allows customization of the index name, table, and expression values.
 * @param client A locally configured DynamoDB DocumentClient instance.
 */
export declare function connectedScan<T>(scan: DynamoDB.DocumentClient.ScanInput, client: DynamoDB.DocumentClient): (connection?: ConnectionPayload) => Promise<ConnectedQuery<T>>;
export {};
