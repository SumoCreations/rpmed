import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { IProductDataShape } from './useProduct'

export const PRODUCTS_QUERY = gql`
  query Products($search: String) {
    response: products(search: $search) {
      products {
        id
        name
        description
      }
      pageSize
      success
      errors {
        message
        path
      }
    }
  }
`

export interface IProductQueryVariables {
  search?: string
}

export interface IProductsQueryData {
  response: {
    products: IProductDataShape[]
    success: boolean
    errors: Array<{ message: string; path: string }>
  }
}

export const useProducts = (search?: string) => {
  const { data, error, loading, networkStatus, refetch } = useQuery<
    IProductsQueryData,
    IProductQueryVariables
  >(PRODUCTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: { search },
  })

  const products = (get(data, 'response.products') || []) as IProductDataShape[]
  const pageSize = (get(data, 'response.pageSize') || 0) as number
  return { data, error, loading, products, networkStatus, refetch, pageSize }
}
