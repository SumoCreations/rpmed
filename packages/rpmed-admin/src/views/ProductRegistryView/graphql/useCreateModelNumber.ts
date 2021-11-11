import gql from 'graphql-tag'
import { useCreateModelNumberMutation } from '../../../schema'

export const CREATE_MODEL_NUMBER = gql`
  mutation CreateModelNumber($modelNumberInput: ModelNumberInput!) {
    response: createModelNumber(modelNumberInput: $modelNumberInput) {
      modelNumber {
        id
        description
        productIds
        products {
          id
          name
        }
        productType
        lotted
        warrantyTerm
        warrantyDescription
        feeWithWarranty {
          distributor
          endUser
        }
        feeWithoutWarranty {
          distributor
          endUser
        }
        pricing {
          cost
          retail
        }
        resolutionWithWarranty
        resolutionWithoutWarranty
        publicNotes
        privateNotes
      }
      errors {
        message
        path
      }
      success
    }
  }
`

export const useCreateModelNumber = () => {
  const [createModelNumber] = useCreateModelNumberMutation()
  return createModelNumber
}
