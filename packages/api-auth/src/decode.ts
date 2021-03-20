import * as jwt from 'jsonwebtoken'
import { SUPPORTED_ALGORITHM } from './generate'
import { AuthConfig } from './types'

export const decode = ({ signature }: AuthConfig) => (token: string) =>
  jwt.verify(token, signature ?? process.env.OAUTH_SIGNATURE, {
    algorithms: [SUPPORTED_ALGORITHM],
  })
