import styled from '../styled-components'

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  min-height: 100%;
  background: ${p => p.theme.colorSecondary};
`
