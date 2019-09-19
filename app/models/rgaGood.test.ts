import { DateTime } from 'luxon'
import { isEmpty } from 'validator'
import { ProductType, RgaGoodStatus } from '../schema'
import { IRGAGood, RGAGood } from './rgaGood'

const RGA_ID = 'TEST-RGA-ID'
const PRODUCT_ID = 'TEST-PRODUCT-ID'
const SYMPTOM_ID = 'TEST-SYMPTOM-ID'
const SERIAL = 'TEST-SERIAL-NUMBER'
const DATE = DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO()

describe('rga', () => {
  let existingGood: IRGAGood
  beforeAll(async done => {
    try {
      existingGood = await RGAGood.create({
        faultCode: 'EHIJ',
        lotted: false,
        modelNumber: 'MLD-X01',
        preApproved: true,
        productId: PRODUCT_ID,
        productName: 'MLD',
        productType: ProductType.Headlight,
        resolution: '',
        resolutionFee: 'tbd',
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
        `${RGAGood.SECONDARY_KEY}_${existingGood.id}`
      )
    })

    test('should fail if the same serial is used twice', async () => {
      expect.assertions(1)
      try {
        await RGAGood.create({
          faultCode: 'EHIJ',
          lotted: false,
          modelNumber: 'MLD-X01',
          preApproved: true,
          productId: PRODUCT_ID,
          productName: 'MLD',
          productType: ProductType.Headlight,
          resolution: 'Test',
          resolutionFee: 'TBD',
          rgaId: RGA_ID,
          serial: SERIAL,
          status: RgaGoodStatus.Valid,
          submittedBy: 'test@klsmartin.com',
          submittedOn: DATE,
          symptomDescription: 'Testing',
          symptomId: SYMPTOM_ID,
          symptomSolution: 'Somehow',
          symptomSynopsis: 'Why?',
          warrantied: true,
          warrantyDescription: 'test',
          warrantyTerm: 6,
        })
      } catch (e) {
        expect(e).toBeDefined()
      }
    })
  })

  describe('find', () => {
    test('should return an rga good if one exists', async () => {
      expect.assertions(1)
      const existingRGAGood = await RGAGood.find(RGA_ID, SERIAL)
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
      await RGAGood.create({
        faultCode: 'Test',
        lotted: false,
        modelNumber: 'MLD-X01',
        preApproved: false,
        productId: PRODUCT_ID,
        productName: 'MLX',
        productType: ProductType.Headlight,
        resolutionFee: 'TBD',
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
      expect(existingGoods.map(g => g.id)).toContain(SERIAL)
      expect(existingGoods.map(g => g.id)).toContain('SERIAL-B')
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
      expect(await RGAGood.destroy(RGA_ID, SERIAL)).toBeTruthy()
      const existingRGAGood = await RGAGood.find(RGA_ID, SERIAL)
      expect(existingRGAGood).toBeNull()
    })

    test('should return false if a rga does not exist', async () => {
      expect.assertions(1)
      expect(await RGAGood.destroy(RGA_ID, 'Some-Made-Up-Id')).toBeFalsy()
    })
  })
})
