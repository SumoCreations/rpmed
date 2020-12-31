import * as Yup from 'yup'
import { RequiredDate } from './dateValidations'
import { OptionalString, RequiredString } from './stringValidations'

export interface IProductRegistrationValidationInput {
  customerId: string
  modelNumber: string
  serial?: string | null
  registeredOn: object | string
}

const Default = Yup.object<IProductRegistrationValidationInput>({
  customerId: RequiredString(),
  modelNumber: RequiredString(),
  registeredOn: RequiredDate(),
  serial: OptionalString(),
})

export const ProductRegistration = {
  Default,
}
