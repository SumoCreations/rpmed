import { ErrorList } from "rpmed-validation-schema"
import { IModelNumberOutput, IProductOutput } from "../../../../models"

export interface IProductQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  products?: IProductOutput[]
  product?: IProductOutput
  errors?: ErrorList
  success: boolean
}

export interface IModelNumberQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  modelNumbers?: IModelNumberOutput[]
  modelNumber?: IModelNumberOutput
  errors?: ErrorList
  success: boolean
}