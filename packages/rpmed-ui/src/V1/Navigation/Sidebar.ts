import styled from '../styled-components'
import { SIDEBAR_WIDTH } from './constants'

export const Sidebar = styled.nav<{ background?: string }>`
  background: ${p => p.background || p.theme.colorPrimary};
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  min-height: 100vh;
  padding: 0.5rem;
  width: ${SIDEBAR_WIDTH};
  z-index: 101;

  @media print {
    display: none;
  }
`
