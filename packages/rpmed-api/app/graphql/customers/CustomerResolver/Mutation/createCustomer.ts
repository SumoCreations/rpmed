import { Customer, ICustomer, ICustomerInput } from '../../../../models'
import * as Validation from '../../../../validations'
import { ErrorCustomerCredentialsInvalid } from '../customerErrors'
import { ICustomerMutationOutput } from './customerMutationTypes'
import {
  ServerContext,
  generateAuthorizationError,
  isAuthorizedUser,
  isAuthorizedOrigin,
} from '../../../auth'

export const createCustomer = async (
  _: any,
  { customerInput }: { customerInput: ICustomerInput },
  context: ServerContext
): Promise<ICustomerMutationOutput> => {
  if (!isAuthorizedUser(context) && !isAuthorizedOrigin(context)) {
    return generateAuthorizationError()
  }

  try {
    await Validation.Customer.Default.validate(customerInput, {
      abortEarly: false,
    })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }

  const { email, name, ...inputs } = customerInput
  const existingCustomer = await Customer.findByEmail(email)

  try {
    let customer: ICustomer
    if (existingCustomer) {
      customer = existingCustomer
    } else {
      customer = await Customer.create({
        email,
        name,
        ...inputs,
      })
    }
    return { customer: Customer.output(customer), success: true }
  } catch (e) {
    console.log('Customer Failure:', e)
    return { success: false, errors: [ErrorCustomerCredentialsInvalid] }
  }
}
