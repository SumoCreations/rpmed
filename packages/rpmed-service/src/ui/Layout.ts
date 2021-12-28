import styled from './styled-components'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  min-height: 100%;
  background: ${(p: any) => p.theme.colorSecondary};
`

export default Layout
