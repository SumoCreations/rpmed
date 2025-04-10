import { getS3Client } from 'api-utils'
import { ErrorList } from '../../../../validations'

interface IUploadInput {
  keys: string[]
}

interface IUpload {
  id: string
  bucket: string
  url: string
}

export interface IUploadMutationOutput {
  uploads?: IUpload[]
  errors?: ErrorList
  success: boolean
}

const s3 = getS3Client()

const getUploadURL = (key: string): Promise<IUpload> =>
  new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.ATTACHED_IMAGES_BUCKET,
      Key: key,
    }
    s3.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        // tslint:disable-next-line
        console.error('Presigning post data encountered an error', err)
        reject(err)
      } else {
        resolve({
          bucket: params.Bucket,
          id: params.Key,
          url: data,
        })
      }
    })
  })

export const createUploads = async (
  _: any,
  { uploadInput }: { uploadInput: IUploadInput }
): Promise<IUploadMutationOutput> => {
  try {
    const { keys } = uploadInput
    const uploads = await Promise.all(
      keys.map(async key => await getUploadURL(key))
    )
    return { uploads, success: true }
  } catch (e) {
    return { success: false, errors: [] }
  }
}
