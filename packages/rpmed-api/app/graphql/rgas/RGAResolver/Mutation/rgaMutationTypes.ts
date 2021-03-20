import { IRGAGoodOutput, IRGAOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

export interface IRGAMutationOutput {
  rga?: IRGAOutput
  errors?: ErrorList
  success: boolean
}

export interface IRGAGoodMutationOutput {
  rgaId?: string
  rgaGood?: IRGAGoodOutput
  errors?: ErrorList
  success: boolean
}
