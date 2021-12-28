import styled from '../styled-components'

const Label = styled.label`
  display: flex;
  color: ${(p: any) => p.theme.colorBodyText};
  padding: 0 0 4px 0;
  margin: 0;
  font-size: 16px;
  flex-grow: 0;
  flex-direction: row;
`

export default Label
