import gql from 'graphql-tag'
import { useUpdateModelNumberMutation } from '../../../schema'

export const UPDATE_MODEL_NUMBER = gql`
  mutation UpdateModelNumber($modelNumberInput: ModelNumberInput!) {
    response: updateModelNumber(modelNumberInput: $modelNumberInput) {
      modelNumber {
        id
        description
        productIds
        products {
          id
          name
        }
        productType
        pricing {
          cost
          retail
        }
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
        resolutionWithWarranty
        resolutionWithoutWarranty
        publicNotes
        privateNotes
      }
      errors {
        message
        path
      }
    }
  }
`

export const useUpdateModelNumber = () => {
  const [updateModelNumber] = useUpdateModelNumberMutation()
  return updateModelNumber
}
