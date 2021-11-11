import { media } from '../media'
import styled from '../styled-components'

const COLLUMN_COUNT = 16

const calculateSpan = (span: number) =>
  (100.0 / COLLUMN_COUNT) * Math.min(span, COLLUMN_COUNT)

export const Col = styled.div<{ span: number; push?: number; pull?: number }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 0.5rem;

  ${media.minSm`max-width: 100%; margin-left: 0; margin-right: 0; width: 100%; flex-basis: 100%;`}
  ${p => media.minMd`
    flex-basis: ${calculateSpan(p.span)}%; 
    width: ${calculateSpan(p.span)}%; 
    max-width: ${calculateSpan(p.span)}%; 
    margin-left: ${calculateSpan(p.push || 0)}%; 
    margin-right: ${calculateSpan(p.pull || 0)}%;
  `}
`
