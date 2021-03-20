import {
  ModelNumber,
  modelNumbersForSymptom,
  ProductSymptom,
  productSymptomsForModel,
} from '../../../../models'
import { IProductSymptomQueryOutput } from './productSymptomQueryTypes'

export const productSymptoms = async (
  _,
  args: { search?: string; modelNumber?: string }
): Promise<IProductSymptomQueryOutput> => {
  try {
    const results = await (args.modelNumber
      ? productSymptomsForModel(args.modelNumber)
      : ProductSymptom.all())
    const filteredResults = results
      .map(ProductSymptom.output)
      .filter(s =>
        args.search
          ? s.name.toLowerCase().indexOf(args.search.toLowerCase()) >= 0
          : true
      )
      .map(s => ({
        ...s,
        modelNumbers: async () =>
          (await modelNumbersForSymptom(s.id)).map(ModelNumber.output),
      }))
    return {
      pageSize: filteredResults.length,
      productSymptoms: filteredResults,
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          message: e.localizedMessage || 'Could not find productSymptoms',
          path: '_',
        },
      ],
      success: false,
    }
  }
}
