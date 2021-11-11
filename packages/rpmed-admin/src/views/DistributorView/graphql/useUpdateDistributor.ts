import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ErrorList } from 'rpmed-validation-schema'
import { IDistributorInput } from './useCreateDistributor'
import { IDistributorDataShape } from './useDistributor'

const UPDATE_DISTRIBUTOR = gql`
  mutation UpdateDistributor($distributorInput: ExistingDistributorInput!) {
    response: updateDistributor(distributorInput: $distributorInput) {
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

interface IUpdateDistributorMutationData {
  distributor?: IDistributorDataShape
  errors?: ErrorList
  success: boolean
}

interface IUpdateDistributorMutationVariables {
  distributorInput: IDistributorInput
}

export const useUpdateDistributor = () => {
  const [updateDistributor] = useMutation<
    IUpdateDistributorMutationData,
    IUpdateDistributorMutationVariables
  >(UPDATE_DISTRIBUTOR)
  return updateDistributor
}
