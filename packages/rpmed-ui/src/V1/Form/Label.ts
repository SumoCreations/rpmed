import styled from '../styled-components'

const Label = styled.label`
  display: flex;
  color: ${p => p.theme.colorBodyText};
  font-family: ${p => p.theme.fontFamilyBody};
  padding: 0 0 4px 0;
  margin: 0;
  font-size: ${p => p.theme.inputTextSize};
  flex-grow: 0;
  flex-direction: row;
`

export default Label
