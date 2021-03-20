import { parsePDFOptions } from '../pdfOptions'

// A simple example test
describe('parsePDFOptions()', () => {
  it('should supply default options', () => {
    const defaults = parsePDFOptions({})
    expect(defaults.cookies).toBe([])
    expect(defaults.format).toBe('A4')
    expect(defaults.landscape).toBe(false)
    expect(defaults.displayHeaderFooter).toBe(false)
    expect(defaults.printBackground).toBe(false)
    expect(defaults.scale).toBe(1)
  })

  it('should prioritize user defined values over defaults', () => {
    const userDefined = parsePDFOptions({
      cookies: [
        {
          name: 'ACCESS_TOKEN',
          value: 'TOKEN',
        },
      ],
      displayHeaderFooter: true,
      format: 'Legal',
      landscape: true,
      printBackground: true,
      proxyAccessToken: 'token',
      scale: 2,
    })
    expect(userDefined.cookies[0].value).toBe('TOKEN')
    expect(userDefined.format).toBe('Legal')
    expect(userDefined.landscape).toBe(true)
    expect(userDefined.printBackground).toBe(true)
    expect(userDefined.displayHeaderFooter).toBe(true)
    expect(userDefined.scale).toBe(2)
  })
})
