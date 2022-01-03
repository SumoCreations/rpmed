import { Customer, ProductRegistration } from '../../../../models'
import {
  ServerContext,
  isAuthorizedUser,
  generateAuthorizationError,
} from '../../../auth'
import { IProductRegistrationQueryOutput } from './productRegistrationQueryTypes'

export const productRegistrations = async (
  context: ServerContext
): Promise<IProductRegistrationQueryOutput> => {
  if (!isAuthorizedUser(context)) {
    return generateAuthorizationError()
  }
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
          path: '_',
          message: e.localizedMessage || 'Could not find productRegistrations',
        },
      ],
      success: false,
    }
  }
}
