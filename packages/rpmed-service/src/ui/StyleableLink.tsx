import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { ITheme } from './theme'

interface ILinkProps extends LinkProps {
  theme?: ITheme
  className?: string
}

const StyleableLink: React.FC<ILinkProps> = props => (
  <Link {...props}>{props.children}</Link>
)

export default StyleableLink
