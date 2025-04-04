import { DateTime } from 'luxon'
import { RGA, RGAGood } from '../../../../models'
import { ProductType, RgaGoodStatus, RgaStatus } from 'rpmed-schema'
import { destroyRGAGood } from './destroyRGAGood'
import { TST_ORIGIN_CTX } from '../../../auth'

const RGA_ID = 'TEST-RGA-ID'
const PRODUCT_ID = 'TEST-PRODUCT-ID'
const SYMPTOM_ID = 'TEST-SYMPTOM-ID'
const SERIAL = 'TEST-SERIAL-NUMBER'
const DATE = DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO()
const CUSTOMER_EMAIL = 'rga-good-test-customer@example.com'

const sampleParams = {
  customerEmail: CUSTOMER_EMAIL,
  customerName: 'Jane RGAGOODTester',
  lotted: true,
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
    const rga = await RGA.create({
      distributorId: 'something-made-up',
      shippingSpeed: 'Ground',
      status: RgaStatus.Issued,
      submittedBy: 'someone-ex1@partner.com',
      submittedOn: DateTime.utc(2019, 5, 8, 1, 12, 11, 12).toISO(),
    })
    existingRGAId = rga.partitionKey
    const good = await RGAGood.create({
      ...sampleParams,
      customerEmail: CUSTOMER_EMAIL,
      customerName: 'Jane RGAGOODTester',
      faultCode: 'D',
      lotted: false,
      modelNumber: 'MLD-X01',
      preApproved: true,
      productId: PRODUCT_ID,
      productName: 'MLX Series',
      productType: ProductType.Headlight,
      rgaId: existingRGAId,
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
    })
    existingRGAGoodId = good.id
    done()
  })

  test('should fail if the rga does not exist', async () => {
    expect.assertions(1)
    const output = await destroyRGAGood(
      null,
      {
        id: existingRGAGoodId,
        rgaId: 'existingRGAId-does-not-exist',
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
  })

  test('should fail if the rga good does not exists', async () => {
    expect.assertions(1)
    const output = await destroyRGAGood(
      null,
      {
        id: 'existingRGAGoodId-does-not-exist',
        rgaId: existingRGAId,
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
  })

  test('should fail if not authorized', async () => {
    expect.assertions(1)
    const output = await destroyRGAGood(
      null,
      {
        id: existingRGAGoodId,
        rgaId: existingRGAId,
      },
      null
    )
    expect(output.success).toBe(false)
  })

  test('should destroy an existing rga good if it exists', async () => {
    expect.assertions(1)
    const output = await destroyRGAGood(
      null,
      {
        id: existingRGAGoodId,
        rgaId: existingRGAId,
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(true)
  })
})
