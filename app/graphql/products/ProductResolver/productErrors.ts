export const ErrorProductIDDoesNotExist = {
  message: 'Product does not exist.',
  path: 'id',
}

export const ErrorProductCouldNotBeDestroyed = {
  message: 'Product could not be destroyed',
  path: '_',
}

export const ErrorModelNumberIDDoesNotExist = {
  message: 'Model number does not exist.',
  path: 'id',
}

export const ErrorModelNumberIDAlreadyExists = {
  message: 'A product is already using this model number.',
  path: 'id',
}

export const ErrorModelNumberRelatedProductDoesNotExist = {
  message: 'The associated product does not exist.',
  path: 'productId',
}

export const ErrorProductAlreadyExist = {
  message: 'A product with this name already exists.',
  path: 'name',
}

export const ErrorModelNumberCouldNotBeDestroyed = {
  message: 'Model number could not be destroyed',
  path: '_',
}
