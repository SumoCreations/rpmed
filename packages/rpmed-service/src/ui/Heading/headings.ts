import { media } from '../media'
import styled from '../styled-components'

export const One = styled.h1`
  font-size: 2.4rem;
  font-family: ${(p: any) => p.theme.fontFamilyHeader};
  font-weight: 400;
  line-height: 1;
  margin-bottom: 0.25em;

  ${media.minSm`font-size: 3rem;`}
`

export const Two = styled.h2`
  font-size: 2.2rem;
  line-height: 1.25;
  font-family: ${(p: any) => p.theme.fontFamilyHeader};
  font-weight: 400;
  margin: 0 1em;

  ${media.minSm`font-size: 2.4rem;`}
`

export const Three = styled.h3`
  font-family: ${(p: any) => p.theme.fontFamilyHeader};
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;

  ${media.minSm`font-size: 2.2rem;`}
`

export const Four = styled.h4`
  margin-top: 3.2rem;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 2.4rem;
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  text-transform: uppercase;
  letter-spacing: 0.1rem;

  ${media.minSm`font-size: 1.6rem;`}
`

export const ToolBarOne = styled.h2`
  margin-top: 0;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1em;
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  text-transform: uppercase;
  color: ${(p: any) => p.theme.colorPrimary};
`

export const ToolBarTwo = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1em;
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  text-transform: uppercase;
  color: ${(p: any) => p.theme.colorPrimary};
`

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.25rem;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.15em;
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  text-transform: uppercase;
  color: ${(p: any) => p.theme.colorPrimary};
`

export const Section = styled.h3`
  margin-top: 0;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.15em;
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  text-transform: uppercase;
  color: ${(p: any) => p.theme.colorPrimary};
`

export const Label = styled.h4`
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.15em;
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  text-transform: uppercase;
  color: ${(p: any) => p.theme.colorPrimary};
`
