import * as Yup from 'yup'
import { RequiredEmail } from './emailValidations'
import { OptionalString } from './stringValidations'

export interface ICustomerValidationInput {
  email: string
  name: string | null
}

const Default = Yup.object<ICustomerValidationInput>({
  email: RequiredEmail(),
  name: OptionalString(),
})

export const Customer = {
  Default,
}
