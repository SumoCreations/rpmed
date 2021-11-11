import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ValidationError } from '../../schema'
import {
  Actions,
  Card,
  Content,
  Grid,
  Heading,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useCreateRGA } from './graphql'
import { RGAForm, RGAFormSubmitHandler } from './RGAForm'
const defaultSubmittedOn = new Date().toISOString()

export const RGACreateView: React.FC<RouteComponentProps> = ({ history }) => {
  const createRGA = useCreateRGA()
  const handleBack = () => history.push('/admin/rga')
  const defaultValues = qs.parse(window.location.search)
  const handleSubmit: RGAFormSubmitHandler = async (values, actions) => {
    const result = await createRGA({
      variables: {
        rgaInput: {
          shippingSpeed: values.shippingSpeed,
          submittedBy: values.submittedBy || '',
          submittedOn: new Date().toISOString(),
        },
      },
    })
    actions.setSubmitting(false)
    const response = result && result.data && result.data.response
    const rga = response && response.rga
    const graphErrors = result && result.errors
    if (graphErrors && graphErrors.length > 0) {
      actions.setFieldError('_', graphErrors[0].message)
    }
    const formErrors = ((response && response.errors) ||
      []) as ValidationError[]
    if (formErrors.length > 0) {
      formErrors.forEach(({ path, message }) => {
        actions.setFieldError(path, message)
      })
      return
    }
    if (rga) {
      history.push(`/admin/rga/${rga.status}/${rga.id}`)
    }
  }
  return (
    <Layout.Layout>
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
          <Helmet title="Create RGA - RPMed Service Admin" />
          <Grid.Row>
            <Grid.Col span={16}>
              <Heading.Title>Create RGA</Heading.Title>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={16}>
              <RGAForm
                initialValues={{
                  shippingSpeed: 'Ground',
                  submittedBy: (defaultValues.submittedBy as string) || '',
                  submittedOn:
                    (defaultValues.submittedOn as string) || defaultSubmittedOn,
                }}
                onSubmit={handleSubmit}
              />
            </Grid.Col>
          </Grid.Row>
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
