export enum Token {
  Access = 'ACCESS_TOKEN',
  Refresh = 'REFRESH_TOKEN',
  Temporary = 'TEMPORARY_TOKEN',
}

export interface ICredentials {
  accessToken?: string
  refreshToken?: string
}

// Redux Types

export const UPDATE_SESSION = 'UPDATE_SESSION'

export interface ISessionState {
  isAuthenticated: boolean
  userId: string
}

interface IUpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: ISessionState
}

export type SessionActionTypes = IUpdateSessionAction
