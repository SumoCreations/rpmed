import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ErrorList } from 'rpmed-validation-schema'
import {
  Actions,
  Card,
  Content,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useProductRegistration, useUpdateProductRegistration } from './graphql'
import {
  ProductRegistrationForm,
  ProductRegistrationFormSubmitHandler,
} from './ProductRegistrationForm'

interface IProductRegistrationRouterProps {
  productRegistrationId: string
}

const View: React.FunctionComponent<RouteComponentProps<
  IProductRegistrationRouterProps
>> = ({ history, match }) => {
  const handleBack = () => history.push('/admin/registrations')
  const updateProductRegistration = useUpdateProductRegistration()
  const { loading, productRegistration } = useProductRegistration(
    match.params.productRegistrationId
  )
  const initialValues = {
    customerId: productRegistration.customerId,
    customerName: (get(productRegistration, 'customer.name') as string) || '',
    id: productRegistration.id,
    lotted: productRegistration.lotted as boolean,
    modelNumber: productRegistration.modelNumber,
    productId: productRegistration.productId,
    registeredOn: productRegistration.registeredOn as string,
    registeredOnDisplayDate: new Date(
      productRegistration.registeredOn as string
    ).toLocaleDateString(),
    serial: productRegistration.serial,
  }
  const handleSubmit: ProductRegistrationFormSubmitHandler = async (
    values,
    actions
  ) => {
    const result = await updateProductRegistration({
      variables: {
        productRegistrationInput: {
          customerId: values.customerId || '',
          id: productRegistration.id,
          modelNumber: values.modelNumber || '',
          registeredOn: values.registeredOn || '',
          serial: (values.serial as string) || '',
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
    history.push('/admin/registrations')
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
          <Helmet
            title={`${productRegistration.name ||
              'Loading Product Registration'} - RPMed Service Admin`}
          />
          {loading ? (
            <Indicators.Spinner size="lg" />
          ) : (
            <h2>{productRegistration.name}</h2>
          )}
          <ProductRegistrationForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}

export const ProductRegistrationDetailView = View
