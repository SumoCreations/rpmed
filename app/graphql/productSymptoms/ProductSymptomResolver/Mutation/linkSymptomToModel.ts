import { formatError, RequiredBoolean, RequiredString, validation } from "rpmed-validation-schema"
import { addSymptomToModelNumber, ModelNumber, ProductSymptom, removeSymptomFromModelNumber } from "../../../../models"
import { ErrorModelNumberIDDoesNotExist, ErrorProductSymptomAndModelNumberAssociationFailed, ErrorProductSymptomWithIDDoesNotExist } from "../productSymptomErrors"
import { IProductSymptomMutationOutput } from "./productSymptomMutationTypes"

interface ILinkSymptomMutationArguments { modelNumber: string, symptomId: string, linked: boolean }

export const linkSymptomToModel = async (
  _: any,
  { modelNumber, symptomId, linked }: ILinkSymptomMutationArguments
): Promise<IProductSymptomMutationOutput> => {

  const argumentSchema = validation({
    linked: RequiredBoolean(),
    modelNumber: RequiredString(),
    symptomId: RequiredString(),
  })
  try {
    await argumentSchema.validate({ modelNumber, symptomId, linked }, { abortEarly: false })
  } catch (e) {
    return { errors: formatError(e), success: false }
  }

  const existingProductSymptom = await ProductSymptom.find(symptomId)
  if (!existingProductSymptom) {
    return {
      errors: [ErrorProductSymptomWithIDDoesNotExist],
      success: false
    }
  }

  const existingModelNumber = await ModelNumber.find(modelNumber)
  if (!existingModelNumber) {
    return {
      errors: [ErrorModelNumberIDDoesNotExist],
      success: false
    }
  }

  try {
    if (linked) {
      await addSymptomToModelNumber(symptomId, modelNumber)
    } else {
      await removeSymptomFromModelNumber(symptomId, modelNumber)
    }
    return {
      success: true
    }
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return { success: false, errors: [ErrorProductSymptomAndModelNumberAssociationFailed] }
  }
}