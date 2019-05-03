import { ErrorList } from "rpmed-validation-schema"
import { IProductRegistrationOutput } from "../../../../models"

export interface IProductRegistrationQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  productRegistrations?: IProductRegistrationOutput[]
  productRegistration?: IProductRegistrationOutput
  errors?: ErrorList
  success: boolean
}