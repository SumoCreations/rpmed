import puppeteer from 'puppeteer-core'
import { ICookieInput } from './cookies'
import makeFileNameFromUrl from './makeFileNameFromUrl'
import { parsePDFOptions } from './pdfOptions'
import { persistFile } from './persistFile'
import { Renderer } from './renderer'
import { parseScreenshotOptions } from './screenshotOptions'

const BUCKET = process.env.CACHED_FILES_BUCKET

// tslint:disable no-console

interface IRenderRequestOptions {
  renderer: Renderer | null
  proxyAccessToken?: string
  bucketName?: string
  clientUrl: string
  type: 'pdf' | 'screenshot' | 'html'
  assetBlacklist?: string
  key?: string
  jobId?: string
  cookies?: ICookieInput[]
  landscape?: boolean
  printBackground?: boolean
  format?: string
  fullPage?: boolean
  height?: number
  imageType?: string
  omitBackground?: boolean
  scale?: number
  waitForSelector?: string
  width?: number
}

interface IRenderResponse {
  bucket?: string
  url?: string
  key?: string
  output?: string
}

export default async (
  opts: IRenderRequestOptions
): Promise<IRenderResponse> => {
  const {
    renderer,
    clientUrl,
    bucketName,
    type,
    key: incommingKey,
    jobId,
    ...options
  } = opts
  const start = new Date().getTime()

  const navigationOptions = {
    waitUntil: 'networkidle2',
  } as puppeteer.DirectNavigationOptions
  const url = clientUrl.includes('://') ? clientUrl : `https://${clientUrl}`
  console.log(`Loading url: ${url}`)
  const bucket = bucketName ?? BUCKET
  try {
    if (!renderer) {
      throw new Error('No renderer is present.')
    }
    const filename = makeFileNameFromUrl(url)
    let signedUrl: string | null = null
    let key: string | null = incommingKey || null
    switch (type) {
      case 'pdf':
        const pdfOptions = parsePDFOptions({ ...options, clientUrl })
        const pdf = await renderer.pdf(url, navigationOptions, pdfOptions)
        if (!pdf) {
          throw new Error(`The renderer could not create a PDF for "${url}"`)
        }
        key = key || filename + '.pdf'
        signedUrl = await persistFile(bucket, key, pdf)
        break

      case 'screenshot':
        const screenshotOptions = parseScreenshotOptions({
          ...options,
          clientUrl,
        })
        const image = await renderer.screenshot(
          url,
          navigationOptions,
          screenshotOptions
        )
        if (!image) {
          throw new Error(`The renderer could not create an image for "${url}"`)
        }
        key = key || filename + '.png'
        signedUrl = await persistFile(bucket, key, image)
        break

      default:
        const html = await renderer.render(
          url,
          navigationOptions,
          options.proxyAccessToken
        )
        return { output: html || '' }
    }
    console.log('<Completion>')
    console.log(`Sent to bucket ${bucketName}`)
    console.log('The signed URL is:', signedUrl)
    const time = new Date().getTime() - start
    console.log(`Processing time: ${time / 1000.0} seconds`)
    console.log('</Completion>')
    return { bucket, key, url: signedUrl }
  } catch (e) {
    throw e
  }
}
