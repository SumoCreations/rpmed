import { Customer, ICustomerInput } from '../../../../models'
import * as Validation from '../../../../validations'
import {
  ErrorCustomerCredentialsInvalid,
  ErrorCustomerWithEmailAlreadyExists,
} from '../customerErrors'
import { ICustomerMutationOutput } from './customerMutationTypes'

export const createCustomer = async (
  _: any,
  { customerInput }: { customerInput: ICustomerInput }
): Promise<ICustomerMutationOutput> => {
  try {
    await Validation.Customer.Default.validate(customerInput, {
      abortEarly: false,
    })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }

  const { email, name, specialty } = customerInput
  const existingCustomer = await Customer.findByEmail(email)
  if (existingCustomer) {
    return {
      errors: [ErrorCustomerWithEmailAlreadyExists],
      success: false,
    }
  }

  try {
    const customer = await Customer.create({ email, name, specialty })
    return { customer: Customer.output(customer), success: true }
  } catch (e) {
    return { success: false, errors: [ErrorCustomerCredentialsInvalid] }
  }
}
