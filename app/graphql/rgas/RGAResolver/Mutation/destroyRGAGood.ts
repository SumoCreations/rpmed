import { RGA, RGAGood } from "../../../../models"
import {
  ErrorRGAGoodCouldNotBeDestroyed,
  ErrorRGAGoodWithIDDoesNotExist,
  ErrorRGAWithIDDoesNotExist,
} from "../rgaErrors"
import { IRGAGoodMutationOutput } from "./rgaMutationTypes"

export const destroyRGAGood = async (
  _: any,
  { rgaId, id }: { rgaId: string; id: string }
): Promise<IRGAGoodMutationOutput> => {
  const rga = await RGA.find(rgaId)
  if (!rga) {
    return { success: false, errors: [ErrorRGAWithIDDoesNotExist] }
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
  return { rgaGood, success: true }
}
