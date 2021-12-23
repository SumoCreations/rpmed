export enum AccessLevel {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface ICredentials {
  temporaryAccessToken?: string
  refreshToken?: string
  accessToken?: string
}

// Redux Types

export const UPDATE_SESSION = 'UPDATE_SESSION'

export interface ISessionState {
  isAuthenticated: boolean
  userId: string
  accessLevel: AccessLevel
  sessionInvalidated: boolean
}

interface IUpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: ISessionState
}

export type SessionActionTypes = IUpdateSessionAction
