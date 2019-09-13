import * as Yup from 'yup'
import { RequiredString } from './stringValidations'

export interface IDistributorValidationInput {
  name: string
  domain: string
}

const Default = Yup.object<IDistributorValidationInput>({
  domain: RequiredString(),
  name: RequiredString(),
})

export const Distributor = {
  Default,
}
