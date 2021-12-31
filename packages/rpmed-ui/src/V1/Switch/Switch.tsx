import { transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'

interface ISwitchProps {
  on?: boolean | null
  onClick?: React.MouseEventHandler
  labels?: string[]
}

const Container = styled.p<ISwitchProps>`
  background: ${(p) =>
    p.on
      ? p.theme.colorButtonPrimary
      : transparentize(0.5)(p.theme.colorPrimary)};
  position: relative;
  display: flex;
  width: 4rem;
  height: 1.75rem;
  border-radius: 0.875rem;
  margin: auto 0;
`

const Button = styled.button<ISwitchProps>`
  border: 0;
  color: #fff;
  font-size: 0.825rem;
  cursor: pointer;
  display: flex;
  position: absolute;
  background: transparent;
  opacity: 1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  span {
    margin: auto;
    text-align: center;
    transform: translate3d(${(p) => (p.on ? 0.75 : -0.75)}rem, 0, 0);
    transition: 0.25s transform ease-out;
    text-transform: uppercase;
  }
`

const Indicator = styled.span<ISwitchProps>`
  background: ${(p) => p.theme.colorContentAreaBackground};
  display: block;
  height: 1.75rem;
  width: 1.75rem;
  border-radius: 0.875rem;
  box-shadow: 1px 0 4px ${(p) => p.theme.colorPrimary};
  transform: translate3d(${(p) => (p.on ? 0 : 2.25)}rem, 0, 0);
  transition: 0.25s transform ease-out;
  pointer-events: none;
`

export const View: React.FC<ISwitchProps> = ({ labels, on, onClick }) => {
  const displayLabel = labels || ['on', 'off']
  return (
    <Container on={on}>
      <Button onClick={onClick} type="button" on={on}>
        <span>{on ? displayLabel[0] : displayLabel[1]}</span>
      </Button>
      <Indicator on={on} />
    </Container>
  )
}
