import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { DocumentForm, DocumentFormProps, DocumentFormValues } from './DocumentForm'
import { wait } from 'utils'
import { Endpoint, FileToEndpointFn, HandleAssociatedFileUpdateFn } from '..'

export default {
  title: 'Forms/DocumentForm',
} as Meta

const Template: Story<DocumentFormProps> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const getEndpointsForFilenames: FileToEndpointFn = async (files) => {
    await wait(0.5)
    const endpoints = files.map((upload) => ({
      uploadUrl: 'http://httpbin.org/anything',
      downloadUrl: 'http://httbin.org/image/jpeg',
      id: upload.name,
    }))
    return endpoints
  }

  const [attachments, setAttachments] = useState([] as any)
  const handleAttachments: HandleAssociatedFileUpdateFn = (files) => {
    setAttachments(
      files.map((f) => ({
        ...f,
        id: f.id,
        position: f.position,
        name: f.file?.name ?? f.name ?? f.id,
      }))
    )
  }

  const onSubmit: any = async (values: DocumentFormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <DocumentForm {...args} onSubmit={onSubmit} loading={loading} onAttachFile={handleAttachments} onRequestEndpoint={getEndpointsForFilenames} previews={attachments} />
    </div>
  )
}

const args: DocumentFormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
  onAttachFile: () => { },
  onRequestEndpoint: async () => [] as Endpoint[]
}

export const Primary = Template.bind({})
Primary.args = args

export const Prepopulated = Template.bind({})
Prepopulated.args = { ...args, defaultValues: { title: 'Surgical', slug: "surgical-resources", keywords: "example, keywords", description: "A page description." } }
