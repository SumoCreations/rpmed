import * as React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const LIST_STYLES =
  'mb-4 px-0 py-2 flex flex-row uppercase text-sm font-bold text-primary font-header'
const LIST_ITEM_STYLES = 'flex m-0'
const LINK_STYLES = 'my-auto pl-2'
const SEPARATOR_STYLES = 'opacity-25 pl-2 display-none:last-child text-center'

export interface BreadCrumbItem {
  label: string
  to?: string
  url?: string
}

export interface BreadCrumbProps {
  trail?: BreadCrumbItem[]
}

const Separator: React.FC = () => (
  <span aria-hidden="true" className={SEPARATOR_STYLES}>
    &gt;
  </span>
)

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ trail = [] }) => (
  <ul className={LIST_STYLES}>
    <li className={LIST_ITEM_STYLES}>
      <a href="https://rpmed.com" className={'my-auto'}>
        Home
      </a>
      <Separator />
    </li>
    {trail.map((item, i) => {
      const last = i === trail.length - 1
      return (
        <li
          className={clsx(LIST_ITEM_STYLES, last && 'opacity-50')}
          key={`${item.label}${i}`}
        >
          {item.url ? (
            <a href={item.url} className={LINK_STYLES}>
              {item.label}
            </a>
          ) : (
            <Link to={item.to ?? ''} className={LINK_STYLES}>
              {item.label}
            </Link>
          )}{' '}
          {!last ? <Separator /> : null}
        </li>
      )
    })}
  </ul>
)
