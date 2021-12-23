import {
  accessTokenPresent,
  getCurrentAccessLevel,
  getCurrentUserId,
} from './credentials'
import { ISessionState, SessionActionTypes, UPDATE_SESSION } from './types'

const initialState: ISessionState = {
  accessLevel: getCurrentAccessLevel(),
  isAuthenticated: accessTokenPresent(),
  sessionInvalidated: false,
  userId: getCurrentUserId(),
}

export function reducer(
  state = initialState,
  action: SessionActionTypes
): ISessionState {
  switch (action.type) {
    case UPDATE_SESSION: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
