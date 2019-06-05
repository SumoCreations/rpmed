import { ErrorList } from "rpmed-validation-schema"
import { IModelNumberOutput, IProductOutput, IProductSymptomOutput } from "../../../../models"

interface IExtendedModelNumberOutput extends IModelNumberOutput {
  product: () => Promise<IProductOutput | null>
  symptoms: () => Promise<IProductSymptomOutput[]>
}

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
  modelNumbers?: IExtendedModelNumberOutput[]
  modelNumber?: IExtendedModelNumberOutput
  errors?: ErrorList
  success: boolean
}