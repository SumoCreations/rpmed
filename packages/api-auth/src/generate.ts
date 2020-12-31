import * as jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

import { TokenInput, TokenOutput, AuthConfig, RefreshToken } from './types'

export const SUPPORTED_ALGORITHM = 'HS512'

/**
 * Generates a JWT access and JWT refresh token.
 * @param input An object used to assign credentials for the token's payload.
 */
export const generate = ({ signature }: AuthConfig) => (
  input: TokenInput
): TokenOutput => {
  const { accessLevel, userId } = input
  const now = Math.floor(Date.now() / 1000)
  const accessTokenLifespanInSecond =
    parseInt(process.env.ACCESS_TOKEN_LIFESPAN, 0) || 60
  const SIGNATURE = signature ?? process.env.OAUTH_SIGNATURE
  const token = jwt.sign(
    {
      accessLevel,
      exp: now + accessTokenLifespanInSecond,
      iat: now - 30,
      jti: userId + uuid(),
      userId,
    },
    SIGNATURE,
    {
      algorithm: SUPPORTED_ALGORITHM,
    }
  )
  const refreshTokenLifeInSeconds =
    parseInt(process.env.REFRESH_TOKEN_LIFESPAN, 0) || 60 * 60
  const refresh = jwt.sign(
    {
      exp: now + refreshTokenLifeInSeconds,
      iat: now - 30,
      jti: userId + uuid(),
      refresh: true,
      userId,
    },
    SIGNATURE,
    {
      algorithm: SUPPORTED_ALGORITHM,
    }
  )
  return {
    expiresIn: process.env.ACCESS_TOKEN_LIFESPAN,
    refresh,
    token,
  }
}

/**
 * Validates and returns the content of a JWT signed by this
 * app.
 * @param token A JWT token to verify and decode.
 */
export const verifyAndDecode = ({ signature }: AuthConfig) => (
  token: string
): RefreshToken | null => {
  try {
    const result = jwt.verify(token, signature ?? process.env.OAUTH_SIGNATURE, {
      algorithms: [SUPPORTED_ALGORITHM],
    })
    if (typeof result === 'string') {
      // tslint:disable-next-line no-console
      console.log(`Trouble parsing token, result: '${result}'`)
      return null
    } else {
      return result as RefreshToken
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log('verifyAndDecode THREW:')
    // tslint:disable-next-line no-console
    console.log(e)
    return null
  }
}

/**
 * Generates a fresh access and refresh token based on password credentials.
 * @param email The email address used to identify the user.
 * @param password The password associated to that user account.
 */
export const generateTokenFromPassword = (config: AuthConfig) => async (
  email: string,
  password: string
): Promise<TokenOutput | null> => {
  try {
    const input = await config.onVerifyPassword({ email, password })
    if (!input) {
      return null
    }
    return generate(config)(input)
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return null
  }
}

/**
 * Writes a JWT string to a lookup table of previously used tokens.
 * Throws an exception if the token already exists.
 * @param token A JWT string to add to the blacklist.
 */
const blacklistToken = ({ tokenLookupTable }: AuthConfig) => async (
  token: string,
  client: any
) => {
  const params = {
    ConditionExpression: 'attribute_not_exists(id)',
    Item: { id: token },
    TableName: tokenLookupTable ?? process.env.DYNAMODB_TOKEN_LOOKUP_TABLE,
  }
  await client.put(params).promise()
}

/**
 * Generates a fresh access and refresh token based on refresh token.
 * @param refreshToken A JWT refresh token.
 */
export const generateTokenFromRefreshToken = (config: AuthConfig) => async (
  refreshToken: string
): Promise<TokenOutput | null> => {
  const token = verifyAndDecode(config)(refreshToken)
  if (!token) {
    return null
  }
  const { refresh, userId } = token as RefreshToken
  if (!refresh) {
    return null
  }
  const input = await config.onVerifyUserId({ userId })
  if (!input) {
    return null
  }
  try {
    await blacklistToken(config)(refreshToken, config.dynamoClient)
  } catch (e) {
    // tslint:disable-next-line
    console.log(`Coult not blacklist token (${token}):`)
    // tslint:disable-next-line
    console.log(e)
    return null
  }
  return generate(config)({ ...input })
}
