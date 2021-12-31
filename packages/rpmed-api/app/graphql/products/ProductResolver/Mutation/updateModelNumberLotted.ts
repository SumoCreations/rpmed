import { ModelNumber } from '../../../../models'
import {
  ModelNumberMutationOutput,
  MutationUpdateModelNumberLottedArgs,
} from 'rpmed-schema'
import { generateMutationError } from 'api-utils'
import * as Validation from '../../../../validations'
import { ErrorModelNumberIDDoesNotExist } from '../productErrors'

/**
 * A GraphQL resolver that handles the 'UpdateModelNumberLotted' mutation.
 * Allows us to easily toggle the lotted status of a model without updating
 * the remaining attributes.
 */
export const updateModelNumberLotted = async (
  _,
  { id, lotted }: MutationUpdateModelNumberLottedArgs
): Promise<ModelNumberMutationOutput> => {
  try {
    await Validation.ModelNumber.Lotted.validate(
      { id, lotted },
      {
        abortEarly: false,
      }
    )
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  try {
    const existingModel = await ModelNumber.find(id)
    if (!existingModel) {
      return generateMutationError([ErrorModelNumberIDDoesNotExist])
    }
    const modelNumber = await ModelNumber.setLotted({ id, lotted })
    return {
      modelNumber: {
        ...ModelNumber.output(modelNumber),
        products: null,
        symptoms: null,
      },
      success: true,
    }
  } catch (e) {
    return generateMutationError([
      { path: '_', message: 'Could not update model number.' },
    ])
  }
}
