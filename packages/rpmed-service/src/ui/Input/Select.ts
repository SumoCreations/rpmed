import styled from '../styled-components'

export const Select = styled.select`
  display: flex;
  border: 1px solid ${(p: any) => p.theme.colorContentAreaBorder};
  border-radius: ${(p: any) => p.theme.borderRadius};
  font-size: 16px;
  padding: 8px;
  flex-grow: 1;
  width: auto;
`
