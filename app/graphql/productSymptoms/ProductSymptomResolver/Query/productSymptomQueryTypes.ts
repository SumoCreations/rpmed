import { ErrorList } from "rpmed-validation-schema"
import { IModelNumberOutput, IProductSymptomOutput } from "../../../../models"

interface IExtendedProductSymptomOutput extends IProductSymptomOutput {
  modelNumbers: () => Promise<IModelNumberOutput[]>
}

export interface IProductSymptomQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  productSymptoms?: IExtendedProductSymptomOutput[]
  productSymptom?: IExtendedProductSymptomOutput
  errors?: ErrorList
  success: boolean
}
