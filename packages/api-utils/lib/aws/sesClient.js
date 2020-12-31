import * as AWS from 'aws-sdk';
import { defaultOfflineConfig } from './defaultOfflineConfig';
import { isOffline } from './isOffline';
/**
 * A convenience method to retrieve an S3 client with an offline
 * configuration for development testing.
 */
export const getSESClient = () => {
    var _a;
    return isOffline()
        ? new AWS.SES(Object.assign(Object.assign({}, defaultOfflineConfig), { region: 'us-west-2' }))
        : new AWS.SES({ region: (_a = process.env.SES_REGION) !== null && _a !== void 0 ? _a : 'us-west-2' });
};
//# sourceMappingURL=sesClient.js.map