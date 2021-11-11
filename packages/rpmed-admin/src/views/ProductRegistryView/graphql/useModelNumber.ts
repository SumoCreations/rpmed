import gql from 'graphql-tag'
import get from 'lodash.get'
import { ModelNumber, useModelNumberQuery } from '../../../schema'

interface ISymptomDetail {
  id: string
  name: string
  faultCode: string
}

export type ModelNumberValue =
  | string
  | number
  | boolean
  | object
  | null
  | undefined
  | ISymptomDetail[]

export const MODEL_NUMBER_QUERY = gql`
  query ModelNumber($modelNumberId: String!) {
    response: modelNumber(id: $modelNumberId) {
      modelNumber {
        id
        description
        productIds
        productType
        products {
          id
          name
        }
        symptoms {
          id
          name
          faultCode
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
        pricing {
          cost
          retail
        }
        resolutionWithWarranty
        resolutionWithoutWarranty
        publicNotes
        privateNotes
      }
      success
      errors {
        path
        message
      }
    }
  }
`

export const useModelNumber = (modelNumberId: string) => {
  const { data, error, loading, refetch } = useModelNumberQuery({
    variables: { modelNumberId },
  })
  const modelNumber = (get(data, 'response.modelNumber') || {}) as ModelNumber
  return { data, error, loading, modelNumber, refetch }
}
