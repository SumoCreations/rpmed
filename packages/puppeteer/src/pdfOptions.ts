import * as puppeteer from 'puppeteer'
import { URL } from 'url'
import { createCookieFor, ICookie } from './cookies'

interface IMargin {
  top: string
  bottom: string
  left: string
  right: string
}

export interface IPDFOptions {
  assetBlacklist: string
  pageRanges: string
  cookies: ICookie[]
  displayHeaderFooter: boolean
  format: puppeteer.PDFFormat
  landscape: boolean
  printBackground: boolean
  scale: number
  waitForSelector: string | null
  margin: IMargin
}

const buildMargin = (margin?: any): IMargin => {
  const m = margin || {}
  return {
    bottom: m.bottom || '0.18in',
    left: m.left || '0.15 in',
    right: m.right || '0.15 in',
    top: m.top || '0.18in',
  }
}

/**
 * Validates the user supplied format or defaults to A4 if the
 * user has not supplied a format or provided an invalid option.
 * @param format The format desired by the user.
 */
const getFormat = (format: string): puppeteer.PDFFormat =>
  [
    'Letter',
    'Legal',
    'Tabloid',
    'Ledger',
    'A0',
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
  ].includes(format)
    ? (format as puppeteer.PDFFormat)
    : 'A4'

/**
 * Takes in a generic object and maps any matching values to the
 * pdf options interface.
 * @param query A json object representing possible values for pdf options.
 */
export const parsePDFOptions = (query: any): IPDFOptions => {
  const url = new URL(query.clientUrl)
  const cookies = (query.cookies || []).map(createCookieFor(url))
  return {
    assetBlacklist: query.assetBlacklist || '',
    cookies,
    displayHeaderFooter: query.displayHeaderFooter || false,
    format: getFormat(query.format),
    landscape: query.landscape || false,
    margin: buildMargin(query.margin),
    pageRanges: query.pageRanges || '',
    printBackground: query.printBackground || false,
    scale: Number(query.scale || 1),
    waitForSelector: query.waitForSelector,
  }
}
