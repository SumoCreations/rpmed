import { RGA } from '../../../../models'
import { generateMutationError } from 'api-utils'
import * as Validation from '../../../../validations'
import {
  ServerContext,
  isAuthorized,
  isAuthorizedUser,
  generateAuthorizationError,
} from '../../../auth'
import {
  RgaStatus,
  RgaMutationOutput,
  UpdateRgaMutationVariables,
} from 'rpmed-schema'

/**
 * A GraphQL resolver that handles the 'UpdateRGA' mutation.
 */
export const updateRGA = async (
  _,
  { rgaInput }: UpdateRgaMutationVariables,
  context: ServerContext
): Promise<RgaMutationOutput> => {
  if (!isAuthorized(context)) {
    return generateAuthorizationError()
  }
  try {
    await Validation.RGA.Existing.validate(rgaInput, { abortEarly: false })
  } catch (e) {
    return generateMutationError(Validation.formatError(e))
  }
  const existing = await RGA.find(rgaInput.id)
  if (existing?.status !== RgaStatus.Issued && !isAuthorizedUser(context)) {
    return generateAuthorizationError()
  }
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
