import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import qs from 'query-string'
import { DocumentForm, DocumentFormValues } from 'rpmed-ui'
import { useHistory } from 'react-router-dom'
import { AsyncSubmitHandler, FormErrors } from '@sumocreations/forms'
import { useMakeDocumentMutation } from 'rpmed-schema'
import { useManagedUploads } from './useManagedUploads'

export const CreateDocumentView: React.FC = ({}) => {
  const {
    handleAttachedFile,
    handleCreateEndpoints,
    previews,
  } = useManagedUploads()
  const [makeDocument] = useMakeDocumentMutation()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const handleBack = () => {
    history.push('/admin/sitemap/documents')
  }
  const { __typename, id, ...defaultValues } = qs.parse(window.location.search)

  const handleSubmit: AsyncSubmitHandler<DocumentFormValues> = async (
    formData,
    _action
  ) => {
    setLoading(true)
    console.log(formData)
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
          (a, e) => ({
            ...a,
            [e?.path ?? 'unknown']: e?.message ?? 'unknown',
          }),
          {}
        ),
        error: '',
      } as FormErrors
    } else {
      handleBack()
      return
    }
  }

  return (
    <Layout.Layout>
      <Helmet title="Document - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <h2>New Document</h2>
          <DocumentForm
            onSubmit={handleSubmit}
            loading={loading}
            onRequestEndpoint={handleCreateEndpoints}
            onAttachFile={handleAttachedFile}
            defaultValues={
              {
                ...defaultValues,
                keywords: defaultValues.keywords ?? '',
                description: defaultValues.description ?? '',
              } as DocumentFormValues
            }
            previews={previews}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
