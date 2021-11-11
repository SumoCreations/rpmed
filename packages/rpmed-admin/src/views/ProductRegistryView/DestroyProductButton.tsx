import * as React from 'react'
import { useDestroyProduct } from './graphql'

type DestroyClickHandler = () => Promise<any>

export const DestroyProductButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const destroyProduct = useDestroyProduct()
  const handleClick = () => destroyProduct({ variables: { id } })
  return children(handleClick)
}
