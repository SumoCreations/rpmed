import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  FileUploadStatus,
  FilePreview,
  FileToEndpointFn,
} from './FileDropProps'
import { uniqueFileName } from './helpers'

/**
 * A hook that acts as a convenience for uploading a single
 * file as compared to the list format utilized by the default
 * file drop component.
 * @param getEndpointForFilenames A callback where you can perform a network request.
 * @param uniqueId An optional key if ommitted a unique filename will be generated.
 */
export const useUpload = (
  getEndpointsForFilenames: FileToEndpointFn,
  uniqueId?: string,
  accept?: string
) => {
  const [filePreview, setFilePreview] = useState(null as null | FilePreview)

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: accept ?? 'image/*',
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0]
      const id = uniqueFileName(file.name, uniqueId)
      const upload = (
        await getEndpointsForFilenames([{ name: id, contentType: file.type }])
      )[0]
      setFilePreview({
        file,
        id,
        position: 0,
        status: FileUploadStatus.Pending,
        uploadURL: upload.uploadUrl,
        downloadUrl: upload.downloadUrl,
      })
    },
  })

  return {
    filePreview,
    getInputProps,
    getRootProps,
    isDragActive,
  }
}
