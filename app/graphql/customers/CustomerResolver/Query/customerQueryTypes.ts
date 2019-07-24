import { ErrorList } from "rpmed-validation-schema"
import { ICustomerOutput } from "../../../../models"

export interface ICustomerQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  customers?: ICustomerOutput[]
  customer?: ICustomerOutput
  errors?: ErrorList
  success: boolean
}