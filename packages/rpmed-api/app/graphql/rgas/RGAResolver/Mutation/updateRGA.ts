import { RGA } from '../../../../models'
import { generateMutationError } from 'api-utils'
import * as Validation from '../../../../validations'
import { IRGAMutationOutput } from './rgaMutationTypes'

interface IRGAInputParams {
  rgaInput: {
    id: string
    shippingSpeed: string
  }
}
type UpdateRGAMutation = (
  context: any,
  rgaInput: IRGAInputParams
) => Promise<IRGAMutationOutput>

/**
 * A GraphQL resolver that handles the 'UpdateRGA' mutation.
 */
export const updateRGA: UpdateRGAMutation = async (_, { rgaInput }) => {
  try {
    await Validation.RGA.Existing.validate(rgaInput, { abortEarly: false })
  } catch (e) {
    return generateMutationError(Validation.formatError(e))
  }
  const existing = await RGA.find(rgaInput.id)
  if (!existing) {
    return {
      errors: [{ path: 'id', message: `RGA ${rgaInput.id} does not exist` }],
      success: false,
    }
  }
  const rga = await RGA.update({
    ...existing,
    id: rgaInput.id,
    shippingSpeed: rgaInput.shippingSpeed,
  })
  return { rga: RGA.output(rga), success: true }
}
