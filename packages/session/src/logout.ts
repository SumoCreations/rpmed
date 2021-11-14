import { removeCookie } from 'react-simple-cookie-store'
import { AccessToken } from './AccessToken'

export const logout = () => {
  removeCookie(AccessToken.Access)
  removeCookie(AccessToken.Refresh)
  removeCookie(AccessToken.Temporary)
}
