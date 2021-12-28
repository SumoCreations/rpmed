import { ErrorMessage, useField } from 'formik'
import * as React from 'react'
import { Label, RequiredIcon } from '../Form'
import { Autocomplete, IAutocompleteOption } from './Autocomplete'
import { Error } from './Error'
import { FieldContainer } from './FieldContainer'
import { Select } from './Select'
import { Text } from './Text'
import { TextArea } from './TextArea'

interface IFieldRendererProps {
  name: string
  placeholder?: string
  label?: string
  type?: string
  required?: boolean
  component?: RendererComponent
  handleAutocomplete?: () => IAutocompleteOption[]
  handleAutocompleteSelection?: (option: IAutocompleteOption) => void
}

export enum RendererComponent {
  Text,
  TextArea,
  Select,
}

const { useState } = React

export const Field: React.FC<IFieldRendererProps> = ({
  component,
  name,
  placeholder,
  required,
  label,
  children,
  handleAutocomplete,
  handleAutocompleteSelection,
  type,
}) => {
  const [focused, setFocused] = useState(false)
  const [field] = useField(name)

  const renderComponent = (componentType?: RendererComponent) => {
    switch (componentType) {
      case RendererComponent.Select:
        return <Select {...field}>{children}</Select>
      case RendererComponent.TextArea:
        return <TextArea {...field} placeholder={placeholder} />
      default:
        const onFocus: React.FocusEventHandler | undefined = handleAutocomplete
          ? _ => {
              setFocused(true)
            }
          : undefined
        const onBlur: React.FocusEventHandler = handleAutocomplete
          ? e => {
              setTimeout(() => setFocused(false), 150)
              field.onBlur(e)
            }
          : field.onBlur
        return (
          <Text
            {...field}
            autoComplete="off"
            placeholder={placeholder}
            type={type || 'text'}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        )
    }
  }

  return (
    <FieldContainer>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <RequiredIcon />}
        </Label>
      )}
      {renderComponent(component)}
      <ErrorMessage name={name} component={Error} />
      {handleAutocomplete && focused ? (
        <Autocomplete
          suggestions={handleAutocomplete()}
          onSelect={handleAutocompleteSelection}
        />
      ) : null}
    </FieldContainer>
  )
}
