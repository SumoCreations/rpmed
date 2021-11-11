import gql from 'graphql-tag'
import get from 'lodash.get'
import { ModelNumber, useDestroyModelNumberMutation } from '../../../schema'
import { IModelNumbersQueryData, MODEL_NUMBERS_QUERY } from './useModelNumbers'

export const DESTROY_MODEL_NUMBER = gql`
  mutation destroyModelNumber($id: ID!) {
    response: destroyModelNumber(id: $id) {
      modelNumber {
        id
      }
      errors {
        message
        path
      }
    }
  }
`

export const useDestroyModelNumber = (variables: {
  productId: null | string
  productType: string | null
}) => {
  const [destroyModelNumber] = useDestroyModelNumberMutation({
    update: (cache, { data }) => {
      try {
        const cachedData = cache.readQuery({
          query: MODEL_NUMBERS_QUERY,
          variables,
        }) as IModelNumbersQueryData
        const modelNumber =
          get(data, 'response.modelNumber') || ({} as ModelNumber)
        if (modelNumber) {
          cache.writeQuery({
            data: {
              response: {
                ...cachedData.response,
                modelNumbers: cachedData.response.modelNumbers.filter(
                  ({ id }) => id !== modelNumber.id
                ),
                pageSize: cachedData.response.modelNumbers.length - 1,
              },
            },
            query: MODEL_NUMBERS_QUERY,
            variables,
          })
        }
      } catch (e) {
        // tslint:disable-next-line
        console.log(e)
      }
    },
  })
  return destroyModelNumber
}
