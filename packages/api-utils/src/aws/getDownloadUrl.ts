import { getS3Client } from './s3Client'

const getContentType = (fileName: string) => {
  const extension = fileName.split('.').pop()
  switch (extension) {
    case 'js':
      return 'application/javascript'
    case 'css':
      return 'text/css'
    case 'html':
      return 'text/html'
    case 'svg':
      return 'image/svg+xml'
    case 'png':
      return 'image/png'
    case 'jpg':
      return 'image/jpeg'
    case 'jpeg':
      return 'image/jpeg'
    case 'gif':
      return 'image/gif'
    case 'pdf':
      return 'application/pdf'
    default:
      return 'application/octet-stream'
  }
}

export const getDownloadUrl = (
  key: string,
  Bucket: string,
  signed?: boolean,
  contentType?: string
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
        ResponseContentType: contentType || getContentType(key),
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
