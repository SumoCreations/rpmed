import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ContentMainHeading, Form, TextFormContent } from 'rpmed-ui/lib/V1'
import { AbsoluteOverlay, Clipboard } from 'rpmed-ui'
import { documents } from './documents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/pro-solid-svg-icons'
import { useQuery } from '../routes'
import { BreadCrumbFromPage } from '../pages'
import { useFindDocumentWithSlugQuery } from 'rpmed-schema'

const DownloadView: React.FC = () => {
  const { slug = '', downloadId = '' } = useParams<{
    slug: string
    downloadId: string
  }>()
  const query = useQuery<{ a?: boolean }>()

  const autoload = query.search.a
  const { data, loading } = useFindDocumentWithSlugQuery({
    variables: { slug: downloadId },
  })
  const result = data?.response.document

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

  const title = loading ? '...' : result?.title ?? 'Not Found'

  return (
    <article className="w-full flex flex-col relative px-8">
      {slug ? (
        <BreadCrumbFromPage
          slug={slug}
          trail={[
            {
              label: title,
              to: `/${slug}/d/${result?.slug}`,
            },
          ]}
        />
      ) : null}
      <ContentMainHeading>{title}</ContentMainHeading>
      {loading ? <AbsoluteOverlay /> : null}
      <TextFormContent>
        <div className="flex flex-col">
          <div className="flex flex-row w-full">
            <p className="flex flex-col w-full md:w-1/2 md:mr-3">
              This document is available for download as a PDF. You can also
              share a direct link via the provided url in the clipboard field.
            </p>
            <ul className="flex flex-col md:w-1/2">
              <li className="mt-2 w-full">
                <Form.Button onClick={handleDownload}>
                  <FontAwesomeIcon icon={faDownload} />
                  &nbsp; Download This Document
                </Form.Button>
              </li>
              <li>
                <Clipboard
                  value={`${window.location.protocol}//${window.location.host}${window.location.pathname}?a=1`}
                />
              </li>
            </ul>
          </div>
          {result?.url && (
            <iframe
              src={result?.url}
              width="100%"
              height="700px"
              className="mt-4 mb-12"
            ></iframe>
          )}
        </div>
      </TextFormContent>
    </article>
  )
}

export default DownloadView
