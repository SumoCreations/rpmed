import { IDistributorOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

export interface IDistributorQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  distributors?: IDistributorOutput[]
  distributor?: IDistributorOutput
  errors?: ErrorList
  success: boolean
}
