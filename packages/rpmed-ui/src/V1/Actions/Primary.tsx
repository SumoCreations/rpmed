import clsx from 'clsx'
import React from 'react'
import { Styleable } from '../types'

const style = {
  button:
    'rounded-full text-sm w-8 h-8 cursor-pointer my-auto mx-0 text-center',
  background: 'bg-button text-white',
}

export interface PrimaryProps extends Styleable {
  colorClassNames?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Primary: React.FC<PrimaryProps> = ({
  className,
  colorClassNames,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        style.button,
        colorClassNames ?? style.background
      )}
    />
  )
}
