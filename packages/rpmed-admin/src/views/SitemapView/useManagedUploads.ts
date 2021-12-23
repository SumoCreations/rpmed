import { useState } from 'react'
import {
  FilePreview,
  FileToEndpointFn,
  HandleAssociatedFileUpdateFn,
} from 'rpmed-ui'
import { useCreateUploadsMutation } from 'rpmed-schema'

export const useManagedUploads = () => {
  const [createUploads] = useCreateUploadsMutation()
  const handleCreateEndpoints: FileToEndpointFn = async files => {
    const keys = files.map(f => [...f.name.split('.')].join('.'))
    const { data } = await createUploads({
      variables: {
        uploadInput: {
          keys,
        },
      },
    })
    const endpoints =
      data?.response.uploads?.map((d, i) => ({
        uploadUrl: d?.url ?? '',
        downloadUrl: d?.id ?? '',
        id: keys[i],
      })) ?? []
    return endpoints
  }

  const [previews, setPreviews] = useState<FilePreview[]>([])
  const handleAttachedFile: HandleAssociatedFileUpdateFn = async files => {
    setPreviews(
      files.map(f => ({
        ...f,
        id: f.id,
        position: f.position,
        name: f.file?.name ?? f.name ?? f.id,
      }))
    )
  }

  return { handleCreateEndpoints, handleAttachedFile, previews, setPreviews }
}
