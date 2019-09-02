import { Distributor } from "../../../../models"
import { ErrorDistributorWithIDDoesNotExist } from "../distributorErrors"
import { IDistributorQueryOutput } from "./distributorQueryTypes"

export const distributor = async (
  _,
  args
): Promise<IDistributorQueryOutput> => {
  try {
    const result = await Distributor.find(args.id)
    if (!result) {
      return {
        errors: [ErrorDistributorWithIDDoesNotExist],
        success: false,
      }
    }
    return {
      distributor: Distributor.output(result),
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          path: "_",
          message: e.localizedMessage || "Could not retrieve distributor",
        },
      ],
      success: false,
    }
  }
}
