import { ProductSymptom, productSymptomsForModel } from "../../../../models"
import { IProductSymptomQueryOutput } from "./productSymptomQueryTypes"

export const productSymptoms = async (_, args: { modelNumber?: string }): Promise<IProductSymptomQueryOutput> => {
  try {
    const results = await (args.modelNumber ? productSymptomsForModel(args.modelNumber) : ProductSymptom.all())
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
