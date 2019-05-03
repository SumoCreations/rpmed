import * as Validation from "rpmed-validation-schema"
import { IProductRegistrationInput, ProductRegistration } from "../../../../models"
import * as E from "../productRegistrationErrors"
import { IProductRegistrationMutationOutput } from "./productRegistrationMutationTypes"

export const updateProductRegistration = async (
  _: any,
  { productRegistrationInput }: { productRegistrationInput: IProductRegistrationInput }
): Promise<IProductRegistrationMutationOutput> => {
  try {
    await Validation.ProductRegistration.Default.validate(productRegistrationInput, { abortEarly: false })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  let productRegistration = await ProductRegistration.find(productRegistrationInput.id)
  if (!productRegistration) {
    return { success: false, errors: [E.ErrorProductRegistrationWithIDDoesNotExist] }
  }
  if (productRegistrationInput.serial && productRegistrationInput.serial !== productRegistration.partitionKey) {
    const existingRegistration = await ProductRegistration.find(productRegistrationInput.serial)
    if (existingRegistration) {
      return { success: false, errors: [E.ErrorProductRegistrationWithSerialAlreadyExists] }
    }
  }
  productRegistration = await ProductRegistration.update(productRegistrationInput)
  return { productRegistration: ProductRegistration.output(productRegistration), success: true }
}