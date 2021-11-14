import { getCookie } from 'react-simple-cookie-store'
import { isEmpty } from 'validator'
import { AccessToken } from './AccessToken'
import {} from 'jwt-decode'

export const getBearerToken = () => {
  const access: string = getCookie(AccessToken.Access) || ''
  const temporary: string = getCookie(AccessToken.Temporary) || ''
  return isEmpty(access) ? temporary : access
}
