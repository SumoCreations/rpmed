import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'

export interface IProductDataShape {
  [key: string]: string
  name: string
  description: string
  id: string
}

interface IExtendedProductDataShape {
  name: string
  description: string
  id: string
  modelNumber: Array<{
    id: string
    description: string
    lotted: boolean
    warrantyTerm: number
  }>
}

interface IProductQueryData {
  product: {
    product: IExtendedProductDataShape
    errors: Array<{ path: string; message: string }> | null
    success: boolean
  }
}

interface IProductsQueryVariables {
  productId: string
}

export const PRODUCT_QUERY = gql`
  query Product($productId: String!) {
    response: product(id: $productId) {
      product {
        id
        name
        description
        modelNumbers {
          id
          description
          lotted
          warrantyTerm
        }
      }
      errors {
        path
        message
      }
      success
    }
  }
`

export const useProduct = (productId: string) => {
  const { data, error, loading } = useQuery<
    IProductQueryData,
    IProductsQueryVariables
  >(PRODUCT_QUERY, { variables: { productId } })
  const product = (get(data, 'response.product') ||
    {}) as IExtendedProductDataShape
  return { data, error, loading, product }
}
