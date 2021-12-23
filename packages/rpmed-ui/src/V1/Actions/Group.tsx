import * as React from 'react'

export const Group: React.FunctionComponent = ({ children }) => (
  <ul className="m-0 flex p-0 justify-end">
    {React.Children.map(children, (child) => (
      <li className="flex p-0 mx-1">{child}</li>
    ))}
  </ul>
)
