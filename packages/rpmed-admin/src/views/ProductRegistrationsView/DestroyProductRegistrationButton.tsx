import * as React from 'react'
import { useDestroyProductRegistration } from './graphql'

type DestroyClickHandler = () => Promise<any>

export const DestroyProductRegistrationButton: React.FunctionComponent<{
  id: string
  children: (onClick: DestroyClickHandler) => JSX.Element
}> = ({ id, children }) => {
  const destroyProductRegistration = useDestroyProductRegistration()
  const handleClick = () => destroyProductRegistration({ variables: { id } })
  return children(handleClick)
}
