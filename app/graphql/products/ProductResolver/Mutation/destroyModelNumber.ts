
import { ModelNumber } from "../../../../models"
import { ErrorModelNumberCouldNotBeDestroyed, ErrorModelNumberIDDoesNotExist } from "./productErrors"
import { IModelNumberMutationOutput } from "./productMutationTypes"

export const destroyModelNumber = async (
  _: any,
  { id }: { id: string }
): Promise<IModelNumberMutationOutput> => {
  const modelNumber = await ModelNumber.find(id)
  if (!modelNumber) {
    return { success: false, errors: [ErrorModelNumberIDDoesNotExist] }
  }
  try {
    await ModelNumber.destroy(id)
  } catch (e) {
    return { success: false, errors: [ErrorModelNumberCouldNotBeDestroyed] }
  }
  return { modelNumber: ModelNumber.output(modelNumber), success: true }
}