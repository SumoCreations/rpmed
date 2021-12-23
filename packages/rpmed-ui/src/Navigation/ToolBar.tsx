import React, { FC } from "react"

export type ToolBarMode = "compact" | "hidden"

export interface ToolBarProps {
  /**
   * Determines the appearance of the toolbar.
   */
  mode?: ToolBarMode
}

const BASE_BAR =
  "flex flex-row border-b border-gray-300 bg-white-100 p-1 relative"
const COMPACT_BAR = `${BASE_BAR} overflow-visible`
const HIDDEN_BAR = `${BASE_BAR} h-0 overflow-hidden`

const classForMode = (mode?: ToolBarMode) => {
  switch (mode) {
    case "compact":
      return COMPACT_BAR
    case "hidden":
      return HIDDEN_BAR
  }
}

export const ToolBar: FC<ToolBarProps> = ({ mode = "compact", children }) => {
  return <div className={classForMode(mode)}>{children}</div>
}
