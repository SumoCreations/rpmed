import * as jwt from 'jsonwebtoken'
import { SUPPORTED_ALGORITHM } from './generate'

export const decode = (token: string) =>
  jwt.verify(token, process.env.OAUTH_SIGNATURE, {
    algorithms: [SUPPORTED_ALGORITHM],
  })
