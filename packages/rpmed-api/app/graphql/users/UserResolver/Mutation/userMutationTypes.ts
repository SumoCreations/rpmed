import { ErrorList } from '../../../../validations'
import { IUserOutput } from '../../../../models'

export interface IMutationOutput {
  user?: IUserOutput
  errors?: ErrorList
  success: boolean
}
