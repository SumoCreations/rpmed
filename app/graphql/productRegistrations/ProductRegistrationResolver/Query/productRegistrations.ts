import { Customer, ProductRegistration } from "../../../../models"
import { IProductRegistrationQueryOutput } from "./productRegistrationQueryTypes"

export const productRegistrations = async (): Promise<
  IProductRegistrationQueryOutput
> => {
  try {
    const results = await ProductRegistration.all()
    return {
      productRegistrations: results.map(ProductRegistration.output).map(o => ({
        ...o,
        customer: async () =>
          Customer.output(await Customer.find(o.customerId)),
      })),
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          path: "_",
          message: e.localizedMessage || "Could not find productRegistrations",
        },
      ],
      success: false,
    }
  }
}
