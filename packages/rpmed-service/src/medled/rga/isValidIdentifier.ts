import { isLength } from 'validator'

const isValidIdentifier = (val: string | undefined): string | undefined =>
  !isLength(val || '', { min: 12, max: undefined })
    ? 'Must be at least 12 characters'
    : undefined

export default isValidIdentifier
