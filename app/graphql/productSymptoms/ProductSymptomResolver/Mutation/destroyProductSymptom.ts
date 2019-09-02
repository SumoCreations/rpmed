import { ProductSymptom } from "../../../../models"
import { generateMutationError } from "../../../../util"
import {
  ErrorProductSymptomCouldNotBeDestroyed,
  ErrorProductSymptomWithIDDoesNotExist,
} from "../productSymptomErrors"
import { extendSymptomOutput } from "./extendOutput"
import { IProductSymptomMutationOutput } from "./productSymptomMutationTypes"

export const destroyProductSymptom = async (
  _: any,
  { id }: { id: string }
): Promise<IProductSymptomMutationOutput> => {
  const productSymptom = await ProductSymptom.find(id)
  if (!productSymptom) {
    return generateMutationError([ErrorProductSymptomWithIDDoesNotExist])
  }
  try {
    await ProductSymptom.destroy(id)
  } catch (e) {
    return generateMutationError([ErrorProductSymptomCouldNotBeDestroyed])
  }
  return {
    productSymptom: async () => extendSymptomOutput(productSymptom),
    success: true,
  }
}
