import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ContentMainHeading, Form, TextFormContent } from 'rpmed-ui/lib/V1'
import { BreadCrumb, Clipboard } from 'rpmed-ui'
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
      <BreadCrumb
        trail={[
          { to: '/', label: 'Resource Center' },
          { to: downloadsPath, label: 'Downloads' },
          { to: `/d/${result?.id}`, label: result?.title ?? 'Not Found' },
        ]}
      />
      <ContentMainHeading>{result?.title ?? 'Not Found'}</ContentMainHeading>
      <TextFormContent>
        <div className="flex flex-col">
          <p className="md:mb-3">
            <Link to={downloadsPath}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Downloads
            </Link>
          </p>
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
          <iframe
            src={result?.url}
            width="100%"
            height="700px"
            className="mt-4"
          ></iframe>
        </div>
      </TextFormContent>
    </article>
  )
}

export default DownloadView
