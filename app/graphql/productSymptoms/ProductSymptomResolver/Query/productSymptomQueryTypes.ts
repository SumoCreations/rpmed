import { ErrorList } from "rpmed-validation-schema"
import { IProductSymptomOutput } from "../../../../models"

export interface IProductSymptomQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  productSymptoms?: IProductSymptomOutput[]
  productSymptom?: IProductSymptomOutput
  errors?: ErrorList
  success: boolean
}