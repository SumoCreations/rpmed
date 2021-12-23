import * as React from 'react'
import styled from './styled-components'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const List = styled.ul`
  list-style: none;
  margin: 0 0 12px 0;
  padding: 0;
  display: flex;
  flex-direction: row;
`

const Item = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
  font-family: ${(p) => p.theme.fontFamilyHeader};

  & > span {
    display: flex;
    font-size: 0.675rem;
    opacity: 0.25;
    margin: auto 4px;
    font-weight: bold;
  }

  &:last-child > span {
    display: none;
  }
`

const HomeLink = styled.a`
  text-transform: uppercase;
  font-weight: 600;
  color: ${(p) => p.theme.colorPrimary};
  font-size: 0.875em;
`

const Container: React.FC<{
  children?: JSX.Element[] | JSX.Element
  home?: boolean
}> = ({ children, home }) => (
  <List>
    <Item>
      <HomeLink href="https://rpmed.com">Home</HomeLink>
      <span aria-hidden="true">&gt;</span>
    </Item>
    <Item>
      <Link
        to="/"
        className={clsx(
          'font-bold uppercase text-primary text-xs',
          home && 'text-opacity-75'
        )}
      >
        Resource Center
      </Link>
      <span aria-hidden="true">&gt;</span>
    </Item>
    {React.Children.map(children, (child) => (
      <Item>
        {child} <span aria-hidden="true">&gt;</span>
      </Item>
    ))}
  </List>
)

export { Container, List, Item, Link }
