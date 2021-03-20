import * as AWS from 'aws-sdk';
import { defaultOfflineConfig } from './defaultOfflineConfig';
/**
 * A convenience method to retrieve an S3 client with an offline
 * configuration for development testing.
 */
export const getS3Client = () => !process.env.AWS_ACCESS_KEY_ID
    ? new AWS.S3(Object.assign(Object.assign({}, defaultOfflineConfig), { signatureVersion: 'v4' }))
    : new AWS.S3({ signatureVersion: 'v4' });
//# sourceMappingURL=s3Client.js.map