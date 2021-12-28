import { Customer, ProductRegistration } from '../../../../models'
import { generateMutationError } from 'api-utils'
import {
  ErrorProductRegistrationCouldNotBeDestroyed,
  ErrorProductRegistrationWithIDDoesNotExist,
} from '../productRegistrationErrors'
import { IProductRegistrationMutationOutput } from './productRegistrationMutationTypes'

export const destroyProductRegistration = async (
  _: any,
  { id }: { id: string }
): Promise<IProductRegistrationMutationOutput> => {
  const productRegistration = await ProductRegistration.find(id)
  if (!productRegistration) {
    return generateMutationError([ErrorProductRegistrationWithIDDoesNotExist])
  }
  try {
    await ProductRegistration.destroy(id)
  } catch (e) {
    return generateMutationError([ErrorProductRegistrationCouldNotBeDestroyed])
  }
  return {
    productRegistration: {
      ...ProductRegistration.output(productRegistration),
      customer: async () =>
        Customer.output(await Customer.find(productRegistration.customerId)),
    },
    success: true,
  }
}
