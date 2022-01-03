import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { AbsoluteOverlay } from 'rpmed-ui'
import { useNavigate, useParams } from 'react-router-dom'
import { Document, useDocumentQuery } from 'rpmed-schema'
import { faPencil } from '@fortawesome/pro-regular-svg-icons'

export const ShowDocumentView: React.FC = () => {
  const navigate = useNavigate()
  const { id = '' } = useParams<{ id: string }>()
  const { data: existingDocumentData, loading } = useDocumentQuery({
    variables: { id },
    fetchPolicy: 'network-only',
  })
  const { __typename, url, ...existingDocument } =
    existingDocumentData?.response.document ?? ({} as Document)
  const handleBack = () => {
    navigate('/admin/sitemap/documents')
  }
  const handleEdit = () => {
    navigate(`/admin/sitemap/documents/${id}/edit`)
  }
  return (
    <Layout.Layout>
      <Helmet title={`${existingDocument.title} - RPMed Service Admin`} />
      <Content>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleEdit}>
                <FontAwesomeIcon icon={faPencil} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <h2 className="text-sm font-bold">Viewing Document:</h2>
          <h2 className="text-lg font-bold">{existingDocument?.title}</h2>
          <div className="flex">
            <div className="flex flex-col flex-grow w-1/2 border-r border-gray-200 mr-2 relative">
              {loading ? <AbsoluteOverlay /> : null}
              <h3 className="font-semibold text-md mt-4">Description</h3>
              <p className="text-sm">{existingDocument?.description}</p>
              <h3 className="font-semibold text-md mt-4">Keywords</h3>
              <p className="text-sm">{existingDocument?.keywords}</p>
              <h3 className="font-semibold text-md mt-4">File</h3>
              <p className="text-sm">{existingDocument?.fileKey}</p>
            </div>
            {url ? (
              <iframe
                src={url ?? 'https://example.com'}
                title={existingDocument?.title ?? 'Document Preview'}
                className="flex flex-grow w-1/2 h-96"
              />
            ) : (
              <div className="flex flex-grow w-1/2 h-96 relative">
                <AbsoluteOverlay />
              </div>
            )}
          </div>
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
