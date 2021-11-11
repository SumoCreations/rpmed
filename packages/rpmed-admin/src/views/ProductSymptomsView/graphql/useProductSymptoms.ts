import gql from 'graphql-tag'
import { ProductSymptom, useProductSymptomsQuery } from '../../../schema'

export const PRODUCT_SYMPTOMS_QUERY = gql`
  query ProductSymptoms($search: String, $modelNumber: String) {
    response: productSymptoms(search: $search, modelNumber: $modelNumber) {
      productSymptoms {
        id
        name
        faultCode
        fee
        preApproved
        careTip
        solution
        synopsis
        attachedImages {
          id
          position
          status
          url
        }
        associatedModelNumbers
      }
      pageSize
      errors {
        message
        path
      }
      success
    }
  }
`

export const useProductSymptoms = (variables?: {
  search?: string
  modelNumber?: string
}) => {
  const {
    error,
    loading,
    data,
    refetch,
    networkStatus,
  } = useProductSymptomsQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables,
  })
  const response = data && data.response
  const productSymptoms =
    (response && response.productSymptoms) || ([] as ProductSymptom[])
  const pageSize = (response && response.pageSize) || 0
  return {
    data,
    error,
    loading,
    networkStatus,
    pageSize,
    productSymptoms,
    refetch,
  }
}
