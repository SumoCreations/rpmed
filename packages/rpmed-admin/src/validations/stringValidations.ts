import * as Yup from 'yup'

export const OptionalString = () => Yup.string()
export const RequiredString = () => OptionalString().required('Cannot be blank')
