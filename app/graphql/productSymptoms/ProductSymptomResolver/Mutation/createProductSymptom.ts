import * as Validation from 'rpmed-validation-schema'
import { IProductSymptomInput, ProductSymptom } from '../../../../models'
import { ErrorProductSymptomCredentialsInvalid } from '../productSymptomErrors'
import { extendSymptomOutput } from './extendOutput'
import { IProductSymptomMutationOutput } from './productSymptomMutationTypes'

export const createProductSymptom = async (
  _: any,
  { productSymptomInput }: { productSymptomInput: IProductSymptomInput }
): Promise<IProductSymptomMutationOutput> => {
  try {
    await Validation.ProductSymptom.Default.validate(productSymptomInput, {
      abortEarly: false,
    })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }

  try {
    const productSymptom = await ProductSymptom.create(productSymptomInput)
    return {
      productSymptom: async () => extendSymptomOutput(productSymptom),
      success: true,
    }
  } catch (e) {
    return { success: false, errors: [ErrorProductSymptomCredentialsInvalid] }
  }
}
