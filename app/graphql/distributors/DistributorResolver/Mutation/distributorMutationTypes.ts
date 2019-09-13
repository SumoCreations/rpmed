import { IDistributorOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

export interface IDistributorMutationOutput {
  distributor?: IDistributorOutput
  errors?: ErrorList
  success: boolean
}
