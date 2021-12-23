import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { DocumentForm, DocumentFormValues, FileUploadStatus } from 'rpmed-ui'
import { useHistory, useParams } from 'react-router-dom'
import { AsyncSubmitHandler, FormErrors } from '@sumocreations/forms'
import {
  Document,
  useMakeDocumentMutation,
  useDocumentQuery,
} from 'rpmed-schema'
import { useManagedUploads } from './useManagedUploads'
import { faEye } from '@fortawesome/pro-regular-svg-icons'

export const EditDocumentView: React.FC = () => {
  const {
    handleAttachedFile,
    handleCreateEndpoints,
    previews,
    setPreviews,
  } = useManagedUploads()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()

  const handleBack = () => {
    history.push('/admin/sitemap/documents')
  }

  const handlePreview = () => {
    history.push(`/admin/sitemap/documents/${id}`)
  }

  const {
    data: existingDocumentData,
    loading: documentLoading,
  } = useDocumentQuery({ variables: { id } })
  const { __typename, url, ...existingDocument } =
    existingDocumentData?.response.document ?? ({} as Document)

  const [makeDocument] = useMakeDocumentMutation()
  const handleSubmit: AsyncSubmitHandler<DocumentFormValues> = async (
    formData,
    _action
  ) => {
    setLoading(true)
    const { data } = await makeDocument({
      variables: {
        documentInput: { ...formData },
      },
    })
    setLoading(false)
    const errors = data?.response?.errors
    if (errors) {
      return {
        errors: (data?.response?.errors ?? []).reduce(
          (a, e) => ({ ...a, [e?.path ?? 'unknown']: e?.message ?? 'unknown' }),
          {}
        ),
        error: '',
      } as FormErrors
    } else {
      handlePreview()
      return
    }
  }

  const [defaultFileKey, setDefaultFileKey] = useState<string>('')
  useEffect(() => {
    if (
      existingDocument.fileKey &&
      defaultFileKey !== existingDocument.fileKey
    ) {
      setDefaultFileKey(existingDocument.fileKey)
      setPreviews([
        {
          id: existingDocument.fileKey,
          downloadUrl: url ?? '',
          status: FileUploadStatus.Available,
        },
      ])
    }
  }, [existingDocument, setPreviews, setDefaultFileKey, defaultFileKey, url])

  return (
    <Layout.Layout>
      <Helmet title="Editing Document - RPMed Service Admin" />
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
              <Actions.Toolbar onClick={handlePreview}>
                <FontAwesomeIcon icon={faEye} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <h2>Editing Document</h2>
          <DocumentForm
            onSubmit={handleSubmit}
            loading={loading || documentLoading}
            previews={previews}
            onAttachFile={handleAttachedFile}
            onRequestEndpoint={handleCreateEndpoints}
            defaultValues={
              {
                ...existingDocument,
                description: existingDocument.description ?? '',
                keywords: existingDocument.keywords ?? '',
              } as DocumentFormValues
            }
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
