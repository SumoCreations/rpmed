import { ICustomerOutput, IProductRegistrationOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

interface IExtendedProductRegistrationOutput
  extends IProductRegistrationOutput {
  customer: () => Promise<ICustomerOutput | null>
}

export interface IProductRegistrationQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  productRegistrations?: IExtendedProductRegistrationOutput[]
  productRegistration?: IExtendedProductRegistrationOutput
  errors?: ErrorList
  success: boolean
}
