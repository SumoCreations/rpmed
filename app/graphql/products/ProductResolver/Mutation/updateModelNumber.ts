import * as Validation from "rpmed-validation-schema"
import {
  IModelNumberInput,
  ModelNumber,
  Product
} from "../../../../models"
import { ErrorModelNumberIDDoesNotExist, ErrorModelNumberRelatedProductDoesNotExist } from "./productErrors"
import { IModelNumberMutationOutput } from "./productMutationTypes"

type UpdateModelNumberResolver = (
  context: any,
  modelNumberInput: { modelNumberInput: IModelNumberInput }
) => Promise<IModelNumberMutationOutput>

/**
 * A GraphQL resolver that handles the 'UpdateModelNumber' mutation.
 */
export const updateModelNumber: UpdateModelNumberResolver = async (_, { modelNumberInput }) => {
  try {
    await Validation.ModelNumber.Default.validate(modelNumberInput, { abortEarly: false })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  try {
    const existingModel = await ModelNumber.find(modelNumberInput.id)
    if (!existingModel) {
      return { success: false, errors: [ErrorModelNumberIDDoesNotExist] }
    }
    const relatedProduct = await Product.find(modelNumberInput.productId)
    if (!relatedProduct) {
      return { success: false, errors: [ErrorModelNumberRelatedProductDoesNotExist] }
    }
    const modelNumber = await ModelNumber.update(modelNumberInput)
    return { modelNumber: ModelNumber.output(modelNumber), success: true }
  } catch (e) {
    return { success: false, errors: [{ path: "_", message: "Could not update model number." }] }
  }
}