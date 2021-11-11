import * as React from 'react'
import { useDestroyUser } from './graphql'

type DestroyClickHandler = () => Promise<any>

export const DestroyUserButton: React.FC<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const destroyUser = useDestroyUser()
  const handleClick = () => destroyUser({ variables: { id } })
  return children(handleClick)
}
