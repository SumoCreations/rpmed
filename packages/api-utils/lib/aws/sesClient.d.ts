import * as AWS from 'aws-sdk';
/**
 * A convenience method to retrieve an S3 client with an offline
 * configuration for development testing.
 */
export declare const getSESClient: () => AWS.SES;
