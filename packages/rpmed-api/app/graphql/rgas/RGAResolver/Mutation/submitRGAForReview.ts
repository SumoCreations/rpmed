import { RGA } from '../../../../models'
import { IRGAMutationOutput } from './rgaMutationTypes'
import { MutationSubmitRgaForReviewArgs, RgaStatus } from '../../../../schema'
import { ErrorRGAGoodCouldNotBeUpdated } from '../rgaErrors'

type UpdateRGAMutation = (
  context: any,
  rgaInput: MutationSubmitRgaForReviewArgs
) => Promise<IRGAMutationOutput>

/**
 * A GraphQL resolver that handles the 'UpdateRGA' mutation.
 */
export const submitRGAForReview: UpdateRGAMutation = async (
  _,
  { id, notes }
) => {
  try {
    console.log(`Attempting to find RGA with ID: ${id}`)
    const existing = await RGA.find(id)
    console.log(existing)
    if (!existing || existing.status !== RgaStatus.Issued) {
      return { success: false, errors: [ErrorRGAGoodCouldNotBeUpdated] }
    }
    const rga = await RGA.updateStatus({
      id,
      notes,
      status: RgaStatus.AwaitingArrival,
      updatedBy: {
        email: existing.submittedBy,
        id: 'customer',
        name: `customer`,
      },
    })
    return { rga: RGA.output(rga), success: true }
  } catch (e) {
    console.log(e)
    return { success: false, errors: [ErrorRGAGoodCouldNotBeUpdated] }
  }
}
