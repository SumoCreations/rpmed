import { darken } from 'polished'
import styled from '../styled-components'

export enum Size {
  Small,
  Medium,
  Large,
}

const getFontSize = (size: Size) => {
  switch (size) {
    case Size.Large:
      return '1rem'
    case Size.Medium:
      return '0.75rem'
    default:
      return '0.5rem'
  }
}

const getPadding = (size: Size) => {
  switch (size) {
    case Size.Large:
      return '0.35rem 0.75rem'
    default:
      return '0.25rem 0.5rem'
  }
}

export const List = styled.div`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  margin: auto 0;
`

export const Action = styled.button`
  background: transparent;
  color: ${(p: any) => p.theme.colorBodyTextInverted};
  cursor: pointer;
  border: none;
  padding: 0 0 0 0.5rem;
  margin: auto;
`

export const Primary = styled.h5<{ size?: Size }>`
  display: flex;
  font-size: ${(p: any) => getFontSize(p.size || Size.Small)};
  font-weight: 300;
  line-height: 1.15em;
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  text-transform: uppercase;
  color: ${(p: any) => p.theme.colorBodyTextInverted};
  border: 0;
  border-radius: 1rem;
  background: ${(p: any) => p.theme.colorPrimary};
  padding: ${(p: any) => getPadding(p.size || Size.Small)};
  position: relative;
  text-align: center;
  margin: 0.2rem 0.1rem;
  flex-grow: 0;
`

export const Secondary = styled(Primary)`
  background: transparent;
  color: ${(p: any) => p.theme.colorPrimary};
  border: 1px solid ${(p: any) => p.theme.colorPrimary};
`

export const Error = styled(Primary)`
  background: ${(p: any) => p.theme.colorButtonDestructive};
  color: ${(p: any) => p.theme.colorBodyTextInverted};
`

export const ErrorInverted = styled(Primary)`
  background: transparent;
  color: ${(p: any) => p.theme.colorButtonDestructive};
  border: 1px solid ${(p: any) => p.theme.colorButtonDestructive};
`

export const Actionable = styled(Primary)`
  background: ${(p: any) => p.theme.colorButtonPrimary};
  color: ${(p: any) => p.theme.colorBodyTextInverted};
  cursor: pointer;
  border: 1px solid ${(p: any) => p.theme.colorButtonPrimary};
`

export const ActionableSecondary = styled(Secondary)`
  background: transparent;
  color: ${(p: any) => darken(0.1)(p.theme.colorButtonPrimary)};
  cursor: pointer;
  border: 1px solid ${(p: any) => darken(0.1)(p.theme.colorButtonPrimary)};
`
