import { ErrorList } from "rpmed-validation-schema"
import { IModelNumberOutput, IProductSymptomOutput } from "../../../../models"

interface IExtendedModelNumberOutput extends IModelNumberOutput {
  symptoms: () => Promise<IProductSymptomOutput[]>
}

interface IExtendedProductSymptomOutput extends IProductSymptomOutput {
  modelNumbers: () => Promise<IExtendedModelNumberOutput[]>
}

export interface IProductSymptomMutationOutput {
  modelNumber?: () => Promise<IExtendedModelNumberOutput>
  productSymptom?: () => Promise<IExtendedProductSymptomOutput>
  errors?: ErrorList
  success: boolean
}
