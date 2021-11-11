// import { media } from '../media'
import styled from '../styled-components'

export const Container = styled.div`
  background: ${p => p.theme.colorSecondary};
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;

  @media print {
    position: relative;
    height: auto;
  }
`
