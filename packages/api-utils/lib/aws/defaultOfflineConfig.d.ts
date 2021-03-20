/**
 * A configuration you can override with a local set of
 * AWS credentials to connect remotely to some AWS resources
 * that are running outside of SLS offline.
 */
export declare const defaultOfflineConfig: {
    accessKeyId: string;
    region: string;
    secretAccessKey: string;
};
