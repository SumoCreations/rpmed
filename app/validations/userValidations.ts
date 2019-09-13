import * as Yup from 'yup'
import { RequiredEmail } from './emailValidations'
import { OptionalPassword, RequiredPassword } from './passwordValidations'
import { RequiredString } from './stringValidations'

export interface IUserValidationInput {
  email: string
  firstName: string
  lastName: string
  password?: string | null
}

export interface IExistingUserValidationInput extends IUserValidationInput {
  id: string
  password: string | null
}

const New = Yup.object<IUserValidationInput>({
  email: RequiredEmail(),
  firstName: RequiredString(),
  lastName: RequiredString(),
  password: RequiredPassword(),
})

const Existing = Yup.object<IExistingUserValidationInput>({
  email: RequiredEmail(),
  firstName: RequiredString(),
  id: RequiredString(),
  lastName: RequiredString(),
  password: OptionalPassword(),
})

export const User = {
  Existing,
  New,
}
