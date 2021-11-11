import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import { IDistributorDataShape, IDistributorQueryData } from './useDistributor'
import { DISTRIBUTORS_QUERY } from './useDistributors'

const CREATE_DISTRIBUTOR = gql`
  mutation CreateDistributor($distributorInput: NewDistributorInput!) {
    response: createDistributor(distributorInput: $distributorInput) {
      distributor {
        id
        name
        domain
      }
      errors {
        message
        path
      }
      success
    }
  }
`

interface ICreateDistributorMutationData {
  response: {
    distributor?: IDistributorDataShape
    errors?: ErrorList
    success: boolean
  }
}

export interface IDistributorInput {
  id?: string
  name: string
  domain: string
}

interface ICreateDistributorMutationVariables {
  distributorInput: IDistributorInput
}

export const useCreateDistributor = () => {
  const [createDistributor] = useMutation<
    ICreateDistributorMutationData,
    ICreateDistributorMutationVariables
  >(CREATE_DISTRIBUTOR, {
    update: (cache, { data }) => {
      if (!get(data, 'response.success')) {
        return
      } // Abort if mutation failed
      let cacheData: IDistributorQueryData
      try {
        cacheData = cache.readQuery({
          query: DISTRIBUTORS_QUERY,
        }) as IDistributorQueryData
      } catch {
        return // abort if no data in cache
      }
      const distributor =
        get(data, 'response.distributor') || ({} as IDistributorDataShape)
      const distributors = (cacheData.response.distributors ||
        []) as IDistributorDataShape[]
      if (distributor) {
        cache.writeQuery({
          data: {
            response: {
              ...cacheData.response,
              distributors: distributors.concat([distributor]),
            },
          },
          query: DISTRIBUTORS_QUERY,
        })
      }
    },
  })
  return createDistributor
}
