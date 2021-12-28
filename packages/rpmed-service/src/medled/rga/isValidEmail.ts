import { isEmail, isEmpty } from 'validator'
const isValidEmail = (val: string | undefined, opts?: { optional: boolean }) =>
  opts && opts.optional && isEmpty(val || '')
    ? undefined
    : !isEmail(val || '')
    ? 'Must be a valid email address'
    : undefined

export default isValidEmail
