import * as Validation from 'rpmed-validation-schema'
import { Customer, ICustomerInput } from '../../../../models'
import {
  ErrorCustomerNotFound,
  ErrorCustomerWithEmailAlreadyExists,
} from '../customerErrors'
import { ICustomerMutationOutput } from './customerMutationTypes'

export const updateCustomer = async (
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
  let customer = await Customer.find(customerInput.id)
  if (!customer) {
    return { success: false, errors: [ErrorCustomerNotFound] }
  }
  const customerWithEmail = await Customer.findByEmail(customerInput.email)
  if (
    customerWithEmail &&
    customerWithEmail.partitionKey !== customer.partitionKey
  ) {
    return { success: false, errors: [ErrorCustomerWithEmailAlreadyExists] }
  }
  customer = await Customer.update(customerInput)
  return { customer: Customer.output(customer), success: true }
}
