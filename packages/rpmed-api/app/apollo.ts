import { ApolloServer } from 'apollo-server-lambda'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { schema } from './graphql'
import { localeFromLanguage } from './locales'
import { decode } from './oauth'
import { User, IUser } from './models'

export interface Context {
  locale: string
  authorization?: string
  currentUser: () => Promise<IUser | null>
  approvedOrigin: boolean
  authorized: boolean
}

const server = new ApolloServer({
  context: ({ event }): Context => {
    console.log(event.headers)
    let approvedOrigin = false
    try {
      const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
      const { hostname } = new URL(
        event.headers['origin'] ?? event.headers['Origin']
      )
      approvedOrigin = allowedOrigins.includes(hostname)
    } catch (e) {
      approvedOrigin = false
    }
    const authorization = event.headers.Authorization
      ? event.headers.Authorization.split('Bearer ')[1]
      : null
    let authorized = false
    let currentSession: any = {}
    try {
      currentSession = authorization ? decode(authorization) : null
      authorized = currentSession ? true : false
    } catch (e) {
      authorized = false
    }
    return {
      authorized,
      approvedOrigin,
      authorization,
      locale: localeFromLanguage(event.headers['Accept-Language']),
      currentUser: async () => {
        try {
          return await User.find(currentSession.userId)
        } catch (e) {
          return null
        }
      },
    }
  },
  formatError: error => {
    console.log(error)
    return error
  },
  formatResponse: response => {
    console.log(response)
    return response
  },
  introspection: process.env.APOLLO_INTROSPECTION === 'true' ? true : false,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        'editor.theme': 'dark',
      },
    }),
  ],
  schema,
})

export const graphqlHandler = server.createHandler({
  expressGetMiddlewareOptions: { cors: true },
})
