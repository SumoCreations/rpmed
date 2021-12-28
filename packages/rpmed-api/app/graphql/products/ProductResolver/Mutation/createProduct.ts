import { IProductInput, Product } from '../../../../models'
import { generateMutationError } from 'api-utils'
import * as Validation from '../../../../validations'
import { ErrorProductAlreadyExist } from '../productErrors'
import { IProductMutationOutput } from './productMutationTypes'

type CreateProductMutation = (
  context: any,
  productInput: { productInput: IProductInput }
) => Promise<IProductMutationOutput>

/**
 * A GraphQL resolver that handles the 'CreateProduct' mutation.
 */
export const createProduct: CreateProductMutation = async (
  _,
  { productInput }
) => {
  try {
    await Validation.Product.Default.validate(productInput, {
      abortEarly: false,
    })
  } catch (e) {
    return generateMutationError(Validation.formatError(e))
  }
  const existingProduct = await Product.findByName(productInput.name)
  if (existingProduct) {
    return generateMutationError([ErrorProductAlreadyExist])
  }
  const product = await Product.create(productInput)
  return { product: Product.output(product), success: true }
}
