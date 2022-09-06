import { Customer, ProductRegistration } from '../../../../models'
import {
  generateAuthorizationError,
  isAuthorizedUser,
  ServerContext,
} from '../../../auth'
import { ErrorProductRegistrationWithIDDoesNotExist } from '../productRegistrationErrors'
import { IProductRegistrationQueryOutput } from './productRegistrationQueryTypes'

export const productRegistration = async (
  _,
  args,
  context: ServerContext
): Promise<IProductRegistrationQueryOutput> => {
  try {
    if (!isAuthorizedUser(context)) {
      return generateAuthorizationError()
    }
    const result = await ProductRegistration.find(args.id)
    if (!result) {
      return {
        errors: [ErrorProductRegistrationWithIDDoesNotExist],
        success: false,
      }
    }
    return {
      productRegistration: {
        ...ProductRegistration.output(result),
        customer: async () =>
          Customer.output(await Customer.find(result.customerId)),
      },
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          path: '_',
          message:
            e.localizedMessage || 'Could not retrieve productRegistration',
        },
      ],
      success: false,
    }
  }
}
