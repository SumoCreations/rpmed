import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ICustomerDataShape, ICustomerQueryData } from './useCustomer'

export const CUSTOMERS_QUERY = gql`
  query Customers($search: String) {
    response: customers(search: $search) {
      customers {
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

interface ICustomersQueryVariables {
  search?: string
}

export const useCustomers = (search?: string) => {
  const { data, loading, ...result } = useQuery<
    ICustomerQueryData,
    ICustomersQueryVariables
  >(CUSTOMERS_QUERY, {
    fetchPolicy: !search || search.length < 1 ? 'network-only' : 'cache-first',
    variables: { search },
  })
  const customers = (get(data, 'response.customers') ||
    []) as ICustomerDataShape[]
  return { data, loading, customers, ...result }
}
