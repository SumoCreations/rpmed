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
  background: ${p =>
    p.destructive
      ? p.theme.colorButtonDestructive
      : p.theme.colorButtonPrimary};
  border-radius: ${p => p.theme.borderRadius};
  border: 0;
  font-family: ${p => p.theme.fontFamilyBody};
  font-weight: bold;
  color: ${p => p.theme.colorNavigationTextPrimary};
  text-align: center;
  width: auto;
  font-size: ${p => p.theme.inputTextSize};
  padding: ${p => p.theme.buttonPadding};
  flex-grow: 1;
  display: flex;
  align-items: center;
  width: 100%;

  & > span {
    display: block;
    margin: auto;
  }

  &:disabled {
    opacity: 0.5;
  }
`
