import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { IDistributorDataShape, IDistributorQueryData } from './useDistributor'

export const DISTRIBUTORS_QUERY = gql`
  query Distributors {
    response: distributors {
      distributors {
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

export const useDistributors = () => {
  const { data, error, loading } = useQuery<IDistributorQueryData>(
    DISTRIBUTORS_QUERY
  )
  const distributors = (get(data, 'response.distributors') ||
    []) as IDistributorDataShape[]
  return { data, distributors, error, loading }
}
