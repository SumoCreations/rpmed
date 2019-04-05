import { makeExecutableSchema, mergeSchemas } from "apollo-server-lambda"
import * as users from "./users"

export const typeDefs = [users.schema]
export const resolvers = { ...users.resolvers }
export const schema = mergeSchemas({
  resolvers,
  schemas: [makeExecutableSchema({ typeDefs: users.schema })],
})
