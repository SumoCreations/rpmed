import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { PageForm, PageFormValues } from 'rpmed-ui'
import { useHistory, useParams } from 'react-router-dom'
import { AsyncSubmitHandler, FormErrors } from '@sumocreations/forms'
import { Page, useMakePageMutation, usePageQuery } from 'rpmed-schema'
import { faEye } from '@fortawesome/pro-regular-svg-icons'

export const EditPageView: React.FC = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()

  const handlePreview = () => {
    history.push(`/admin/sitemap/pages/${id}`)
  }

  const handleBack = () => {
    history.push('/admin/sitemap/pages')
  }

  const { data: existingPageData, loading: pageLoading } = usePageQuery({
    variables: { id },
  })
  const { __typename, ...existingPage } =
    existingPageData?.response.page ?? ({} as Page)

  const [makePage] = useMakePageMutation()
  const handleSubmit: AsyncSubmitHandler<PageFormValues> = async (
    formData,
    _action
  ) => {
    setLoading(true)
    const { data } = await makePage({
      variables: {
        pageInput: { ...formData },
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

  return (
    <Layout.Layout>
      <Helmet title="Editing Page - RPMed Service Admin" />
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
          <h2>Editing Page</h2>
          <PageForm
            onSubmit={handleSubmit}
            loading={loading || pageLoading}
            defaultValues={
              {
                ...existingPage,
                description: existingPage.description ?? '',
                keywords: existingPage.keywords ?? '',
              } as PageFormValues
            }
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
