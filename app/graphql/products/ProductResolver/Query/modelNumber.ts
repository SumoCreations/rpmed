import { ModelNumber } from "../../../../models"
import { ErrorModelNumberIDDoesNotExist } from "../productErrors"
import { IModelNumberQueryOutput } from "./productQueryTypes"

/**
 * Retrieves a specific model number.
 */
export const modelNumber = async (_, args: { id: string }): Promise<IModelNumberQueryOutput> => {
  try {
    const result = await ModelNumber.find(args.id)
    if (!result) {
      return {
        errors: [ErrorModelNumberIDDoesNotExist],
        success: false
      }
    }
    return {
      modelNumber: {
        ...ModelNumber.output(result),
      },
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not retrieve model number" }],
      success: false
    }
  }
}