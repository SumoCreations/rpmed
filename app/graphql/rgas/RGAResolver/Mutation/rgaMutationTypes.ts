import { ErrorList } from "rpmed-validation-schema"
import { IRGAGoodOutput, IRGAOutput } from "../../../../models"

export interface IRGAMutationOutput {
  rga?: IRGAOutput
  errors?: ErrorList
  success: boolean
}

export interface IRGAGoodMutationOutput {
  rgaGood?: IRGAGoodOutput
  errors?: ErrorList
  success: boolean
}