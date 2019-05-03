import { ProductRegistration } from "../../../../models"
import { ErrorProductRegistrationWithIDDoesNotExist } from "../productRegistrationErrors"
import { IProductRegistrationQueryOutput } from "./productRegistrationQueryTypes"

export const productRegistration = async (_, args): Promise<IProductRegistrationQueryOutput> => {
  try {
    const result = await ProductRegistration.find(args.id)
    if (!result) {
      return {
        errors: [ErrorProductRegistrationWithIDDoesNotExist],
        success: false
      }
    }
    return {
      productRegistration: ProductRegistration.output(result),
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not retrieve productRegistration" }],
      success: false
    }
  }
}
