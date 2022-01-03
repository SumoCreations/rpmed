import styled from '../styled-components'

export const Select = styled.select`
  display: flex;
  border: 1px solid ${p => p.theme.colorContentAreaBorder};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.inputTextSize};
  padding: ${p => p.theme.inputPadding};
  flex-grow: 1;
  width: auto;
  max-width: 100%;
`
