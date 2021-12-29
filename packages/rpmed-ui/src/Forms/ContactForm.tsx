import React, { useEffect, useRef } from 'react'
import { Button, TextField, Fields } from '../Form'
import { AbsoluteOverlay } from '../Indicators'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  useDefaultValueListener,
  FormProps,
  ErrorMap,
} from '@sumocreations/forms'
import { camelCase } from 'lodash'
import { ErrorList } from '../Form/ErrorList'
import { TextAreaField } from '..'

export type ContactFormValues = {
  comments: string
  name: string
  email: string
  phoneNumber: string
  zipcode: string
}

const schema = yup.object({
  name: yup.string().required('cannot be blank'),
  email: yup.string().email().required('cannot be blank'),
  phoneNumber: yup.string().required('cannot be blank'),
  zipcode: yup.string().required('cannot be blank'),
  comments: yup.string(),
})

export interface ContactFormProps extends FormProps<ContactFormValues> {
  loading?: boolean
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit: externalSubmitHandler,
  loading,
  defaultValues,
  submitTitle,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    setError,
    reset,
  } = useForm<ContactFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  useDefaultValueListener<ContactFormValues>(defaultValues, reset)

  const handleFormSubmit = handleSubmit(async (data) => {
    const { errors = {} } = (await externalSubmitHandler(data)) ?? {}
    const keys = Object.keys(errors)
    if (keys.length) {
      keys.map((key) =>
        setError(camelCase(key) as keyof ContactFormValues, {
          message: errors[key],
        })
      )
    }
  })

  const field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    field.current?.focus()
  })

  return (
    <form onSubmit={handleFormSubmit} className="relative">
      <Fields register={register} errors={formErrors} grow className="pb-2">
        <TextField
          name="name"
          label="Name"
          placeholder="Full Name"
          ref={field}
          className="w-full"
        />
        <TextField
          name="email"
          label="Email Address"
          placeholder="address@example.com"
          ref={field}
          className="w-full"
        />
        <TextField
          name="zipcode"
          label="Zip Code"
          placeholder="Zip Code"
          className="w-1/4"
        />
        <TextField name="phoneNumber" label="Phone Number" className="w-full" />
        <TextAreaField
          name="comments"
          label="Comments"
          placeholder="optional"
          className="w-full"
        />
        <ErrorList errors={formErrors as ErrorMap} />
        <Button type="submit" className="mt-2 w-full">
          {submitTitle ?? 'Submit Request'}
        </Button>
      </Fields>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  )
}
