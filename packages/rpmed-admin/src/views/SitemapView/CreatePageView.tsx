import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import qs from 'query-string'
import { PageForm, PageFormValues } from 'rpmed-ui'
import { useNavigate } from 'react-router-dom'
import { AsyncSubmitHandler, FormErrors } from '@sumocreations/forms'
import { useMakePageMutation } from 'rpmed-schema'

export const CreatePageView: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/admin/sitemap/pages')
  }
  const { __typename, id, ...defaultValues } = qs.parse(window.location.search)
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
      handleBack()
      return
    }
  }

  return (
    <Layout.Layout>
      <Helmet title="Page - RPMed Service Admin" />
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
          <h2>New Page</h2>
          <PageForm
            onSubmit={handleSubmit}
            loading={loading}
            defaultValues={
              {
                ...defaultValues,
                slug: '',
                keywords: defaultValues.keywords ?? '',
                description: defaultValues.description ?? '',
              } as PageFormValues
            }
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
