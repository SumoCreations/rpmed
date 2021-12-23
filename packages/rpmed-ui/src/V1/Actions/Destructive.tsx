import React from 'react'
import { Primary, PrimaryProps } from './Primary'

export const Destructive: React.FC<PrimaryProps> = (props) => {
  return <Primary {...props} colorClassNames="bg-destructive text-white" />
}
