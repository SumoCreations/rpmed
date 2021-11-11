import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import { ICustomerDataShape, ICustomerQueryData } from './useCustomer'
import { CUSTOMERS_QUERY } from './useCustomers'

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($customerInput: NewCustomerInput!) {
    response: createCustomer(customerInput: $customerInput) {
      customer {
        id
        name
        email
      }
      errors {
        message
        path
      }
    }
  }
`

interface ICreateCustomerMutationData {
  response: {
    customer?: ICustomerDataShape
    errors?: ErrorList
    success: boolean
  }
}

export interface ICustomerInput {
  id?: string
  name: string
  email: string
}

interface ICreateCustomerMutationVariables {
  customerInput: ICustomerInput
}

export const useCreateCustomer = () => {
  const [createCustomer] = useMutation<
    ICreateCustomerMutationData,
    ICreateCustomerMutationVariables
  >(CREATE_CUSTOMER, {
    update: (cache, { data }) => {
      if (!get(data, 'response.success')) {
        return
      } // Abort if mutation failed
      let customersQuery: ICustomerQueryData
      try {
        customersQuery = cache.readQuery({
          query: CUSTOMERS_QUERY,
        }) as ICustomerQueryData
      } catch (e) {
        return // abort updating the cache
      }
      const customer =
        get(data, 'response.customer') || ({} as ICustomerDataShape)
      const customers = (customersQuery.response.customers ||
        []) as ICustomerDataShape[]
      if (customer) {
        const updatedData = {
          response: {
            ...customersQuery.response,
            customers: customers.concat([customer]),
          },
        }
        cache.writeQuery({
          data: updatedData,
          query: CUSTOMERS_QUERY,
        })
      }
    },
  })
  return createCustomer
}
