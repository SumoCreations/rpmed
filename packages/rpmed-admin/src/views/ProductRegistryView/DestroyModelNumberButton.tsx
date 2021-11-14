import * as React from 'react'
import { useDestroyModelNumberMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyModelNumberButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
  productId: string | null
  productType: string | null
}> = ({ id, children, productType, productId }) => {
  const [destroyModelNumber, _] = useDestroyModelNumberMutation({
    variables: {
      id: productId ?? ''
    }
  })
  const handleClick = () => destroyModelNumber({ variables: { id } })
  return children(handleClick)
}
