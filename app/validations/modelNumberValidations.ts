import * as Yup from 'yup'
import { RequiredNumber } from './numberValidations'
import { OptionalString, RequiredString } from './stringValidations'

export interface IModelNumberValidationInput {
  id: string
  description: string
  lotted: boolean
  productId: string
  warrantyTerm: number
  warrantyDescription: string
  resolutionWithWarranty?: string | null
  resolutionWithoutWarranty?: string | null
  feeWithWarranty: number
  feeWithoutWarranty: number
  publicNotes?: string | null
  privateNotes?: string | null
}

const Default = Yup.object<IModelNumberValidationInput>({
  description: RequiredString(),
  feeWithWarranty: RequiredNumber(),
  feeWithoutWarranty: RequiredNumber(),
  id: RequiredString(),
  lotted: Yup.boolean().required('Cannot be blank'),
  privateNotes: OptionalString(),
  productId: RequiredString(),
  publicNotes: OptionalString(),
  resolutionWithWarranty: OptionalString(),
  resolutionWithoutWarranty: OptionalString(),
  warrantyDescription: RequiredString(),
  warrantyTerm: RequiredNumber(),
})

export const ModelNumber = {
  Default,
}
