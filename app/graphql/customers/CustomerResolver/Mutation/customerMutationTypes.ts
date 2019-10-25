import { ICustomerOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

export interface ICustomerMutationOutput {
  customer?: ICustomerOutput
  errors?: ErrorList
  success: boolean
}
