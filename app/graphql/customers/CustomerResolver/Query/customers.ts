import { Customer } from "../../../../models"
import { ICustomerQueryOutput } from "./customerQueryTypes"

type CustomersResolver = (
  context: any,
  args: { search?: string }
) => Promise<ICustomerQueryOutput>

const matchStrings = (search: string, values: string[]): boolean =>
  values
    .map(v => v.toLowerCase().indexOf(search.toLowerCase()) >= 0)
    .filter(v => v).length > 0

export const customers: CustomersResolver = async (
  _,
  { search }
): Promise<ICustomerQueryOutput> => {
  try {
    const results = await Customer.all()
    return {
      customers: results
        .map(Customer.output)
        .filter(c => (search ? matchStrings(search, [c.name, c.email]) : true)),
      success: true,
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage }],
      success: false,
    }
  }
}
