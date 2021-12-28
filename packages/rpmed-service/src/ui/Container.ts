import { media } from './media'
import styled from './styled-components'

const Container = styled.div<{ direction?: string }>`
  display: flex;
  flex-grow: 1;
  flex-direction: ${(p: any) => p.direction || 'column'};
  ${media.minXs`max-width: 100%; margin: 0`}
  ${media.minSm`max-width: 100%; margin: 0`}
  ${media.minMd`max-width: 728px; margin: 0 auto;`}
  ${media.minLg`max-width: 962px; margin: 0 auto;`}
  ${media.minXl`max-width: 1170px; margin: 0 auto;`}
`
export default Container
