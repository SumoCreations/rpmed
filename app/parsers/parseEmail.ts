import { isEmail } from 'validator'

export const parseEmail = (body: string): string | never => {
  const { email } = JSON.parse(body)
  if (!isEmail(email || '')) {
    throw Error('Email was not a valid email address.')
  }
  return email
}
