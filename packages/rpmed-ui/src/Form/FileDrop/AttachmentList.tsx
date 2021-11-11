import React from 'react'
import {
  HandleAssociatedFileUpdateFn,
  HandleDeleteFn,
  FilePreview,
  FileToEndpointFn,
  HandleFileUploadFn,
  HandleFileUploadErrorFn,
} from './FileDropProps'
import { AttachmentPreview } from './AttachmentPreview'
import { useNormalizedUploads } from './useNormalizedUploads'
import { concatStyles, remCalc } from 'utils'
import { DropTarget } from './DropTarget'
import { useEffect } from 'react'

export interface AttachmentListProps {
  accept?: string[]
  previews?: FilePreview[]
  onUpdate: HandleAssociatedFileUpdateFn
  onDelete?: HandleDeleteFn
  onUpload?: HandleFileUploadFn
  onError?: HandleFileUploadErrorFn
  getEndpointsForFilenames: FileToEndpointFn
  maxFiles?: number
  label?: string
}

const ATTACHMENTS_STYLES = 'flex flex-grow flex-col my-auto mx-0 p-0'
const INACTIVE_STYLES = 'border-contentAreaBorder'
const CONTAINER_STYLES = 'flex border content-center w-full'
const ACTIVE_STYLES = 'border-actionable'
const ERROR_STYLES =
  'text-error font-body text-xs font-semibold text-center w-full mt-2'

const minHeight = remCalc(50)

export const AttachmentList: React.FC<AttachmentListProps> = ({
  accept,
  onUpdate,
  previews = [],
  getEndpointsForFilenames,
  maxFiles,
  onDelete,
  onUpload,
  onError,
  label,
}) => {
  const { dropzone, renderablePreviews, ...uploads } = useNormalizedUploads({
    previews,
    onUpdate,
    accept,
    onDelete,
    getEndpointsForFilenames,
    onUpload,
    maxFiles,
    onError,
  })
  useEffect(() => {
    dropzone.fileRejections.map((r) => {
      onError?.(new Error(`${r.file.name} is not an acceptable file type.`))
    })
  }, [dropzone.fileRejections])

  return (
    <div className="rounded bg-white border border-primary-dark p-2 flex-col w-full">
      <div
        {...(dropzone.getRootProps() as any)}
        className={concatStyles([
          CONTAINER_STYLES,
          dropzone.isDragActive ? ACTIVE_STYLES : INACTIVE_STYLES,
        ])}
        style={{ minHeight }}
      >
        <input {...(dropzone.getInputProps() as any)} />
        {renderablePreviews.length > 0 ? (
          <ul className={ATTACHMENTS_STYLES} style={{ minHeight }}>
            {renderablePreviews.map((preview, index) => {
              return (
                <AttachmentPreview
                  onSort={uploads.handleSort}
                  key={preview.id}
                  preview={preview}
                  onDelete={uploads.handleDeletedFile}
                  index={index}
                  id={preview.id}
                  progress={uploads.progressForUpload(preview.id)}
                  onFinishSort={uploads.handleFinishSort}
                />
              )
            })}
          </ul>
        ) : (
          <DropTarget label={label} active={dropzone.isDragActive} />
        )}
      </div>
      {dropzone.fileRejections?.map((rej) => (
        <p className={ERROR_STYLES}>{rej.file.name} was not accepted.</p>
      ))}
    </div>
  )
}
