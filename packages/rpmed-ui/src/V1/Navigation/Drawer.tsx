import {
  faLongArrowLeft,
  faShieldAlt,
} from '@fortawesome/pro-regular-svg-icons'
import { lighten, transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'
import { SIDEBAR_WIDTH } from './constants'
import { Divider } from './Divider'
import { GlobalItem, VisualMode } from './GlobalItem'
import { Sidebar } from './Sidebar'

export enum DrawerWidth {
  Small = 420,
  Medium = 600,
  Wide = 968,
}

interface IProps {
  active: boolean
  width: DrawerWidth
  onBackClick: React.MouseEventHandler
}

interface IViewProps {
  active: boolean
  width: DrawerWidth
}

const Fade = styled.div<{ active: boolean }>`
  pointer-events: ${(p) => (p.active ? 'all' : 'none')};
  background: ${(p) =>
    transparentize(p.active ? 0.3 : 1)(p.theme.colorPrimary)};
  position: fixed;
  top: 0;
  left: ${SIDEBAR_WIDTH};
  width: 100vw;
  height: 100vh;
  z-index: 100;
  transition: background 0.35 ease-out;
`

const DrawerView = styled.div<IViewProps>`
  width: ${(p) => (p.active ? p.width : 0)}px;
  overflow: hidden;
  background: ${(p) => lighten(0.3)(p.theme.colorSecondary)};
  transition: width 0.125s ease-out;
  display: flex;
  flex-direction: row;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`

const DrawerContent = styled.ul`
  list-style: none;
  padding: 0.5rem 1rem;
  padding-top: 4.5rem;
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: column;
  display: flex;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
`

const DrawerSidebar = styled(Sidebar as any)`
  background: ${(p) => p.theme.colorDrawerBackground};
`

export const Drawer: React.FC<IProps> = (p) => {
  const { onBackClick, ...viewProps } = p
  return (
    <Fade onClick={onBackClick} active={p.active}>
      <DrawerView {...viewProps}>
        <DrawerSidebar>
          <GlobalItem icon={faShieldAlt} visualMode={VisualMode.Drawer} />
          <Divider />
          <GlobalItem
            icon={faLongArrowLeft}
            onClick={p.onBackClick}
            visualMode={VisualMode.Drawer}
          />
        </DrawerSidebar>
        <DrawerContent>{p.children}</DrawerContent>
      </DrawerView>
    </Fade>
  )
}
