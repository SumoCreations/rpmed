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

export type ForgotFormValues = {
  email: string
}

const schema = yup.object().shape({
  email: yup.string().email().required('cannot be blank'),
})

export interface ForgotFormProps extends FormProps<ForgotFormValues> {
  loading?: boolean
}

export const ForgotForm: React.FC<ForgotFormProps> = ({
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
  } = useForm<ForgotFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  useDefaultValueListener<ForgotFormValues>(defaultValues, reset)

  const handleFormSubmit = handleSubmit(async (data) => {
    const { errors = {} } = (await externalSubmitHandler(data)) ?? {}
    const keys = Object.keys(errors)
    if (keys.length) {
      keys.map((key) =>
        setError(camelCase(key) as keyof ForgotFormValues, {
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
          name="email"
          label="Email Address"
          placeholder="email@example.com"
          type="text"
          className="w-full"
        />
      </Fields>
      <ErrorList errors={formErrors as ErrorMap} />
      <Button type="submit" className="mt-2 w-full">
        {submitTitle ?? 'Request Password Reset'}
      </Button>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  )
}
