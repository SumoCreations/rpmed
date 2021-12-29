import * as React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const LIST_STYLES = 'mb-4 p-0 flex flex-row'
const LIST_ITEM_STYLES = 'flex m-0 p-0 font-header'
const LIST_ITEM_CHILD_STYLES =
  'text-sm opacity-25 mx-auto my-2 font-bold display-none:last-child text-center'
const HOME_LINK_STYLES = 'uppercase text-sm text-primary font-bold'

const Container: React.FC<{
  children?: JSX.Element[] | JSX.Element
  home?: boolean
}> = ({ children, home }) => (
  <ul className={LIST_STYLES}>
    <li className={LIST_ITEM_STYLES}>
      <a href="https://rpmed.com" className={HOME_LINK_STYLES}>
        Home
      </a>
      <span aria-hidden="true">&gt;</span>
    </li>
    <li className={LIST_ITEM_STYLES}>
      <Link
        to="/"
        className={clsx(
          'font-bold uppercase text-primary text-xs',
          home && 'text-opacity-75'
        )}
      >
        Resource Center
      </Link>
      <span aria-hidden="true" className={LIST_ITEM_CHILD_STYLES}>
        &gt;
      </span>
    </li>
    {React.Children.map(children, (child) => (
      <li className={LIST_ITEM_STYLES}>
        {child}{' '}
        <span aria-hidden="true" className={LIST_ITEM_CHILD_STYLES}>
          &gt;
        </span>
      </li>
    ))}
  </ul>
)

export { Container, Link }
