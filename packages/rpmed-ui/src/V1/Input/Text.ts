import styled from '../styled-components'

export const Text = styled.input<{ hasIcon?: boolean }>`
  display: flex;
  border: 1px solid ${p => p.theme.colorContentAreaBorder};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.inputTextSize};
  padding: ${p =>
    p.hasIcon ? p.theme.inputPaddingForIcon : p.theme.inputPadding};
  flex-grow: 1;
  width: auto;
  max-width: 100%;
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  outline-color: ${p => p.theme.colorButtonPrimary};
`
