import styled from '../styled-components'

export const Error = styled.span`
  display: flex;
  color: ${p => p.theme.colorBodyTextInverted};
  font-size: 11px;
  font-weight: bold;
  padding: 0.25em 1rem;
  position: absolute;
  top: 100%;
  margin-top: -0.35rem;
  right: 1rem;
  background: ${p => p.theme.colorErrorText};
  border-radius: ${p => p.theme.borderRadius};
  z-index: 1;
`
