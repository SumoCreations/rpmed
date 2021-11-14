import { getCookie } from 'react-simple-cookie-store'
import { AccessToken } from './AccessToken'

export const getAccessToken = () => getCookie(AccessToken.Access) || ''
