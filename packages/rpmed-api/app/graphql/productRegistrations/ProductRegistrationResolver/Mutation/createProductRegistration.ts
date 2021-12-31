import {
  Customer,
  IProductRegistrationInput,
  ProductRegistration,
} from '../../../../models'
import {
  generateAuthorizationError,
  isAuthorized,
  ServerContext,
} from '../../../auth'
import { IProductRegistrationMutationOutput } from './productRegistrationMutationTypes'
import { validateRegistrationInput } from './validateRegistrationInput'

export const createProductRegistration = async (
  context: ServerContext,
  {
    productRegistrationInput,
  }: { productRegistrationInput: IProductRegistrationInput }
): Promise<IProductRegistrationMutationOutput> => {
  if (!isAuthorized(context)) {
    return generateAuthorizationError()
  }
  const { errorResponse, input, customer } = await validateRegistrationInput(
    productRegistrationInput
  )
  if (errorResponse) {
    return errorResponse
  }
  try {
    const productRegistration = await ProductRegistration.create({
      ...input,
    })
    return {
      productRegistration: {
        ...ProductRegistration.output(productRegistration),
        customer: async () =>
          Customer.output(
            customer || (await Customer.find(productRegistration.customerId))
          ),
      },
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          message: e.localizedMessage || `Could not create registration`,
          path: '_',
        },
      ],
      success: false,
    }
  }
}
