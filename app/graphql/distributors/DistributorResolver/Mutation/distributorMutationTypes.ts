import { ErrorList } from "rpmed-validation-schema"
import { IDistributorOutput } from "../../../../models"

export interface IDistributorMutationOutput {
  distributor?: IDistributorOutput
  errors?: ErrorList
  success: boolean
}