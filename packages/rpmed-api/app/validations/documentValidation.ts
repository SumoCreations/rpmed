import * as Yup from 'yup'
import { OptionalString } from '.'
import { RequiredString } from './stringValidations'


const Default = Yup.object<any>({
  title: RequiredString(),
  slug: RequiredString(),
  fileKey: OptionalString(),
  keywords: OptionalString(),
  desciption: OptionalString()
})

export const Document = {
  Default,
}
