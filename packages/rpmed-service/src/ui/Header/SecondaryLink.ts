import styled from '../styled-components'

const SecondaryLink = styled.a`
  color: ${(p: any) => p.theme.colorNavigationTextPrimary};
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: normal;
  font-family: ${(p: any) => p.theme.fontFamilyBody};

  &:hover {
    color: ${(p: any) => p.theme.colorNavigationTextPrimary};
  }
`

export default SecondaryLink
