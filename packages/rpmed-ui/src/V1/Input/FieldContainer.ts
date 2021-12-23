import styled from '../styled-components'

export const FieldContainer = styled.div<{ margin?: string }>`
  margin: ${p => p.margin || p.theme.inputFieldMargin};
  max-width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`

export const InputWrapper = styled.div<{ sticky?: boolean }>`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  margin-bottom: auto;
  max-width: 100%;
  position: ${p => (p.sticky ? 'sticky' : 'relative')};
  top: ${p => (p.sticky ? '2px' : 'auto')};
  z-index: ${p => (p.sticky ? 2 : 'auto')};
`
