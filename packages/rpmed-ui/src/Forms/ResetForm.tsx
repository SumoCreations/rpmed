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

export type ResetFormValues = {
  password: string
  passwordConfirm: string
}

const schema = yup.object().shape({
  password: yup.string().min(7).required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export interface ResetFormProps extends FormProps<ResetFormValues> {
  loading?: boolean
}

export const ResetForm: React.FC<ResetFormProps> = ({
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
  } = useForm<ResetFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  useDefaultValueListener<ResetFormValues>(defaultValues, reset)

  const handleFormSubmit = handleSubmit(async (data) => {
    const { errors = {} } = (await externalSubmitHandler(data)) ?? {}
    const keys = Object.keys(errors)
    if (keys.length) {
      keys.map((key) =>
        setError(camelCase(key) as keyof ResetFormValues, {
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
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          className="w-full"
        />
        <TextField
          name="passwordConfirm"
          label="Confirm Password"
          placeholder="Retype Password"
          type="password"
          className="w-full"
        />
      </Fields>
      <ErrorList errors={formErrors as ErrorMap} />
      <Button type="submit" className="mt-2 w-full">
        {submitTitle ?? 'Reset Password'}
      </Button>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  )
}
