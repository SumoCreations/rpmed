import { ErrorList } from "rpmed-validation-schema"
import { ICustomerOutput, IProductRegistrationOutput } from "../../../../models"

interface IExtendedProductRegistrationOutput extends IProductRegistrationOutput {
  customer: () => Promise<ICustomerOutput | null>
}

export interface IProductRegistrationMutationOutput {
  productRegistration?: IExtendedProductRegistrationOutput
  errors?: ErrorList
  success: boolean
}