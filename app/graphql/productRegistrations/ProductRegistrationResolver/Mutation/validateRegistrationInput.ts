import * as Validation from "rpmed-validation-schema"
import {
  Customer,
  ICustomer,
  IModelNumber,
  IProductRegistration,
  IProductRegistrationInput,
  ModelNumber,
  ProductRegistration,
} from "../../../../models"
import * as E from "../productRegistrationErrors"

interface IGraphError {
  message: string
  path: string
}

interface IRegistrationValidationOutput {
  customer?: ICustomer
  errorResponse?: {
    errors: IGraphError[]
    success: boolean
  }
  input?: IProductRegistrationInput
  modelNumber?: IModelNumber
}

export const validateRegistrationInput = async (
  input: IProductRegistrationInput
): Promise<IRegistrationValidationOutput> => {
  // Ensure the general format of the response is correct before
  // attempting any database dependent validations.
  try {
    await Validation.ProductRegistration.Default.validate(input, {
      abortEarly: false,
    })
  } catch (e) {
    return {
      errorResponse: { errors: Validation.formatError(e), success: false },
    }
  }

  // Ensure the model number is associated to an actual model.
  const relatedModel = await ModelNumber.find(input.modelNumber)
  if (!relatedModel) {
    return {
      errorResponse: {
        errors: [E.ErrorProductRegistrationModelNumberDoesNotExist],
        success: false,
      },
    }
  }

  const hasSerial = input.serial && input.serial.length > 0
  if (relatedModel.lotted && !hasSerial) {
    // Verify a serial is present for a lotted product.
    return {
      errorResponse: {
        errors: [E.ErrorProductRegistrationWithSerialCannotBeBlank],
        success: false,
      },
    }
  } else if (!relatedModel.lotted && hasSerial) {
    // Verify there is no serial present for a non lotted product.
    return {
      errorResponse: {
        errors: [E.ErrorProductRegistrationWithSerialMustBeBlank],
        success: false,
      },
    }
  }

  // Ensure the product registration exists if an ID is passed
  let currentRegistration: IProductRegistration
  if (input.id) {
    currentRegistration = await ProductRegistration.find(input.id)
    if (!currentRegistration) {
      return {
        errorResponse: {
          success: false,
          errors: [E.ErrorProductRegistrationWithIDDoesNotExist],
        },
      }
    }
  }

  // Ensure the customer associated to the registration actually exists.
  const relatedCustomer = await Customer.find(input.customerId)
  if (!relatedCustomer) {
    return {
      errorResponse: {
        errors: [E.ErrorProductRegistrationCustomerDoesNotExist],
        success: false,
      },
    }
  }

  const serial = hasSerial ? input.serial : null
  // Ensure the serial number is not already being used by another registration
  if (hasSerial) {
    if (!currentRegistration || serial !== currentRegistration.partitionKey) {
      const existingRegistration = await ProductRegistration.find(input.serial)
      if (existingRegistration) {
        return {
          errorResponse: {
            success: false,
            errors: [E.ErrorProductRegistrationWithSerialAlreadyExists],
          },
        }
      }
    }
  }

  // Return the validated and complete registration input.
  return {
    customer: relatedCustomer,
    input: {
      ...input,
      lotted: relatedModel.lotted,
      productId: relatedModel.indexSortKey,
    },
    modelNumber: relatedModel,
  }
}
