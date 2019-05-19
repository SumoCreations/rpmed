import { DateTime } from "luxon"
import { isEmpty } from "validator"
import { IRGAGood, RGAGood } from "./rgaGood"

const RGA_ID = "TEST-RGA-ID"
const PRODUCT_ID = "TEST-PRODUCT-ID"
const SYMPTOM_ID = "TEST-SYMPTOM-ID"
const SERIAL = "TEST-SERIAL-NUMBER"
const DATE = DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO()
// tslint:disable
describe("rga", () => {
  let existingGood: IRGAGood
  beforeAll(async (done) => {
    console.log("Creating existing good for tests...")
    try {
      existingGood = await RGAGood.create({
        lotted: false,
        modelNumber: "MLD-X01",
        productId: PRODUCT_ID,
        rgaId: RGA_ID,
        serial: SERIAL,
        submittedBy: "test@klsmartin.com",
        submittedOn: DATE,
        symptomId: SYMPTOM_ID,
        warrantied: true,
      })
    } catch (e) {
      console.log("COULD NOT CREATE GOOD")
      console.log(e)
      done()
    }
    console.log(existingGood)
    done()
  })

  afterAll(async (done) => {
    await RGAGood.destroy(RGA_ID, existingGood.id)
    done()
  })

  describe("create", () => {
    test("should generate a new rga", () => {
      expect(isEmpty(existingGood.partitionKey)).toBe(false)
      expect(existingGood.sortKey).toBe(`${RGAGood.SECONDARY_KEY}_${existingGood.id}`)
    })

    test("should fail if the same serial is used twice", async () => {
      expect.assertions(1)
      try {
        await RGAGood.create({
          lotted: false,
          modelNumber: "MLD-X01",
          productId: PRODUCT_ID,
          rgaId: RGA_ID,
          serial: SERIAL,
          submittedBy: "test@klsmartin.com",
          submittedOn: DATE,
          symptomId: SYMPTOM_ID,
          warrantied: true,
        })
      } catch (e) {
        expect(e).toBeDefined()
      }
    })
  })

  describe("find", () => {
    test("should return an rga good if one exists", async () => {
      expect.assertions(1)
      const existingRGAGood = await RGAGood.find(RGA_ID, SERIAL)
      expect(existingRGAGood).not.toBeNull()
    })

    test("should return null if a rga does not exist", async () => {
      expect.assertions(1)
      const existingRGAGood = await RGAGood.find(RGA_ID, "Some-Made-Up-Id")
      expect(existingRGAGood).toBeNull()
    })
  })

  describe("forRGA", () => {
    test("should return all goods for the specific rga if they exists", async () => {
      expect.assertions(2)
      await RGAGood.create({
        lotted: false,
        modelNumber: "MLD-X01",
        productId: PRODUCT_ID,
        rgaId: RGA_ID,
        serial: "SERIAL-B",
        submittedBy: "test@klsmartin.com",
        submittedOn: DATE,
        symptomId: SYMPTOM_ID,
        warrantied: true,
      })
      const existingGoods = await RGAGood.forRGA(RGA_ID)
      expect(existingGoods.map(g => g.id)).toContain(SERIAL)
      expect(existingGoods.map(g => g.id)).toContain("SERIAL-B")
    })

    test("should return an empty array if the RGA does not exist", async () => {
      expect.assertions(1)
      const existingGoods = await RGAGood.forRGA("RGA_ID-DOES-NOT-EXIST")
      expect(existingGoods.length).toBeLessThan(1)
    })
  })

  describe("destroy", () => {
    test("should delete a rga and return true if one exists", async () => {
      expect.assertions(2)
      expect(await RGAGood.destroy(RGA_ID, SERIAL)).toBeTruthy()
      const existingRGAGood = await RGAGood.find(RGA_ID, SERIAL)
      expect(existingRGAGood).toBeNull()
    })

    test("should return false if a rga does not exist", async () => {
      expect.assertions(1)
      expect(await RGAGood.destroy(RGA_ID, "Some-Made-Up-Id")).toBeFalsy()
    })
  })
})
