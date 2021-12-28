import { media } from '../media'
import styled from '../styled-components'

const GridItem = styled.li<{ selected?: boolean }>`
  background: ${(p: any) => p.theme.colorContentAreaBackground};
  border: ${(p: any) => (p.selected ? 2 : 1)}px solid ${(p: any) =>
  p.selected
    ? p.theme.colorContentAreaBorderSelected
    : p.theme.colorContentAreaBorder};
  border-radius: ${(p: any) => p.theme.borderRadius};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  padding: 12px;
  margin: 0 6px 6px 0;
  max-width: 100%;
  transition: transform 0.2s ease-out, box-shadow 0.3s ease-out;
  position: relative;

  &:last-child {
    margin-right: auto;

  ${media.minSm`max-width: 49.333333%;`}
  ${media.minLg`max-width: 32.333333%;`}
  }

  &:hover {
    transform: translate3d(0,-2px, 0);
    box-shadow: 0 3px 2px ${(p: any) => p.theme.colorContentAreaBorder};
  }

  ${media.minXs`width: 100%;`}
  ${media.minSm`max-width: 49.333333%; flex-basis: 49.333333%;`}
  ${media.minLg`max-width: 32.333333%; flex-basis: 32.333333%;`}
`
export default GridItem
