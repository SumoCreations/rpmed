const normalizeIdentifier = (value: string): string => {
  if (!value) {
    return value
  }
  const strippedChars = value.replace(/[^\d|^a-z|^A-Z]/g, '')
  if (strippedChars.length <= 4) {
    return strippedChars.toUpperCase()
  }
  if (strippedChars.length <= 8) {
    return `${strippedChars.slice(0, 4)}-${strippedChars.slice(
      4
    )}`.toUpperCase()
  }
  return `${strippedChars.slice(0, 4)}-${strippedChars.slice(
    4,
    8
  )}-${strippedChars.slice(8, 16)}`.toUpperCase()
}

export default normalizeIdentifier
