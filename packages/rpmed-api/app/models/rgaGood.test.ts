import { DateTime } from 'luxon'
import { isEmpty } from 'validator'
import { ProductType, RgaGoodStatus } from '../schema'
import { IRGAGood, RGAGood } from './rgaGood'

const RGA_ID = 'TEST-RGA-ID'
const PRODUCT_ID = 'TEST-PRODUCT-ID'
const SYMPTOM_ID = 'TEST-SYMPTOM-ID'
const SERIAL = 'TEST-SERIAL-NUMBER'
const DATE = DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO()
const goodParams = {
  faultCode: 'EHIJ',
  lotted: true,
  modelNumber: 'MLD-X01',
  preApproved: true,
  productId: PRODUCT_ID,
  productName: 'MLD',
  productType: ProductType.Headlight,
  resolution: '',
  resolutionFee: { distributor: 'RFQ', endUser: 'RFQ' },
  rgaId: RGA_ID,
  serial: SERIAL,
  status: RgaGoodStatus.Valid,
  submittedBy: 'test@klsmartin.com',
  submittedOn: DATE,
  symptomDescription: 'This is a sympyom',
  symptomId: SYMPTOM_ID,
  symptomSolution: 'somehow',
  symptomSynopsis: 'tbd',
  warrantied: true,
  warrantyDescription: 'test',
  warrantyTerm: 6,
}
describe('rga', () => {
  let existingGood: IRGAGood
  beforeAll(async done => {
    try {
      existingGood = await RGAGood.create({
        ...goodParams,
      })
    } catch (e) {
      done()
    }
    done()
  })

  afterAll(async done => {
    await RGAGood.destroy(RGA_ID, existingGood.id)
    done()
  })

  describe('create', () => {
    test('should generate a new rga', () => {
      expect(isEmpty(existingGood.partitionKey)).toBe(false)
      expect(existingGood.sortKey).toBe(
        `${RGAGood.SECONDARY_KEY}#${existingGood.id}`
      )
    })

    test('should not fail if the same serial is used twice', async () => {
      expect.assertions(1)
      const good = await RGAGood.create({
        ...goodParams,
      })
      expect(good.id).not.toBeNull()
    })
  })

  describe('update', () => {
    test('should update an existing good', async () => {
      expect.assertions(3)
      await RGAGood.update({
        ...existingGood,
        warrantied: false,
        warrantyDescription: 'updated',
        warrantyTerm: 3,
      })
      const updated = await RGAGood.find(existingGood.rgaId, existingGood.id)
      expect(updated.warrantyTerm).not.toEqual(existingGood.warrantyTerm)
      expect(updated.warrantied).not.toEqual(existingGood.warrantied)
      expect(updated.warrantyDescription).not.toEqual(
        existingGood.warrantyDescription
      )
    })
  })

  describe('find', () => {
    test('should return an rga good if one exists', async () => {
      expect.assertions(1)
      const existingRGAGood = await RGAGood.find(RGA_ID, existingGood.id)
      expect(existingRGAGood).not.toBeNull()
    })

    test('should return null if a rga does not exist', async () => {
      expect.assertions(1)
      const existingRGAGood = await RGAGood.find(RGA_ID, 'Some-Made-Up-Id')
      expect(existingRGAGood).toBeNull()
    })
  })

  describe('forRGA', () => {
    test('should return all goods for the specific rga if they exists', async () => {
      expect.assertions(2)
      const newGood = await RGAGood.create({
        faultCode: 'Test',
        lotted: true,
        modelNumber: 'MLD-X01',
        preApproved: false,
        productId: PRODUCT_ID,
        productName: 'MLX',
        productType: ProductType.Headlight,
        resolutionFee: { distributor: 'RFQ', endUser: 'RFQ' },
        rgaId: RGA_ID,
        serial: 'SERIAL-B',
        status: RgaGoodStatus.Valid,
        submittedBy: 'test@klsmartin.com',
        submittedOn: DATE,
        symptomDescription: 'Another test',
        symptomId: SYMPTOM_ID,
        symptomSolution: 'Somehow',
        symptomSynopsis: 'Why?',
        warrantied: true,
        warrantyDescription: 'test',
        warrantyTerm: 6,
      })
      const existingGoods = await RGAGood.forRGA(RGA_ID)
      expect(existingGoods.map(g => g.id)).toContain(existingGood.id)
      expect(existingGoods.map(g => g.id)).toContain(newGood.id)
    })

    test('should return an empty array if the RGA does not exist', async () => {
      expect.assertions(1)
      const existingGoods = await RGAGood.forRGA('RGA_ID-DOES-NOT-EXIST')
      expect(existingGoods.length).toBeLessThan(1)
    })
  })

  describe('destroy', () => {
    test('should delete a rga and return true if one exists', async () => {
      expect.assertions(2)
      expect(await RGAGood.destroy(RGA_ID, existingGood.id)).toBeTruthy()
      const existingRGAGood = await RGAGood.find(RGA_ID, existingGood.id)
      expect(existingRGAGood).toBeNull()
    })

    test('should return false if a rga does not exist', async () => {
      expect.assertions(1)
      expect(await RGAGood.destroy(RGA_ID, 'Some-Made-Up-Id')).toBeFalsy()
    })
  })
})
