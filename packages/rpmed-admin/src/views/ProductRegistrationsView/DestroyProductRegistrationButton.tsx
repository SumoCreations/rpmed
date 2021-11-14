import * as React from 'react'
import { useDestroyProductRegistrationMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyProductRegistrationButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyProductRegistration, _] = useDestroyProductRegistrationMutation()
  const handleClick = () => destroyProductRegistration({ variables: { id } })
  return children(handleClick)
}
