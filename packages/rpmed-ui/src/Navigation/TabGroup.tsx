import React, { FC } from "react"

const TAB_GROUP = "flex flex-row"

export const TabGroup: FC = ({ children }) => {
  return <div className={TAB_GROUP}>{children}</div>
}
