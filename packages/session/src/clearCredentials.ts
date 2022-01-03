import { removeCookie } from 'react-simple-cookie-store'
import { AccessToken } from './AccessToken'

export const clearCredentials = () => {
  removeCookie(AccessToken.Access)
  removeCookie(AccessToken.Refresh)
  removeCookie(AccessToken.Temporary)
}
