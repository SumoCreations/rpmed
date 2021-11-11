import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import { IDistributorDataShape, IDistributorQueryData } from './useDistributor'
import { DISTRIBUTORS_QUERY } from './useDistributors'

export const DESTROY_DISTRIBUTOR = gql`
  mutation destroyDistributor($id: String!) {
    response: destroyDistributor(id: $id) {
      distributor {
        id
        name
        domain
      }
      errors {
        message
        path
      }
    }
  }
`

interface IDestroyDistributorMutationData {
  response: {
    distributor?: IDistributorDataShape
    errors?: ErrorList
    success: boolean
  }
}

interface IDestroyDistributorMutationVariables {
  id: string
}

export const useDestroyDistributor = () => {
  const [destroyDistributor] = useMutation<
    IDestroyDistributorMutationData,
    IDestroyDistributorMutationVariables
  >(DESTROY_DISTRIBUTOR, {
    update: (cache, { data }) => {
      const { response } = cache.readQuery({
        query: DISTRIBUTORS_QUERY,
      }) as IDistributorQueryData
      const distributors = response.distributors || []
      const distributor =
        get(data, 'response.distributor') || ({} as IDistributorDataShape)
      if (distributor) {
        cache.writeQuery({
          data: {
            ...response,
            response: {
              distributors: distributors.filter(
                ({ id }) => id !== distributor.id
              ),
            },
          },
          query: DISTRIBUTORS_QUERY,
        })
      }
    },
  })
  return destroyDistributor
}
