interface IIndexed {
  [key: string]: any
}

export function mapDefaultValues<T extends IIndexed>(
  initialValues: T,
  defaults: T
) {
  return Object.keys(initialValues).reduce(
    (p, k) => ({ ...p, [k]: initialValues[k] ?? '' }),
    defaults
  )
}
