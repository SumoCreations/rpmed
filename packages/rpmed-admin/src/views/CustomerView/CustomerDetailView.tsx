import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import * as React from 'react'
import { Helmet } from 'react-helmet'

import { ErrorList } from 'rpmed-validation-schema'
import {
  Actions,
  Card,
  Content,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import {
  CustomerForm,
  CustomerFormSubmitHandler,
  ICustomerFormValues,
} from './CustomerForm'
import { useCustomerQuery, useUpdateCustomerMutation } from 'rpmed-schema'
import { useNavigate, useParams } from 'react-router-dom'

const View: React.FC = () => {
  const navigate = useNavigate()
  const { customerId = '' } = useParams()
  const [updateCustomer] = useUpdateCustomerMutation()
  const handleBack = () => navigate('/admin/customers')
  const { data, loading } = useCustomerQuery({
    variables: { customerId },
  })
  const customer = data?.response.customer
  const handleSubmit: CustomerFormSubmitHandler = async (values, actions) => {
    const result = await updateCustomer({
      variables: {
        customerInput: {
          email: values.email ?? '',
          id: customer?.id ?? '',
          name: values.name ?? '',
        },
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path as any, message)
      })
      return
    }
    navigate('/admin/customers')
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
          <Helmet title="{customer.name || 'Loading Customer'} - RPMed Service Admin" />
          {loading ? (
            <Indicators.Spinner size="lg" />
          ) : (
            <h2>{customer?.name}</h2>
          )}
          <CustomerForm
            initialValues={customer as ICustomerFormValues}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}

export const CustomerDetailView = View
