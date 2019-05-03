import { v4 as uuid } from "uuid"
import * as M from "../../../models"


let idIncrement = 1000
const makeId = (key: string, model: string) => {
  idIncrement += 1
  return `${key}-${model}-${uuid()}-${idIncrement}`
}

interface IRegistrationTestHelperInput {
  lotted: boolean
  serial: string | null
  key: string
}

export interface IRegistrationSampleParamOutput {
  customer: M.ICustomer
  modelNumber: M.IModelNumber
  product: M.IProduct
  sampleParams: M.IProductRegistrationInput
}

export const generateSampleParams = async (inputs: IRegistrationTestHelperInput): Promise<IRegistrationSampleParamOutput> => {
  const customer = await M.Customer.create({
    email: `${makeId(inputs.key, "customerEmail")}@rpmed.com`,
    name: makeId(inputs.key, "Customer-Name"),
  })
  const product = await M.Product.create({
    description: makeId(inputs.key, "This is a description "),
    name: makeId(inputs.key, "Product-Name")
  })
  const input = {
    description: "MedLED Chrome MC7 PRO Hard Top; Standard Kit",
    feeWithWarranty: 0,
    feeWithoutWarranty: 250,
    id: makeId(inputs.key, "REGISTERED-MODEL"),
    lotted: inputs.lotted,
    productId: product.partitionKey,
    resolutionWithWarranty: "Do something...",
    resolutionWithoutWarranty: "Do something else..",
    warrantyDescription: "All headlamps covered for 1 year",
    warrantyTerm: 12,
  }
  const modelNumber = await M.ModelNumber.create(input)
  return {
    customer,
    modelNumber,
    product,
    sampleParams: {
      customerId: customer.partitionKey,
      modelNumber: modelNumber.partitionKey,
      productId: product.partitionKey,
      registeredOn: new Date().toISOString(),
      serial: inputs.serial || uuid(),
    }
  }
}