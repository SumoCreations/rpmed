import * as Yup from 'yup'

export const validation = (fields: any) => Yup.object().shape(fields)

export const validateArrayOf = (shape: any) => Yup.array().of(shape)
