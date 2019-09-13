import { IProductSymptom, ProductSymptom } from '../../../../models'
import { createProductSymptom } from './createProductSymptom'

const sampleParams = {
  careTip: 'Improper cleaning can result in damage (see Cleaning Guide)',
  faultCode: 'EHIJ-TEST',
  fee: false,
  name: 'Light randomly turns off (stobes/blinks)',
  preApproved: false,
  solution:
    'Replace light housing module because it needs a new wire harness and/or circuit boards.',
  synopsis:
    'LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.',
}

describe('createProductSymptom', () => {
  let productSymptom: IProductSymptom
  beforeAll(
    async () =>
      (productSymptom = await ProductSymptom.create({
        careTip: 'Improper cleaning can result in damage (see Cleaning Guide)',
        faultCode: 'EFT',
        fee: false,
        name: 'Light randomly turns off (stobes/blinks)',
        preApproved: false,
        solution:
          'Replace light housing module because it needs a new wire harness and/or circuit boards.',
        synopsis:
          'LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.',
      }))
  )

  afterAll(
    async () => await ProductSymptom.destroy(productSymptom.partitionKey)
  )

  test('should generate a new productSymptom model if the productSymptom is valid', async () => {
    expect.assertions(1)
    const output = await createProductSymptom(null, {
      productSymptomInput: { ...sampleParams },
    })
    expect(output.success).toBe(true)
  })

  test('should fail if the faultCode is blank', async () => {
    expect.assertions(2)
    const output = await createProductSymptom(null, {
      productSymptomInput: { ...sampleParams, faultCode: '' },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('faultCode')
  })

  test('should fail and report multiple invalid values', async () => {
    expect.assertions(3)
    const output = await createProductSymptom(null, {
      productSymptomInput: { ...sampleParams, faultCode: null, name: null },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('faultCode')
    expect(output.errors.map(e => e.path)).toContain('name')
  })
})
