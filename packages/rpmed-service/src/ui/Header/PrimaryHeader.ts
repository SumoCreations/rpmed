import styled from '../styled-components'

const PrimaryHeader = styled.header`
  background: ${(p: any) => p.theme.colorPrimary};
  display: flex;
  flex-direction: row;
`

export default PrimaryHeader
