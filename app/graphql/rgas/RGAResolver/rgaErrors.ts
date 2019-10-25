export const ErrorUserProfileNotFound = {
  message: `Could not identify the user performing this update.`,
  path: '_',
}

export const ErrorRGAWithIDDoesNotExist = {
  message: `No RGA exists with the supplied ID.`,
  path: '_',
}

export const ErrorRGAGoodWithIDDoesNotExist = {
  message: `No RGA Good exists with the supplied ID.`,
  path: '_',
}

export const ErrorRGAGoodWithIDAlreadyExist = {
  message: `An RGA good already exists with the supplied ID.`,
  path: '_',
}

export const ErrorRGAGoodCouldNotBeDestroyed = {
  message: `Could not remove the RGA good with the supplied ID.`,
  path: '_',
}

export const ErrorRGAGoodCouldNotBeUpdated = {
  message: `Could not update the RGA good with the supplied ID.`,
  path: '_',
}

export const ErrorRGACannotBeModified = {
  message: `Could not update the RGA or assoociated good becuase it is either closed or canceled.`,
  path: '_',
}

export const ErrorRGAGoodLottedCannotBeModified = {
  message: `Can not change an existing RGA good from a lotted to non-lotted model. Consider deleting this good and adding a new good to the RGA.`,
  path: '_',
}

export const ErrorRGAGoodSerialCannotBeModified = {
  message: `Can not change the serial number for an existing good. Consider deleting this good and adding a new good with the desired serial.`,
  path: '_',
}
