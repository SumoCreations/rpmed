import * as Yup from 'yup'

export const validation = (fields: Yup.ObjectSchemaDefinition<{}>) =>
  Yup.object().shape(fields)

export const validateArrayOf = (shape: Yup.Schema<{}>) => Yup.array().of(shape)
