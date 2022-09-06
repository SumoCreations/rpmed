import { IProductRegistration, ProductRegistration } from '../../../../models'
import { TST_ORIGIN_CTX, TST_USER_CTX } from '../../../auth'
import {
  generateSampleParams,
  IRegistrationSampleParamOutput,
} from '../testHelpers'
import { updateProductRegistration } from './updateProductRegistration'

describe('updateProductRegistration', () => {
  let sample1: IRegistrationSampleParamOutput
  let registration: IProductRegistration
  beforeEach(async done => {
    sample1 = await generateSampleParams({
      key: 'UPDATE-TST-1',
      lotted: false,
      serial: null,
    })
    registration = await ProductRegistration.create({ ...sample1.sampleParams })
    done()
  })

  afterEach(async done => {
    await ProductRegistration.destroy(registration.partitionKey)
    done()
  })

  test('should update the productRegistration', async () => {
    expect.assertions(1)
    const productRegistrationInput = {
      ...sample1.sampleParams,
      id: registration.partitionKey,
      registeredOn: new Date().toISOString(),
    }
    const output = await updateProductRegistration(
      null,
      {
        productRegistrationInput,
      },
      TST_USER_CTX
    )
    expect(output.success).toBe(true)
  })

  test('should fail if not an authorized user', async () => {
    expect.assertions(1)
    const productRegistrationInput = {
      ...sample1.sampleParams,
      id: registration.partitionKey,
      registeredOn: new Date().toISOString(),
    }
    const output = await updateProductRegistration(
      null,
      {
        productRegistrationInput,
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
  })

  test('should fail if the productRegistration does not exist', async () => {
    expect.assertions(1)
    const output = await updateProductRegistration(
      null,
      {
        productRegistrationInput: {
          ...sample1.sampleParams,
          id: 'some-made-up-key',
        },
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
  })
})
