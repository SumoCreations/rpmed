import React, { useEffect, useState } from "react"
import { SortableCallbacks, Sortable } from "../../Behavior"
import { FilePreview } from "./FileDropProps"
import { ItemTypes } from "./ItemTypes"
import { SendableProps, Sendable } from "./Sendable"

import { Thumbnail } from "./FilePreview"

export interface ImagePreviewProps {
  /**
   * Indicates whether or not the preview is droppable.
   */
  canDrop?: boolean
  /**
   * A unique id identifying this preview.
   */
  id: string
  /**
   * Indicates whether or not this is the primary preview.
   */
  primary: boolean
  /**
   * A file upload preview created by dropzone.
   */
  preview: FilePreview
  /**
   * The current index of this preview in relation to its siblings.
   */
  index: number
  /**
   * Current progress on a pending file transer.
   */
  progress?: number
}

export const ImagePreview: React.FC<
  ImagePreviewProps & SendableProps & SortableCallbacks
> = ({
  id,
  canDrop,
  primary,
  preview,
  onSort,
  onFinishSort,
  onDelete,
  index,
  progress,
}) => {
  const [localPreview, setLocalPreview] = useState<string | null>(null)

  if (!localPreview && preview && preview.file) {
    setLocalPreview(URL.createObjectURL(preview.file))
  }

  useEffect(() => {
    if (localPreview) {
      URL.revokeObjectURL(localPreview)
    }
  }, [localPreview])

  return (
    <Sortable
      id={id}
      index={index}
      type={ItemTypes.Image}
      onSort={onSort}
      onFinishSort={onFinishSort}
      sortDirection="horizontal"
    >
      <Thumbnail primary={primary}>
        <Sendable
          onDelete={onDelete}
          deletable={canDrop}
          preview={preview}
          progress={progress}
        >
          {preview ? (
            <img src={localPreview || preview.downloadUrl || ""} />
          ) : null}
        </Sendable>
      </Thumbnail>
    </Sortable>
  )
}
