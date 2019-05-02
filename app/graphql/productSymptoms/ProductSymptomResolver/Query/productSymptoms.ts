import { ProductSymptom } from "../../../../models"
import { IProductSymptomQueryOutput } from "./productSymptomQueryTypes"

export const productSymptoms = async (): Promise<IProductSymptomQueryOutput> => {
  try {
    const results = await ProductSymptom.all()
    return {
      productSymptoms: results.map(ProductSymptom.output),
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not find productSymptoms" }],
      success: false
    }
  }
}
