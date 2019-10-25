import * as Yup from 'yup'
import { RequiredString } from './stringValidations'

export interface IProductValidationInput {
  name: string
  description: string
}

const Default = Yup.object<IProductValidationInput>({
  description: RequiredString(),
  name: RequiredString(),
})

export const Product = {
  Default,
}
