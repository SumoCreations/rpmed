import * as Yup from 'yup'
import { RequiredDate } from './dateValidations'
import { RequiredEmail } from './emailValidations'

export interface IRGAValidationInput {
  submittedBy: string
  submittedOn: string | object
}

const Default = Yup.object<IRGAValidationInput>({
  submittedBy: RequiredEmail(),
  submittedOn: RequiredDate(),
})

export const RGA = {
  Default,
}
