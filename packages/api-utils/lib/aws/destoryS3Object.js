import { getS3Client } from './s3Client';
export const destroyS3Object = (Key, Bucket) => {
    const s3 = getS3Client();
    return new Promise((resolve, reject) => {
        s3.deleteObject({
            Bucket,
            Key,
        }, (err, data) => {
            if (err) {
                // tslint:disable-next-line
                console.error(`Destorying the object '${Key}' in '${Bucket}' encountered an error`, err);
                reject(err);
            }
            else {
                resolve(data.DeleteMarker);
            }
        });
    });
};
//# sourceMappingURL=destoryS3Object.js.map