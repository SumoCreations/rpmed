import React from 'react'
import { Field, FieldProps, getErrorMessage } from './Field'
import { Select, SelectProps } from './Select'

const FIELD_LABEL_STYLES: string = 'capitalize font-semibold text-base mb-1'

export type SelectFieldProps = SelectProps & FieldProps

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(
  (
    {
      id,
      label,
      name,
      value,
      options,
      onChange,
      onSelect,
      placeholder,
      style,
      className,
      disabled,
      errorMessage,
      errors,
      ...filedProps
    },
    ref
  ) => {
    const determinedErrorMessage = getErrorMessage({
      name,
      errorMessage,
      errors,
    })

    return (
      <Field
        name={name}
        label={label}
        className={className}
        labelClassName={FIELD_LABEL_STYLES}
        style={style}
        errorMessage={determinedErrorMessage}
        {...filedProps}
      >
        <Select
          ref={ref}
          id={id}
          name={name}
          value={value}
          options={options}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          onSelect={onSelect}
        />
      </Field>
    )
  }
)
