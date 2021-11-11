import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'

export interface IProductRegistrationDataShape {
  [key: string]: string | object | boolean
  productId: string
  customer: {
    id: string
    email: string
    name: string
  }
  modelNumber: string
  serial: string
  customerId: string
  id: string
  lotted: boolean
  registeredOn: string
}

export interface IProductRegistrationQueryData {
  response: {
    productRegistration: IProductRegistrationDataShape | null
    productRegistrations: IProductRegistrationDataShape[] | null
    lastEvaluatedKey: string | null
    pageSize: number | null
    success: boolean
    errors: Array<{ path: string; message: string }> | null
  }
}

interface IProductRegistrationsQueryVariables {
  productRegistrationId: string
}

const PRODUCT_REGISTRATION_QUERY = gql`
  query ProductRegistration($productRegistrationId: String!) {
    response: productRegistration(id: $productRegistrationId) {
      productRegistration {
        id
        productId
        customerId
        customer {
          id
          name
          email
        }
        lotted
        serial
        modelNumber
        registeredOn
      }
      errors {
        message
        path
      }
      success
    }
  }
`

export const useProductRegistration = (productRegistrationId: string) => {
  const { data, loading } = useQuery<
    IProductRegistrationQueryData,
    IProductRegistrationsQueryVariables
  >(PRODUCT_REGISTRATION_QUERY, {
    variables: { productRegistrationId },
  })
  const productRegistration =
    get(data, 'response.productRegistration') ||
    ({} as IProductRegistrationDataShape)
  return { data, loading, productRegistration }
}
