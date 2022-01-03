import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faAsterisk } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { concatStyles } from 'utils'
import { Error } from './Error'

interface FieldError {
  name: string
  message: string
}

interface ErrorMap {
  [key: string]: FieldError | undefined
}

export interface FieldProps {
  label?: string
  name: string
  required?: boolean
  icon?: IconDefinition
  className?: string
  labelClassName?: string
  style?: React.CSSProperties
  errorMessage?: string
  grow?: boolean
  disabled?: boolean
  errors?: ErrorMap
  searchField?: boolean
}

export const getErrorMessage = ({
  name,
  errorMessage,
  errors,
}: {
  name: string
  errorMessage?: string
  errors?: ErrorMap
}) => errorMessage ?? (errors ?? {})[name]?.message

const CONTAINER_STYLES = 'flex flex-col'
const ICON_WRAPPER_STYLES = 'absolute inset-y-0 flex text-contentAreaBorder'
const ICON_STYLES = 'm-auto text-gray-500'
const WRAPPER_STYLES = 'relative flex flex-grow flex-wrap'
const REQUIRED_STYLES = 'text-accent text-xs mx-2 my-auto'

const getGrowStyle = (grow?: boolean) => (grow ? 'flex-grow' : '')
const getDisabledStyle = (disabled?: boolean) => (disabled ? 'opacity-75' : '')
const getIconPositionIf = (searchField?: boolean) =>
  searchField ? 'left-0 ml-3' : 'right-0 mr-3'

export const Field: React.FC<FieldProps> = ({
  label,
  name,
  className,
  labelClassName,
  required,
  icon,
  errorMessage,
  grow,
  children,
  disabled,
  searchField,
}) => (
  <div
    className={concatStyles([
      CONTAINER_STYLES,
      getGrowStyle(grow),
      getDisabledStyle(disabled),
      className,
    ])}
  >
    <label htmlFor={name} className={concatStyles('flex', labelClassName)}>
      {label}{' '}
      {required && (
        <FontAwesomeIcon icon={faAsterisk} className={REQUIRED_STYLES} />
      )}
    </label>
    <div className={WRAPPER_STYLES}>
      {children}
      {icon ? (
        <span
          className={concatStyles([
            ICON_WRAPPER_STYLES,
            getIconPositionIf(searchField),
          ])}
        >
          <FontAwesomeIcon icon={icon} className={ICON_STYLES} />
        </span>
      ) : (
        <span />
      )}
      {errorMessage ? <Error>{errorMessage}</Error> : null}
    </div>
  </div>
)

Field.displayName = 'Form.Field'
