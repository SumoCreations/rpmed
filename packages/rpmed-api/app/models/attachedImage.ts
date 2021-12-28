import { getS3Client } from 'api-utils'

const s3 = getS3Client()

export enum AttachedImageStatus {
  Available = 'AVAILABLE',
  Pending = 'PENDING',
  Deleted = 'DELETED',
}

export interface IAttachedImage {
  position: number
  id: string
  status: AttachedImageStatus
}

export interface IAttachedImageOutput extends IAttachedImage {
  url: string | null
}

const getDownloadUrl = (key: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.ATTACHED_IMAGES_BUCKET,
      Key: key,
    }
    s3.getSignedUrl('getObject', params, (err, data) => {
      if (err) {
        // tslint:disable-next-line
        console.error('Presigning get URL data encountered an error', err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

const output = async (attachedImage: IAttachedImage) => ({
  ...attachedImage,
  url:
    attachedImage.status === 'AVAILABLE'
      ? await getDownloadUrl(attachedImage.id)
      : null,
})

export default {
  output,
}
