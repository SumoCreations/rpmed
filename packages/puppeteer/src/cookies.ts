import { URL } from 'url'

export interface ICookieInput {
  domain?: string
  name: string
  path?: string
  secure?: boolean
  value: string
}

export interface ICookie {
  domain: string
  name: string
  path: string
  secure: boolean
  value: string
}

/**
 * Assign default values applicable to a cookie so that a consumer
 * of this projects API does not need to specify every aspect of
 * a cookie unless they need to do something outside of the current
 * domain.
 * @param url The url to use when configuring default values.
 */
export const createCookieFor = (url: URL) => ({
  name,
  value,
  ...cookie
}: ICookieInput): ICookie => ({
  domain: cookie.domain || url.hostname,
  name,
  path: cookie.path || '/',
  secure: cookie.secure || url.protocol === 'https:',
  value,
})
