import styled from '../styled-components'

export const TextArea = styled.textarea<{ minHeightLines?: number }>`
  display: flex;
  border: 1px solid ${p => p.theme.colorContentAreaBorder};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.inputTextSize};
  padding: ${p => p.theme.inputPadding};
  flex-grow: 1;
  width: auto;
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  max-width: 100%;
  min-height: ${p => (p.minHeightLines || 3) * 2}em;
`
