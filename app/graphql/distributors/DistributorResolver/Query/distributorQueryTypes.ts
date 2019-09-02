import { ErrorList } from 'rpmed-validation-schema'
import { IDistributorOutput } from '../../../../models'

export interface IDistributorQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  distributors?: IDistributorOutput[]
  distributor?: IDistributorOutput
  errors?: ErrorList
  success: boolean
}
