import { mergeTypeDefs } from '@graphql-tools/merge'
import { print } from 'graphql'
import fs from 'fs'
import { typeDefs as baseTypes } from './base'
import { typeDefs as uploadsTypes } from './uploads/UploadsSchema'
import { typeDefs as userTypes } from './users/UserSchema'
import { typeDefs as rgaTypes } from './rgas/RGASchema'
import { typeDefs as productSymptomTypes } from './productSymptoms/ProductSymptomSchema'
import { typeDefs as productTypes } from './products/ProductSchema'
import { typeDefs as productRegistrationTypes } from './productRegistrations/ProductRegistrationSchema'
import { typeDefs as distributorTypes } from './distributors/DistributorSchema'
import { typeDefs as customerTypes } from './customers/CustomerSchema'
import { typeDefs as pageTypes } from './pages/PageSchema'
import { typeDefs as documentTypes } from './documents/DocumentSchema'

export const mergeSchemas = (outputPath = 'schema.graphql') => {
  const typeDefs = mergeTypeDefs([
    baseTypes,
    productRegistrationTypes,
    distributorTypes,
    customerTypes,
    pageTypes,
    documentTypes,
    productSymptomTypes,
    uploadsTypes,
    userTypes,
    rgaTypes,
    productTypes,
  ])
  const printedTypeDefs = print(typeDefs)
  fs.writeFileSync(outputPath, printedTypeDefs)
}

mergeSchemas()
