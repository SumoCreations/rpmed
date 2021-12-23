import * as Yup from 'yup'
import { OptionalString } from '.'
import { RequiredString } from './stringValidations'


const Default = Yup.object<any>({
  title: RequiredString(),
  slug: RequiredString(),
  keywords: OptionalString(),
  desciption: OptionalString()
})

export const Page = {
  Default,
}
