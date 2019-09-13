import { DateTime } from 'luxon'
import { isEmpty } from 'validator'
import { Distributor, IDistributor } from './distributor'
import { IRGA, RGA } from './rga'

const existingRGAParams = {
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
      })
      expect(rgaOnSameDay.partitionKey).toMatch(/^05072019MR/)
    })

    test('should start over for a later date', async () => {
      expect.assertions(1)
      const rgaOnSameDay = await RGA.create({
        ...existingRGAParams,
        distributorId: distributor.partitionKey,
        submittedOn: DateTime.utc(2019, 5, 8, 7, 30, 1, 1).toISO(),
      })
      expect(rgaOnSameDay.partitionKey).toMatch(/^05082019MR/)
    })

    test('should start over for a previous date', async () => {
      expect.assertions(1)
      const rgaOnSameDay = await RGA.create({
        ...existingRGAParams,
        distributorId: distributor.partitionKey,
        submittedOn: DateTime.utc(2019, 5, 6, 7, 30, 1, 1).toISO(),
      })
      expect(rgaOnSameDay.partitionKey).toMatch(/^05062019MR/)
    })

    test('should increment the ID again if its on the same date', async () => {
      expect.assertions(1)
      const rgaOnSameDay = await RGA.create({
        ...existingRGAParams,
        distributorId: distributor.partitionKey,
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
})
