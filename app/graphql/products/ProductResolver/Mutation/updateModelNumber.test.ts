import {
  IModelNumber,
  IModelNumberInput,
  IProduct,
  ModelNumber,
  Product,
  ProductType,
} from '../../../../models'
import { updateModelNumber } from './updateModelNumber'

describe('updateModelNumber', () => {
  let existingProduct: IProduct
  let existingModelNumber: IModelNumber
  let sampleParams: IModelNumberInput
  beforeEach(async done => {
    existingProduct = await Product.create({
      description: 'MedLED Sapphire Top-Tier',
      name: 'MedLED Sapphire (MLOD01)',
    })
    sampleParams = {
      description: 'MedLED Onyx® Headlight Hospital Kit',
      feeWithWarranty: { distributor: '0', endUser: '10' },
      feeWithoutWarranty: { distributor: '250', endUser: '300' },
      id: 'MLOD01-HK',
      lotted: false,
      pricing: { cost: '1000', retail: '1200' },
      productIds: [existingProduct.partitionKey],
      productType: ProductType.HEADLIGHT,
      resolutionWithWarranty: 'Send in for servicing',
      resolutionWithoutWarranty: 'Send in for servicing',
      warrantyDescription: 'Service after 2 months',
      warrantyTerm: 12,
    }
    existingModelNumber = await ModelNumber.create(sampleParams)
    done()
  })

  afterEach(async done => {
    await Product.destroy(existingProduct.partitionKey)
    await ModelNumber.destroy(existingModelNumber.partitionKey)
    done()
  })

  test('should update model attributes provided they are valid', async () => {
    expect.assertions(4)
    const output = await updateModelNumber(null, {
      modelNumberInput: {
        ...sampleParams,
        lotted: true,
        resolutionWithWarranty: 'Buy a new one.',
        warrantyTerm: 6,
      },
    })
    expect(output.success).toBe(true)
    const updatedModel = await ModelNumber.find(sampleParams.id)
    expect(updatedModel.lotted).toBe(true)
    expect(updatedModel.warrantyTerm).toEqual(6)
    expect(updatedModel.resolutionWithWarranty).toEqual('Buy a new one.')
  })

  test("should fail if the product doesn't exists", async () => {
    expect.assertions(2)
    const output = await updateModelNumber(null, {
      modelNumberInput: {
        ...sampleParams,
        productIds: ['SOME-FAKE-KEY'],
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('productId')
  })

  test('should fail if the model number does not exists', async () => {
    expect.assertions(2)
    const output = await updateModelNumber(null, {
      modelNumberInput: {
        ...sampleParams,
        id: 'ID-DOES-NOT-EXIST',
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('id')
  })

  test('should fail if the model number does not pass validations', async () => {
    expect.assertions(3)
    const invalidInput: any = {
      modelNumberInput: {
        ...sampleParams,
        lotted: null,
        warrantyTerm: '',
      },
    }
    const output = await updateModelNumber(null, invalidInput)
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('warrantyTerm')
    expect(output.errors.map(e => e.path)).toContain('lotted')
  })
})
