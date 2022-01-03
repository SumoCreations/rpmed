import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { ErrorList } from 'rpmed-validation-schema'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { useCreateProductRegistrationMutation } from 'rpmed-schema'
import {
  ProductRegistrationForm,
  ProductRegistrationFormSubmitHandler,
} from './ProductRegistrationForm'

const initialRegisteredOn = new Date().toISOString()
const initialRegisteredOnDisplayDate = new Date().toLocaleDateString()

export const ProductRegistrationCreateView: React.FC = () => {
  const navigate = useNavigate()
  const handleBack = () => navigate('/admin/registrations')
  const defaultValues = qs.parse(window.location.search)
  const [createProductRegistration] = useCreateProductRegistrationMutation()
  const handleSubmit: ProductRegistrationFormSubmitHandler = async (
    values,
    actions
  ) => {
    const result = await createProductRegistration({
      variables: {
        productRegistrationInput: {
          customerId: values.customerId || '',
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
        actions.setFieldError(path as any, message)
      })
      return false
    }
    navigate('/admin/registrations')
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
          <Helmet title="Create Product Registration - RPMed Service Admin" />
          <h2>New Product Registration</h2>
          <ProductRegistrationForm
            initialValues={{
              customerId: (defaultValues.customerId as string) || '',
              customerName: (defaultValues.customerName as string) || '',
              modelNumber: (defaultValues.modelNumber as string) || '',
              registeredOn:
                (defaultValues.registeredOn as string) || initialRegisteredOn,
              registeredOnDisplayDate:
                (defaultValues.registeredOnDisplayDate as string) ||
                initialRegisteredOnDisplayDate,
              serial: (defaultValues.serial as string) || '',
            }}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
