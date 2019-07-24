import { Customer } from "../../../../models"
import { ErrorCustomerNotFound } from "../customerErrors"
import { ICustomerQueryOutput } from "./customerQueryTypes"

export const customer = async (_, args): Promise<ICustomerQueryOutput> => {
  try {
    const result = await Customer.find(args.id)
    if (!result) {
      return {
        errors: [ErrorCustomerNotFound],
        success: false
      }
    }
    return {
      customer: Customer.output(result),
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not retrieve customer" }],
      success: false
    }
  }
}
