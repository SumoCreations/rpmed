import * as React from 'react'
import { useDestroyPageMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyPageButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyPage] = useDestroyPageMutation()
  const handleClick = () => destroyPage({ variables: { id } })
  return children(handleClick)
}
