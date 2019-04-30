import { makeExecutableSchema, mergeSchemas } from "apollo-server-lambda"
import * as products from "./products"
import * as users from "./users"

export const schemas = [products, users]
export const schema = mergeSchemas({
  schemas: schemas.map(({ typeDefs, resolvers }) =>
    makeExecutableSchema({ typeDefs, resolvers })
  ),
})
