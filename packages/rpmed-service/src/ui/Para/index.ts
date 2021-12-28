import styled from '../styled-components'

export const Book = styled.p`
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  margin-bottom: 1.4em;
  font-size: 1rem;
  line-height: 1.55;
  padding: 0;
  font-weight: 400;
  font-style: normal;
  max-width: 60rem;
`

export const Light = styled.p`
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  margin-bottom: 1.4em;
  font-size: 1rem;
  line-height: 1.55;
  padding: 0;
  font-weight: 200;
  font-style: normal;
  max-width: 60rem;
`
