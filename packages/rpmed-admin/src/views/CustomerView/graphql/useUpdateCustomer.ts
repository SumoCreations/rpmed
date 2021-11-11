import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ErrorList } from 'rpmed-validation-schema'
import { ICustomerInput } from './useCreateCustomer'
import { ICustomerDataShape } from './useCustomer'

const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($customerInput: ExistingCustomerInput!) {
    response: updateCustomer(customerInput: $customerInput) {
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

interface IUpdateCustomerMutationData {
  customer?: ICustomerDataShape
  errors?: ErrorList
  success: boolean
}

interface IUpdateCustomerMutationVariables {
  customerInput: ICustomerInput
}

export const useUpdateCustomer = () => {
  const [updateCustomer] = useMutation<
    IUpdateCustomerMutationData,
    IUpdateCustomerMutationVariables
  >(UPDATE_CUSTOMER)

  return updateCustomer
}
