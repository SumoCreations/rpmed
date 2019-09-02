import * as Validation from "rpmed-validation-schema"
import { IProductInput, Product } from "../../../../models"
import { generateMutationError } from "../../../../util"
import {
  ErrorProductAlreadyExist,
  ErrorProductIDDoesNotExist,
} from "../productErrors"
import { IProductMutationOutput } from "./productMutationTypes"

type UpdateProductMutation = (
  context: any,
  productInput: { productInput: IProductInput }
) => Promise<IProductMutationOutput>

/**
 * A GraphQL resolver that handles the 'CreateProduct' mutation.
 */
export const updateProduct: UpdateProductMutation = async (
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
  const product = await Product.find(productInput.id)
  if (!product) {
    return generateMutationError([ErrorProductIDDoesNotExist])
  }
  const existingProduct = await Product.findByName(productInput.name)
  if (
    existingProduct &&
    existingProduct.partitionKey !== product.partitionKey
  ) {
    return generateMutationError([ErrorProductAlreadyExist])
  }
  const updatedProduct = await Product.update(productInput)
  return { product: Product.output(updatedProduct), success: true }
}
