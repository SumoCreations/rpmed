import { URL } from 'url'

/**
 * Returns the hostname or a hyphenated version of the path but does not
 * include any file extension.
 * @param url A url to base a filename from.
 */
const makeFileNameFromUrl = (url: string): string => {
  const urlObj = new URL(url)
  let filename = urlObj.hostname
  if (urlObj.pathname !== '/') {
    filename = urlObj.pathname
      .split('/')
      .filter((s: string) => !['org', ''].includes(s))
      .join('-')
    const extDotPosition = filename.lastIndexOf('.')
    if (extDotPosition > 0) {
      filename = filename.substring(0, extDotPosition)
    }
  }
  return `${filename}-${Math.round(new Date().getTime() / 1000)}`
}

export default makeFileNameFromUrl
