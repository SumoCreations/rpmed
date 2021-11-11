import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import { ICustomerDataShape, ICustomerQueryData } from './useCustomer'
import { CUSTOMERS_QUERY } from './useCustomers'

const DESTROY_CUSTOMER = gql`
  mutation destroyCustomer($id: String!) {
    response: destroyCustomer(id: $id) {
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

interface IDestroyCustomerMutationData {
  response: {
    customer?: ICustomerDataShape
    errors?: ErrorList
    success: boolean
  }
}

interface IDestroyCustomerMutationVariables {
  id: string
}

export const useDestroyCustomer = () => {
  const [destroyCustomer] = useMutation<
    IDestroyCustomerMutationData,
    IDestroyCustomerMutationVariables
  >(DESTROY_CUSTOMER, {
    update: (cache, { data }) => {
      const { response } = cache.readQuery({
        query: CUSTOMERS_QUERY,
      }) as ICustomerQueryData
      const customers = response.customers || []
      const customer =
        get(data, 'response.customer') || ({} as ICustomerDataShape)
      if (customer) {
        cache.writeQuery({
          data: {
            ...response,
            response: {
              customers: customers.filter(
                ({ id: currentId }) => currentId !== customer.id
              ),
            },
          },
          query: CUSTOMERS_QUERY,
        })
      }
    },
  })
  return destroyCustomer
}
