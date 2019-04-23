import * as Validation from "rpmed-validation-schema"
import {
  IProductInput,
  Product,
} from "../../../../models"
import { IProductMutationOutput } from "./productMutationTypes"

type CreateProductMutation = (
  context: any,
  productInput: IProductInput
) => Promise<IProductMutationOutput>

/**
 * A GraphQL resolver that handles the 'CreateProduct' mutation.
 */
export const createProduct: CreateProductMutation = async (_, productInput) => {
  try {
    Validation.ModelNumber.Default.validate(productInput)
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  const product = await Product.create(productInput)
  return { product: Product.output(product), success: true }
}