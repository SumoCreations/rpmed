import { FileUploadStatus } from './FileDropProps'

export type FileUploadHandler = (
  uuid: string,
  status: FileUploadStatus,
  progress: number
) => void

export interface IFileUpload {
  cancel: () => void
}

export const FileUpload = (
  uuid: string,
  file: File,
  url: string,
  onUpdate: FileUploadHandler
): IFileUpload => {
  const reader = new FileReader()
  const xhr = new XMLHttpRequest()

  xhr.upload.addEventListener(
    'progress',
    (e) => {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded * 100) / e.total)
        onUpdate(uuid, FileUploadStatus.Pending, percentage)
      }
    },
    false
  )

  xhr.upload.addEventListener(
    'load',
    (_) => {
      onUpdate(uuid, FileUploadStatus.Available, 100)
    },
    false
  )

  xhr.open('PUT', url)
  reader.onload = (_) => xhr.send(reader.result)
  try {
    reader.readAsArrayBuffer(file)
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
  }

  return {
    cancel: () => {
      xhr.abort()
      onUpdate(uuid, FileUploadStatus.Deleted, 0)
    },
  }
}
