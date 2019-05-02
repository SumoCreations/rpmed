import { ErrorList } from "rpmed-validation-schema"
import { IProductSymptomOutput } from "../../../../models"

export interface IProductSymptomMutationOutput {
  productSymptom?: IProductSymptomOutput
  errors?: ErrorList
  success: boolean
}