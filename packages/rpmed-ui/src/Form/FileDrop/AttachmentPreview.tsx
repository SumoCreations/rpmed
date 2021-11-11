import React from "react"
import { faFile } from "@fortawesome/pro-light-svg-icons/faFile"
import { faFilePdf } from "@fortawesome/pro-light-svg-icons/faFilePdf"
import { faFilePowerpoint } from "@fortawesome/pro-light-svg-icons/faFilePowerpoint"
import { faFileExcel } from "@fortawesome/pro-light-svg-icons/faFileExcel"
import { faFileWord } from "@fortawesome/pro-light-svg-icons/faFileWord"
import { faFileCsv } from "@fortawesome/pro-light-svg-icons/faFileCsv"
import { faFileImage } from "@fortawesome/pro-light-svg-icons/faFileImage"
import { SortableCallbacks, Sortable } from "../../Behavior"
import { FilePreview } from "./FileDropProps"
import { ItemTypes } from "./ItemTypes"
import { SendableProps, Sendable } from "./Sendable"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ATTACHMENT_STYLES =
  "flex flex-grow m-1 relative bg-gray-300 bg-opacity-25"
const PREVIEW_WRAPPER_STYLES = "flex box-border m-0 w-full p-2"
const ICON_STYLES = "box-border m-0"
const TEXT_CONTENT_STYLES = "box-border m-0 w-full pl-4 my-auto"

export interface AttachmentPreviewProps {
  /**
   * Indicates whether or not the preview is droppable.
   */
  canDrop?: boolean
  /**
   * A unique id identifying this preview.
   */
  id: string
  /**
   * A file upload preview created by dropzone.
   */
  preview: FilePreview
  /**
   * The current index of this preview in relation to its siblings.
   */
  index: number
  /**
   * The current progress for a pending file upload.
   */
  progress?: number
}

const Icon: React.FC<{ fileId: string }> = ({ fileId }) => {
  const extension = fileId.split(".").reverse()[0]
  let icon = faFile
  switch (extension) {
    case "pdf":
      icon = faFilePdf
      break
    case "xls":
      icon = faFileExcel
      break
    case "xlsx":
      icon = faFileExcel
      break
    case "ppt":
      icon = faFilePowerpoint
      break
    case "doc":
      icon = faFileWord
      break
    case "docx":
      icon = faFileWord
      break
    case "csv":
      icon = faFileCsv
      break
    case "jpg":
      icon = faFileImage
      break
    case "jpeg":
      icon = faFileImage
      break
    case "png":
      icon = faFileImage
      break
    case "gif":
      icon = faFileImage
      break
  }
  return <FontAwesomeIcon icon={icon} size="2x" />
}

export const AttachmentPreview: React.FC<
  AttachmentPreviewProps & SendableProps & SortableCallbacks
> = ({
  id,
  canDrop,
  preview,
  progress,
  onSort,
  onFinishSort,
  onDelete,
  index,
}) => (
  <Sortable
    id={id}
    index={index}
    type={ItemTypes.File}
    onSort={onSort}
    onFinishSort={onFinishSort}
    sortDirection="vertical"
  >
    <div className={ATTACHMENT_STYLES}>
      <Sendable
        onDelete={onDelete}
        deletable={canDrop}
        progress={progress}
        preview={preview}
        listMode={true}
      >
        {preview ? (
          <div className={PREVIEW_WRAPPER_STYLES}>
            <div className={ICON_STYLES}>
              <Icon fileId={preview.id} />
            </div>
            <div className={TEXT_CONTENT_STYLES}>
              <p>{preview.name}</p>
            </div>
          </div>
        ) : null}
      </Sendable>
    </div>
  </Sortable>
)
