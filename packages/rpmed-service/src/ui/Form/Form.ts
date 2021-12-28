import styled from '../styled-components'

const Form = styled.form<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${(p: any) => (p.disabled ? 0.5 : 1)};
  pointer-events: ${(p: any) => (p.disabled ? 'none' : 'all')};
`

export default Form
