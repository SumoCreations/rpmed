import { media } from '../media'
import styled from '../styled-components'

const GridItem = styled.li<{ selected?: boolean }>`
  background: ${p => p.theme.colorContentAreaBackground};
  border: ${p => (p.selected ? 2 : 1)}px solid ${p =>
  p.selected
    ? p.theme.colorContentAreaBorderSelected
    : p.theme.colorContentAreaBorder};
  border-radius: ${p => p.theme.borderRadius};
  cursor: pointer;
  display: flex;
  flex-grow: 0;
  flex-direction: row;
  padding: 12px;
  margin: 0 auto 6px 0;
  max-width: 100%;
  transition: transform 0.2s ease-out, box-shadow 0.3s ease-out;
  position: relative;

  &:hover {
    transform: translate3d(0,-2px, 0);
    box-shadow: 0 3px 2px ${p => p.theme.colorContentAreaBorder};
  }

  ${media.minXs`width: 100%;`}
  ${media.minSm`width: 49.33333%; flex-basis: 49.33333%;`}
  ${media.minLg`width: 32.33333%; flex-basis: 32.33333%;`}
`
export default GridItem
