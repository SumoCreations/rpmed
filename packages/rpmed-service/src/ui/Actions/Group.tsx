import * as React from 'react'
import styled from '../styled-components'

export const GroupView = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  padding: 0;
  justify-content: flex-end;
`

export const Item = styled.div`
  display: flex;
  margin: 0 0.1rem;
  padding: 0;
`

export const Group: React.FunctionComponent = ({ children }) => (
  <GroupView>
    {React.Children.map(children, child => (
      <Item>{child}</Item>
    ))}
  </GroupView>
)
