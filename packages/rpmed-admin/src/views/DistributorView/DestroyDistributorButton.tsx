import * as React from 'react'
import { useDestroyDistributor } from './graphql'

type DestroyClickHandler = () => Promise<any>

export const DestroyDistributorButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const destroyDistributor = useDestroyDistributor()
  const handleClick = () => destroyDistributor({ variables: { id } })
  return children(handleClick)
}
