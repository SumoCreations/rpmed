import React from 'react'
import { Primary, PrimaryProps } from './Primary'

export const PrimaryInverted: React.FC<PrimaryProps> = (props) => {
  return <Primary {...props} colorClassNames="bg-transparent text-primary" />
}
