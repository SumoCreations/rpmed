import { ErrorList } from "rpmed-validation-schema"
import { IModelNumberOutput, IProductOutput } from "../../../../models"

export interface IProductMutationOutput {
  product?: IProductOutput
  errors?: ErrorList
  success: boolean
}

export interface IModelNumberMutationOutput {
  modelNumber?: IModelNumberOutput
  errors?: ErrorList
  success: boolean
}