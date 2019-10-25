import { Customer } from '../../../../models'
import { generateMutationError } from '../../../../util'
import {
  ErrorCustomerCouldNotBeDestroyed,
  ErrorCustomerWithIDDoesNotExist,
} from '../customerErrors'
import { ICustomerMutationOutput } from './customerMutationTypes'

export const destroyCustomer = async (
  _: any,
  { id }: { id: string }
): Promise<ICustomerMutationOutput> => {
  const customer = await Customer.find(id)
  if (!customer) {
    return generateMutationError([ErrorCustomerWithIDDoesNotExist])
  }
  try {
    await Customer.destroy(id)
  } catch (e) {
    return generateMutationError([ErrorCustomerCouldNotBeDestroyed])
  }
  return { customer: Customer.output(customer), success: true }
}
