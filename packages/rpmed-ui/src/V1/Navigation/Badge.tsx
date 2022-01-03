import * as React from 'react'
import styled from '../styled-components'

const BadgeContainer = styled.h4`
  align-content: auto;
  border-radius: 0.6rem;
  display: flex;
  height: 1.2rem;
  min-width: 1.2rem;
  font-size: 0.6rem;
  color: ${p => p.theme.colorBodyTextInverted};
  background: ${p => p.theme.colorErrorText};
  margin: auto 4px;
  padding: 0 0.375rem;
`

const BadgeNumber = styled.span`
  display: block;
  margin: auto;
`
interface IProps {
  amount: number
}

export const Badge: React.FC<IProps> = ({ amount }) => (
  <BadgeContainer>
    <BadgeNumber>{amount}</BadgeNumber>
  </BadgeContainer>
)
