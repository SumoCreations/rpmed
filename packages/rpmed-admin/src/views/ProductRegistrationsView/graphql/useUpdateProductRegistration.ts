import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import { IProductRegistrationInput } from './useCreateProductRegistration'
import {
  IProductRegistrationDataShape,
  IProductRegistrationQueryData,
} from './useProductRegistration'
import { PRODUCT_REGISTRATIONS_QUERY } from './useProductRegistrations'

const UPDATE_PRODUCT_REGISTRATION = gql`
  mutation UpdateProductRegistration(
    $productRegistrationInput: ExistingProductRegistrationInput!
  ) {
    response: updateProductRegistration(
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

interface IUpdateProductRegistrationMutationData {
  productRegistration?: IProductRegistrationDataShape
  errors?: ErrorList
  success: boolean
}

interface IUpdateProductRegistrationMutationVariables {
  productRegistrationInput: IProductRegistrationInput
}

export const useUpdateProductRegistration = () => {
  const [updateProductRegistration] = useMutation<
    IUpdateProductRegistrationMutationData,
    IUpdateProductRegistrationMutationVariables
  >(UPDATE_PRODUCT_REGISTRATION, {
    update: (cache, { data }) => {
      if (!get(data, 'response.success')) {
        return
      } // abort if mutation failed
      let cachedData: IProductRegistrationQueryData
      try {
        cachedData = cache.readQuery({
          query: PRODUCT_REGISTRATIONS_QUERY,
        }) as IProductRegistrationQueryData
      } catch {
        return // abort if cache doesn't exists
      }
      const productRegistration =
        get(data, 'response.productRegistration') ||
        ({} as IProductRegistrationDataShape)
      const productRegistrations = (get(
        cachedData,
        'response.productRegistrations'
      ) || []) as IProductRegistrationDataShape[]
      if (productRegistration) {
        cache.writeQuery({
          data: {
            response: {
              ...cachedData.response,
              productRegistrations: productRegistrations.concat([
                productRegistration,
              ]),
            },
          },
          query: PRODUCT_REGISTRATIONS_QUERY,
        })
      }
    },
  })
  return updateProductRegistration
}
