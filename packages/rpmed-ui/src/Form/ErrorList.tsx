import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import React from 'react'
import { humanize } from 'utils'

const LIST_STYLES = 'my-2 border border-red-400 p-2 rounded flex flex-col'
const ITEM_STYLES = 'flex font-body text-red-600 text-sm'
const NAME_STYLES = 'font-semibold'

export interface ErrorListProps {
  errors?: { [key: string]: { message: string } }
  className?: string
}

export const ErrorList: React.FC<ErrorListProps> = ({
  className,
  errors = {},
}) => {
  const keys = Object.keys(errors ?? {})
  return keys.length ? (
    <ul className={clsx(LIST_STYLES, className)}>
      {keys.map((k) => (
        <li key={k} className={ITEM_STYLES}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size="sm"
            className="my-auto text-red-400 mr-2"
          />
          <strong className={NAME_STYLES}>{humanize(k)}&nbsp;</strong>{' '}
          {errors[k]?.message}
        </li>
      ))}
    </ul>
  ) : null
}
