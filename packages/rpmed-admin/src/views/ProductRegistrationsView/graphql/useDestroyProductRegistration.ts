import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import {
  IProductRegistrationDataShape,
  IProductRegistrationQueryData,
} from './useProductRegistration'
import { PRODUCT_REGISTRATIONS_QUERY } from './useProductRegistrations'

const DESTROY_PRODUCT_REGISTRATION = gql`
  mutation destroyProductRegistration($id: String!) {
    response: destroyProductRegistration(id: $id) {
      productRegistration {
        id
      }
      errors {
        message
        path
      }
    }
  }
`

interface IDestroyProductRegistrationMutationData {
  response: {
    productRegistration?: IProductRegistrationDataShape
    errors?: ErrorList
    success: boolean
  }
}

interface IDestroyProductRegistrationMutationVariables {
  id: string
}

export const useDestroyProductRegistration = () => {
  const [destroyProductRegistration] = useMutation<
    IDestroyProductRegistrationMutationData,
    IDestroyProductRegistrationMutationVariables
  >(DESTROY_PRODUCT_REGISTRATION, {
    update: (cache, { data }) => {
      const { response } = cache.readQuery({
        query: PRODUCT_REGISTRATIONS_QUERY,
      }) as IProductRegistrationQueryData
      const productRegistrations = response.productRegistrations || []
      const productRegistration =
        get(data, 'response.productRegistration') ||
        ({} as IProductRegistrationDataShape)
      if (productRegistration) {
        cache.writeQuery({
          data: {
            ...response,
            response: {
              productRegistrations: productRegistrations.filter(
                ({ id }) => id !== productRegistration.id
              ),
            },
          },
          query: PRODUCT_REGISTRATIONS_QUERY,
        })
      }
    },
  })
  return destroyProductRegistration
}
