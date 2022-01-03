import * as React from 'react'
import { useDestroyDistributorMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyDistributorButton: React.FC<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyDistributor] = useDestroyDistributorMutation()
  const handleClick = () => destroyDistributor({ variables: { id } })
  return children(handleClick)
}
