export const ErrorProductRegistrationWithSerialAlreadyExists = {
  message: "A product has already been registered with this serial number",
  path: "serial"
}

export const ErrorProductRegistrationWithSerialCannotBeBlank = {
  message: "You must provide a valid serial number",
  path: "serial"
}

export const ErrorProductRegistrationCredentialsInvalid = {
  message: "The product registration credentials provided were not valid.",
  path: "_"
}

export const ErrorProductRegistrationCouldNotBeDestroyed = {
  message: "Could not remove the product registration.",
  path: "_"
}

export const ErrorProductRegistrationWithIDDoesNotExist = {
  message: `No product registration record exists with the supplied ID.`,
  path: "_"
}