import { DateTime } from 'luxon'
import { IRGAGood, RGA, RGAGood } from '../../../../models'
import { ProductType, RgaGoodStatus, RgaStatus } from 'rpmed-schema'
import { updateRGAGood } from './updateRGAGood'
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
  productName: 'Something',
  productType: ProductType.Headlight,
  rgaId: RGA_ID,
  serial: SERIAL,
  submittedBy: 'test@klsmartin.com',
  submittedOn: DATE,
  symptomId: SYMPTOM_ID,
  warrantied: true,
}

const sampleRawGoodInput = {
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

describe('updateRGAGood', () => {
  let existingRGAId: string
  let lottedGood: IRGAGood
  let nonLottedGood: IRGAGood
  beforeEach(async done => {
    const rga = await RGA.create({
      distributorId: 'something-made-up',
      shippingSpeed: 'Ground',
      status: RgaStatus.Issued,
      submittedBy: 'someone-ex1@partner.com',
      submittedOn: DateTime.utc(2019, 5, 8, 1, 12, 11, 12).toISO(),
    })
    existingRGAId = rga.partitionKey
    lottedGood = await RGAGood.create({
      ...sampleRawGoodInput,
      lotted: true,
      rgaId: existingRGAId,
    })
    nonLottedGood = await RGAGood.create({
      ...sampleRawGoodInput,
      lotted: false,
      rgaId: existingRGAId,
    })
    done()
  })

  afterEach(async done => {
    await RGAGood.destroy(existingRGAId, lottedGood.id)
    await RGAGood.destroy(existingRGAId, nonLottedGood.id)
    await RGA.destroy(existingRGAId)
    done()
  })

  test('should fail if the rga does not exist', async () => {
    expect.assertions(1)
    const output = await updateRGAGood(
      null,
      {
        id: lottedGood.id,
        rgaGoodInput: sampleParams,
        rgaId: 'existingRGAId-does-not-exist',
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
  })

  test('should fail if the rga good does not exists', async () => {
    expect.assertions(1)
    const output = await updateRGAGood(
      null,
      {
        id: 'lottedGoodId-does-not-exist',
        rgaGoodInput: sampleParams,
        rgaId: existingRGAId,
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
  })

  // The two commented tests below no longer matter now that we
  // have decoupled the rga goods from any associated serial numbers.

  // test("should fail if an existing rga good has it's lotted status adjusted", async () => {
  //   expect.assertions(1)
  //   const output = await updateRGAGood(null, {
  //     id: lottedGood.id,
  //     rgaGoodInput: { ...sampleParams, lotted: !lottedGood.lotted },
  //     rgaId: existingRGAId,
  //   })
  //   expect(output.success).toBe(false)
  // })

  // test('should fail if an existing rga good already exists for the supplied id', async () => {
  //   expect.assertions(1)
  //   const output = await updateRGAGood(null, {
  //     id: lottedGood.id,
  //     rgaGoodInput: {
  //       ...sampleParams,
  //       lotted: lottedGood.lotted,
  //       serial: nonLottedGood.id,
  //     },
  //     rgaId: existingRGAId,
  //   })
  //   expect(output.success).toBe(false)
  // })

  test('should fail if not authorized', async () => {
    expect.assertions(1)
    const output = await updateRGAGood(
      null,
      {
        id: lottedGood.id,
        rgaGoodInput: { ...sampleParams, lotted: lottedGood.lotted },
        rgaId: existingRGAId,
      },
      null
    )
    expect(output.success).toBe(false)
  })

  test('should update an existing rga good if it exists', async () => {
    expect.assertions(1)
    const output = await updateRGAGood(
      null,
      {
        id: lottedGood.id,
        rgaGoodInput: { ...sampleParams, lotted: lottedGood.lotted },
        rgaId: existingRGAId,
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(true)
  })

  test('should ignore the serial number when updating a non lotted good', async () => {
    expect.assertions(2)
    const output = await updateRGAGood(
      null,
      {
        id: nonLottedGood.id,
        rgaGoodInput: {
          ...sampleParams,
          lotted: nonLottedGood.lotted,
          serial: 'IGNORE_ME',
        },
        rgaId: existingRGAId,
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(true)
    expect(output.rgaGood.id).toEqual(nonLottedGood.id)
  })

  test('should allow an update of the serial number / id when updating a lotted good', async () => {
    expect.assertions(1)
    const output = await updateRGAGood(
      null,
      {
        id: lottedGood.id,
        rgaGoodInput: {
          ...sampleParams,
          lotted: lottedGood.lotted,
          serial: 'A-NEW-SERIAL',
        },
        rgaId: existingRGAId,
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(true)
  })
})
