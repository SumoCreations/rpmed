import { IModelNumberOutput, IProductOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

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
