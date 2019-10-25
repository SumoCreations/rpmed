import { isOffline } from './isOffline'

/**
 * The url used to access the client associated to this deployment.
 */
export const CLIENT_URL = isOffline()
  ? 'http://localhost:3000'
  : `https://${process.env.CLIENT_DOMAIN}`
