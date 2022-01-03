import React, { useState } from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import {
  Gallery,
  GalleryProps,
  FileToEndpointFn,
  HandleAssociatedFileUpdateFn,
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
  title: 'Form/Gallery',
  component: Gallery,
} as Meta

const Template: Story<GalleryProps> = (args) => {
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
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-contentAreaBackgroundAlt p-4 flex">
        <Gallery
          {...args}
          getEndpointsForFilenames={getEndpointsForFilenames}
          previews={attachments}
          onUpdate={handleAttachments}
        />
      </div>
    </DndProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
