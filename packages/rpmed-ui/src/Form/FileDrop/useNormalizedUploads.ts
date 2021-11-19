import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  HandleAssociatedFileUpdateFn,
  FilePreview,
  HandleNewFilesFn,
  HandleFileUploadFn,
  HandleFilesFn,
  HandleDeleteFn,
  FileUploadStatus,
  FileToEndpointFn,
  HandleFileUploadErrorFn,
} from './FileDropProps'
import { MimeTypes } from './MimeTypes'
import { FileUpload, IFileUpload } from './FileUpload'

interface NormalizedUploadsProps {
  accept?: string[]
  onUpdate: HandleAssociatedFileUpdateFn
  onDelete?: HandleDeleteFn
  onUpload?: HandleFileUploadFn
  onError?: HandleFileUploadErrorFn
  previews: FilePreview[]
  getEndpointsForFilenames: FileToEndpointFn
  maxFiles?: number
}

interface ProgressUpdate {
  id: string
  progress: number
  status: FileUploadStatus
}

const normalize = (s: string) =>
  s
    .split('.')
    .map((s) => s.replace(/\W+/g, '_'))
    .join('.')

/**
 * Sorts previews by position whilst filtering out deleted previews.
 * @param previews A list of previews / files to sort.
 */
const filterPreviews = (previews: FilePreview[]) =>
  previews
    .filter((p) => p.status !== FileUploadStatus.Deleted)
    .map((p) => ({
      ...p,
      id: normalize(p.id),
      name: normalize(p.name ?? p.id),
    }))
    .sort((a, b) =>
      (a.position ?? 0) < (b.position ?? 0)
        ? -1
        : (a.position ?? 0) > (b.position ?? 0)
          ? 1
          : 0
    )

export const useNormalizedUploads = ({
  accept,
  onUpdate,
  previews,
  getEndpointsForFilenames,
  maxFiles,
  onDelete: externalDeleteHandler,
  onUpload: externalUploadFinishedHandler,
  onError: externalErrorHandler,
}: NormalizedUploadsProps) => {
  // Sorted and filtered incomming previews...
  const renderablePreviews = filterPreviews(previews)

  // Track any pending uploads...
  const [uploads, setUploads] = useState<{ [key: string]: IFileUpload | null }>(
    {}
  )
  const [progressUpdate, setProgressUpdate] = useState<ProgressUpdate | null>(
    null
  )
  const [trackedProgress, setTrackedProgress] = useState<{
    [key: string]: ProgressUpdate
  }>({})

  useEffect(() => {
    if (!progressUpdate) {
      return
    }
    const existingUpdate = trackedProgress[progressUpdate.id]
    if (existingUpdate?.progress !== progressUpdate.progress) {
      setTrackedProgress({
        ...trackedProgress,
        [progressUpdate.id]: progressUpdate,
      })
    }
  }, [uploads, progressUpdate, trackedProgress, setTrackedProgress])

  /**
   * Fires the on update callback supplied by the component.
   * @param newPreviews A map of normalized previews based on local state.
   */
  const savePreviews = useCallback(
    async (newPreviews: FilePreview[]) => {
      await onUpdate(filterPreviews(newPreviews))
    },
    [onUpdate]
  )

  const handleAdditionalFile: HandleNewFilesFn = async (newPreviews) => {
    await savePreviews([...renderablePreviews, ...newPreviews])
  }

  const handleSort = useCallback(
    async (dragId: string, _dragIndex: number, hoverIndex: number) => {
      const currentPreview = renderablePreviews.filter(
        (p) => p.id === dragId
      )[0]
      if (!currentPreview) {
        return
      }
      const updates = [...renderablePreviews]
      updates.splice(currentPreview.position as number, 1)
      updates.splice(
        hoverIndex,
        0,
        renderablePreviews[currentPreview.position as number]
      )
      const repositioned = updates.map((u, i) => ({ ...u, position: i }))
      await savePreviews(repositioned)
    },
    [renderablePreviews, savePreviews]
  )

  const handleFinishSort = () => {
    console.log("Sorting has finished... maybe we don't need this anymore?")
  }

  const handleDeletedFile = async (preview: FilePreview) => {
    const updates = [
      ...renderablePreviews.filter((p) => p.id !== preview.id),
      { ...preview, status: FileUploadStatus.Deleted },
    ]
    await savePreviews(updates)
    if (externalDeleteHandler) {
      await externalDeleteHandler(preview)
    }
  }

  const handleFileKeys: HandleFilesFn = async (keys) =>
    await getEndpointsForFilenames(keys)

  // Initialize dropzone...
  const dropzone = useDropzone({
    maxFiles,
    accept: accept ?? MimeTypes.Images,
    onDrop: async (acceptedFiles) => {
      if (maxFiles && previews.length >= maxFiles) {
        return
      }
      const uniqueKey = `${new Date().getTime()}`.slice(9, 13)
      const newFiles: FilePreview[] = acceptedFiles.map((file, index) => {
        return {
          id: `${uniqueKey}_${normalize(file.name)}`,
          file,
          position: previews.length + index,
          status: FileUploadStatus.Pending,
        }
      })

      const signedUrls =
        (await handleFileKeys(
          newFiles.map((f) => ({ name: f.id, contentType: f.file?.type ?? '' }))
        )) || []
      const processedFiles = newFiles.map((f) => {
        const { uploadUrl } =
          (signedUrls || []).find((url) => {
            return new RegExp(`${f.id}$`).test(url.id)
          }) ?? {}

        return {
          ...f,
          uploadUrl,
        }
      })

      processedFiles
        .filter((c) => !c.file || !c.uploadUrl)
        .map((c) =>
          externalErrorHandler?.(
            new Error(`Could not request a signed url for file "${c.id}"`)
          )
        )

      const uploadableFiles = processedFiles.filter(
        (c) => typeof c.uploadUrl === 'string' && c.file
      )

      console.log("uploadableFiles", uploadableFiles)

      setUploads(
        uploadableFiles.reduce(
          (_, c) => ({
            ...uploads,
            [c.id]: FileUpload(
              c.id,
              c.file as File,
              c.uploadUrl as string,
              (_, status, fileProgress) => {
                setProgressUpdate({ id: c.id, progress: fileProgress, status })
                if (
                  fileProgress === 100 &&
                  status === FileUploadStatus.Available &&
                  externalUploadFinishedHandler
                ) {
                  externalUploadFinishedHandler(c)
                }
              }
            ),
          }),
          {}
        )
      )
      handleAdditionalFile([...uploadableFiles])
    },
  })

  const progressForUpload = (id: string) => {
    return trackedProgress[id]?.progress ?? 100
  }

  return {
    renderablePreviews,
    dropzone,
    handleAdditionalFile,
    handleSort,
    handleFinishSort,
    handleDeletedFile,
    handleFileKeys,
    progressForUpload,
  }
}
