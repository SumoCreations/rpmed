import { ModelNumber } from '../../../../models'
import {
  ModelNumberMutationOutput,
  MutationUpdateModelNumberViewableArgs,
} from '../../../../schema'
import { generateMutationError } from '../../../../util'
import * as Validation from '../../../../validations'
import { ErrorModelNumberIDDoesNotExist } from '../productErrors'

/**
 * A GraphQL resolver that handles the 'UpdateModelNumberLotted' mutation.
 * Allows us to easily toggle the viewable status of a model without updating
 * the remaining attributes.
 */
export const updateModelNumberViewable = async (
  _,
  { id, publiclyViewable }: MutationUpdateModelNumberViewableArgs
): Promise<ModelNumberMutationOutput> => {
  try {
    await Validation.ModelNumber.Viewable.validate(
      { id, publiclyViewable },
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
    const modelNumber = await ModelNumber.setViewable({
      id,
      publiclyViewable,
    })
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
