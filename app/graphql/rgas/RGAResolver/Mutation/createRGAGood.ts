import * as Validation from "rpmed-validation-schema"
import { Customer, ICustomer, IRGAGood, ModelNumber, ProductRegistration, ProductSymptom, RGA, RGAGood } from "../../../../models"
import { generateMutationError } from "../../../../util"
import { IRGAGoodMutationOutput } from "./rgaMutationTypes"

interface IRGAGoodInputParams {
  rgaGoodInput: {
    warrantied: boolean
    symptomId: string
    rgaId: string
    productId: string
    lotted: boolean
    modelNumber: string
    serial?: string
    rma?: string
    po?: string
    notes?: string
    customerName?: string
    customerEmail?: string
    submittedBy?: string
    submittedOn?: string
  }
}
type CreateRGAGoodMutation = (
  context: any,
  rgaGoodInput: IRGAGoodInputParams
) => Promise<IRGAGoodMutationOutput>

const present = (val: string | null) => typeof val === "string" && val.length > 0
/**
 * A GraphQL resolver that handles the 'CreateRGAGood' mutation.
 */
export const createRGAGood: CreateRGAGoodMutation = async (_, { rgaGoodInput }) => {
  try {
    await Validation.RGAGood.Default.validate(rgaGoodInput, { abortEarly: false })
  } catch (e) {
    return generateMutationError(Validation.formatError(e))
  }

  const rga = await RGA.find(rgaGoodInput.rgaId)
  if (!rga) {
    return { errors: [{ path: "rgaId", message: `RGA ${rgaGoodInput.rgaId} does not exist` }], success: false }
  }

  const modelNumber = await ModelNumber.find(rgaGoodInput.modelNumber)
  if (!modelNumber) {
    return { errors: [{ path: "modelNumber", message: `Model number '${rgaGoodInput.modelNumber}' does not exist` }], success: false }
  }

  if (modelNumber.lotted && !present(rgaGoodInput.serial)) {
    return { errors: [{ path: "serial", message: `Serial number cannot be blank` }], success: false }
  }

  const existingGood = modelNumber.lotted ? (await RGAGood.find(rga.partitionKey, rgaGoodInput.serial)) : null
  if (existingGood) {
    return { errors: [{ path: "serial", message: `Product with serial'${rgaGoodInput.serial}' already assigned to an RGA` }], success: false }
  }

  const existingSymptom = await ProductSymptom.find(rgaGoodInput.symptomId)

  let customer: ICustomer | null
  if (present(rgaGoodInput.customerEmail) &&
    present(rgaGoodInput.customerName)) {
    try {
      customer =
        (await Customer.findByEmail(rgaGoodInput.customerEmail)) ||
        (await Customer.create({
          email: rgaGoodInput.customerEmail,
          name: rgaGoodInput.customerName
        }))
    } catch (e) {
      // tslint:disable no-console
      console.log("Could not create customer:")
      console.log(e)
      // tslint:enable no-console
    }
  }

  let rgaGood: IRGAGood
  try {
    rgaGood = await RGAGood.create({
      ...rgaGoodInput,
      customerId: customer ? customer.partitionKey : null,
      faultCode: existingSymptom.faultCode,
      submittedBy: rgaGoodInput.submittedBy || rga.submittedBy,
      submittedOn: rgaGoodInput.submittedOn || rga.submittedOn,
      symptomDescription: existingSymptom.name
    })
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return { errors: [{ path: "_", message: "Could not create good for RGA." }], success: false }
  }

  if (
    customer &&
    !(await ProductRegistration.find(rgaGood.id))
  ) {
    try {
      await ProductRegistration.create({
        customerId: customer.partitionKey,
        lotted: modelNumber.lotted,
        modelNumber: modelNumber.partitionKey,
        productId: modelNumber.indexSortKey,
        registeredOn: new Date().toISOString(),
        serial: rgaGood.id
      })
    } catch (e) {
      // tslint:disable no-console
      console.log("Could not register product:")
      console.log(e)
      // tslint:enable no-console
    }
  }

  return { rgaId: rgaGood.rgaId, rgaGood: RGAGood.output(rgaGood), success: true }
}