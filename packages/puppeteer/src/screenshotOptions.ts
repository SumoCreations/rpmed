import { URL } from 'url'
import { createCookieFor, ICookie } from './cookies'

export interface IScreenshotOptions {
  assetBlacklist: string
  cookies?: ICookie[]
  fullPage: boolean
  printBackground: boolean
  imageType: 'png' | 'jpeg' | undefined
  quality: number
  height: number
  waitForSelector: string | null
  width: number
}

const defaultQualityForImageType = (imageType: string) => {
  if (!imageType || imageType === 'png') {
    return 0
  }
  return 100
}

/**
 * Takes in a generic object and maps any matching values to the
 * screenshot options interface.
 * @param query A json object representing possible values for screenshot options.
 */
export const parseScreenshotOptions = (query: {
  [key: string]: any
}): IScreenshotOptions => ({
  assetBlacklist: query.assetBlacklist || '',
  cookies: query.qookies
    ? query.cookies.map(createCookieFor(new URL(query.clientUrl)))(
        query.cookies
      )
    : [],
  fullPage: query.fullPage || false,
  height: Number(query.height),
  imageType: query.imageType || 'png',
  printBackground: query.printBackground,
  quality: query.quality || defaultQualityForImageType(query.imageType),
  waitForSelector: query.waitForSelector,
  width: Number(query.width),
})
