import React, { useEffect, useRef } from 'react'
import { Button, TextField, Fields, SelectField, SelectOption } from '../Form'
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

export type RegisterFormValues = {
  name: string
  email: string
  phone: string
  zip: string
  modelNumber: string
  serial: string
  website: string
  street: string
  street2: string
  country: string
  state: string
  city: string
  purchasedFrom: string
  purchaseDate: string
}

const schema = yup.object({
  modelNumber: yup.string().required('cannot be blank'),
  serial: yup.string().required('cannot be blank'),
  purchaseDate: yup.string().required('cannot be blank'),
  purchasedFrom: yup.string().required('cannot be blank'),
  name: yup.string().required('cannot be blank'),
  email: yup.string().email().required('cannot be blank'),
  phone: yup.string().required('cannot be blank'),
  street: yup.string().required('cannot be blank'),
  street2: yup.string(),
  zip: yup.string().required('cannot be blank'),
  city: yup.string().required('cannot be blank'),
  state: yup.string().required('cannot be blank'),
  country: yup.string().required('cannot be blank'),
})

export interface RegisterFormProps extends FormProps<RegisterFormValues> {
  loading?: boolean
  modelOptions: SelectOption[]
  customerHeading?: string
  purchaseHeading?: string
  disableCustomerFields?: boolean
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit: externalSubmitHandler,
  loading,
  defaultValues,
  submitTitle,
  modelOptions,
  customerHeading = 'Tell us about you:',
  purchaseHeading = "Tell us about the product you're registering:",
  disableCustomerFields = false,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    setError,
    setValue,
    watch,
    reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [modelNumber] = watch(['modelNumber'])

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

  const onSelectModel = (id: string | null) => {
    setValue('modelNumber', id ?? '')
  }

  return (
    <form onSubmit={handleFormSubmit} className="relative">
      <Fields register={register} errors={formErrors} grow className="pb-2">
        <h3 className="text-md font-bold mt-4">{purchaseHeading}</h3>
        <SelectField
          name="modelNumber"
          label="Model Number"
          className="w-full"
          options={modelOptions}
          onSelect={onSelectModel}
          value={modelNumber ?? ''}
        />
        <TextField name="serial" label="Serial Number" className="w-full" />
        <Fields register={register} nested grow>
          <TextField
            name="purchaseDate"
            label="Date Purchased"
            className="w-full"
            type="date"
          />
          <TextField
            name="purchasedFrom"
            label="Where did you purchase this product?"
            className="w-full"
            placeholder="Vendor or store name."
          />
        </Fields>
        <h3 className="text-md font-bold mt-4">{customerHeading}</h3>
        <TextField
          name="name"
          label="Name"
          placeholder="Full Name"
          ref={field}
          className="w-full"
          disabled={disableCustomerFields}
        />
        <TextField
          name="email"
          label="Email Address"
          placeholder="address@example.com"
          ref={field}
          className="w-full"
          disabled={disableCustomerFields}
        />
        <TextField
          name="street"
          label="Address"
          placeholder="Street Address"
          className="w-full"
        />
        <TextField
          name="street2"
          label="Address Line 2"
          placeholder="(optional) i.e. unit number"
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
            name="zip"
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
        <TextField name="phone" label="Phone Number" className="w-full" />
      </Fields>
      <ErrorList errors={formErrors as ErrorMap} />
      <Button type="submit" className="mt-2 w-full">
        {submitTitle ?? 'Register Product'}
      </Button>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  )
}
