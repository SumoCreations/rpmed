import styled, { remCalc } from '../styled-components'

export const Small = styled.p`
  margin: 0.25rem 0;
  font-size: ${remCalc(12)};
  color: ${(p: any) => p.theme.colorBodyText};
`
