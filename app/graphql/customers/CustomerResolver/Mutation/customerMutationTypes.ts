import { ErrorList } from "rpmed-validation-schema"
import { ICustomerOutput } from "../../../../models"

export interface ICustomerMutationOutput {
  customer?: ICustomerOutput
  errors?: ErrorList
  success: boolean
}