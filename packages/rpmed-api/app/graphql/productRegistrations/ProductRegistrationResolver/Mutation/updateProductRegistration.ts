import {
  Customer,
  IProductRegistrationInput,
  ProductRegistration,
} from '../../../../models'
import { IProductRegistrationMutationOutput } from './productRegistrationMutationTypes'
import { validateRegistrationInput } from './validateRegistrationInput'

export const updateProductRegistration = async (
  _: any,
  {
    productRegistrationInput,
  }: { productRegistrationInput: IProductRegistrationInput }
): Promise<IProductRegistrationMutationOutput> => {
  const { errorResponse, input, customer } = await validateRegistrationInput(
    productRegistrationInput
  )
  if (errorResponse) {
    return errorResponse
  }
  try {
    const productRegistration = await ProductRegistration.update(input)
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
          message:
            e.localizedMessage ||
            `Could not update registration with id ${
              productRegistrationInput.id
            }`,
          path: '_',
        },
      ],
      success: false,
    }
  }
}
