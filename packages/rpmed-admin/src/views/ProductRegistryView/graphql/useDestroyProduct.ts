import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import { IProductDataShape } from './useProduct'
import { IProductsQueryData, PRODUCTS_QUERY } from './useProducts'

const DESTROY_PRODUCT = gql`
  mutation destroyProduct($id: ID!) {
    response: destroyProduct(id: $id) {
      product {
        id
        name
        description
      }
      errors {
        message
        path
      }
    }
  }
`

interface IDestroyProductMutationData {
  response: {
    product?: IProductDataShape
    errors?: ErrorList
    success: boolean
  }
}

interface IDestroyProductMutationVariables {
  id: string
}

export const useDestroyProduct = () => {
  const [destroyProduct] = useMutation<
    IDestroyProductMutationData,
    IDestroyProductMutationVariables
  >(DESTROY_PRODUCT, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery({
        query: PRODUCTS_QUERY,
      }) as IProductsQueryData
      const product = get(data, 'response.product') || ({} as IProductDataShape)
      const products = (get(cachedData, 'response.products') ||
        []) as IProductDataShape[]
      if (product) {
        cache.writeQuery({
          data: {
            response: {
              ...cachedData.response,
              products: products.filter(({ id }) => id !== product.id),
            },
          },
          query: PRODUCTS_QUERY,
        })
      }
    },
  })
  return destroyProduct
}
