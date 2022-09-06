import jwtDecode from 'jwt-decode'
import { getCookie } from 'react-simple-cookie-store'
import { isEmpty } from 'validator'
import { Token } from './types'

interface IToken {
  userId: string
  iat: number
  exp: number
}

export const getToken = (token: Token): string => getCookie(token)

export const getCurrentUserId = (): string => {
  const accessToken = getCookie(Token.Access)
  return isEmpty(accessToken || '')
    ? ''
    : (jwtDecode(accessToken) as IToken).userId
}

export const accessTokenPresent = (): boolean =>
  !isEmpty(getCookie(Token.Access) || '')

export const refreshTokenPresent = (): boolean =>
  !isEmpty(getCookie(Token.Refresh) || '') &&
  getCookie(Token.Refresh) !== 'invalid'
