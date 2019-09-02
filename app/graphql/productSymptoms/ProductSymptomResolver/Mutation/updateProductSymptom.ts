import * as Validation from "rpmed-validation-schema"
import { IProductSymptomInput, ProductSymptom } from "../../../../models"
import { ErrorProductSymptomWithIDDoesNotExist } from "../productSymptomErrors"
import { extendSymptomOutput } from "./extendOutput"
import { IProductSymptomMutationOutput } from "./productSymptomMutationTypes"

export const updateProductSymptom = async (
  _: any,
  { productSymptomInput }: { productSymptomInput: IProductSymptomInput }
): Promise<IProductSymptomMutationOutput> => {
  try {
    await Validation.ProductSymptom.Default.validate(productSymptomInput, {
      abortEarly: false,
    })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  let productSymptom = await ProductSymptom.find(productSymptomInput.id)
  if (!productSymptom) {
    return { success: false, errors: [ErrorProductSymptomWithIDDoesNotExist] }
  }
  productSymptom = await ProductSymptom.update(productSymptomInput)
  return {
    productSymptom: async () => extendSymptomOutput(productSymptom),
    success: true,
  }
}
