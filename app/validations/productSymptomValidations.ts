import * as Yup from 'yup'
import { RequiredBoolean } from './booleanValidations'
import { OptionalString, RequiredString } from './stringValidations'

export interface IProductSymptomValidationInput {
  careTip: string | null
  faultCode: string
  fee: boolean
  preApproved: boolean
  name: string
  solution: string
  synopsis: string
}

const Default = Yup.object<IProductSymptomValidationInput>({
  careTip: OptionalString(),
  faultCode: RequiredString(),
  fee: RequiredBoolean(),
  name: RequiredString(),
  preApproved: RequiredBoolean(),
  solution: RequiredString(),
  synopsis: RequiredString(),
})

export const ProductSymptom = {
  Default,
}
