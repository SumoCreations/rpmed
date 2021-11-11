import * as React from 'react'
import { useDestroyCustomer } from './graphql'

type DestroyClickHandler = () => Promise<any>

export const DestroyCustomerButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const destroyCustomer = useDestroyCustomer()
  const handleClick = () =>
    destroyCustomer({
      variables: { id },
    })
  return children(handleClick)
}
