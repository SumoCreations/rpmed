import { Customer, ProductRegistration } from '../../../../models'
import {
  ServerContext,
  isAuthorizedUser,
  generateAuthorizationError,
} from '../../../auth'
import { IProductRegistrationQueryOutput } from './productRegistrationQueryTypes'

export const productRegistrations = async (
  _: any,
  _args: any,
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
        customer: async () => {
          try {
            return Customer.output(await Customer.find(o.customerId))
          } catch (e) {
            console.log('Could not fetch customer', e)
            return null
          }
        },
      })),
      success: true,
    }
  } catch (e) {
    console.log("We've got an error: ", e)
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
