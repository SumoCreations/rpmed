import styled from '../styled-components'

export const TextArea = styled.textarea`
  display: flex;
  border: 1px solid ${(p: any) => p.theme.colorContentAreaBorder};
  border-radius: ${(p: any) => p.theme.borderRadius};
  font-size: ${(p: any) => p.theme.inputTextSize};
  padding: ${(p: any) => p.theme.inputPadding};
  flex-grow: 1;
  width: auto;
  opacity: ${(p: any) => (p.disabled ? 0.5 : 1)};
  max-width: 100%;
`
