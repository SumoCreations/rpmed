import * as React from 'react'
import { useDestroyModelNumber } from './graphql'

type DestroyClickHandler = () => Promise<any>

export const DestroyModelNumberButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
  productId: string | null
  productType: string | null
}> = ({ id, children, productType, productId }) => {
  const destroyModelNumber = useDestroyModelNumber({
    productId,
    productType,
  })
  const handleClick = () => destroyModelNumber({ variables: { id } })
  return children(handleClick)
}
