import React, { useState } from 'react'
import {
  Gallery,
  FileToEndpointFn,
  HandleAssociatedFileUpdateFn,
  FilePreview,
} from 'rpmed-ui'
import { Card, Divider, Grid, Heading } from 'rpmed-ui/lib/V1'

import { wait } from 'utils'

const getEndpointsForFilenames: FileToEndpointFn = async files => {
  await wait(0.5)
  const endpoints = files.map(upload => ({
    uploadUrl: 'http://httpbin.org/anything',
    downloadUrl: 'http://httbin.org/image/jpeg',
    id: upload.name,
  }))
  return endpoints
}

interface IAssociatedPhotosProps {
  previews: FilePreview[]
  onUpdate: HandleAssociatedFileUpdateFn
}

export const AssociatedPhotos: React.FC<IAssociatedPhotosProps> = props => {
  const [attachments, setAttachments] = useState([] as any)
  const handleAttachments: HandleAssociatedFileUpdateFn = files => {
    setAttachments(
      files.map(f => ({
        ...f,
        id: f.id,
        position: f.position,
        name: f.file?.name ?? f.name ?? f.id,
      }))
    )
  }

  return (
    <Grid.Row>
      <Grid.Col span={16}>
        <Card.Flat>
          <Grid.Col span={16}>
            <Heading.Section>Associated Photos</Heading.Section>
          </Grid.Col>
          <Grid.Col span={16}>
            <Divider.Light />
          </Grid.Col>
          <Grid.Col span={16}>
            {/* <FileDrop
                onAdd={onAdd}
                onFinishSort={onFinishSort}
                onUpload={onUpload}
                previews={Object.values(localPreviews)}
              /> */}
            <Gallery
              getEndpointsForFilenames={getEndpointsForFilenames}
              previews={attachments}
              onUpdate={handleAttachments}
            />
          </Grid.Col>
        </Card.Flat>
      </Grid.Col>
    </Grid.Row>
  )
}
