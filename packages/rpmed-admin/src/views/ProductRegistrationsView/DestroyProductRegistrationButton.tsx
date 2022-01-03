import * as React from 'react'
import { useDestroyProductRegistrationMutation } from 'rpmed-schema'

type DestroyClickHandler = () => Promise<any>

export const DestroyProductRegistrationButton: React.FC<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const [destroyProductRegistration] = useDestroyProductRegistrationMutation()
  const handleClick = () => destroyProductRegistration({ variables: { id } })
  return children(handleClick)
}
