import * as Yup from 'yup'
import { RequiredNumber } from './numberValidations'
import { OptionalString, RequiredString } from './stringValidations'

interface IFeeStructure {
  distributor: string
  endUser: string
}

interface IPricing {
  cost: string
  retail: string
}

export interface IModelNumberValidationInput {
  id: string
  description: string
  lotted: boolean
  productIds: string[]
  warrantyTerm: number
  warrantyDescription: string
  resolutionWithWarranty?: string | null
  resolutionWithoutWarranty?: string | null
  feeWithWarranty: IFeeStructure
  feeWithoutWarranty: IFeeStructure
  pricing: IPricing
  publicNotes?: string | null
  privateNotes?: string | null
}

const Default = Yup.object<IModelNumberValidationInput>({
  description: RequiredString(),
  feeWithWarranty: Yup.object().shape({
    distributor: RequiredString(),
    endUser: RequiredString(),
  }),
  feeWithoutWarranty: Yup.object().shape({
    distributor: OptionalString(),
    endUser: OptionalString(),
  }),
  id: RequiredString(),
  lotted: Yup.boolean().required('Cannot be blank'),
  pricing: Yup.object().shape({
    cost: RequiredString(),
    retail: RequiredString(),
  }),
  privateNotes: OptionalString(),
  productIds: Yup.array(RequiredString()),
  publicNotes: OptionalString(),
  resolutionWithWarranty: OptionalString(),
  resolutionWithoutWarranty: OptionalString(),
  warrantyDescription: RequiredString(),
  warrantyTerm: RequiredNumber(),
})

const Lotted = Yup.object<{
  lotted: boolean
  id: string
}>({
  id: RequiredString(),
  lotted: Yup.boolean().required('Cannot be blank'),
})

const Viewable = Yup.object<{
  publiclyViewable: boolean
  id: string
}>({
  id: RequiredString(),
  publiclyViewable: Yup.boolean().required('Cannot be blank'),
})

export const ModelNumber = {
  Default,
  Lotted,
  Viewable,
}
