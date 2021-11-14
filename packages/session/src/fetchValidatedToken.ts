import {
  getAccessToken as getValidAccessToken,
  IConfig,
} from 'redux-jwt-protected-middleware'
import { clearSession, updateSession } from './actions'
import { isAuthenticated } from './selectors'
import { getBearerToken } from './getBearerToken'
import { getRefreshToken } from './getRefreshToken'
import { refreshCurrentAccessToken } from './refreshCurrentAccessToken'

const generateConfig = (apiUrl: string): IConfig => ({
  currentAccessToken: () => getBearerToken(),
  currentRefreshToken: () => getRefreshToken(),
  handleAuthenticationError: (e, store) => {
    if (!isAuthenticated(store.getState())) {
      store.dispatch(clearSession({ invalidSession: false }))
      return ''
    }
    console.log('Could not refresh token:')
    console.log(e)
    store.dispatch(clearSession({ invalidSession: true }))
  },
  handleRefreshAccessToken: async (refreshToken: string, store) => {
    try {
      const response = await refreshCurrentAccessToken(apiUrl, refreshToken)
      if (response.errors && Object.keys(response.errors).length > 0) {
        store.dispatch(clearSession({ invalidSession: true }))
      }
      store.dispatch(
        updateSession({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      )
      return response.accessToken || ''
    } catch (e) {
      // tslint:disable-next-line no-console
      console.log(e)
      return ''
    }
  },
})

/**
 * Refreshes the current access token via the session store
 * of our redux application.
 */
export const fetchValidatedToken = (apiUrl: string) =>
  getValidAccessToken(generateConfig(apiUrl))
