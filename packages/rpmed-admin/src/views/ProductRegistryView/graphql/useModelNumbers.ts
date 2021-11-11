import gql from 'graphql-tag'
import get from 'lodash.get'
import {
  ModelNumber,
  QueryModelNumbersArgs,
  useModelNumbersQuery,
} from '../../../schema'

export interface IModelNumberListResultShape {
  id: string
  lotted: boolean
  product: { id: string; name: string }
  description: string
  warrantyTerm: number
  warrantyDescription: string
  feeWithWarranty: number
  feeWithoutWarranty: number
}

export interface IModelNumbersQueryData {
  response: {
    modelNumbers: IModelNumberListResultShape[]
  }
}

export const MODEL_NUMBERS_QUERY = gql`
  query ModelNumbers(
    $search: String
    $productId: String
    $productType: ProductType
  ) {
    response: modelNumbers(
      search: $search
      productId: $productId
      productType: $productType
    ) {
      modelNumbers {
        id
        lotted
        warrantyTerm
        warrantyDescription
        productType
        feeWithWarranty {
          distributor
          endUser
        }
        products {
          id
          name
        }
        feeWithoutWarranty {
          distributor
          endUser
        }
        description
      }
      pageSize
      success
      errors {
        path
        message
      }
    }
  }
`

export const useModelNumbers = (variables?: QueryModelNumbersArgs) => {
  const { data, error, loading, networkStatus, refetch } = useModelNumbersQuery(
    {
      fetchPolicy:
        get(variables, 'search.length') < 1 ? 'network-only' : 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: { ...variables },
    }
  )
  const modelNumbers = (get(data, 'response.modelNumbers') ||
    []) as ModelNumber[]
  const pageSize = (get(data, 'response.pageSize') as number) || 0
  return {
    data,
    error,
    loading,
    modelNumbers,
    networkStatus,
    pageSize,
    refetch,
  }
}
