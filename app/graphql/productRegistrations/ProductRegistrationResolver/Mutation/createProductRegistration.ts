import * as Validation from "rpmed-validation-schema"
import { v4 as uuid } from "uuid"
import { IProductRegistrationInput, ModelNumber, ProductRegistration } from "../../../../models"
import * as E from "../productRegistrationErrors"
import { IProductRegistrationMutationOutput } from "./productRegistrationMutationTypes"

export const createProductRegistration = async (
  _: any,
  { productRegistrationInput }: { productRegistrationInput: IProductRegistrationInput }
): Promise<IProductRegistrationMutationOutput> => {
  try {
    await Validation.ProductRegistration.Default.validate(productRegistrationInput, { abortEarly: false })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }

  const relatedModel = await ModelNumber.find(productRegistrationInput.modelNumber)
  const hasSerial = productRegistrationInput.serial && productRegistrationInput.serial.length > 0
  if (relatedModel.lotted && !hasSerial) {
    return {
      errors: [E.ErrorProductRegistrationWithSerialCannotBeBlank],
      success: false
    }
  }

  const id = productRegistrationInput.serial || uuid()

  const existingProductRegistration = await ProductRegistration.find(id)
  if (existingProductRegistration) {
    return {
      errors: [E.ErrorProductRegistrationWithSerialAlreadyExists],
      success: false
    }
  }

  try {
    const productRegistration = await ProductRegistration.create(productRegistrationInput)
    return { productRegistration: ProductRegistration.output(productRegistration), success: true }
  } catch (e) {
    return { success: false, errors: [E.ErrorProductRegistrationCredentialsInvalid] }
  }
}