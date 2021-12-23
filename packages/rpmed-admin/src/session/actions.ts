import { getCookie, removeCookie, setCookie } from 'react-simple-cookie-store'
import { accessTokenPresent, getCurrentUserId } from './credentials'
import {
  ICredentials,
  SessionActionTypes,
  Token,
  UPDATE_SESSION,
} from './types'

export const updateCredentials = (creds: ICredentials): void => {
  setCookie(Token.Access, creds.accessToken || '', 7)
  setCookie(Token.Refresh, creds.refreshToken || '', 7)
  removeCookie(Token.Temporary)
}

export const getCredentials = (): ICredentials => ({
  accessToken: getCookie(Token.Access),
  refreshToken: getCookie(Token.Refresh),
})

export const updateSession = (newSession: ICredentials): SessionActionTypes => {
  updateCredentials(newSession)
  return {
    payload: {
      isAuthenticated: accessTokenPresent(),
      userId: getCurrentUserId(),
    },
    type: UPDATE_SESSION,
  }
}

export const clearSession = (): SessionActionTypes => {
  updateCredentials({ accessToken: '', refreshToken: '' })
  return {
    payload: {
      isAuthenticated: accessTokenPresent(),
      userId: getCurrentUserId(),
    },
    type: UPDATE_SESSION,
  }
}
