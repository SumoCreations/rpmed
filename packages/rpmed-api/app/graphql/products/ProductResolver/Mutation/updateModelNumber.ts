import { IModelNumberInput, ModelNumber, Product } from '../../../../models'
import { generateMutationError } from 'api-utils'
import * as Validation from '../../../../validations'
import {
  ErrorModelNumberIDDoesNotExist,
  ErrorModelNumberRelatedProductDoesNotExist,
} from '../productErrors'
import { IModelNumberMutationOutput } from './productMutationTypes'

type UpdateModelNumberResolver = (
  context: any,
  modelNumberInput: { modelNumberInput: IModelNumberInput }
) => Promise<IModelNumberMutationOutput>

/**
 * A GraphQL resolver that handles the 'UpdateModelNumber' mutation.
 */
export const updateModelNumber: UpdateModelNumberResolver = async (
  _,
  { modelNumberInput }
) => {
  try {
    await Validation.ModelNumber.Default.validate(modelNumberInput, {
      abortEarly: false,
    })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  try {
    const existingModel = await ModelNumber.find(modelNumberInput.id)
    if (!existingModel) {
      return generateMutationError([ErrorModelNumberIDDoesNotExist])
    }
    const products = await Product.findByIds(modelNumberInput.productIds)
    if (products.length < modelNumberInput.productIds.length) {
      return generateMutationError([ErrorModelNumberRelatedProductDoesNotExist])
    }
    const modelNumber = await ModelNumber.update(modelNumberInput)
    return {
      modelNumber: {
        ...ModelNumber.output(modelNumber),
        products: products ? products.map(Product.output) : [],
      },
      success: true,
    }
  } catch (e) {
    return generateMutationError([
      { path: '_', message: 'Could not update model number.' },
    ])
  }
}
