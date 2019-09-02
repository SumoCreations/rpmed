import {
  formatError,
  RequiredNumber,
  RequiredString,
  validation,
} from "rpmed-validation-schema"
import {
  AttachedImageStatus,
  mergeImages,
  ProductSymptom,
} from "../../../../models"
import {
  ErrorProductSymptomAndAttachedImageUpdateFailed,
  ErrorProductSymptomWithIDDoesNotExist,
} from "../productSymptomErrors"
import { extendSymptomOutput } from "./extendOutput"
import { IProductSymptomMutationOutput } from "./productSymptomMutationTypes"

interface IAttachedImageInput {
  status: AttachedImageStatus
  id: string
  position: number
}
interface IAttachImageToSymptomMutationArguments {
  symptomId: string
  attachedImages: IAttachedImageInput[]
}

export const attachImagesToSymptom = async (
  _: any,
  { symptomId, attachedImages }: IAttachImageToSymptomMutationArguments
): Promise<IProductSymptomMutationOutput> => {
  const argumentSchema = validation({
    id: RequiredString(),
    position: RequiredNumber(),
    status: RequiredString(),
  })

  try {
    const validations = attachedImages.map(
      async attachedImage =>
        await argumentSchema.validate(attachedImage, { abortEarly: false })
    )
    await Promise.all(validations)
  } catch (e) {
    return { errors: formatError(e), success: false }
  }

  const existingProductSymptom = await ProductSymptom.find(symptomId)
  if (!existingProductSymptom) {
    return {
      errors: [ErrorProductSymptomWithIDDoesNotExist],
      success: false,
    }
  }

  try {
    await mergeImages(existingProductSymptom, attachedImages)
    return {
      productSymptom: async () =>
        extendSymptomOutput(await ProductSymptom.find(symptomId)),
      success: true,
    }
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return {
      success: false,
      errors: [ErrorProductSymptomAndAttachedImageUpdateFailed],
    }
  }
}
