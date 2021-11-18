import { makeExecutableSchema } from 'apollo-server-lambda'
import * as base from './base'
import * as customers from './customers'
import * as distributors from './distributors'
import * as productRegistrations from './productRegistrations'
import * as products from './products'
import * as productSymptoms from './productSymptoms'
import * as rgas from './rgas'
import * as uploads from './uploads'
import * as users from './users'
import * as pages from "./pages"

export const schemas = [
  base,
  customers,
  distributors,
  products,
  productRegistrations,
  productSymptoms,
  users,
  uploads,
  rgas,
  pages
]

export const schema = makeExecutableSchema({
  resolvers: schemas.map(s => s.resolvers),
  typeDefs: schemas.map(s => s.typeDefs),
})
