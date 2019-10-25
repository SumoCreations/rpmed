import { Distributor, IDistributor, RGA } from '../../../../models'
import { RgaStatus } from '../../../../schema'
import { rgas } from './rgas'

describe('Query', () => {
  let existingDistributor: IDistributor

  beforeAll(async done => {
    existingDistributor = await Distributor.create({
      domain: 'example-dist.com',
      name: 'Example Distributor 2',
    })
    await RGA.create({
      distributorId: existingDistributor.partitionKey,
      status: RgaStatus.Issued,
      submittedBy: 'some-one@example-dist.com',
      submittedOn: new Date().toISOString(),
    })
    await RGA.create({
      distributorId: existingDistributor.partitionKey,
      status: RgaStatus.Issued,
      submittedBy: 'some-one@example-dist.com',
      submittedOn: new Date().toISOString(),
    })
    done()
  })

  describe('rgas', () => {
    test('should return a list of rgas if it exists', async () => {
      expect.assertions(4)
      const output = await rgas(null, { status: RgaStatus.Issued })
      expect(output.success).toEqual(true)
      expect(output.rga).toBeUndefined()
      expect(output.rgas).toBeDefined()
      expect(output.rgas.length > 1).toEqual(true)
    })

    test('should return an empty list of no rgas exists for the supplied status', async () => {
      expect.assertions(4)
      const output = await rgas(null, { status: RgaStatus.Canceled })
      expect(output.success).toEqual(true)
      expect(output.rga).toBeUndefined()
      expect(output.rgas).toBeDefined()
      expect(output.rgas.length < 1).toEqual(true)
    })
  })
})
