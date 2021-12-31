import clsx from 'clsx'
import * as React from 'react'

export const ButtonGroup: React.FC<{}> = ({ children }) => (
  <ul className="flex flex-grow">
    {React.Children.map(children, (c) => (
      <li className="ml-2 first:ml-0 flex">{c} </li>
    ))}
  </ul>
)

interface Props {
  destructive?: boolean
  disabled?: boolean
}

export type ButtonProps = Props & React.HTMLProps<HTMLButtonElement>

const BUTTON_STYLES =
  'rounded font-bold font-body text-white w-full text-center flex flex-grow align-center justify-center p-2'

export const Button: React.FC<ButtonProps> = ({
  children,
  destructive,
  disabled,
  ...props
}) => (
  <button
    {...(props as any)}
    className={clsx(
      destructive ? 'bg-destructive' : 'bg-button',
      disabled && 'opacity-50',
      BUTTON_STYLES
    )}
  >
    {React.Children.map(children, (child) => (
      <span className="block m-auto">{child}</span>
    ))}
  </button>
)
