import * as React from 'react'
import { useDestroyProductSymptom } from './graphql'

type DestroyClickHandler = () => Promise<any>

export const DestroyProductSymptomButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const destroyProductSymptom = useDestroyProductSymptom()
  const handleClick = () => destroyProductSymptom({ variables: { id } })
  return children(handleClick)
}
