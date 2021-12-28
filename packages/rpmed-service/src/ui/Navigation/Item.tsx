import styled from '../styled-components'

export const Item = styled.button`
  display: flex;
  align-items: center;
  height: 4rem;
`

export interface IBarItemDefinition {
  selected: boolean
  icon: string
  label: string
}
