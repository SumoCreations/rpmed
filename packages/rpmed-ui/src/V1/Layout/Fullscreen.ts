import { Box } from 'rebass'
import styled from '../styled-components'

export const FullScreen = styled(Box as any)`
  background: ${(p) => p.theme.colorContentAreaBackground};
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  top: 0;
  left: 0;
  z-index: 101;
  padding: 0 1rem;

  @media print {
    position: relative;
    height: auto;
    min-height: 100vh;
  }
`
