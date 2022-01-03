import { transparentize } from 'polished'
import { media } from '../media'
import styled from '../styled-components'

export enum Size {
  default = 748,
  medium = 512,
  small = 384,
}

export const Container = styled.article<{ transparent?: boolean }>`
  background: ${p =>
    transparentize(p.transparent ? 0.5 : 0)(p.theme.colorPrimary)};
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  margin: 0;
  overflow: auto;

  ${media.minSm`align-items: center;`}
`

export const Heading = styled.header`
  display: flex;
  margin: 15px auto;
  color: ${p => p.theme.colorBodyTextInverted};
  & > * {
    margin: 0 10px;
  }
`

export const ContentRegion = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: column;
  position: relative;

  ${media.minXs`width: 100%; margin: 0;`}
  ${p =>
    media.minSm`width: 74.33333%; max-width: ${p.size}px; flex-basis: 74.33333%; margin: auto;`}
`
