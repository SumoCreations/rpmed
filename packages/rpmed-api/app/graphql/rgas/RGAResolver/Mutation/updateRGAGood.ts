import { RGA, RGAGood } from '../../../../models'
import {
  MutationUpdateRgaGoodArgs,
  RgaGoodMutationOutput,
  RgaStatus,
} from 'rpmed-schema'
import {
  ErrorRGAGoodCouldNotBeUpdated,
  ErrorRGAGoodWithIDDoesNotExist,
  ErrorRGAWithIDDoesNotExist,
} from '../rgaErrors'
import {
  ServerContext,
  isAuthorized,
  generateAuthorizationError,
  isAuthorizedUser,
} from '../../../auth'

export const updateRGAGood = async (
  _,
  { rgaId, id, rgaGoodInput }: MutationUpdateRgaGoodArgs,
  context: ServerContext
): Promise<RgaGoodMutationOutput> => {
  if (!isAuthorized(context)) {
    return generateAuthorizationError()
  }
  const rga = await RGA.find(rgaId)
  if (!rga) {
    return { success: false, errors: [ErrorRGAWithIDDoesNotExist] }
  }
  if (rga.status !== RgaStatus.Issued && !isAuthorizedUser(context)) {
    return generateAuthorizationError()
  }
  const existing = await RGAGood.find(rgaId, id)
  if (!existing) {
    return { success: false, errors: [ErrorRGAGoodWithIDDoesNotExist] }
  }
  try {
    const rgaGood = await RGAGood.update({
      ...existing,
      ...rgaGoodInput,
      id,
      rgaId,
    })
    return { rgaGood: RGAGood.output(rgaGood), rgaId, success: true }
  } catch (e) {
    return { success: false, errors: [ErrorRGAGoodCouldNotBeUpdated] }
  }
}
