import styled from '../styled-components'

export const Primary = styled.button`
  color: ${(p: any) => p.theme.colorBodyTextInverted};
  cursor: pointer;
  border: 0;
  border-radius: 1rem;
  background: ${(p: any) => p.theme.colorButtonPrimary};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
  margin: auto 0;
`

export const Destructive = styled(Primary)`
  background: ${(p: any) => p.theme.colorButtonDestructive};
`

export const PrimaryInverted = styled(Primary)`
  background: transparent;
  color: ${(p: any) => p.theme.colorButtonPrimary};
  font-size: 1rem;
`

export const DestructiveInverted = styled(PrimaryInverted)`
  background: transparent;
  color: ${(p: any) => p.theme.colorButtonDestructive};
`

export const Toolbar = styled(PrimaryInverted)`
  font-size: 1rem;
  border: 2px solid ${(p: any) => p.theme.colorPrimary};
  color: ${(p: any) => p.theme.colorPrimary};
  border-radius: 1.25rem;
  padding: 0.25rem 0.6rem;
  min-width: 2.25rem;
  min-height: 2.25rem;
`
