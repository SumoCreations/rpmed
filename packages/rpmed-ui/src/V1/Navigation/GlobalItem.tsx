import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { darken, lighten, transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'
import { Badge } from './Badge'

const { useState } = React

export enum VisualMode {
  Global = 'global',
  Drawer = 'drawer',
}

export const GlobalItemIcon = styled.span`
  align-content: center;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  height: 100%;
  width: auto;
  font-size: 1.25rem;

  & > * {
    display: block;
    margin: auto;
  }
`

// eslint-disable-next-line no-unexpected-multiline
export const GlobalItemView = styled.button<{
  visualMode?: VisualMode
  interactive?: boolean
}>`
  background: transparent;
  color: ${p =>
    p.visualMode === VisualMode.Drawer
      ? p.theme.colorPrimary
      : p.theme.colorSecondary};
  cursor: ${p => (p.interactive ? 'pointer' : 'default')};
  border-radius: 1.5rem;
  display: flex;
  border: none;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  position: relative;
  margin: 0.25rem auto;
  transition: background 0.1s ease-out;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: ${p =>
      p.interactive
        ? p.visualMode === VisualMode.Drawer
          ? darken(0.05)(p.theme.colorDrawerBackground)
          : lighten(0.1)(p.theme.colorPrimary)
        : 'transparent'};
  }
`

const ToolTip = styled.span<{ active?: boolean }>`
  background: ${p => transparentize(0.2)(darken(0.5)(p.theme.colorPrimary))};
  border-radius: ${p => p.theme.borderRadius};
  font-size: 0.625rem;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
  font-family: ${p => p.theme.fontFamilyBody};
  color: ${p => p.theme.colorBodyTextInverted};
  font-weight: 400;
  position: absolute;
  pointer-events: none;
  left: 100%;
  top: 50%;
  margin-top: -0.55rem;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  opacity: ${p => (p.active ? 1 : 0)};
  transform: translate(${p => (p.active ? 5 : 0)}px, 0);
  transition: all 0.4s ease-in-out;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -5px;
    height: 0;
    right: 100%;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid
      ${p => transparentize(0.2)(darken(0.5)(p.theme.colorPrimary))};
    width: 0;
    z-index: 2;
  }
`

const AccessoryView = styled.span`
  display: block;
  position: absolute;
  top: 60%;
  left: 70%;
  z-index: 1;
`

export interface IGlobalItemProps {
  label?: string
  icon: IconDefinition
  badgeAmount?: number
  onClick?: React.MouseEventHandler
  visualMode?: VisualMode
}

export const GlobalItem: React.FC<IGlobalItemProps> = ({
  badgeAmount,
  icon,
  label,
  onClick,
  visualMode,
}) => {
  const interactive = typeof onClick === 'function'
  const [hovering, setHovering] = useState(false)
  const handleMouseOver = () => setHovering(true && interactive)
  const handleMouseOut = () => setHovering(false)

  return (
    <GlobalItemView
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
      visualMode={visualMode}
      interactive={interactive}
    >
      <GlobalItemIcon>
        <FontAwesomeIcon icon={icon} />
      </GlobalItemIcon>
      {label ? <ToolTip active={hovering}>{label}</ToolTip> : <span />}
      {badgeAmount ? (
        <AccessoryView>
          <Badge amount={badgeAmount} />
        </AccessoryView>
      ) : (
        <span />
      )}
    </GlobalItemView>
  )
}
