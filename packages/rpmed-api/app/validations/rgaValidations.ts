import * as Yup from 'yup'
import { RequiredDate } from './dateValidations'
import { RequiredEmail } from './emailValidations'
import { RequiredString } from './stringValidations'

export interface IRGAValidationInput {
  submittedBy: string
  submittedOn: string | object
  shippingSpeed: string
}

const Default = Yup.object<IRGAValidationInput>({
  shippingSpeed: RequiredString(),
  submittedBy: RequiredEmail(),
  submittedOn: RequiredDate(),
})

export interface IRGAExistingValidationInput {
  id: string
  shippingSpeed: string
}

const Existing = Yup.object<IRGAExistingValidationInput>({
  id: RequiredString(),
  shippingSpeed: RequiredString(),
})

export const RGA = {
  Default,
  Existing,
}
