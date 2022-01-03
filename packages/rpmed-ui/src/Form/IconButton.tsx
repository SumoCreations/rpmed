import React, { useState } from 'react'
import { Icon, IconProps } from './Icon'
import { ToolTip, ToolTipProps } from '../Navigation'

interface IconButtonHandlers {
  onClick?: () => void
}

export type IconButtonProps = IconProps & ToolTipProps & IconButtonHandlers

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  ...props
}) => {
  const [hover, setHover] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick?.()
  }
  const handleHover = (state: boolean) => () => setHover(state)
  return (
    <button
      className="flex items-center h-8 w-8 rounded-full hover:bg-primary hover:bg-opacity-10 relative"
      onClick={handleClick}
      onMouseOver={handleHover(true)}
      onMouseOut={handleHover(false)}
    >
      <Icon {...props} />
      {props.label ? <ToolTip {...props} active={hover} /> : null}
    </button>
  )
}
