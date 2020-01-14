import { Distributor, RGA } from '../../../../models'
import { MutationCreateRgaArgs, RgaStatus } from '../../../../schema'
import { generateMutationError } from '../../../../util'
import * as Validation from '../../../../validations'
import { IRGAMutationOutput } from './rgaMutationTypes'

type CreateRGAMutation = (
  context: any,
  rgaInput: MutationCreateRgaArgs
) => Promise<IRGAMutationOutput>

/**
 * A GraphQL resolver that handles the 'CreateRGA' mutation.
 */
export const createRGA: CreateRGAMutation = async (_, { rgaInput }) => {
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
  return { rga: RGA.output(rga), success: true }
}
