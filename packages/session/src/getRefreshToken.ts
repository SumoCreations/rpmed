import { getCookie } from 'react-simple-cookie-store'
import { AccessToken } from './AccessToken'

export const getRefreshToken = () => {
  const token: string | null | undefined = getCookie(AccessToken.Refresh)
  return token || ''
}
