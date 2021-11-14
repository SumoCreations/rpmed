import { ISessionState, AccessLevel } from './types'

/**
 * Returns true if the current state indicates the user is authenticated.
 * @param state The current session state.
 */
export const isAuthenticated = (state: ISessionState) => state.isAuthenticated

/**
 * Returns true if the current state indicates the user lost their session due to an error.
 * @param state The current session state.
 */
export const hasInvalidSession = (state: ISessionState) =>
  state.sessionInvalidated

/**
 * Returns true if the current state indicates the user is an admin.
 * @param state The current session state.
 */
export const isAdmin = (state: ISessionState) =>
  state.accessLevel === AccessLevel.Admin
