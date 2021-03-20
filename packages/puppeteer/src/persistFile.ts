import { getS3Client } from 'api-utils'
const s3 = getS3Client()

export const persistFile = (
  bucket: string,
  key: string,
  data: any
): Promise<string> =>
  new Promise((resolve, reject) =>
    s3.putObject(
      {
        Body: data,
        Bucket: bucket,
        Key: key,
      },
      (err) => {
        if (err) {
          reject(err)
        } else {
          s3.getSignedUrl(
            'getObject',
            { Bucket: bucket, Key: key },
            (signingErr, signedUrl) => {
              if (signingErr) {
                reject(signingErr)
              } else {
                resolve(signedUrl)
              }
            }
          )
        }
      }
    )
  )
