import { getS3Client } from './s3Client';
export const makePublic = (Key, Bucket) => {
    const s3 = getS3Client();
    return new Promise((resolve, reject) => {
        const params = {
            ACL: 'public-read',
            Bucket,
            Key,
        };
        // tslint:disable-next-line
        console.error(`Attempting to set public access on ${Key}`);
        // tslint:disable-next-line
        console.log(params);
        s3.putObjectAcl(params, (err, data) => {
            if (err) {
                // tslint:disable-next-line
                console.error('Error attempting to make Key publicly accessible', err);
                reject(err);
            }
            else {
                // tslint:disable-next-line
                console.error(`Set object ACL for public access on ${Key}`);
                // tslint:disable-next-line
                console.log(data);
                resolve(data.RequestCharged);
            }
        });
    });
};
//# sourceMappingURL=makePublic.js.map