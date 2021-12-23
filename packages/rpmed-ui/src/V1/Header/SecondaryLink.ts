import styled from '../styled-components'

const SecondaryLink = styled.a`
  color: ${p => p.theme.colorNavigationTextPrimary};
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: normal;
  font-family: ${p => p.theme.fontFamilyBody};

  &:hover {
    color: ${p => p.theme.colorNavigationTextPrimary};
  }
`

export default SecondaryLink
