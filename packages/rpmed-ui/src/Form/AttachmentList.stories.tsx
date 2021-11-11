import React, { useState } from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import {
  AttachmentList,
  AttachmentListProps,
  FileToEndpointFn,
  HandleAssociatedFileUpdateFn,
  HandleDeleteFn,
  HandleFileUploadFn,
} from './FileDrop'
import { wait } from 'utils'

const getEndpointsForFilenames: FileToEndpointFn = async (files) => {
  await wait(0.5)
  const endpoints = files.map((upload) => ({
    uploadUrl: 'http://httpbin.org/anything',
    downloadUrl: 'http://httbin.org/image/jpeg',
    id: upload.name,
  }))
  return endpoints
}

export default {
  title: 'Form/AttachmentList',
  component: AttachmentList,
} as Meta

const Template: Story<AttachmentListProps> = (args) => {
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
  const handleDeletedFile: HandleDeleteFn = (file) => {
    console.log(`Deleted file: ${file.id}`)
  }
  const handleUploadedFile: HandleFileUploadFn = (file) => {
    console.log(`Finished uploading file: ${file.id}`)
  }
  return (
    <div className="bg-contentAreaBackgroundAlt p-4 flex">
      <AttachmentList
        {...args}
        getEndpointsForFilenames={getEndpointsForFilenames}
        previews={attachments}
        onUpdate={handleAttachments}
        onDelete={handleDeletedFile}
        onUpload={handleUploadedFile}
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {}
