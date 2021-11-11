import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import {
  IProductRegistrationDataShape,
  IProductRegistrationQueryData,
} from './useProductRegistration'

export const PRODUCT_REGISTRATIONS_QUERY = gql`
  query ProductRegistrations {
    response: productRegistrations {
      productRegistrations {
        id
        productId
        customerId
        customer {
          id
          name
          email
        }
        serial
        modelNumber
      }
      errors {
        message
        path
      }
      success
    }
  }
`

export const useProductRegistrations = () => {
  const { data, error, loading } = useQuery<IProductRegistrationQueryData>(
    PRODUCT_REGISTRATIONS_QUERY
  )
  const productRegistration =
    get(data, 'response.productRegistrations') ||
    ({} as IProductRegistrationDataShape[])
  return { data, error, loading, productRegistration }
}
