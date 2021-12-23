import * as React from 'react'
import { useDestroyProductSymptomMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyProductSymptomButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyProductSymptom] = useDestroyProductSymptomMutation()
  const handleClick = () => destroyProductSymptom({ variables: { id } })
  return children(handleClick)
}
