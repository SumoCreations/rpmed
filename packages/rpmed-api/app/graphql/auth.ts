import { Context } from '../apollo'
import { generateMutationError } from 'api-utils'
export type ServerContext = Context

export const isAuthorizedUser = (context?: Context): boolean =>
  context?.authorized

export const isAuthorizedOrigin = (context?: Context): boolean =>
  context?.approvedOrigin

export const isAuthorized = (context?: Context): boolean =>
  isAuthorizedUser(context) || isAuthorizedOrigin(context)

export const generateAuthorizationError = () =>
  generateMutationError([{ path: 'authorization', message: 'Unauthorized' }])

export const TST_USER_CTX: ServerContext = {
  approvedOrigin: true,
  authorized: true,
  locale: 'en',
  currentUser: () =>
    Promise.resolve({
      id: '1',
      name: 'test',
      email: 'email@example.com',
      password: '',
      role: 'user',
      firstName: 'John',
      lastName: 'Tester',
      partitionKey: '1',
      sortKey: 'USER',
    }),
}

export const TST_ORIGIN_CTX: ServerContext = {
  ...TST_USER_CTX,
  authorized: false,
  currentUser: () => Promise.resolve(null),
}
