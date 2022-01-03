import React from 'react'
import { Primary, PrimaryProps } from './Primary'

export const DestructiveInverted: React.FC<PrimaryProps> = (props) => {
  return (
    <Primary {...props} colorClassNames="bg-transparent text-destructive" />
  )
}
