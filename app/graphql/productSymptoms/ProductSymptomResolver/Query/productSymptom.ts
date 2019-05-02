import { ProductSymptom } from "../../../../models"
import { ErrorProductSymptomWithIDDoesNotExist } from "../productSymptomErrors"
import { IProductSymptomQueryOutput } from "./productSymptomQueryTypes"

export const productSymptom = async (_, args): Promise<IProductSymptomQueryOutput> => {
  try {
    const result = await ProductSymptom.find(args.id)
    if (!result) {
      return {
        errors: [ErrorProductSymptomWithIDDoesNotExist],
        success: false
      }
    }
    return {
      productSymptom: ProductSymptom.output(result),
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not retrieve productSymptom" }],
      success: false
    }
  }
}
