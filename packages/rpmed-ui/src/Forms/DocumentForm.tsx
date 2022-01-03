import React, { useEffect, useRef } from 'react'
import { kebabCase } from 'lodash'
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
import {
  AttachmentList,
  FilePreview,
  FileToEndpointFn,
  HandleAssociatedFileUpdateFn,
  TextAreaField,
  MimeTypes,
} from '../Form'
import { HandleDeleteFn, HandleFileUploadFn } from '..'

export type DocumentFormValues = {
  slug: string
  description: string
  keywords: string
  title: string
  fileKey?: string
}

const schema = yup.object({
  title: yup.string().required('cannot be blank'),
  slug: yup.string().required('cannot be blank'),
  fileKey: yup.string().required('cannot be blank'),
  keywords: yup.string(),
  description: yup.string(),
})

export interface DocumentFormProps extends FormProps<DocumentFormValues> {
  loading?: boolean
  onRequestEndpoint: FileToEndpointFn
  onAttachFile: HandleAssociatedFileUpdateFn
  previews?: FilePreview[]
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  onSubmit: externalSubmitHandler,
  loading,
  defaultValues,
  submitTitle,
  onRequestEndpoint: handleEndpoints,
  onAttachFile: handleAttachedFile,
  previews,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    setError,
    setValue,
    reset,
    watch,
  } = useForm<DocumentFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [slug, fileKey] = watch(['slug', 'fileKey'])

  useEffect(() => {
    const formatted = kebabCase(slug)
    if (slug?.substr(-1) === ' ') {
      return
    }
    if (formatted && formatted.length > 0 && formatted !== slug) {
      setValue('slug', formatted)
    }
  }, [slug, setValue])

  useDefaultValueListener<DocumentFormValues>(defaultValues, reset)

  const handleFormSubmit = handleSubmit(async (data) => {
    const { errors = {} } = (await externalSubmitHandler(data)) ?? {}
    const keys = Object.keys(errors)
    if (keys.length) {
      keys.map((key) =>
        setError(camelCase(key) as keyof DocumentFormValues, {
          message: errors[key],
        })
      )
    }
  })

  const field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    field.current?.focus()
  })

  const handleDeletedFile: HandleDeleteFn = () => {
    setValue('fileKey', undefined)
  }
  const handleUploadedFile: HandleFileUploadFn = (file) => {
    setValue('fileKey', file.id)
  }

  return (
    <form onSubmit={handleFormSubmit} className="relative">
      <Fields register={register} errors={formErrors} grow className="pb-2">
        <TextField
          name="title"
          label="Title"
          placeholder="Document Title"
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
        <AttachmentList
          getEndpointsForFilenames={handleEndpoints}
          onUpdate={handleAttachedFile}
          maxFiles={1}
          previews={previews}
          accept={MimeTypes.PDF}
          onUpload={handleUploadedFile}
          onDelete={handleDeletedFile}
        />
        <input type="hidden" name="fileKey" value={fileKey} />
      </Fields>
      <ErrorList errors={formErrors as ErrorMap} />
      <Button type="submit" className="mt-2 w-full">
        {submitTitle ?? 'Save Document'}
      </Button>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  )
}
