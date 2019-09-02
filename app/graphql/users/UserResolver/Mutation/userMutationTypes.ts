import { ErrorList } from 'rpmed-validation-schema'
import { IUserOutput } from '../../../../models'

export interface IMutationOutput {
  user?: IUserOutput
  errors?: ErrorList
  success: boolean
}
