import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import { IProductDataShape } from './useProduct'
import { IProductsQueryData, PRODUCTS_QUERY } from './useProducts'

const CREATE_PRODUCT = gql`
  mutation CreateProduct($productInput: ProductInput!) {
    response: createProduct(productInput: $productInput) {
      product {
        id
        name
        description
      }
      errors {
        message
        path
      }
      success
    }
  }
`

interface ICreateProductMutationData {
  response: {
    product?: IProductDataShape
    errors?: ErrorList
    success: boolean
  }
}

export interface IProductInput {
  id?: string
  name: string
  description: string
}

interface ICreateProductMutationVariables {
  productInput: IProductInput
}

export const useCreateProduct = () => {
  const [createProduct] = useMutation<
    ICreateProductMutationData,
    ICreateProductMutationVariables
  >(CREATE_PRODUCT, {
    update: (cache, { data }) => {
      if (!get(data, 'response.success')) {
        return
      } // abort if mutation failed
      let cachedData: IProductsQueryData
      try {
        cachedData = cache.readQuery({
          query: PRODUCTS_QUERY,
        }) as IProductsQueryData
      } catch {
        return // abort if cached data could not be fetched
      }
      const product = get(data, 'response.product') || ({} as IProductDataShape)
      if (product) {
        cache.writeQuery({
          data: {
            response: {
              ...cachedData.response,
              products: cachedData.response.products.concat([product]),
            },
          },
          query: PRODUCTS_QUERY,
        })
      }
    },
  })
  return createProduct
}
