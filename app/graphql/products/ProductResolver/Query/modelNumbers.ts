import {
  IModelNumber,
  ModelNumber,
  modelNumbersForSymptom,
  Product,
  ProductSymptom,
  productSymptomsForModel,
} from '../../../../models'
import {
  ModelNumber as ModelNumberType,
  ModelNumberQueryOutput,
  QueryModelNumbersArgs,
} from '../../../../schema'

/**
 * Retrieves all model numbers or a filtered search of some model numbers.
 */
export const modelNumbers = async (
  _: any,
  args: QueryModelNumbersArgs
): Promise<ModelNumberQueryOutput> => {
  try {
    let results: Promise<IModelNumber[]>
    if (args.symptom) {
      results = modelNumbersForSymptom(args.symptom)
    } else if (args.productId && args.productType) {
      results = ModelNumber.forTypeAndProductID(
        args.productType,
        args.productId
      )
    } else if (args.productId) {
      results = ModelNumber.forProduct(args.productId)
    } else if (args.productType) {
      results = ModelNumber.forType(args.productType)
    } else {
      results = ModelNumber.all()
    }
    const output = (await results)
      .map(ModelNumber.output)
      .filter(p =>
        args.search
          ? p.id.toLowerCase().indexOf(args.search.toLowerCase()) >= 0
          : true
      )
      .map(o => ({
        ...o,
        products: async () =>
          (await Product.findByIds(o.productIds)).map(Product.output),
        symptoms: async () =>
          (await productSymptomsForModel(o.id)).map(ProductSymptom.output),
      }))
    return {
      modelNumbers: (output as any) as ModelNumberType[],
      pageSize: output.length,
      success: true,
    }
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return {
      errors: [
        {
          message: e.localizedMessage || 'Could not retrieve model numbers',
          path: '_',
        },
      ],
      success: false,
    }
  }
}
