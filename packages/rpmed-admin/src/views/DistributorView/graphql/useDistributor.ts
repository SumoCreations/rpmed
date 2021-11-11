import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'

export interface IDistributorDataShape {
  [key: string]: string
  name: string
  description: string
  id: string
}

export interface IDistributorQueryData {
  response: {
    distributor: IDistributorDataShape | null
    distributors: IDistributorDataShape[] | null
    lastEvaluatedKey: string | null
    pageSize: number | null
    success: boolean
    errors: Array<{ path: string; message: string }> | null
  }
}

interface IDistributorsQueryVariables {
  distributorId: string
}

const DISTRIBUTOR_QUERY = gql`
  query Distributor($distributorId: String!) {
    response: distributor(id: $distributorId) {
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

export const useDistributor = (distributorId: string) => {
  const { loading, data, ...response } = useQuery<
    IDistributorQueryData,
    IDistributorsQueryVariables
  >(DISTRIBUTOR_QUERY, { variables: { distributorId } })
  const distributor = (get(data, 'response.distributor') ||
    {}) as IDistributorDataShape
  return { data, loading, distributor, ...response }
}
