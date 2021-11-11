import { faTrash } from '@fortawesome/pro-solid-svg-icons/faTrash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { XYCoord } from 'dnd-core'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd'
import {
  FileUploadStatus,
  HandleDeleteFn,
  HandleFileUploadFn,
  FilePreview,
} from './FileDropProps'
import { FileUpload, IFileUpload } from './FileUpload'
import { PreviewAction } from './PreviewAction'
import { Progress } from './Progress'

export const DND_TYPE_FILEPREVIEW = 'DND.ImagePreview'

export interface ThumbnailProps {
  primary?: boolean
  children?: React.ReactNode
  onMouseOver?: React.MouseEventHandler
  onMouseOut?: React.MouseEventHandler
  onMouseDown?: React.MouseEventHandler
  style?: React.CSSProperties
}

export const Thumbnail = React.forwardRef<HTMLLIElement, ThumbnailProps>(
  ({ primary, children, ...props }, ref) => (
    <li
      {...props}
      ref={ref}
      className={clsx(
        'border-4',
        primary ? 'border-accent-default' : 'border-primary-dark'
      )}
      style={{
        minWidth: 110,
      }}
    >
      {children}
    </li>
  )
)

export interface FilePreviewProps {
  canDrop: boolean
  id: string
  primary: boolean
  preview: FilePreview
  index: number
  uploadURL: string
  onSort: (dragIndex: number, hoverIndex: number) => void
  onFinishSort: () => void
  onComplete?: HandleFileUploadFn
  onDelete?: HandleDeleteFn
  isDragging: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
}

interface PreviewInstance {
  getNode(): HTMLDivElement | null
}

const Preview = React.forwardRef<HTMLDivElement, FilePreviewProps>(
  (
    {
      canDrop,
      primary,
      preview,
      isDragging,
      connectDragSource,
      connectDropTarget,
      uploadURL,
      onComplete,
      onDelete,
    },
    ref
  ) => {
    const [progress, setProgress] = useState(0)
    const [hovering, setHovering] = useState(false)
    const [hoverTimeout, setHoverTimeout] = useState<number | null>(null)
    const [localPreview, setLocalPreview] = useState<string | null>(null)
    const [upload, setUpload] = useState<IFileUpload | null>(null)
    const elementRef = useRef(null)

    if (!localPreview && preview && preview.file) {
      setLocalPreview(URL.createObjectURL(preview.file))
    }

    if (!upload && preview && preview.file) {
      setUpload(
        FileUpload(
          preview.id,
          preview.file,
          uploadURL,
          (id, status, fileProgress) => {
            setProgress(fileProgress)
            if (status === FileUploadStatus.Available && onComplete) {
              onComplete({ ...preview, status: FileUploadStatus.Available })
            }
          }
        )
      )
    }

    useEffect(
      () => () => {
        if (localPreview) {
          URL.revokeObjectURL(localPreview)
        }
        if (upload) {
          upload.cancel()
        }
      },
      [localPreview, upload]
    )

    connectDragSource(elementRef)
    connectDropTarget(elementRef)

    useImperativeHandle<{}, PreviewInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))

    const opacity = isDragging ? 0.5 : 1
    const transmitting = preview.status === FileUploadStatus.Pending

    const deletePreview = (e: React.MouseEvent) => {
      if (onDelete) {
        onDelete(preview)
      }
      e.stopPropagation()
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

    const deleteVisible = !canDrop && hovering ? true : false

    return (
      <Thumbnail
        ref={elementRef}
        style={{ opacity }}
        onMouseOver={toggleHover(true)}
        onMouseOut={toggleHover(false)}
        onMouseDown={toggleHover(false)}
        primary={primary}
      >
        {onDelete ? (
          <PreviewAction
            onClick={deletePreview}
            onMouseOver={toggleHover(true)}
            visible={deleteVisible}
          >
            <FontAwesomeIcon icon={faTrash} />
          </PreviewAction>
        ) : (
          <span />
        )}
        {preview ? (
          <img
            src={localPreview || preview.downloadUrl || ''}
            className={clsx(
              transmitting && 'pointer-events-none opacity-20',
              'flex'
            )}
          />
        ) : null}
        {transmitting ? <Progress progress={progress} /> : null}
      </Thumbnail>
    )
  }
)

export const ImagePreview = DropTarget(
  DND_TYPE_FILEPREVIEW,
  {
    hover(
      props: FilePreviewProps,
      monitor: DropTargetMonitor,
      component: PreviewInstance
    ) {
      if (!component) {
        return null
      }
      // node = HTML Div element from imperative API
      const node = component.getNode()
      if (!node) {
        return null
      }

      const dragIndex = monitor.getItem<{ index: number }>().index
      const hoverIndex = props.index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddle = {
        x: (hoverBoundingRect.right - hoverBoundingRect.left) / 2,
        y: (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2,
      }

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left

      // Only perform the move when the mouse has crossed half of the items width
      // When dragging rightwards, only move when the cursor is to the right of 50%
      // When dragging leftwards, only move when the cursor is left of 50%

      // Dragging rightwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddle.x) {
        return
      }

      // Dragging leftwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddle.x) {
        return
      }

      // Time to actually perform the action
      props.onSort(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem<{ index: number }>().index = hoverIndex
    },
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    DND_TYPE_FILEPREVIEW,
    {
      beginDrag: (props: FilePreviewProps) => ({
        id: props.id,
        index: props.index,
      }),
      endDrag: (props: FilePreviewProps) => {
        props.onFinishSort()
      },
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(Preview)
)
