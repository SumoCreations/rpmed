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

export type RegisterFormValues = {
  name: string
  email: string
  hospital: string
  phoneNumber: string
  zipcode: string
  modelNumber: string
  serial: string
  website: string
}

const schema = yup.object({
  comments: yup.string(),
  name: yup.string().required('cannot be blank'),
  email: yup.string().email().required('cannot be blank'),
  hospital: yup.string().required('cannot be blank'),
  phoneNumber: yup.string().required('cannot be blank'),
  modelNumber: yup.string().required('cannot be blank'),
  serial: yup.string().required('cannot be blank'),
  website: yup.string().url(),
})

export interface RegisterFormProps extends FormProps<RegisterFormValues> {
  loading?: boolean
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
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
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  useDefaultValueListener<RegisterFormValues>(defaultValues, reset)

  const handleFormSubmit = handleSubmit(async (data) => {
    const { errors = {} } = (await externalSubmitHandler(data)) ?? {}
    const keys = Object.keys(errors)
    if (keys.length) {
      keys.map((key) =>
        setError(camelCase(key) as keyof RegisterFormValues, {
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
          name="hospital"
          label="Hospital"
          placeholder="Hospital name"
          type="text"
          className="w-full"
        />
        <TextField name="phoneNumber" label="Phone Number" className="w-full" />
        <TextField name="modelNumber" label="Model Number" className="w-full" />
        <TextField name="serial" label="Serial Number" className="w-full" />
        <TextField name="website" label="Website" className="w-full" />
        <TextAreaField
          name="comments"
          label="Comments"
          placeholder="optional"
          className="w-full"
        />
        <ErrorList errors={formErrors as ErrorMap} />
      </Fields>
      <Button type="submit" className="mt-2 w-full">
        {submitTitle ?? 'Request Quote'}
      </Button>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  )
}
