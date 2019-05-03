import { ProductRegistration } from "../../../../models"
import { IProductRegistrationQueryOutput } from "./productRegistrationQueryTypes"

export const productRegistrations = async (): Promise<IProductRegistrationQueryOutput> => {
  try {
    const results = await ProductRegistration.all()
    return {
      productRegistrations: results.map(ProductRegistration.output),
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not find productRegistrations" }],
      success: false
    }
  }
}
