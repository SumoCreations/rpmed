import React from 'react'
import { faArrowUp } from '@fortawesome/pro-solid-svg-icons/faArrowUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { concatStyles } from 'utils'

export interface DropTargetProps {
  label?: string
  active?: boolean
}

const CONTAINER_STYLES =
  'flex flex-col text-center h-full font-bold text-primary font-body p-2 w-full'
const ICON_WRAPPER_STYLES =
  'text-xl rounded-full h-10 w-10 text-center mx-auto mt-auto flex bg-button'
const ICON_STYLES = 'm-auto'
const ACTIVE_STYLES = 'bg-white text-button border-2 border-button'
const INACTIVE_STYLES = 'bg-button text-white border-2 border-transparent'
const LABEL_STYLES = 'mx-auto mt-0 mb-auto'
const ACTIVE_LABEL_STYLES = 'text-button'

export const DropTarget: React.FC<DropTargetProps> = ({
  label = "Drag 'n' drop some files here, or click to select files",
  active,
}) => (
  <div
    className={concatStyles([CONTAINER_STYLES, active ? ACTIVE_STYLES : ''])}
  >
    <p
      className={concatStyles([
        ICON_WRAPPER_STYLES,
        active ? ACTIVE_STYLES : INACTIVE_STYLES,
      ])}
    >
      <FontAwesomeIcon icon={faArrowUp} className={ICON_STYLES} />
    </p>
    <p
      className={concatStyles([
        LABEL_STYLES,
        active ? ACTIVE_LABEL_STYLES : '',
      ])}
    >
      {label}
    </p>
  </div>
)
