import { IModelNumberInput, ModelNumber, Product } from '../../../../models'
import { generateMutationError } from 'api-utils'
import * as Validation from '../../../../validations'
import {
  ErrorModelNumberIDAlreadyExists,
  ErrorModelNumberRelatedProductDoesNotExist,
} from '../productErrors'
import { IModelNumberMutationOutput } from './productMutationTypes'

type CreateModelNumberResolver = (
  context: any,
  modelNumberInput: { modelNumberInput: IModelNumberInput }
) => Promise<IModelNumberMutationOutput>

/**
 * A GraphQL resolver that handles the 'CreateModelNumber' mutation.
 */
export const createModelNumber: CreateModelNumberResolver = async (
  _,
  { modelNumberInput }
) => {
  try {
    await Validation.ModelNumber.Default.validate(modelNumberInput, {
      abortEarly: false,
    })
  } catch (e) {
    return generateMutationError(Validation.formatError(e))
  }
  try {
    const existingModel = await ModelNumber.find(modelNumberInput.id)
    if (existingModel) {
      return generateMutationError([ErrorModelNumberIDAlreadyExists])
    }
    const relatedProducts = await Product.findByIds(modelNumberInput.productIds)
    if (relatedProducts.length < modelNumberInput.productIds.length) {
      return generateMutationError([ErrorModelNumberRelatedProductDoesNotExist])
    }
    const modelNumber = await ModelNumber.create(modelNumberInput)
    return { modelNumber: ModelNumber.output(modelNumber), success: true }
  } catch {
    return generateMutationError([
      { path: '_', message: 'Could not create model number.' },
    ])
  }
}
