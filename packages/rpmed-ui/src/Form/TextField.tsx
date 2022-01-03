import React from "react"
import { Field, FieldProps, getErrorMessage } from "./Field"
import { Input, InputType } from "./Input"
import { MaskFormat, MaskedInput } from "./MaskedInput"

export interface TextFieldInputProps {
  placeholder?: string
  disabled?: boolean
  value?: string
  type?: InputType
  format?: MaskFormat
  min?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  children?: React.ReactNode
}

export type TextFieldProps = TextFieldInputProps & FieldProps

const getPaddingForField = (hasIcon?: boolean, searchField?: boolean) =>
  hasIcon ? (searchField ? "pl-8" : "pr-8") : ""

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      placeholder,
      className,
      style,
      disabled,
      type,
      errorMessage,
      errors,
      format,
      min,
      onChange,
      onBlur,
      onFocus,
      value,
      children,
      ...fieldProps
    },
    forwardedRef
  ) => {
    const determinedErrorMessage = getErrorMessage({
      name,
      errorMessage,
      errors,
    })
    const searchField = type === "search"
    const hasIcon = typeof fieldProps.icon !== "undefined"
    return (
      <Field
        name={name}
        className={className}
        style={style}
        errorMessage={determinedErrorMessage}
        searchField={searchField}
        {...fieldProps}
      >
        {format ? (
          <MaskedInput
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            error={determinedErrorMessage}
            type={type}
            ref={forwardedRef}
            format={format}
            className={getPaddingForField(hasIcon, searchField)}
          />
        ) : (
          <Input
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            error={determinedErrorMessage}
            type={type}
            ref={forwardedRef}
            min={min}
            className={getPaddingForField(hasIcon, searchField)}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            {...{ value }}
          />
        )}
        {children}
      </Field>
    )
  }
)

TextField.displayName = "Form.TextField"
