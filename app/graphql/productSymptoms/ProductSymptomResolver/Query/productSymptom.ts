import {
  ModelNumber,
  modelNumbersForSymptom,
  ProductSymptom,
} from '../../../../models'
import { ErrorProductSymptomWithIDDoesNotExist } from '../productSymptomErrors'
import { IProductSymptomQueryOutput } from './productSymptomQueryTypes'

export const productSymptom = async (
  _,
  args
): Promise<IProductSymptomQueryOutput> => {
  try {
    const result = await ProductSymptom.find(args.id)
    if (!result) {
      return {
        errors: [ErrorProductSymptomWithIDDoesNotExist],
        success: false,
      }
    }
    return {
      productSymptom: {
        ...ProductSymptom.output(result),
        modelNumbers: async () =>
          (await modelNumbersForSymptom(result.partitionKey)).map(
            ModelNumber.output
          ),
      },
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          message: e.localizedMessage || 'Could not retrieve productSymptom',
          path: '_',
        },
      ],
      success: false,
    }
  }
}
