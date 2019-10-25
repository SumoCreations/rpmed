import { IProductSymptom, ProductSymptom } from '../../../../models'
import { destroyProductSymptom } from './destroyProductSymptom'

const sampleParams = {
  careTip: 'Improper cleaning can result in damage (see Cleaning Guide)',
  faultCode: 'EHIJDELETEME',
  fee: false,
  name: 'Light randomly turns off (stobes/blinks)',
  preApproved: true,
  solution:
    'Replace light housing module because it needs a new wire harness and/or circuit boards.',
  synopsis:
    'LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.',
}

describe('destroyProductSymptom', () => {
  let productSymptom: IProductSymptom
  beforeEach(async done => {
    productSymptom = await ProductSymptom.create({ ...sampleParams })
    done()
  })

  afterEach(async done => {
    await ProductSymptom.destroy(productSymptom.partitionKey)
    done()
  })

  test('should destroy the productSymptom', async () => {
    expect.assertions(1)
    const output = await destroyProductSymptom(null, {
      id: productSymptom.partitionKey,
    })
    expect(output.success).toBe(true)
  })

  test('should fail the productSymptom does not exist', async () => {
    expect.assertions(1)
    const output = await destroyProductSymptom(null, {
      id: 'some-made-up-id-or-key',
    })
    expect(output.success).toBe(false)
  })
})
