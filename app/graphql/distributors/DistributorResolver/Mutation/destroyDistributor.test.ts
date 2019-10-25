import { Distributor, IDistributor } from '../../../../models'
import { destroyDistributor } from './destroyDistributor'

const sampleParams = { domain: 'example30.com', name: 'Sumo Creations LLC' }

describe('destroyDistributor', () => {
  let distributor: IDistributor
  beforeEach(async done => {
    distributor = await Distributor.create({ ...sampleParams })
    done()
  })

  afterEach(async done => {
    await Distributor.destroy(distributor.partitionKey)
    done()
  })

  test('should destroy the distributor', async () => {
    expect.assertions(1)
    const output = await destroyDistributor(null, {
      id: distributor.partitionKey,
    })
    expect(output.success).toBe(true)
  })

  test('should fail the distributor does not exist', async () => {
    expect.assertions(1)
    const output = await destroyDistributor(null, {
      id: 'some-made-up-id-or-key',
    })
    expect(output.success).toBe(false)
  })
})
