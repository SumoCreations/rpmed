/**
 * Determines if any value is not blank.
 * @param i A value to test for blank.
 */
const notBlank = (i: any) => {
  switch (typeof i) {
    case 'undefined':
      return false
    case 'boolean':
      return true
    case 'string':
      return i.length > 1
    case 'number':
      return true
    case 'object':
      return i !== null
    default:
      return i
  }
}

/**
 * Returns any nested blank values from an array. Otherwise simply returns the item.
 * @param item The item to test.
 */
const filterNestedBlankValues = (item: string | string[] | any) =>
  typeof item === 'object' ? item.filter(i => notBlank(i)) : item

/**
 * Removes any blank attributes from an object.
 * @param item An object to filter any blank values.
 */
export const filterBlankAttributes = (item: object) =>
  Object.keys(item)
    .filter(k => notBlank(item[k]))
    .reduce((p, k) => ({ ...p, [k]: filterNestedBlankValues(item[k]) }), {})
