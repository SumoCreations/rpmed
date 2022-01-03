import React from "react"
import { concatStyles } from "utils"

export type ButtonGroupDirection = "column" | "row"

export interface ButtonGroupProps {
  className?: string
  itemClassName?: string
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
  direction: ButtonGroupDirection
  grow?: boolean
}

const BUTTON_GROUP_STYLES = "flex"
const BUTTON_GROUP_ITEM_STYLES = BUTTON_GROUP_STYLES

const makeFlexDirection = (direction: ButtonGroupDirection) =>
  direction === "column" ? "flex-col" : "flex-row"
const makeAdjacentStyles = (direction: ButtonGroupDirection) =>
  direction === "column" ? "mt-2" : "ml-2"
const makeFlexGrow = (grow?: boolean) => (grow ? "flex-grow" : "")

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  direction = "row",
  className,
  itemClassName,
  style,
  itemStyle,
  grow,
}) => (
  <ul
    className={concatStyles([
      BUTTON_GROUP_STYLES,
      makeFlexDirection(direction),
      makeFlexGrow(grow),
      className,
    ])}
    style={style}
  >
    {React.Children.map(children, (child, index) =>
      child ? (
        <li
          className={concatStyles([
            BUTTON_GROUP_ITEM_STYLES,
            itemClassName,
            makeFlexGrow(grow),
            index > 0 ? makeAdjacentStyles(direction) : "",
          ])}
          style={itemStyle}
        >
          {child}
        </li>
      ) : null
    )}
  </ul>
)

ButtonGroup.displayName = "Form.ButtonGroup"
