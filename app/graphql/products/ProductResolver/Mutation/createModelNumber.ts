import * as Validation from "rpmed-validation-schema"
import {
  IModelNumberInput,
  ModelNumber,
  Product
} from "../../../../models"
import { ErrorModelNumberIDAlreadyExists, ErrorModelNumberRelatedProductDoesNotExist } from "./productErrors"
import { IModelNumberMutationOutput } from "./productMutationTypes"

type CreateModelNumberResolver = (
  context: any,
  modelNumberInput: { modelNumberInput: IModelNumberInput }
) => Promise<IModelNumberMutationOutput>

/**
 * A GraphQL resolver that handles the 'CreateModelNumber' mutation.
 */
export const createModelNumber: CreateModelNumberResolver = async (_, { modelNumberInput }) => {
  try {
    await Validation.ModelNumber.Default.validate(modelNumberInput, { abortEarly: false })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  try {
    const existingModel = await ModelNumber.find(modelNumberInput.id)
    if (existingModel) {
      return { success: false, errors: [ErrorModelNumberIDAlreadyExists] }
    }
    const relatedProduct = await Product.find(modelNumberInput.productId)
    if (!relatedProduct) {
      return { success: false, errors: [ErrorModelNumberRelatedProductDoesNotExist] }
    }
    const modelNumber = await ModelNumber.create(modelNumberInput)
    return { modelNumber: ModelNumber.output(modelNumber), success: true }
  } catch {
    return { success: false, errors: [{ path: "_", message: "Could not create model number." }] }
  }
}