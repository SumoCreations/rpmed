import React, { useEffect, useRef } from 'react'
import { kebabCase } from "lodash"
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

export type PageFormValues = {
  slug: string
  description: string
  keywords: string
  title: string
}

const schema = yup.object({
  title: yup.string().required('cannot be blank'),
  slug: yup.string().required('cannot be blank'),
  keywords: yup.string(),
  description: yup.string(),
})

export interface PageFormProps extends FormProps<PageFormValues> {
  loading?: boolean
}

export const PageForm: React.FC<PageFormProps> = ({
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
    setValue,
    reset,
    watch
  } = useForm<PageFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [slug] = watch(["slug"])

  useEffect(() => {
    const formatted = kebabCase(slug)
    if (slug?.substr(-1) === " ") { return }
    if (formatted && formatted.length > 0 && formatted !== slug) { setValue("slug", formatted) }
  }, [slug, setValue])

  useDefaultValueListener<PageFormValues>(defaultValues, reset)

  const handleFormSubmit = handleSubmit(async (data) => {
    const { errors = {} } = (await externalSubmitHandler(data)) ?? {}
    const keys = Object.keys(errors)
    if (keys.length) {
      keys.map((key) =>
        setError(camelCase(key) as keyof PageFormValues, {
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
          name="title"
          label="Title"
          placeholder="Page Title"
          ref={field}
          className="w-full"
        />
        <TextField
          name="slug"
          label="Slug"
          placeholder="url-slug"
          type="text"
          className="w-full"
        />
        <TextAreaField
          name="keywords"
          label="Keywords"
          placeholder="any, keywords, used, for, seo, purporses"
          className="w-full"
        />
        <TextAreaField
          name="description"
          label="Description"
          placeholder="A page description used for SEO purposes."
          className="w-full"
        />
        <ErrorList errors={formErrors as ErrorMap} />
        <Button type="submit" className="mt-2 w-full">
          {submitTitle ?? 'Save Page'}
        </Button>
      </Fields>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  )
}
