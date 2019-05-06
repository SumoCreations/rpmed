export const ErrorProductRegistrationWithSerialAlreadyExists = {
  message: "A product has already been registered with this serial number",
  path: "serial"
}

export const ErrorProductRegistrationWithSerialCannotBeBlank = {
  message: "You must provide a valid serial number",
  path: "serial"
}

export const ErrorProductRegistrationWithSerialMustBeBlank = {
  message: "The product / model you are registering cannot have a serial number",
  path: "serial"
}

export const ErrorProductRegistrationCustomerDoesNotExist = {
  message: "The customer you are registering this for does not exist",
  path: "customerId"
}

export const ErrorProductRegistrationModelNumberDoesNotExist = {
  message: "The model number supplied does not exist",
  path: "modelNumber"
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