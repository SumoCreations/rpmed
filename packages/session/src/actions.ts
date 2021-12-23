import { clearCredentials } from './clearCredentials'
import {
  accessTokenPresent,
  getCurrentAccessLevel,
  getCurrentUserId,
} from './credentials'
import { setCredentials } from './setCredentials'
import {
  ICredentials,
  SessionActionTypes,
  UPDATE_SESSION,
  AccessLevel,
} from './types'

export const updateCredentials = (creds: ICredentials): void => {
  setCredentials(creds)
}

export const updateSession = (newSession: ICredentials): SessionActionTypes => {
  updateCredentials(newSession)
  return {
    payload: {
      accessLevel: getCurrentAccessLevel(),
      isAuthenticated: accessTokenPresent(),
      sessionInvalidated: false,
      userId: getCurrentUserId(),
    },
    type: UPDATE_SESSION,
  }
}

export const clearSession = (
  flags: { invalidSession: boolean } | undefined
): SessionActionTypes => {
  clearCredentials()
  return {
    payload: {
      accessLevel: AccessLevel.User,
      isAuthenticated: accessTokenPresent(),
      sessionInvalidated: (flags && flags.invalidSession) || false,
      userId: getCurrentUserId(),
    },
    type: UPDATE_SESSION,
  }
}
