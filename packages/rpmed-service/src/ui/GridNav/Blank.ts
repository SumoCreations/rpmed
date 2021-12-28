import { media } from '../media'
import styled from '../styled-components'

const Blank = styled.li`
  display: flex;
  flex-grow: 0;
  flex-direction: row;
  padding: 12px;
  margin: 0 auto 6px 0;
  max-width: 100%;
  display: none;

  ${media.minXs`width: 100%;`}
  ${media.minSm`width: 49.33333%; flex-basis: 49.33333%;`}
  ${media.minLg`display: block; width: 32.33333%; flex-basis: 32.33333%;`}
`

export default Blank
