import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
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
  useModelNumbersQuery,
  useProductRegistrationQuery,
  useUpdateProductRegistrationMutation,
} from 'rpmed-schema'
import toast from 'react-hot-toast'
// import {
//   ProductRegistrationForm,
//   ProductRegistrationFormSubmitHandler,
//   IProductRegistrationFormValues,
// } from './ProductRegistrationForm'
import { RegisterForm, RegisterFormProps } from 'rpmed-ui'

const View: React.FC = () => {
  const navigate = useNavigate()
  const { productRegistrationId = '' } = useParams()
  const handleBack = () => navigate('/admin/registrations')
  const [
    updateProductRegistration,
    { loading: updating },
  ] = useUpdateProductRegistrationMutation()
  const { loading, data } = useProductRegistrationQuery({
    variables: {
      productRegistrationId,
    },
  })
  const { loading: loadingModels, data: modelsData } = useModelNumbersQuery()
  const modelNumbers =
    modelsData?.response?.modelNumbers?.map(m => ({
      id: m?.id ?? '',
      name: m?.id ?? '',
    })) ?? []

  const productRegistration = data?.response.productRegistration
  const handleSubmit: RegisterFormProps['onSubmit'] = async ({
    name,
    email,
    website,
    ...values
  }) => {
    const result = await updateProductRegistration({
      variables: {
        productRegistrationInput: {
          id: productRegistration?.id ?? '',
          customerId: productRegistration?.customerId || '',
          registeredOn: productRegistration?.registeredOn || '',
          ...values,
        } as any,
      },
    })
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
    if (errors.length > 0) {
      toast.error('Could not update product registration.')
      return undefined
    }
    toast.success('Successfully updated registration.')
    // navigate('/admin/registrations')
    return undefined
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
            title={`${productRegistration?.customer?.name ||
              'Loading Product Registration'} - RPMed Service Admin`}
          />
          {loading ? <Indicators.Spinner size="lg" /> : undefined}
          <RegisterForm
            defaultValues={{
              name: (get(productRegistration, 'customer.name') as string) || '',
              email:
                (get(productRegistration, 'customer.email') as string) || '',
              modelNumber: productRegistration?.modelNumber ?? '',
              purchaseDate: productRegistration?.purchaseDate as string,
              purchasedFrom: productRegistration?.purchasedFrom as string,
              serial: productRegistration?.serial as string,
              street: productRegistration?.street as string,
              street2: productRegistration?.street2 ?? '',
              city: productRegistration?.city as string,
              state: productRegistration?.state as string,
              zip: productRegistration?.zip as string,
              country: productRegistration?.country as string,
              phone: productRegistration?.phone as string,
              website: '',
            }}
            loading={loadingModels || loading || updating}
            onSubmit={handleSubmit}
            modelOptions={modelNumbers}
            customerHeading="Customer Details:"
            purchaseHeading="Product Details:"
            disableCustomerFields
            submitTitle="Update Registration Details"
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}

export const ProductRegistrationDetailView = View
