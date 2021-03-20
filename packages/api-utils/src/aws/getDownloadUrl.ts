import { getS3Client } from './s3Client'

export const getDownloadUrl = (
  key: string,
  Bucket: string,
  signed?: boolean
): Promise<string> => {
  const s3 = getS3Client()
  return new Promise((resolve, reject) => {
    if (!signed) {
      s3.getBucketLocation({ Bucket }, (err, data) => {
        if (!err) {
          resolve(
            `https://${Bucket}.s3-${data.LocationConstraint}.amazonaws.com/${key}`
          )
        } else {
          // tslint:disable-next-line
          console.error('Error getting bucket location:', err)
          resolve('')
        }
      })
      return
    }
    s3.getSignedUrl(
      'getObject',
      {
        Bucket,
        Key: key,
      },
      (err, data) => {
        if (err) {
          // tslint:disable-next-line
          console.error('Presigning get URL data encountered an error', err)
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}
