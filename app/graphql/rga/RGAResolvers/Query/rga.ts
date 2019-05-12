import { RGA } from "../../../../models"
import { ErrorRGAWithIDDoesNotExist } from "../rgaErrors"
import { IRGAQueryOutput } from "./rgaQueryTypes"

export const rga = async (_, args): Promise<IRGAQueryOutput> => {
  try {
    const result = await RGA.find(args.id)
    if (!result) {
      return {
        errors: [ErrorRGAWithIDDoesNotExist],
        success: false
      }
    }
    return {
      rga: {
        ...RGA.output(result),
      },
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not retrieve rga" }],
      success: false
    }
  }
}