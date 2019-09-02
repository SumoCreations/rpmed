import {
  ModelNumber,
  modelNumbersForSymptom,
  Product,
  ProductSymptom,
  productSymptomsForModel,
} from "../../../../models"
import { IModelNumberQueryOutput } from "./productQueryTypes"

/**
 * Retrieves all model numbers or a filtered search of some model numbers.
 */
export const modelNumbers = async (
  _,
  args: { search?: string; productId?: string; symptom?: string }
): Promise<IModelNumberQueryOutput> => {
  try {
    const results = args.symptom
      ? modelNumbersForSymptom(args.symptom)
      : args.productId
      ? ModelNumber.forProduct(args.productId)
      : ModelNumber.all()
    const output = (await results)
      .map(ModelNumber.output)
      .filter(p =>
        args.search
          ? p.id.toLowerCase().indexOf(args.search.toLowerCase()) >= 0
          : true
      )
      .map(o => ({
        ...o,
        product: async () => Product.output(await Product.find(o.productId)),
        symptoms: async () =>
          (await productSymptomsForModel(o.id)).map(ProductSymptom.output),
      }))
    return {
      modelNumbers: output,
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          path: "_",
          message: e.localizedMessage || "Could not retrieve model numbers",
        },
      ],
      success: false,
    }
  }
}
