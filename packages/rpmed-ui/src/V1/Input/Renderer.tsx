import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { ErrorMessage, Field as FormikField, FieldProps } from 'formik'
import * as React from 'react'
import { Label, RequiredIcon } from '../Form'
import { Autocomplete, IAutocompleteOption } from './Autocomplete'
import { Error } from './Error'
import { FieldContainer, InputWrapper } from './FieldContainer'
import { Icon } from './Icon'
import { Select } from './Select'
import { Text } from './Text'
import { TextArea } from './TextArea'

interface IIndexed {
  [key: string]: any
}

interface IRendererProps {
  name: string
  nameForError?: string
  disabled?: boolean
  placeholder?: string
  label?: string
  type?: string
  icon?: IconDefinition
  required?: boolean
  component?: RendererComponent
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
  customAutocompleteRenderer?: () => JSX.Element
  handleAutocomplete?: () => IAutocompleteOption[]
  handleAutocompleteSelection?: (option: IAutocompleteOption) => void
}

export enum RendererComponent {
  Text,
  TextArea,
  Select,
}

const { useState } = React

export function Renderer<T extends IIndexed>(): React.FC<IRendererProps> {
  const GeneratedRendererComponent: React.FC<IRendererProps> = ({
    component,
    disabled,
    name,
    placeholder,
    required,
    icon,
    label,
    children,
    customAutocompleteRenderer,
    handleAutocomplete,
    handleAutocompleteSelection,
    type,
    ...wrapperProps
  }) => {
    const [focused, setFocused] = useState(false)
    const renderComponent = (
      props: FieldProps<T>,
      componentType?: RendererComponent
    ) => {
      switch (componentType) {
        case RendererComponent.Select:
          return (
            <Select {...props.field} value={props.field.value as any}>
              {children}
            </Select>
          )
        case RendererComponent.TextArea:
          return (
            <TextArea
              {...props.field}
              disabled={disabled}
              value={props.field.value as any}
              placeholder={placeholder}
              minHeightLines={4}
            />
          )
        default:
          const onFocus: React.FocusEventHandler | undefined =
            handleAutocomplete ||
            customAutocompleteRenderer ||
            wrapperProps.onFocus
              ? e => {
                  setFocused(true)
                  if (wrapperProps.onFocus) {
                    wrapperProps.onFocus(e)
                  }
                }
              : undefined
          const onBlur: React.FocusEventHandler =
            handleAutocomplete ||
            customAutocompleteRenderer ||
            wrapperProps.onBlur
              ? e => {
                  setTimeout(() => {
                    setFocused(false)
                    if (wrapperProps.onBlur) {
                      wrapperProps.onBlur(e)
                    }
                  }, 150)
                  props.field.onBlur(e)
                }
              : props.field.onBlur
          return (
            <InputWrapper>
              <Text
                {...props.field}
                value={(props.field.value as any) || ''}
                autoComplete="off"
                disabled={disabled}
                placeholder={placeholder}
                type={type || 'text'}
                onBlur={onBlur}
                onFocus={onFocus}
                hasIcon={icon ? true : false}
              />
              {icon ? <Icon icon={icon} /> : <span />}
            </InputWrapper>
          )
      }
    }

    const renderField = (props: FieldProps<T>) => (
      <FieldContainer>
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <RequiredIcon />}
          </Label>
        )}
        {renderComponent(props, component)}
        <ErrorMessage
          name={wrapperProps.nameForError || name}
          component={Error}
        />
        {handleAutocomplete && focused ? (
          <Autocomplete
            suggestions={handleAutocomplete()}
            onSelect={handleAutocompleteSelection}
          />
        ) : null}
        {customAutocompleteRenderer && focused
          ? customAutocompleteRenderer()
          : null}
      </FieldContainer>
    )

    return <FormikField name={name} render={renderField} />
  }
  return GeneratedRendererComponent
}
