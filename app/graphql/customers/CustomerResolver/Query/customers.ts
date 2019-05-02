import { Customer } from "../../../../models"
import { ICustomerQueryOutput } from "./customerQueryTypes"

export const customers = async (): Promise<ICustomerQueryOutput> => {
  try {
    const results = await Customer.all()
    return {
      customers: results.map(Customer.output),
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage }],
      success: false
    }
  }
}
