import { useState } from "react"
import { FilePreview, FileToEndpointFn, HandleAssociatedFileUpdateFn } from "rpmed-ui"
import { useCreateUploadsMutation } from 'rpmed-schema'
import { v4 as uuid } from 'uuid'

export const useManagedUploads = () => {
  const [createUploads, _] = useCreateUploadsMutation()
  const handleCreateEndpoints: FileToEndpointFn = async (files) => {
    const { data } = await createUploads({
      variables: {
        uploadInput: {
          keys: files.map(f => f.name.split(".").reduce((a, c, i) => `${a}${i === 0 ? uuid() : `.${c}`}`, ""))
        }
      }
    })
    const endpoints = data?.response.uploads?.map((d, i) => ({
      uploadUrl: d?.url ?? "",
      downloadUrl: d?.id ?? "",
      id: files[i].name
    })) ?? []
    return endpoints
  }

  const [previews, setPreviews] = useState<FilePreview[]>([])
  const handleAttachedFile: HandleAssociatedFileUpdateFn = async (files) => {
    setPreviews(
      files.map((f) => ({
        ...f,
        id: f.id,
        position: f.position,
        name: f.file?.name ?? f.name ?? f.id,
      }))
    )
  }

  return { handleCreateEndpoints, handleAttachedFile, previews, setPreviews }
}