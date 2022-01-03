import React from 'react'
import {
  HandleAssociatedFileUpdateFn,
  FilePreview,
  FileToEndpointFn,
  HandleDeleteFn,
  HandleFileUploadFn,
} from './FileDropProps'
import { ImagePreview } from './ImagePreview'
import { useNormalizedUploads } from './useNormalizedUploads'
import { concatStyles, remCalc } from 'utils'
import { DropTarget } from './DropTarget'

export interface GalleryProps {
  accept?: string[]
  previews: FilePreview[]
  onUpdate: HandleAssociatedFileUpdateFn
  onDelete?: HandleDeleteFn
  onUpload?: HandleFileUploadFn
  getEndpointsForFilenames: FileToEndpointFn
  maxFiles?: number
  label?: string
}

const THUMBLIST_STYLES = 'flex flex-grow flex-row my-auto mx-0 p-0 flex-wrap'
const INACTIVE_STYLES = 'border-contentAreaBorder'
const CONTAINER_STYLES = 'flex border content-center w-full'
const ACTIVE_STYLES = 'border-actionable'

const minHeight = remCalc(120)

export const Gallery: React.FC<GalleryProps> = ({
  accept,
  onUpdate,
  onDelete,
  onUpload,
  maxFiles,
  previews,
  getEndpointsForFilenames,
  label,
}) => {
  const { dropzone, renderablePreviews, ...uploads } = useNormalizedUploads({
    previews,
    onUpdate,
    onDelete,
    onUpload,
    maxFiles,
    accept,
    getEndpointsForFilenames,
  })
  return (
    <div className="p-2 flex-col w-full rounded border border-primary-dark">
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
          <ul className={THUMBLIST_STYLES}>
            {renderablePreviews.map((preview, index) => {
              return (
                <ImagePreview
                  primary={index === 0}
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
    </div>
  )
}
