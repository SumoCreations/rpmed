import * as Yup from 'yup'

export const OptionalEmail = () =>
  Yup.string().email('Must be a valid email address')

export const RequiredEmail = () => OptionalEmail().required('Cannot be blank')
