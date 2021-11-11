import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import { Label, RequiredIcon } from '../Form'
import { Error } from './Error'
import { FieldContainer, InputWrapper } from './FieldContainer'
import { Icon } from './Icon'

interface IFieldProps {
  label?: string
  name: string
  required?: boolean
  error?: string
  icon?: IconDefinition
}

/**
 * A simple non-context based field renderer for use with Formik
 * when utilizing the Hooks API. Most fields will be migrated to
 * this format as it's much easier to maintain and understand.
 *
 * @param props Configuration for this component.
 */
export const Field: React.FC<IFieldProps> = ({
  children,
  error,
  icon,
  label,
  name,
  required,
}) => {
  return (
    <FieldContainer>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <RequiredIcon />}
        </Label>
      )}
      <InputWrapper>
        {children}
        {icon ? <Icon icon={icon} /> : <span />}
      </InputWrapper>
      {error ? <Error>{error}</Error> : null}
    </FieldContainer>
  )
}
