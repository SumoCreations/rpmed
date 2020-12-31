/**
 * Uses the dynamo client to iterate and destroy all items in a table.
 * @param tableName The name of the dynamoDB table to reset.
 * @param key A callback used to generate the key which will be used to delete each individual item.
 */
export declare const resetTable: (tableName: string, key: (i: any) => {
    [key: string]: any;
}) => Promise<void>;
