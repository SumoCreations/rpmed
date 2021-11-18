export const ErrorDocumentWithSlugAlreadyExists = {
  message: 'A document with the specified url already exists',
  path: 'slug',
}

export const ErrorDocumentNotFound = {
  message: 'A document with the specified id does not exist',
  path: 'id',
}

export const ErrorDocumentInvalid = {
  message: "Document could not be created due to invalid attributes",
  path: "_"
}