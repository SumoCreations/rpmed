import { DateTime } from 'luxon'
import { ModelNumber, RGA, RGAGood } from '../../../../models'
import { ProductType } from '../../../../schema'
import { destroyRGAGood } from './destroyRGAGood'

const RGA_ID = 'TEST-RGA-ID'
const PRODUCT_ID = 'TEST-PRODUCT-ID'
const SYMPTOM_ID = 'TEST-SYMPTOM-ID'
const SERIAL = 'TEST-SERIAL-NUMBER'
const DATE = DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO()
const CUSTOMER_EMAIL = 'rga-good-test-customer@example.com'

const sampleParams = {
  customerEmail: CUSTOMER_EMAIL,
  customerName: 'Jane RGAGOODTester',
  lotted: false,
  modelNumber: 'MLD-X01',
  productId: PRODUCT_ID,
  rgaId: RGA_ID,
  serial: SERIAL,
  submittedBy: 'test@klsmartin.com',
  submittedOn: DATE,
  symptomId: SYMPTOM_ID,
  warrantied: true,
}

describe('destroyRGAGood', () => {
  let existingRGAId: string
  let existingRGAGoodId: string
  beforeAll(async done => {
    const modelNumber = await ModelNumber.create({
      description: 'test',
      feeWithWarranty: { distributor: '0', endUser: '10' },
      feeWithoutWarranty: { distributor: '250', endUser: '300' },
      id: 'TEST-MODEL-FOR-RGA-DESTROY-GOOD',
      lotted: true,
      pricing: { cost: '1000', retail: '1200' },
      productIds: ['TEST'],
      productType: ProductType.Headlight,
      warrantyDescription: 'Covered...',
      warrantyTerm: 5,
    })
    const rga = await RGA.create({
      distributorId: 'something-made-up',
      submittedBy: 'someone-ex1@partner.com',
      submittedOn: DateTime.utc(2019, 5, 8, 1, 12, 11, 12).toISO(),
    })
    const good = await RGAGood.create({
      ...sampleParams,
      faultCode: 'EHIJ',
      modelNumber: modelNumber.partitionKey,
      rgaId: rga.partitionKey,
      symptomDescription: 'Test',
    })
    existingRGAId = rga.partitionKey
    existingRGAGoodId = good.id
    done()
  })

  test('should fail if the rga does not exist', async () => {
    expect.assertions(1)
    const output = await destroyRGAGood(null, {
      id: existingRGAGoodId,
      rgaId: 'existingRGAId-does-not-exist',
    })
    expect(output.success).toBe(false)
  })

  test('should fail if the rga good does not exists', async () => {
    expect.assertions(1)
    const output = await destroyRGAGood(null, {
      id: 'existingRGAGoodId-does-not-exist',
      rgaId: existingRGAId,
    })
    expect(output.success).toBe(false)
  })

  test('should destroy an existing rga good if it exists', async () => {
    expect.assertions(1)
    const output = await destroyRGAGood(null, {
      id: existingRGAGoodId,
      rgaId: existingRGAId,
    })
    expect(output.success).toBe(true)
  })
})
