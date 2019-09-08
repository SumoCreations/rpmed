import {
  ModelNumber,
  Product,
  ProductSymptom,
  productSymptomsForModel,
} from '../../../../models'
import { ErrorModelNumberIDDoesNotExist } from '../productErrors'
import { IModelNumberQueryOutput } from './productQueryTypes'

/**
 * Retrieves a specific model number.
 */
export const modelNumber = async (
  _,
  args: { id: string }
): Promise<IModelNumberQueryOutput> => {
  try {
    const result = await ModelNumber.find(args.id)
    if (!result) {
      return {
        errors: [ErrorModelNumberIDDoesNotExist],
        success: false,
      }
    }
    const output = ModelNumber.output(result)
    return {
      modelNumber: {
        ...output,
        product: async () =>
          Product.output((await Product.findByIds(output.productIds))[0]),
        symptoms: async () =>
          (await productSymptomsForModel(result.partitionKey)).map(
            ProductSymptom.output
          ),
      },
      success: true,
    }
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return {
      errors: [
        {
          message: e.localizedMessage || 'Could not retrieve model number',
          path: '_',
        },
      ],
      success: false,
    }
  }
}
