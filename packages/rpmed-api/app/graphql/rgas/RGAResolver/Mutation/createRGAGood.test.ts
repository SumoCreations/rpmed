import { DateTime } from 'luxon'
import {
  Customer,
  IRGAGoodInput,
  ModelNumber,
  ProductRegistration,
  ProductSymptom,
  RGA,
} from '../../../../models'
import { ProductType, RgaGoodStatus, RgaStatus } from '../../../../schema'
import { createRGAGood } from './createRGAGood'

const RGA_ID = 'TEST-RGA-ID'
const PRODUCT_ID = 'TEST-PRODUCT-ID'
const SERIAL = 'TEST-SERIAL-NUMBER'
const DATE = DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO()
const CUSTOMER_EMAIL = 'rga-good-test-customer@example.com'

const sampleParams: IRGAGoodInput = {
  customerEmail: CUSTOMER_EMAIL,
  customerName: 'Jane RGAGOODTester',
  faultCode: 'D',
  lotted: false,
  modelNumber: 'MLD-X01',
  preApproved: true,
  productId: PRODUCT_ID,
  productName: 'MLX Series',
  productType: ProductType.Headlight,
  rgaId: RGA_ID,
  status: RgaGoodStatus.Valid,
  submittedBy: 'test@klsmartin.com',
  submittedOn: DATE,
  symptomDescription: 'test',
  symptomId: '123',
  symptomSolution: 'Test',
  symptomSynopsis: 'The synopsis..',
  warrantied: true,
  warrantyDescription: 'Test',
  warrantyTerm: 2,
}

describe('createRGAGood', () => {
  let existingRGAId: string
  let modelNumberId: string
  let existingSymptomId: string
  beforeAll(async done => {
    const modelNumber = await ModelNumber.create({
      description: 'test',
      feeWithWarranty: { distributor: '0', endUser: '10' },
      feeWithoutWarranty: { distributor: '250', endUser: '300' },
      id: 'TEST-MODEL-FOR-RGA-GOOD',
      lotted: true,
      pricing: { cost: '1000', retail: '1200' },
      productIds: ['TEST'],
      productType: ProductType.Headlight,
      warrantyDescription: 'Covered...',
      warrantyTerm: 5,
    })
    modelNumberId = modelNumber.partitionKey
    const rga = await RGA.create({
      distributorId: 'something-made-up',
      shippingSpeed: 'Ground',
      status: RgaStatus.Issued,
      submittedBy: 'someone-ex1@partner.com',
      submittedOn: DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO(),
    })
    const existingSymptom = await ProductSymptom.create({
      faultCode: 'EHIJ',
      fee: true,
      name: 'Test',
      preApproved: false,
      solution: 'Test',
      synopsis: 'Test',
    })
    existingSymptomId = existingSymptom.partitionKey
    existingRGAId = rga.partitionKey
    done()
  })

  afterAll(async done => {
    await RGA.destroy(existingRGAId)
    done()
  })

  test('should generate a new rga good if it is valid', async () => {
    expect.assertions(1)
    const output = await createRGAGood(null, {
      rgaId: existingRGAId,
      rgaGoodInput: {
        ...sampleParams,
        modelNumber: modelNumberId,
        productType: ProductType.Headlight,
        serial: 'TEST-123',
        symptomId: existingSymptomId,
      },
    })
    expect(output.success).toBe(true)
  })

  test('should generate a product registration that matches the customer name / email', async () => {
    expect.assertions(2)
    const output = await createRGAGood(null, {
      rgaGoodInput: {
        ...sampleParams,
        modelNumber: modelNumberId,
        productType: ProductType.Headlight,
        serial: `${SERIAL}-2`,
        symptomId: existingSymptomId,
      },
      rgaId: existingRGAId,
    })
    const registration = await ProductRegistration.find(output.rgaGood?.id)
    const customer = await Customer.findByEmail(CUSTOMER_EMAIL)

    expect(output.success).toBe(true)
    expect(registration.customerId).toEqual(customer.partitionKey)
  })

  test('should skip the registration process if somehow, a conflicting registration already exists', async () => {
    expect.assertions(4)
    const existingCustomer = await Customer.create({
      email: 'some-other-fellow@rga-good-tester.com',
      name: 'Existing Customer',
      specialty: 'Surgeon',
    })
    const existingRegistration = await ProductRegistration.create({
      customerId: existingCustomer.partitionKey,
      lotted: true,
      modelNumber: modelNumberId,
      productId: 'made-it-up-for-this-test',
      registeredOn: new Date().toISOString(),
      serial: `${SERIAL}-3`,
    })
    const output = await createRGAGood(null, {
      rgaId: existingRGAId,
      rgaGoodInput: {
        ...sampleParams,
        modelNumber: modelNumberId,
        productType: ProductType.Headlight,
        serial: `${SERIAL}-3`,
        symptomId: existingSymptomId,
      },
    })
    const registration = await ProductRegistration.find(`${SERIAL}-3`)
    const customer = await Customer.findByEmail(CUSTOMER_EMAIL)
    expect(output.success).toBe(true)
    expect(registration.partitionKey).toEqual(existingRegistration.partitionKey)
    expect(registration.customerId).toEqual(existingCustomer.partitionKey)
    expect(customer).not.toBeNull()
  })

  test('should skip the registration process if no customer credentials are provided', async () => {
    expect.assertions(2)
    const { customerEmail, customerName, ...remainingParams } = sampleParams
    const output = await createRGAGood(null, {
      rgaId: existingRGAId,
      rgaGoodInput: {
        ...remainingParams,
        modelNumber: modelNumberId,
        productType: ProductType.Headlight,
        serial: `${SERIAL}-4`,
        symptomId: existingSymptomId,
      },
    })
    expect(output.success).toBe(true)
    const registration = await ProductRegistration.find(`${SERIAL}-4`)
    expect(registration).toBeNull()
  })

  test('should fail if the RGA does not exist', async () => {
    expect.assertions(2)
    const output = await createRGAGood(null, {
      rgaId: 'some-other-existingRGAId',
      rgaGoodInput: {
        ...sampleParams,
        productType: ProductType.Headlight,
        symptomId: existingSymptomId,
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('rgaId')
  })

  test('should fail if the Model Number does not exist', async () => {
    expect.assertions(2)
    const output = await createRGAGood(null, {
      rgaId: existingRGAId,
      rgaGoodInput: {
        ...sampleParams,
        productType: ProductType.Headlight,
        symptomId: existingSymptomId,
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('modelNumber')
  })

  test('should fail if the Serial Number was already used in conjunction with another RGA', async () => {
    expect.assertions(2)
    const output = await createRGAGood(null, {
      rgaId: existingRGAId,
      rgaGoodInput: {
        ...sampleParams,
        modelNumber: modelNumberId,
        productType: ProductType.Headlight,
        symptomId: existingSymptomId,
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('serial')
  })

  test('should fail if the RGA Good does not pass validations', async () => {
    expect.assertions(3)
    const invalidInput: any = {
      rgaGoodInput: {
        ...sampleParams,
        customerEmail: 'john@notvalid',
        modelNumber: null,
        symptomId: existingSymptomId,
      },
    }
    const output = await createRGAGood(null, invalidInput)
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('customerEmail')
    expect(output.errors.map(e => e.path)).toContain('modelNumber')
  })
})
