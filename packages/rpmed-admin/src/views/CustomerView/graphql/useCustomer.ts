import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'

export interface ICustomerDataShape {
  [key: string]: string
  name: string
  email: string
  id: string
}

export interface ICustomerQueryData {
  response: {
    customer: ICustomerDataShape | null
    customers: ICustomerDataShape[] | null
    lastEvaluatedKey: string | null
    pageSize: number | null
    success: boolean
    errors: Array<{ path: string; message: string }> | null
  }
}

interface ICustomerQueryVariables {
  customerId: string
}

const CUSTOMER_QUERY = gql`
  query Customer($customerId: String!) {
    response: customer(id: $customerId) {
      customer {
        id
        name
        email
      }
      errors {
        message
        path
      }
      success
    }
  }
`

export const useCustomer = (customerId: string) => {
  const { data, loading, ...result } = useQuery<
    ICustomerQueryData,
    ICustomerQueryVariables
  >(CUSTOMER_QUERY, { variables: { customerId } })
  const customer = (get(data, 'response.customer') || {}) as ICustomerDataShape
  return { data, loading, customer, ...result }
}
