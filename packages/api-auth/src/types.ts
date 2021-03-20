export interface TokenInput {
  userId: string
  accessLevel: string
}

export interface TokenOutput {
  token: string
  refresh: string
  expiresIn: string
}

export interface RefreshToken {
  userId: string
  refresh: boolean
  iat: number
  exp: number
}

export type TokenResult = TokenInput | undefined

/**
 * A block that is used to authenticate an email/pass combo
 * in a parent module.
 */
export type AuthVerifyPasswordFunction = (params: {
  email: string
  password: string
}) => Promise<TokenResult> | TokenResult

/**
 * A block that is used to verify a userId
 * in a parent module.
 */
export type AuthVerifyUserIdFunction = (params: {
  userId: string
}) => Promise<TokenResult> | TokenResult

export interface AuthConfig {
  signature?: string
  tokenLookupTable?: string
  saltRounds?: number
  onVerifyPassword: AuthVerifyPasswordFunction
  onVerifyUserId: AuthVerifyUserIdFunction
  dynamoClient: any
}
