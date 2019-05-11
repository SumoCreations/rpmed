import { ErrorList } from "rpmed-validation-schema"
import { IRGAOutput } from "../../../../models"

export interface IRGAMutationOutput {
  product?: IRGAOutput
  errors?: ErrorList
  success: boolean
}