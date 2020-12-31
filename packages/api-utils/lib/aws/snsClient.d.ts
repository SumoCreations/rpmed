import * as AWS from 'aws-sdk';
/**
 * A convenience method to retrieve an SNS client with an offline
 * configuration for development testing.
 */
export declare const getSNSClient: () => AWS.SNS;
