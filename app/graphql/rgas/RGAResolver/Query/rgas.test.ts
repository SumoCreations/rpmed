import { Distributor, IDistributor, RGA } from '../../../../models'
import { rgas } from './rgas'

describe('Query', () => {
  let existingDistributor: IDistributor

  beforeAll(async done => {
    existingDistributor = await Distributor.create({
      name: 'Example Distributor 2',
      domain: 'example-dist.com',
    })
    await RGA.create({
      distributorId: existingDistributor.partitionKey,
      submittedBy: 'some-one@example-dist.com',
      submittedOn: new Date().toISOString(),
    })
    await RGA.create({
      distributorId: existingDistributor.partitionKey,
      submittedBy: 'some-one@example-dist.com',
      submittedOn: new Date().toISOString(),
    })
    done()
  })

  describe('rgas', () => {
    test('should return a list of rgas if it exists', async () => {
      expect.assertions(4)
      const output = await rgas()
      expect(output.success).toEqual(true)
      expect(output.rga).toBeUndefined()
      expect(output.rgas).toBeDefined()
      expect(output.rgas.length > 1).toEqual(true)
    })
  })
})
