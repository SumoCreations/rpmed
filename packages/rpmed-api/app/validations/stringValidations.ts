import * as Yup from 'yup'

export const OptionalString = () => Yup.string().nullable()
export const RequiredString = () => Yup.string().required('Cannot be blank')
