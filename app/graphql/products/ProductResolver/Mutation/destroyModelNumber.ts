import { ModelNumber } from '../../../../models'
import { generateMutationError } from '../../../../util'
import {
  ErrorModelNumberCouldNotBeDestroyed,
  ErrorModelNumberIDDoesNotExist,
} from '../productErrors'
import { IModelNumberMutationOutput } from './productMutationTypes'

export const destroyModelNumber = async (
  _: any,
  { id }: { id: string }
): Promise<IModelNumberMutationOutput> => {
  const modelNumber = await ModelNumber.find(id)
  if (!modelNumber) {
    return generateMutationError([ErrorModelNumberIDDoesNotExist])
  }
  try {
    await ModelNumber.destroy(id)
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return generateMutationError([ErrorModelNumberCouldNotBeDestroyed])
  }
  return { modelNumber: ModelNumber.output(modelNumber), success: true }
}
