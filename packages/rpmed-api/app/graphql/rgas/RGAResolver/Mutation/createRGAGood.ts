import {
  Customer,
  ICustomer,
  IRGAGood,
  ModelNumber,
  ProductRegistration,
  ProductSymptom,
  RGA,
  RGAGood,
} from '../../../../models'
import {
  RgaGoodStatus,
  FeeStructure,
  MutationCreateRgaGoodArgs,
  RgaGoodMutationOutput,
} from 'rpmed-schema'
import { generateMutationError } from 'api-utils'
import * as Validation from '../../../../validations'
import {
  isAuthorized,
  generateAuthorizationError,
  ServerContext,
} from '../../../auth'

const present = (val: string | null) =>
  typeof val === 'string' && val.length > 0

/**
 * A GraphQL resolver that handles the 'CreateRGAGood' mutation.
 */
export const createRGAGood = async (
  _,
  { rgaGoodInput, rgaId }: MutationCreateRgaGoodArgs,
  context: ServerContext
): Promise<RgaGoodMutationOutput> => {
  if (!isAuthorized(context)) {
    return generateAuthorizationError()
  }
  try {
    await Validation.RGAGood.Default.validate(rgaGoodInput, {
      abortEarly: false,
    })
  } catch (e) {
    return generateMutationError(Validation.formatError(e))
  }

  const rga = await RGA.find(rgaId)
  if (!rga) {
    return {
      errors: [{ path: 'rgaId', message: `RGA ${rgaId} does not exist` }],
      success: false,
    }
  }

  const modelNumber = await ModelNumber.find(rgaGoodInput.modelNumber)
  if (!modelNumber) {
    return {
      errors: [
        {
          message: `Model number '${rgaGoodInput.modelNumber}' does not exist`,
          path: 'modelNumber',
        },
      ],
      success: false,
    }
  }

  if (modelNumber.lotted && !present(rgaGoodInput.serial)) {
    return {
      errors: [{ path: 'serial', message: `Serial number cannot be blank` }],
      success: false,
    }
  }

  const existingGood = modelNumber.lotted
    ? await RGAGood.find(rga.partitionKey, rgaGoodInput.serial)
    : null
  if (existingGood) {
    return {
      errors: [
        {
          message: `Product with serial'${rgaGoodInput.serial}' already assigned to an RGA`,
          path: 'serial',
        },
      ],
      success: false,
    }
  }

  const existingSymptom = await ProductSymptom.find(rgaGoodInput.symptomId)

  let customer: ICustomer | null
  if (
    present(rgaGoodInput.customerEmail) &&
    present(rgaGoodInput.customerName)
  ) {
    try {
      customer =
        (await Customer.findByEmail(rgaGoodInput.customerEmail)) ||
        (await Customer.create({
          email: rgaGoodInput.customerEmail,
          name: rgaGoodInput.customerName,
          specialty: '',
        }))
    } catch (e) {
      // tslint:disable no-console
      console.log('Could not create customer:')
      console.log(e)
      // tslint:enable no-console
    }
  }

  const warrantied = rgaGoodInput.warrantied || existingSymptom.preApproved
  const resolution = warrantied
    ? modelNumber.resolutionWithWarranty
    : modelNumber.resolutionWithoutWarranty
  const resolutionFee: FeeStructure = warrantied
    ? modelNumber.feeWithWarranty
    : modelNumber.feeWithoutWarranty
  let rgaGood: IRGAGood

  try {
    rgaGood = await RGAGood.create({
      ...rgaGoodInput,
      customerId: customer ? customer.partitionKey : null,
      faultCode: existingSymptom.faultCode,
      lotted: modelNumber.lotted,
      preApproved: existingSymptom.preApproved,
      resolution,
      resolutionFee,
      rgaId,
      status: RgaGoodStatus.Valid,
      submittedBy: rga.submittedBy,
      submittedOn: rga.submittedOn,
      symptomDescription: existingSymptom.name,
      symptomSolution: existingSymptom.solution,
      symptomSynopsis: existingSymptom.synopsis,
      warrantied,
      warrantyDescription: modelNumber.warrantyDescription,
      warrantyTerm: modelNumber.warrantyTerm,
    })
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return {
      errors: [{ path: '_', message: 'Could not create good for RGA.' }],
      success: false,
    }
  }

  if (customer && !(await ProductRegistration.find(rgaGood.id))) {
    try {
      await ProductRegistration.create({
        customerId: customer.partitionKey,
        lotted: modelNumber.lotted,
        modelNumber: modelNumber.partitionKey,
        productId: modelNumber.indexSortKey,
        registeredOn: new Date().toISOString(),
        serial: rgaGood.id,
      })
    } catch (e) {
      // tslint:disable no-console
      console.log('Could not register product:')
      console.log(e)
      // tslint:enable no-console
    }
  }

  return {
    rgaGood: RGAGood.output(rgaGood),
    rgaId: rgaGood.rgaId,
    success: true,
  }
}
