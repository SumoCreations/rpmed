import styled from '../styled-components'

const PrimaryLink = styled.a`
  color: ${p => p.theme.colorNavigationTextPrimary};
  display: flex;

  &:hover {
    color: ${p => p.theme.colorNavigationTextPrimary};
  }
`

export default PrimaryLink
