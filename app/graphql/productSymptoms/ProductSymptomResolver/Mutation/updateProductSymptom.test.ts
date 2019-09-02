import { IProductSymptom, ProductSymptom } from '../../../../models'
import { updateProductSymptom } from './updateProductSymptom'

const sampleParams = {
  careTip: 'Improper cleaning can result in damage (see Cleaning Guide)',
  faultCode: 'EHIJUPDATE',
  fee: false,
  name: 'Light randomly turns off (stobes/blinks)',
  preApproved: false,
  solution:
    'Replace light housing module because it needs a new wire harness and/or circuit boards.',
  synopsis:
    'LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.',
}

describe('updateProductSymptom', () => {
  let productSymptom: IProductSymptom
  beforeEach(async done => {
    productSymptom = await ProductSymptom.create({ ...sampleParams })
    done()
  })

  afterEach(async done => {
    await ProductSymptom.destroy(productSymptom.partitionKey)
    done()
  })

  test('should update the productSymptom', async () => {
    expect.assertions(1)
    const productSymptomInput = {
      id: productSymptom.partitionKey,
      ...sampleParams,
      faultCode: 'UPDATETEST2000',
    }
    const output = await updateProductSymptom(null, { productSymptomInput })
    expect(output.success).toBe(true)
  })

  test('should fail if the productSymptom does not exist', async () => {
    expect.assertions(1)
    const output = await updateProductSymptom(null, {
      productSymptomInput: { id: 'some-made-up-key', ...sampleParams },
    })
    expect(output.success).toBe(false)
  })
})
