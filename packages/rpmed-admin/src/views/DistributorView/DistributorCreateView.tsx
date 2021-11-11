import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ErrorList } from 'rpmed-validation-schema'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import {
  DistributorForm,
  DistributorFormSubmitHandler,
} from './DistributorForm'
import { useCreateDistributor } from './graphql'

export const DistributorCreateView: React.FC<RouteComponentProps> = ({
  history,
}) => {
  const handleBack = () => history.push('/admin/distributors')
  const defaultValues = qs.parse(window.location.search)
  const createDistributor = useCreateDistributor()
  const handleSubmit: DistributorFormSubmitHandler = async (
    values,
    actions
  ) => {
    const result = await createDistributor({
      variables: {
        distributorInput: {
          domain: values.domain || '',
          name: values.name || '',
        },
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path, message)
      })
      return
    }
    history.push('/admin/distributors')
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
          <Helmet title="Create Distributor - RPMed Service Admin" />
          <h2>New Distributor</h2>
          <DistributorForm
            initialValues={{
              domain: (defaultValues.domain as string) || '',
              name: (defaultValues.name as string) || '',
            }}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
