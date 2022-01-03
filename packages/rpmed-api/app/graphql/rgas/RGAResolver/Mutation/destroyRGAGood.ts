import { RgaGoodMutationOutput, RgaStatus } from 'rpmed-schema'
import { RGA, RGAGood } from '../../../../models'
import {
  ServerContext,
  isAuthorized,
  generateAuthorizationError,
  isAuthorizedUser,
} from '../../../auth'
import {
  ErrorRGAGoodCouldNotBeDestroyed,
  ErrorRGAGoodWithIDDoesNotExist,
  ErrorRGAWithIDDoesNotExist,
} from '../rgaErrors'

export const destroyRGAGood = async (
  _,
  { rgaId, id }: { rgaId: string; id: string },
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
  const rgaGood = await RGAGood.find(rgaId, id)
  if (!rgaGood) {
    return { success: false, errors: [ErrorRGAGoodWithIDDoesNotExist] }
  }
  try {
    await RGAGood.destroy(rgaId, id)
  } catch (e) {
    return { success: false, errors: [ErrorRGAGoodCouldNotBeDestroyed] }
  }
  return { rgaGood: RGAGood.output(rgaGood), rgaId, success: true }
}
