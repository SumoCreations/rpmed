import { ICustomerOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

export interface ICustomerQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  customers?: ICustomerOutput[]
  customer?: ICustomerOutput
  errors?: ErrorList
  success: boolean
}
