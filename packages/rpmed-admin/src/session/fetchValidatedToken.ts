import {
  getAccessToken as getValidAccessToken,
  IConfig,
} from 'redux-jwt-protected-middleware'
import { getCredentials, updateSession } from './actions'
import { refreshCurrentAccessToken } from './refreshCurrentAccessToken'

const config: IConfig = {
  currentAccessToken: () => getCredentials().accessToken || '',
  currentRefreshToken: () => getCredentials().refreshToken || '',
  handleAuthenticationError: e => {
    // tslint:disable-next-line no-console
    console.log('Could not refresh token:')
    // tslint:disable-next-line no-console
    console.log(e)
  },
  handleRefreshAccessToken: async (refreshToken: string, store) => {
    const response = await refreshCurrentAccessToken(refreshToken)
    store.dispatch(
      updateSession({
        accessToken: response.accessToken || '',
        refreshToken: response.refreshToken || '',
      })
    )
    return response.accessToken || ''
  },
}

/**
 * Refreshes the current access token via the session store
 * of our redux application.
 */
export const fetchValidatedToken = getValidAccessToken(config)
