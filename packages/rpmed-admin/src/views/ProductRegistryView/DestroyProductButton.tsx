import * as React from 'react'
import { useDestroyProductMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyProductButton: React.FC<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyProduct] = useDestroyProductMutation()
  const handleClick = () => destroyProduct({ variables: { id } })
  return children(handleClick)
}
