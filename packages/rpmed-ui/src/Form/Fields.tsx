import React from 'react'
import { concatStyles } from 'utils'

export interface FieldsProps {
  className?: string
  style?: React.CSSProperties
  /**
   * Add additional styling and responsive row layout within parent fieldset.
   */
  nested?: boolean
  /**
   * Set to true if you always want the component to render with a flex-col layout.
   */
  strictVertical?: boolean
  /**
   * If true flex-grow will be applied to child elements.
   */
  grow?: boolean
  /**
   * Any errors to map to applicable fields. This will also be passed to nested fields.
   */
  errors?: any
  /**
   * Used to map react-hook-form's register method to child fields. This will also be passed to nested fields.
   */
  register?: any
}

const LIST_STYLE = 'flex flex-col flex-grow'
const TOP_LEVEL_LIST_STYLE = 'max-w-full'
const NESTED_LIST_STYLE = '-m-2 sm:flex-row'
const NESTED_COL_STYLE = '-m-2'
const ITEM_STYLE = 'flex flex-grow flex-shrink-0 p-2'
const RESPONSIVE_GROWTH_STYLE = 'sm:flex-grow-0'

export const Fields: React.FC<FieldsProps> = ({
  className,
  children,
  nested,
  strictVertical,
  grow,
  register,
  errors,
}) => (
  <ul
    className={concatStyles([
      LIST_STYLE,
      nested
        ? strictVertical
          ? NESTED_COL_STYLE
          : NESTED_LIST_STYLE
        : TOP_LEVEL_LIST_STYLE,
      grow ? '' : RESPONSIVE_GROWTH_STYLE,
      className,
    ])}
  >
    {React.Children.map(children, (child: any, index) =>
      child ? (
        <li
          className={concatStyles([
            child?.props.type === 'hidden' ? 'w-0 h-0' : ITEM_STYLE,
            child?.props.type !== 'hidden' && grow
              ? ''
              : RESPONSIVE_GROWTH_STYLE,
          ])}
        >
          {child?.props?.name || child?.props?.nested
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register,
                  errors,
                  key: `child${child.type}${index}${child?.props?.name ?? ''}`,
                  ...(child?.props?.name ? register(child?.props?.name) : {}),
                },
              })
            : React.createElement(child.type, {
                ...{
                  ...child.props,
                  key: `child${child.type}${index}`,
                },
              })}
        </li>
      ) : null
    )}
  </ul>
)

Fields.displayName = 'Form.Fields'
