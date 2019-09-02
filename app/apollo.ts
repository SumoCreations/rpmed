import { ApolloServer } from 'apollo-server-lambda'
import { schema } from './graphql'

import { localeFromLanguage } from './locales'

const server = new ApolloServer({
  context: ({ event }) => ({
    authorization: event.headers.Authorization
      ? event.headers.Authorization.split('Bearer ')[1]
      : null,
    locale: localeFromLanguage(event.headers['Accept-Language']),
  }),
  formatError: error => {
    // tslint:disable-next-line
    console.log(error)
    return error
  },
  formatResponse: response => {
    // tslint:disable-next-line
    console.log(response)
    return response
  },
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
  schema,
})

export const graphqlHandler = server.createHandler({
  cors: {
    credentials: true,
    origin: true,
  },
})
