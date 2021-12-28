import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Flex } from 'rebass'
import {
  BreadCrumb,
  ContentMainHeading,
  Form,
  TextFormContent,
  Input,
} from 'rpmed-ui'
import { documents } from './documents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowAltCircleLeft,
  faDownload,
} from '@fortawesome/pro-solid-svg-icons'
import { useQuery } from '../routes'

const DownloadView: React.FC = () => {
  const params = useParams<{ downloadId: string; category?: string }>()
  const query = useQuery<{ a?: boolean }>()

  const autoload = query.search.a
  const result = documents.find(d => d.id === params.downloadId)

  useEffect(() => {
    setTimeout(() => {
      if (result?.url && autoload) {
        window.location.href = result?.url
      }
    }, 250)
  }, [result, autoload])

  const handleDownload: React.MouseEventHandler = e => {
    e.preventDefault()
    if (result?.url) {
      window.location.href = result?.url
    }
  }
  const downloadsPath = `/downloads/${params.category ?? ''}`
  return (
    <article>
      <BreadCrumb.Container>
        <BreadCrumb.Link to={downloadsPath}>Downloads</BreadCrumb.Link>
        <BreadCrumb.Link to={`/d/${result?.id}`} primary={true}>
          {result?.title ?? 'Not Found'}
        </BreadCrumb.Link>
      </BreadCrumb.Container>
      <ContentMainHeading>{result?.title ?? 'Not Found'}</ContentMainHeading>
      <TextFormContent>
        <Flex flexDirection={'column'}>
          <Flex width={1} marginBottom={[3, 0]}>
            <Box as="p">
              <BreadCrumb.Link to={downloadsPath}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Downloads
              </BreadCrumb.Link>
            </Box>
          </Flex>
          <Flex flexDirection={['column', 'row']} width={1}>
            <Flex
              flexDirection="column"
              as="p"
              marginRight={[0, 3]}
              marginY="auto"
              width={[1, 1 / 2]}
            >
              This document is available for download as a PDF. You can also
              share a direct link via the provided url in the clipboard field.
            </Flex>
            <Flex flexDirection="column" width={[1, 1 / 2]}>
              <Flex as="p" marginTop={2} width={1}>
                <Form.Button onClick={handleDownload}>
                  <FontAwesomeIcon icon={faDownload} />
                  &nbsp; Download This Document
                </Form.Button>
              </Flex>
              <Input.Clipboard
                value={`${window.location.protocol}//${window.location.host}${window.location.pathname}?a=1`}
              />
            </Flex>
          </Flex>
          <Box mt={4}>
            <iframe src={result?.url} width="100%" height="700px"></iframe>
          </Box>
        </Flex>
      </TextFormContent>
    </article>
  )
}

export default DownloadView
