import { ErrorList } from "rpmed-validation-schema"
import { IProductRegistrationOutput } from "../../../../models"

export interface IProductRegistrationMutationOutput {
  productRegistration?: IProductRegistrationOutput
  errors?: ErrorList
  success: boolean
}