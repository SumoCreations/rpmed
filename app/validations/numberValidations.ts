import * as Yup from 'yup'

export const OptionalNumber = () => Yup.number()
export const RequiredNumber = () => OptionalNumber().required('Cannot be blank')
