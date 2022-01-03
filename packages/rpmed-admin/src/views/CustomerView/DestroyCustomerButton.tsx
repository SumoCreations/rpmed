import * as React from 'react'
import { useDestroyCustomerMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyCustomerButton: React.FC<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyCustomer] = useDestroyCustomerMutation()
  const handleClick = () =>
    destroyCustomer({
      variables: { id },
    })
  return children(handleClick)
}
