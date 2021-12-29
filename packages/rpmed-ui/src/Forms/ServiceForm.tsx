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

export type ServiceFormValues = {
  address: string
  address2: string
  city: string
  comments: string
  country: string
  name: string
  email: string
  hospital: string
  phoneNumber: string
  state: string
  zipcode: string
  website: string
}

const schema = yup.object({
  address: yup.string().required('cannot be blank'),
  address2: yup.string(),
  city: yup.string().required('cannot be blank'),
  comments: yup.string(),
  country: yup.string().required('cannot be blank'),
  name: yup.string().required('cannot be blank'),
  email: yup.string().email().required('cannot be blank'),
  hospital: yup.string().required('cannot be blank'),
  phoneNumber: yup.string().required('cannot be blank'),
  state: yup.string().required('cannot be blank'),
  zipcode: yup.string().required('cannot be blank'),
  website: yup.string().url(),
})

export interface ServiceFormProps extends FormProps<ServiceFormValues> {
  loading?: boolean
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
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
  } = useForm<ServiceFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  useDefaultValueListener<ServiceFormValues>(defaultValues, reset)

  const handleFormSubmit = handleSubmit(async (data) => {
    const { errors = {} } = (await externalSubmitHandler(data)) ?? {}
    const keys = Object.keys(errors)
    if (keys.length) {
      keys.map((key) =>
        setError(camelCase(key) as keyof ServiceFormValues, {
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
        <TextField
          name="address"
          label="Address"
          placeholder="Street Address"
          className="w-full"
        />
        <TextField
          name="address2"
          label="Address Line 2"
          placeholder="(optional)"
          className="w-full"
        />
        <Fields register={register} nested grow>
          <TextField
            name="city"
            label="City"
            placeholder="City name"
            className="w-full"
          />
          <TextField
            name="state"
            label="State"
            placeholder="State"
            className="w-full"
          />
        </Fields>
        <Fields register={register} nested grow>
          <TextField
            name="zipcode"
            label="Zip Code"
            placeholder="Zip Code"
            className="w-full"
          />
          <TextField
            name="country"
            label="Country"
            placeholder="Country name"
            className="w-full"
          />
        </Fields>
        <TextField name="phoneNumber" label="Phone Number" className="w-full" />
        <TextField name="website" label="Website" className="w-full" />
        <TextAreaField
          name="comments"
          label="Comments"
          placeholder="optional"
          className="w-full"
        />
        <ErrorList errors={formErrors as ErrorMap} />
        <Button type="submit" className="mt-2 w-full">
          {submitTitle ?? 'Submit Service Request'}
        </Button>
      </Fields>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  )
}
