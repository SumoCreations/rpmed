import { removeCookie, setCookie } from 'react-simple-cookie-store'
import { AccessToken } from './AccessToken'
import { ICredentials } from './types'

export const setCredentials = ({
  accessToken,
  refreshToken,
  temporaryAccessToken,
}: ICredentials) => {
  if (temporaryAccessToken) {
    removeCookie(AccessToken.Access)
    removeCookie(AccessToken.Refresh)
    setCookie(AccessToken.Temporary, temporaryAccessToken, 1)
    return
  }
  if (accessToken) {
    setCookie(AccessToken.Access, accessToken, 7)
    removeCookie(AccessToken.Temporary)
  }
  if (refreshToken) {
    setCookie(AccessToken.Refresh, refreshToken, 7)
  }
}
