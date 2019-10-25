import * as Yup from 'yup'
import { RequiredBoolean } from './booleanValidations'
import { OptionalEmail } from './emailValidations'
import { OptionalString, RequiredString } from './stringValidations'

export interface IRGAGoodValidationInput {
  customerName: string | null
  customerEmail: string | null
  modelNumber: string
  notes: string | null
  po: string | null
  rma: string | null
  symptomId: string
  warrantied: boolean
}

const Default = Yup.object<IRGAGoodValidationInput>({
  customerEmail: OptionalEmail(),
  customerName: OptionalString(),
  modelNumber: RequiredString(),
  notes: OptionalString(),
  po: OptionalString(),
  rma: OptionalString(),
  symptomId: RequiredString(),
  warrantied: RequiredBoolean(),
})

export const RGAGood = {
  Default,
}
