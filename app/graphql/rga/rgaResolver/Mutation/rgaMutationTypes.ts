import { ErrorList } from "rpmed-validation-schema"
import { IRGAOutput } from "../../../../models"

export interface IRGAMutationOutput {
  rga?: IRGAOutput
  errors?: ErrorList
  success: boolean
}