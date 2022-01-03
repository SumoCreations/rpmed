import { RGA } from '../../../../models'
import {
  MutationSubmitRgaForReviewArgs,
  RgaMutationOutput,
  RgaStatus,
} from 'rpmed-schema'
import { ErrorRGAGoodCouldNotBeUpdated } from '../rgaErrors'
import {
  generateAuthorizationError,
  isAuthorized,
  ServerContext,
} from '../../../auth'

/**
 * A GraphQL resolver that handles the 'UpdateRGA' mutation.
 */
export const submitRGAForReview = async (
  _,
  { id, notes }: MutationSubmitRgaForReviewArgs,
  context: ServerContext
): Promise<RgaMutationOutput> => {
  try {
    if (!isAuthorized(context)) {
      return generateAuthorizationError()
    }
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
