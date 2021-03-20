import * as Yup from 'yup'

export const OptionalBoolean = () => Yup.boolean().nullable()
export const RequiredBoolean = () => Yup.boolean().required('Cannot be blank')
