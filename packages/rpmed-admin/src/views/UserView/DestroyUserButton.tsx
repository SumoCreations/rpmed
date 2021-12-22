import * as React from 'react'
import { useDestroyUserMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyUserButton: React.FC<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyUser] = useDestroyUserMutation()
  const handleClick = () => destroyUser({ variables: { id } })
  return children(handleClick)
}
