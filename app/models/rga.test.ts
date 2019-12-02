import { DateTime } from 'luxon'
import { isEmpty } from 'validator'
import { RgaStatus } from '../schema'
import { Distributor, IDistributor } from './distributor'
import { IRGA, RGA } from './rga'

const existingRGAParams = {
  shippingSpeed: 'ground',
  status: RgaStatus.Issued,
  submittedBy: 'example-user@klsmartin.com',
  submittedOn: DateTime.utc(2019, 5, 7, 7, 30, 1, 1).toISO(),
}

describe('rga', () => {
  let rga: IRGA
  let distributor: IDistributor
  beforeAll(async done => {
    distributor = await Distributor.create({
      domain: 'klsmartin.com',
      name: 'klsMartin',
    })
    rga = await RGA.create({
      ...existingRGAParams,
      distributorId: distributor.partitionKey,
      shippingSpeed: 'Ground',
    })
    done()
  })

  afterAll(async done => {
    await RGA.destroy(rga.partitionKey)
    done()
  })

  describe('create', () => {
    test('should generate a new rga', () => {
      expect(isEmpty(rga.partitionKey)).toBe(false)
      expect(rga.sortKey).toBe(RGA.SECONDARY_KEY)
    })

    test('should increment the ID', async () => {
      expect.assertions(1)
      const rgaOnSameDay = await RGA.create({
        ...existingRGAParams,
        distributorId: distributor.partitionKey,
        shippingSpeed: 'Ground',
      })
      expect(rgaOnSameDay.partitionKey).toMatch(/^05072019MR/)
    })

    test('should start over for a later date', async () => {
      expect.assertions(1)
      const rgaOnSameDay = await RGA.create({
        ...existingRGAParams,
        distributorId: distributor.partitionKey,
        shippingSpeed: 'Ground',
        submittedOn: DateTime.utc(2019, 5, 8, 7, 30, 1, 1).toISO(),
      })
      expect(rgaOnSameDay.partitionKey).toMatch(/^05082019MR/)
    })

    test('should start over for a previous date', async () => {
      expect.assertions(1)
      const rgaOnSameDay = await RGA.create({
        ...existingRGAParams,
        distributorId: distributor.partitionKey,
        shippingSpeed: 'Ground',
        submittedOn: DateTime.utc(2019, 5, 6, 7, 30, 1, 1).toISO(),
      })
      expect(rgaOnSameDay.partitionKey).toMatch(/^05062019MR/)
    })

    test('should increment the ID again if its on the same date', async () => {
      expect.assertions(1)
      const rgaOnSameDay = await RGA.create({
        ...existingRGAParams,
        distributorId: distributor.partitionKey,
        shippingSpeed: 'Ground',
      })
      expect(rgaOnSameDay.partitionKey).toMatch(/^05072019MR/)
    })
  })

  describe('find', () => {
    test('should return a rga if one exists', async () => {
      expect.assertions(1)
      const existingRGA = await RGA.find(rga.partitionKey)
      expect(existingRGA).not.toBeNull()
    })

    test('should return null if a rga does not exist', async () => {
      expect.assertions(1)
      const existingRGA = await RGA.find('Some-Made-Up-Id')
      expect(existingRGA).toBeNull()
    })
  })

  describe('destroy', () => {
    test('should delete a rga and return true if one exists', async () => {
      expect.assertions(2)
      expect(await RGA.destroy(rga.partitionKey)).toBeTruthy()
      const existingRGA = await RGA.find(rga.partitionKey)
      expect(existingRGA).toBeNull()
    })

    test('should return false if a rga does not exist', async () => {
      expect.assertions(1)
      expect(await RGA.destroy('Some-Made-Up-Id')).toBeFalsy()
    })
  })

  describe('updateStatus', () => {
    test('should update an RGA and return the entire object if successful', async () => {
      const existing = (rga = await RGA.create({
        ...existingRGAParams,
        distributorId: distributor.partitionKey,
        shippingSpeed: 'Ground',
      }))
      expect.assertions(2)
      const madeUpUser = {
        email: 'some@email.com',
        id: 'some-user-id',
        name: 'Test User',
      }
      const update = await RGA.updateStatus({
        id: existing.partitionKey,
        status: RgaStatus.Shipping,
        updatedBy: madeUpUser,
      })
      expect(update.status).toEqual(RgaStatus.Shipping)
      expect(update.statusLog[0].status).toEqual(RgaStatus.Shipping)
      await RGA.destroy(existing.partitionKey)
    })
  })
})
