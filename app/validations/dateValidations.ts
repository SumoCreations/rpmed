import * as Yup from 'yup'

export const OptionalDate = () => Yup.date()
export const RequiredDate = () => OptionalDate().required('Cannot be blank')
