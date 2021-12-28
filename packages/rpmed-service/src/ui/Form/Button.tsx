import * as React from 'react'
import styled from '../styled-components'

const ButtonGroupContainer = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  flex-grow: 1;
`

const ButtonGroupItem = styled.li`
  list-style: none;
  display: flex;
  flex-grow: 1;
  padding: 0;
  margin: 0;

  & + & {
    margin-left: 0.5rem;
  }
`

export const ButtonGroup: React.FunctionComponent<{}> = ({ children }) => (
  <ButtonGroupContainer>
    {React.Children.map(children, c => (
      <ButtonGroupItem>{c} </ButtonGroupItem>
    ))}
  </ButtonGroupContainer>
)

export const Button = styled.button<{ destructive?: boolean }>`
  background: ${(p: any) =>
    p.destructive
      ? p.theme.colorButtonDestructive
      : p.theme.colorButtonPrimary};
  border-radius: ${(p: any) => p.theme.borderRadius};
  border: 0;
  font-family: ${(p: any) => p.theme.fontFamilyBody};
  font-weight: bold;
  font-size: 16px;
  color: ${(p: any) => p.theme.colorNavigationTextPrimary};
  text-align: center;
  width: auto;
  padding: 8px 12px;
  flex-grow: 1;
  display: flex;
  align-items: center;

  & > span {
    display: block;
    margin: auto;
  }

  &:disabled {
    opacity: 0.5;
  }
`
