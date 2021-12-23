import jwtDecode from 'jwt-decode'
import { isEmpty } from 'validator'
import { AccessLevel } from './types'
import { getAccessToken } from './getAccessToken'
import { getBearerToken } from './getBearerToken'

interface IToken {
  accessLevel: AccessLevel
  userId: string
  iat: number
  exp: number
}

export const getCurrentAccessLevel = (): AccessLevel => {
  const accessToken = getAccessToken()
  return isEmpty(accessToken || '')
    ? AccessLevel.User
    : (jwtDecode(accessToken) as IToken).accessLevel
}

export const getCurrentUserId = (): string => {
  const accessToken = getAccessToken()
  return isEmpty(accessToken || '')
    ? ''
    : (jwtDecode(accessToken) as IToken).userId
}

export const getCurrentEmailAddress = (): string => {
  const accessToken = getBearerToken()
  return isEmpty(accessToken || '')
    ? ''
    : (jwtDecode(accessToken) as any).emailAddress
}

export const accessTokenPresent = (): boolean =>
  !isEmpty(getAccessToken() || '')
