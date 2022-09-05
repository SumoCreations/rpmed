import * as React from 'react'
import { Helmet } from 'react-helmet'
import { ContentMainHeading } from 'rpmed-ui/lib/V1'
import { Button, RegisterForm, RegisterFormProps } from 'rpmed-ui'
import { useParams } from 'react-router-dom'
import {
  useModelNumbersQuery,
  useCreateCustomerMutation,
  useRegisterProductMutation,
} from 'rpmed-schema'
import { BreadCrumbFromPage } from '../../pages'
import toast from 'react-hot-toast'

const RegisterView: React.FC<{}> = () => {
  const [registered, setRegistered] = React.useState(false)
  const { data, loading: loadingModels } = useModelNumbersQuery()
  const [
    registerProduct,
    { loading: registering, error: registerError },
  ] = useRegisterProductMutation()
  const [
    createCustomer,
    { loading: creatingCustomer, error: customerError },
  ] = useCreateCustomerMutation()
  const { slug = '' } = useParams<{ slug: string }>()
  const modelNumbers =
    data?.response?.modelNumbers?.map(m => ({
      id: m?.id ?? '',
      name: m?.id ?? '',
    })) ?? []

  React.useEffect(() => {
    if (registerError || customerError) {
      toast.error(
        registerError?.message ??
          customerError?.message ??
          'Could not register your product due to an unforeseen error.'
      )
    }
  }, [customerError, registerError])

  const handleRegisterProduct: RegisterFormProps['onSubmit'] = async ({
    name,
    email,
    ...values
  }) => {
    const customerResponse = await createCustomer({
      variables: {
        customerInput: {
          email,
          name,
          phone: values.phone,
          zip: values.zip,
          state: values.state,
          city: values.city,
          street: values.street,
          street2: values.street2,
          country: values.country,
        },
      },
    })
    await registerProduct({
      variables: {
        productRegistrationInput: {
          ...values,
          customerId: customerResponse?.data?.response.customer?.id ?? '',
          registeredOn: new Date().toISOString(),
        },
      },
    })
    toast.success('Your product has been registered!')
    setRegistered(true)
    return undefined
  }

  const resetRegister = () => {
    setRegistered(false)
  }

  return (
    <div className="min-w-full max-w-xl">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Product Registration - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumbFromPage
        slug={slug}
        trail={[{ label: 'Product Registration', to: `/${slug}/register` }]}
      />
      <ContentMainHeading>Register Your Product</ContentMainHeading>

      {registered ? (
        <div className="bg-gray-100 flex flex-col rounded p-4 mx-auto my-4">
          <h4 className="text-lg mx-auto font-bold">
            Your product has been registered!
          </h4>
          <p className="text-center px-8">
            You have successfully registered your MedLED product. Thank you for
            your time.
          </p>
          <Button onClick={resetRegister} className="mx-auto my-4">
            Register Another?
          </Button>
        </div>
      ) : (
        <div className="max-w-xl flex flex-col">
          <RegisterForm
            onSubmit={handleRegisterProduct}
            modelOptions={modelNumbers}
            loading={loadingModels || registering || creatingCustomer}
          />
        </div>
      )}
    </div>
  )
}

export default RegisterView
