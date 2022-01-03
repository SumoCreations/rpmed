import { faTrash } from "@fortawesome/pro-solid-svg-icons/faTrash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { HandleDeleteFn, FilePreview } from "./FileDropProps"
import { PreviewAction } from "./PreviewAction"
import { concatStyles } from "utils"
import { Progress } from "./Progress"

export interface SendableProps {
  onDelete?: HandleDeleteFn
}

export interface SendableProps {
  /**
   * A local preview with an optional file that should be uploaded.
   */
  preview: FilePreview
  /**
   * The current progress for a potential file upload.
   */
  progress?: number
  /**
   * Indicates if the upload can be cancelled / deleted.
   */
  deletable?: boolean
  /**
   * Indicate if the parent component is hovering triggering the
   * sendable 'delete' UI.
   */
  hovering?: boolean
  /**
   * Provide an alternative layout where the loading indicator is
   * right aligned.
   */
  listMode?: boolean
}

const CONTAINER_STYLES = "flex relative w-full flex-grow"

export const Sendable: React.FC<SendableProps & SendableProps> = ({
  deletable,
  preview,
  onDelete,
  progress,
  children,
  listMode,
}) => {
  const [hovering, setHovering] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null)

  const deletePreview = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete) {
      onDelete(preview)
    }
  }

  const toggleHover = (enabled: boolean) => () => {
    if (hoverTimeout && enabled) {
      clearTimeout(hoverTimeout)
    }
    if (!enabled) {
      setHoverTimeout(setTimeout(() => setHovering(enabled), 25) as any)
    } else {
      setHovering(enabled)
    }
  }

  const deleteVisible = !deletable && hovering ? true : false
  const loading = progress && progress < 100
  return (
    <div
      className={CONTAINER_STYLES}
      onMouseOver={toggleHover(true)}
      onMouseOut={toggleHover(false)}
      onMouseDown={toggleHover(false)}
    >
      {onDelete ? (
        <PreviewAction
          onClick={deletePreview}
          onMouseOver={toggleHover(true)}
          visible={deleteVisible}
          verticallyCentered={listMode}
        >
          <FontAwesomeIcon icon={faTrash} className="m-auto" />
        </PreviewAction>
      ) : (
        <span />
      )}
      <div
        className={concatStyles([
          CONTAINER_STYLES,
          loading ? "opacity-50" : "",
        ])}
      >
        {children}
      </div>
      {loading ? <Progress progress={progress} /> : null}
    </div>
  )
}
