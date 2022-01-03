import { FormikHelpers } from 'formik'
import React from 'react'
import { FeeStructure, ProductType } from 'rpmed-schema'
import { Input } from 'rpmed-ui/lib/V1'

export enum FormSection {
  ModelNumber,
  Symptom,
  Synopsis,
  Details,
  Customer,
  Shipping,
}

export interface IRGAGoodFormProps {
  initialValues: IRGAGoodFormValues
  initialSection?: FormSection
  editing?: boolean
  onSectionChange?: (section: FormSection) => void
  onSubmit: RGAGoodFormSubmitHandler
}

export interface IRGAGoodFormValues {
  [key: string]: any
  id?: string | undefined
  serial?: string | undefined
  warrantied?: boolean | undefined
  modelNumber?: string | undefined
  lotted?: boolean | undefined
  faultCode?: string
  symptomDescription?: string | undefined
  symptomId?: string | undefined
  symptomSynopsis?: string | undefined
  symptomSolution?: string | undefined
  customerEmail?: string | undefined
  customerName?: string | undefined
  customerSpecialty?: string | undefined
  productId?: string | undefined
  productName?: string | undefined
  productType?: ProductType | undefined
  preApproved?: boolean | undefined
  resolution?: string
  resolutionFee?: FeeStructure
  shippingSpeed?: string
  warrantyTerm?: string | number | undefined
  warrantyDescription?: string | undefined
  notes?: string | undefined
  rma?: string | undefined
  po?: string | undefined
}

export type RGAGoodFormSubmitHandler = (
  values: IRGAGoodFormValues,
  actions: FormikHelpers<IRGAGoodFormValues>
) => void

export const FormField = Input.Renderer<IRGAGoodFormValues>()

export interface IRgaGoodFormSection {
  onSubmit?: React.MouseEventHandler
  hideSubmit?: boolean
}

export interface IInteractiveSection extends IRgaGoodFormSection {
  values: IRGAGoodFormValues
  onDismiss?: (name: string) => any
}
