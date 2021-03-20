import {
  ITemporaryAccessToken,
  TemporaryAccessToken,
} from './temporaryAccessToken'

describe('temporaryAccessToken', () => {
  let temporaryAccessToken: ITemporaryAccessToken
  beforeEach(async done => {
    temporaryAccessToken = await TemporaryAccessToken.create({
      payload: {
        redirectPath: '/signup/educator/one',
        userId: 'user-id-1',
      },
    })
    done()
  })

  afterEach(async done => {
    await TemporaryAccessToken.destroy(temporaryAccessToken.partitionKey)
    done()
  })

  describe('create', () => {
    test('should generate a new model', () => {
      expect(temporaryAccessToken.partitionKey).toBeDefined()
      expect(temporaryAccessToken.sortKey).toBe(
        TemporaryAccessToken.SECONDARY_KEY
      )
    })
  })

  describe('find', () => {
    test('should return an instance if one exists', async () => {
      expect.assertions(1)
      const existingToken = await TemporaryAccessToken.find(
        temporaryAccessToken.partitionKey
      )
      expect(existingToken).not.toBeNull()
    })
  })

  describe('decode', () => {
    test('should decode a temporaryAccessToken and return the decoded payload', async () => {
      expect.assertions(2)
      const decoded: any = await TemporaryAccessToken.decode(
        temporaryAccessToken
      )
      expect(decoded).not.toBe(null)
      expect(decoded.userId).toEqual('user-id-1')
    })
  })

  describe('destroy', () => {
    test('should delete a temporaryAccessToken and return true if one exists', async () => {
      expect.assertions(2)
      expect(
        await TemporaryAccessToken.destroy(temporaryAccessToken.partitionKey)
      ).toBeTruthy()
      const existingTemporaryAccessToken = await TemporaryAccessToken.find(
        temporaryAccessToken.partitionKey
      )
      expect(existingTemporaryAccessToken).toBeNull()
    })

    test('should return false if a temporaryAccessToken does not exist', async () => {
      expect.assertions(1)
      expect(await TemporaryAccessToken.destroy('Some-Made-Up-Id')).toBeFalsy()
    })
  })
})
