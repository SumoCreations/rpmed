import { Distributor, IDistributor, IRGA, RGA } from '../../../../models'
import { rga } from './rga'

describe('Query', () => {
  let existingRGA: IRGA
  let existingDistributor: IDistributor

  beforeAll(async done => {
    existingDistributor = await Distributor.create({
      name: 'Example Distributor',
      domain: 'example-dist.com',
    })
    existingRGA = await RGA.create({
      distributorId: existingDistributor.partitionKey,
      submittedBy: 'some-one@example-dist.com',
      submittedOn: new Date().toISOString(),
    })
    done()
  })

  describe('rga', () => {
    test('should return a rga if it exists', async () => {
      expect.assertions(6)
      const output = await rga({}, { id: existingRGA.partitionKey })
      expect(output.success).toEqual(true)
      expect(output.rga).toBeDefined()
      expect(output.rgas).toBeUndefined()
      expect(output.rga.distributorId).toEqual(existingRGA.distributorId)
      expect(output.rga.submittedBy).toEqual(existingRGA.submittedBy)
      expect(output.rga.submittedOn).toEqual(existingRGA.submittedOn)
    })

    test('should return an error if it does not exist', async () => {
      expect.assertions(4)
      const output = await rga({}, { id: 'DOES-NOT-EXIST' })
      expect(output.success).toEqual(false)
      expect(output.rga).toBeUndefined()
      expect(output.rgas).toBeUndefined()
      expect(output.errors).toBeDefined()
    })
  })
})
