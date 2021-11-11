import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ErrorList } from 'rpmed-validation-schema'
import { IProductRegistrationDataShape } from './useProductRegistration'

const CREATE_PRODUCT_REGISTRATION = gql`
  mutation CreateProductRegistration(
    $productRegistrationInput: NewProductRegistrationInput!
  ) {
    response: createProductRegistration(
      productRegistrationInput: $productRegistrationInput
    ) {
      success
      productRegistration {
        id
        customer {
          id
          email
          name
        }
        modelNumber
        productId
        customerId
        serial
      }
      errors {
        path
        message
      }
    }
  }
`

interface ICreateProductRegistrationMutationData {
  response: {
    productRegistration?: IProductRegistrationDataShape
    errors?: ErrorList
    success: boolean
  }
}

export interface IProductRegistrationInput {
  id?: string
  serial?: string
  customerId: string
  modelNumber: string
  registeredOn: string
}

interface ICreateProductRegistrationMutationVariables {
  productRegistrationInput: IProductRegistrationInput
}

export const useCreateProductRegistration = () => {
  const [createProductRegistration] = useMutation<
    ICreateProductRegistrationMutationData,
    ICreateProductRegistrationMutationVariables
  >(CREATE_PRODUCT_REGISTRATION)
  return createProductRegistration
}
