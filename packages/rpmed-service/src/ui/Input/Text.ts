import styled from '../styled-components'

export const Text = styled.input`
  display: flex;
  border: 1px solid ${(p: any) => p.theme.colorContentAreaBorder};
  border-radius: ${(p: any) => p.theme.borderRadius};
  font-size: ${(p: any) => p.theme.inputTextSize};
  padding: ${(p: any) => p.theme.inputPadding};
  flex-grow: 1;
  width: auto;
  max-width: 100%;
  opacity: ${(p: any) => (p.disabled ? 0.5 : 1)};
  outline-color: ${(p: any) => p.theme.colorButtonPrimary};
`
