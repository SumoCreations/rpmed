import * as Validation from "rpmed-validation-schema"
import { Distributor, RGA } from "../../../../models"
import { generateMutationError } from "../../../../util"
import { IRGAMutationOutput } from "./rgaMutationTypes"

interface IRGAInputParams {
  rgaInput: {
    submittedBy: string
    submittedOn: string
  }
}
type CreateRGAMutation = (
  context: any,
  rgaInput: IRGAInputParams
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
  // tslint:disable
  const emailDomain = rgaInput.submittedBy.split("@")[1]
  console.log("Attempting to create distributor")
  console.log(emailDomain)
  const distributor = await Distributor.findOrCreateWithDomain(emailDomain)
  console.log("Found distributor")
  console.log(distributor)

  const rga = await RGA.create({
    ...rgaInput,
    distributorId: distributor.partitionKey
  })
  return { rga: RGA.output(rga), success: true }
}