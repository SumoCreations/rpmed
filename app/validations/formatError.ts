import * as Yup from 'yup'

export interface IValidationError {
  message: string
  path: string
}

export type ErrorList = IValidationError[]

export const formatError = (err: Yup.ValidationError): ErrorList =>
  err.inner.map(e => ({
    message: e.message,
    path: e.path,
  }))
