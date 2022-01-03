import React from 'react'
import { Primary, PrimaryProps } from './Primary'

export const Toolbar: React.FC<PrimaryProps> = (props) => {
  return (
    <Primary
      {...props}
      className="border-2 bg-transparent rounded-full"
      colorClassNames="border-primary text-primary"
      style={{
        minWidth: '2.25rem',
        minHeight: '2.25rem',
      }}
    />
  )
}
