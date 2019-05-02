import { makeExecutableSchema, mergeSchemas } from "apollo-server-lambda"
import * as customers from "./customers"
import * as distributors from "./distributors"
import * as products from "./products"
import * as productSymptoms from "./productSymptoms"
import * as users from "./users"

export const schemas = [customers, distributors, products, productSymptoms, users]
export const schema = mergeSchemas({
  schemas: schemas.map(({ typeDefs, resolvers }) =>
    makeExecutableSchema({ typeDefs, resolvers })
  ),
})
