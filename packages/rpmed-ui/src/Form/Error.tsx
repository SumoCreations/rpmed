import React from "react"

const ERROR_STYLE =
  "text-xs text-white font-body bg-red-600 rounded absolute top-100 right-0 mt-1 whitespace-nowrap px-1 z-10"

export const Error: React.FC = ({ children }) => (
  <span className={ERROR_STYLE}>{children}</span>
)
