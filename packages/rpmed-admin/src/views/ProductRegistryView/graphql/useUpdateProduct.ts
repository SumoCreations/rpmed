import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ErrorList } from 'rpmed-validation-schema'
import { IProductInput } from './useCreateProduct'
import { IProductDataShape } from './useProduct'

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productInput: ProductInput!) {
    response: updateProduct(productInput: $productInput) {
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

interface IUpdateProductMutationData {
  product?: IProductDataShape
  errors?: ErrorList
  success: boolean
}

interface IUpdateProductMutationVariables {
  productInput: IProductInput
}

export const useUpdateProduct = () => {
  const [updateProduct] = useMutation<
    IUpdateProductMutationData,
    IUpdateProductMutationVariables
  >(UPDATE_PRODUCT)
  return updateProduct
}
