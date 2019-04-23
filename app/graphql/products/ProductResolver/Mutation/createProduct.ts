import * as Validation from "rpmed-validation-schema"
import {
  IProductInput,
  Product,
} from "../../../../models"
import { ErrorModelNumberIDAlreadyExists } from "./productErrors"
import { IProductMutationOutput } from "./productMutationTypes"

type CreateProductMutation = (
  context: any,
  productInput: { productInput: IProductInput }
) => Promise<IProductMutationOutput>

/**
 * A GraphQL resolver that handles the 'CreateProduct' mutation.
 */
export const createProduct: CreateProductMutation = async (_, { productInput }) => {
  try {
    await Validation.Product.Default.validate(productInput, { abortEarly: false })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  const existingProduct = await Product.findByName(productInput.name)
  if (existingProduct) {
    return { errors: [ErrorModelNumberIDAlreadyExists], success: false }
  }
  const product = await Product.create(productInput)
  return { product: Product.output(product), success: true }
}