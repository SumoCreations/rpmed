import * as React from 'react'
import styled from '../styled-components'
import { IBarItemDefinition } from './Item'

const BarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 4rem;
  border-left: 1px solid ${(p: any) => p.theme.colorContentAreaBorder};
`

export const Bar: React.FC<{
  items: IBarItemDefinition[]
  renderItem: (item: IBarItemDefinition) => JSX.Element
}> = ({ items, renderItem }) => (
  <BarContainer>{items.map(renderItem)}</BarContainer>
)
