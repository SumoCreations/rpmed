import * as AWS from 'aws-sdk';
/**
 * A convenience method to retrieve a DynamoDB document client with an offline
 * configuration for development testing.
 */
export declare const getDynamoClient: () => AWS.DynamoDB.DocumentClient;
/**
 * A convenience method to retrieve DynamoDB with an offline
 * configuration for development testing.
 */
export declare const getDynamo: () => AWS.DynamoDB;
