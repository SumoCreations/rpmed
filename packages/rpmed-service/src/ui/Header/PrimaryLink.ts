import styled from '../styled-components'

const PrimaryLink = styled.a`
  color: ${(p: any) => p.theme.colorNavigationTextPrimary};
  display: flex;

  &:hover {
    color: ${(p: any) => p.theme.colorNavigationTextPrimary};
  }
`

export default PrimaryLink
