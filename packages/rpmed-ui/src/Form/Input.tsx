import React from "react"
import { concatStyles } from "utils"

export type InputType =
  | "text"
  | "password"
  | "hidden"
  | "search"
  | "date"
  | "number"

export interface InputProps {
  name: string
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  error?: string
  disabled?: boolean
  type?: InputType
  min?: string | number
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  autoComplete?: boolean
  value?: string
}

const INPUT_STYLE =
  "font-body border rounded p-2 flex flex-grow max-w-full focus:outline-none focus:border-actionable"

const getErrorStyles = (error?: string) =>
  error ? "border-error text-error" : ""
const getDisabledStyles = (disabled?: boolean) =>
  disabled ? "opacity-50 cursor-not-allowed" : ""

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      autoComplete,
      name,
      error,
      type = "text",
      disabled,
      className,
      placeholder,
      style,
      min,
      onBlur,
      onChange,
      onFocus,
      onKeyUp,
      onKeyDown,
      value,
    },
    forwardedRef
  ) => {
    const controlledValues = value ? { value } : {}
    if (onChange) {
      console.log("onChange", onChange, name)
    }
    return (
      <input
        name={name}
        ref={forwardedRef}
        className={concatStyles([
          INPUT_STYLE,
          getErrorStyles(error),
          getDisabledStyles(disabled),
          className,
        ])}
        type={type}
        min={min}
        disabled={disabled}
        placeholder={placeholder}
        style={style}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        autoComplete={autoComplete ? "on" : "off"}
        {...controlledValues}
      />
    )
  }
)

Input.displayName = "Form.Input"
