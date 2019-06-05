import * as Validation from "rpmed-validation-schema"
import { IProductSymptomInput, ProductSymptom } from "../../../../models"
import { ErrorProductSymptomWithFaultCodeAlreadyExists, ErrorProductSymptomWithIDDoesNotExist } from "../productSymptomErrors"
import { extendSymptomOutput } from "./extendProductSymptomOutput"
import { IProductSymptomMutationOutput } from "./productSymptomMutationTypes"

export const updateProductSymptom = async (
  _: any,
  { productSymptomInput }: { productSymptomInput: IProductSymptomInput }
): Promise<IProductSymptomMutationOutput> => {
  try {
    await Validation.ProductSymptom.Default.validate(productSymptomInput, { abortEarly: false })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  let productSymptom = await ProductSymptom.find(productSymptomInput.id)
  if (!productSymptom) {
    return { success: false, errors: [ErrorProductSymptomWithIDDoesNotExist] }
  }
  const productSymptomWithDomain = await ProductSymptom.findByFaultCode(productSymptomInput.faultCode)
  if (productSymptomWithDomain && productSymptomWithDomain.partitionKey !== productSymptom.partitionKey) {
    return { success: false, errors: [ErrorProductSymptomWithFaultCodeAlreadyExists] }
  }
  productSymptom = await ProductSymptom.update(productSymptomInput)
  return { productSymptom: extendSymptomOutput(productSymptom), success: true }
}