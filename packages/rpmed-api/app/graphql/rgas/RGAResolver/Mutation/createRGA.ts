import { Distributor, RGA } from '../../../../models'
import {
  MutationCreateRgaArgs,
  RgaMutationOutput,
  RgaStatus,
} from 'rpmed-schema'
import { generateMutationError } from 'api-utils'
import * as Validation from '../../../../validations'
import {
  isAuthorized,
  ServerContext,
  generateAuthorizationError,
} from '../../../auth'

/**
 * A GraphQL resolver that handles the 'CreateRGA' mutation.
 */
export const createRGA = async (
  _,
  { rgaInput }: MutationCreateRgaArgs,
  context: ServerContext
): Promise<RgaMutationOutput> => {
  if (!isAuthorized(context)) {
    return generateAuthorizationError()
  }
  try {
    await Validation.RGA.Default.validate(rgaInput, { abortEarly: false })
  } catch (e) {
    return generateMutationError(Validation.formatError(e))
  }

  // Find or generate an associated distributor
  const emailDomain = rgaInput.submittedBy.split('@')[1]
  const distributor = await Distributor.findOrCreateWithDomain(emailDomain)

  const rga = await RGA.create({
    ...rgaInput,
    distributorId: distributor.partitionKey,
    shippingSpeed: rgaInput.shippingSpeed || 'Ground',
    status: RgaStatus.Issued,
  })
  return {
    rga: { ...RGA.output(rga), distributor: Distributor.output(distributor) },
    success: true,
  }
}
