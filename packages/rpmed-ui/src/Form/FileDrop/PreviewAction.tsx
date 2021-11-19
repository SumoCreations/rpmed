import clsx from "clsx"
import React from "react"

export interface PreviewActionProps {
  primary?: boolean
  children?: React.ReactNode
  onMouseOver?: React.MouseEventHandler
  onMouseOut?: React.MouseEventHandler
  onMouseDown?: React.MouseEventHandler
  onClick?: React.MouseEventHandler
  style?: React.CSSProperties
  visible?: boolean
  verticallyCentered?: boolean
}

export const PreviewAction: React.FC<PreviewActionProps> = ({
  children,
  verticallyCentered,
  visible,
  onClick: handleClick
}) => (
  <button
    onClick={handleClick}
    className={clsx(
      "absolute flex rounded-full text-white text-center z-10 text-small bg-button",
      verticallyCentered && "-mt-2",
      visible ? "opacity-100" : "opacity-0"
    )}
    style={{ width: "2rem", height: "2rem", right: 4 }}
  >
    {children}
  </button>
)
