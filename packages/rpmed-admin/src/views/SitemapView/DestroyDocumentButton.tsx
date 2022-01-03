import * as React from 'react'
import { useDestroyDocumentMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyDocumentButton: React.FC<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyDocument] = useDestroyDocumentMutation()
  const handleClick = () => destroyDocument({ variables: { id } })
  return children(handleClick)
}
