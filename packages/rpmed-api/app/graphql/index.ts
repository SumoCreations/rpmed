import { makeExecutableSchema } from '@graphql-tools/schema'
import { schemas } from './schemas'

export const schema = makeExecutableSchema({
  resolvers: schemas.map(s => s.resolvers),
  typeDefs: schemas.map(s => s.typeDefs),
})
