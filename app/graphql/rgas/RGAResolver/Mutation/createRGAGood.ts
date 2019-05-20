import * as Validation from "rpmed-validation-schema"
import { Customer, IRGAGood, ModelNumber, ProductRegistration, RGA, RGAGood } from "../../../../models"
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
    submittedBy: string
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

  let rgaGood: IRGAGood
  try {
    rgaGood = await RGAGood.create({
      ...rgaGoodInput,
    })
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return { errors: [{ path: "_", message: "Could not create RGA." }], success: false }
  }

  if (
    present(rgaGoodInput.customerEmail) &&
    present(rgaGoodInput.customerName) &&
    !(await ProductRegistration.find(rgaGood.id))
  ) {
    try {
      const customer = await Customer.create({
        email: rgaGoodInput.customerEmail,
        name: rgaGoodInput.customerName
      })
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

  return { rgaGood: RGAGood.output(rgaGood), success: true }
}