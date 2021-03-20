import * as Yup from 'yup'

export const OptionalPassword = () =>
  Yup.string().min(8, 'Must be at least 8 characters long.')
export const RequiredPassword = () =>
  OptionalPassword().required('Cannot be blank')
