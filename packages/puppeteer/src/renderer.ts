import chromium, { puppeteer } from 'chrome-aws-lambda'
import Puppeteer from 'puppeteer-core'
import { ICookie } from './cookies'
import { IPDFOptions } from './pdfOptions'
import { IScreenshotOptions } from './screenshotOptions'

// tslint:disable no-console

/**
 * A decorator for an instance of Puppeteer.Browser that provides some
 * convenience methods to render HTML, PDF, or image output of a given URL.
 */
class Renderer {
  private browser: Puppeteer.Browser

  constructor(browser: Puppeteer.Browser) {
    this.browser = browser
  }

  /**
   * Navigates to given page with puppeteer.
   * @param url The url of the page to navigate to with puppeteer.
   * @param options A set of puppeteer's DirectNavigationOptions to customize how puppeteer loads the page.
   * @param media The CSS media type to emulate.
   */
  public async createPage(
    url: string,
    options: Puppeteer.DirectNavigationOptions = {},
    waitForSelector: string | null,
    media: 'screen' | 'print' | null,
    assetBlacklist: string,
    cookies?: ICookie[]
  ): Promise<Puppeteer.Page> {
    const { waitUntil } = options
    const page = await this.browser.newPage()
    page.emulateMediaType(media)
    await page.setRequestInterception(true)
    page.on('request', (interceptedRequest) => {
      const requestUrl = interceptedRequest.url()
      if (!assetBlacklist || assetBlacklist.length < 1) {
        interceptedRequest.continue()
        return
      }
      const blackListed = assetBlacklist
        .split('::')
        .filter((a) => requestUrl.match(a))
      if (blackListed.length > 0) {
        interceptedRequest.abort()
      } else {
        console.log(`Loaded: ${requestUrl}`)
        interceptedRequest.continue()
      }
    })

    await page.setCookie(...(cookies || []))
    await page.goto(url, {
      waitUntil: waitUntil || 'networkidle2',
    })
    if (waitForSelector) {
      await page.waitForSelector(waitForSelector)
    }
    return page
  }

  /**
   * Renders a given url and returns the HTML content of the page.
   * @param url The url of the page to render.
   * @param options A set of puppeteer's DirectNavigationOptions to customize how puppeteer loads the page.
   */
  public async render(
    url: string,
    options: Puppeteer.DirectNavigationOptions = {},
    accessToken: string
  ): Promise<string | null> {
    const { timeout, waitUntil } = options
    const page = await this.createPage(
      url,
      { timeout, waitUntil },
      null,
      'screen',
      accessToken
    )
    try {
      const html = await page.content()
      return html
    } finally {
      if (page) {
        await page.close()
      }
    }
  }

  /**
   * Renders a supplied URL as a PDF.
   * @param url The url to render with puppeteer.
   * @param options A set of puppeteer's DirectNavigationOptions to customize how puppeteer loads the page.
   * @param formatterOptions Customizations to the PDF output.
   */
  public async pdf(
    url: string,
    options: Puppeteer.DirectNavigationOptions = {},
    pdfOptions: IPDFOptions
  ): Promise<Buffer | null> {
    const start = new Date().getTime()
    const { timeout, waitUntil } = options
    const {
      assetBlacklist,
      cookies,
      scale,
      displayHeaderFooter,
      format,
      pageRanges,
      printBackground,
      landscape,
      margin,
      waitForSelector,
    } = pdfOptions
    let page: Puppeteer.Page
    try {
      page = await this.createPage(
        url,
        { timeout, waitUntil },
        waitForSelector,
        'print',
        assetBlacklist,
        cookies
      )
      const buffer = await page.pdf({
        displayHeaderFooter,
        format,
        landscape,
        margin,
        pageRanges,
        printBackground,
        scale: Number(scale),
      })
      console.log(
        `PDF rendered in ${(new Date().getTime() - start) / 1000} seconds`
      )
      return buffer
    } finally {
      if (page) {
        console.log('Closed page.')
        await page.close()
      }
    }
  }

  /**
   * Navigates to a given page with puppeteer and creates a JPG or PNG screenshot of the url.
   * @param url The url to render.
   * @param options A set of puppeteer's DirectNavigationOptions to customize how puppeteer loads the page.
   * @param screenshotOptions Customizations to the screenshot's format.
   */
  public async screenshot(
    url: string,
    options: Puppeteer.DirectNavigationOptions = {},
    screenshotOptions: IScreenshotOptions
  ): Promise<Buffer | null> {
    const { timeout, waitUntil, ...extraOptions } = options
    const {
      assetBlacklist,
      cookies,
      height,
      width,
      fullPage,
      printBackground,
      imageType,
      quality,
      waitForSelector,
    } = screenshotOptions
    const page = await this.createPage(
      url,
      { timeout, waitUntil },
      waitForSelector,
      'screen',
      assetBlacklist,
      cookies
    )
    try {
      page.setViewport({
        height: Number(height || 600),
        width: Number(width || 800),
      })
      const buffer = await page.screenshot({
        ...extraOptions,
        fullPage,
        omitBackground: !printBackground,
        quality:
          Number(quality) ||
          (imageType === undefined || imageType === 'png' ? 0 : 100),
        type: imageType || 'png',
      })
      return buffer
    } finally {
      if (page) {
        await page.close()
      }
    }
  }

  public async close() {
    await this.browser.close()
  }
}

/**
 * Returns a new instance of puppeteer wrapped in our custom
 * renderer class.
 */
async function create() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  })

  return new Renderer(browser)
}

export { Renderer }
export default create
