import { getS3, getS3Bucket } from "../util"

const s3 = getS3()

export enum AttachedImageStatus {
  Available = "AVAILABLE",
  Pending = "PENDING",
  Deleted = "DELETED",
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
      Bucket: getS3Bucket(),
      Key: key,
    }
    s3.getSignedUrl("getObject", params, (err, data) => {
      if (err) {
        // tslint:disable-next-line
        console.error("Presigning get URL data encountered an error", err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

const output = async (attachedImage: IAttachedImage) => ({
  ...attachedImage,
  url:
    attachedImage.status === "AVAILABLE"
      ? await getDownloadUrl(attachedImage.id)
      : null,
})

export default {
  output,
}
