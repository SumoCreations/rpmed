import { gql } from "apollo-server-lambda"

export const typeDefs = gql`
  type ValidationError {
    """
    A path indicating the attribute that failed validation.
    """
    path: String!, 
    """
    A brief description of why the specified attribute failed validation.
    """
    message: String!
  }

  """
  A troubleshooting symptom for a product.
  """
  type SimplifiedProductSymptom {
    """
    The unique identifier for this symptom
    """
    id: ID!
    """
    The actual name of the symptom.
    """
    name: String!
    """
    An associated fee for servicing this issue.
    """
    fee: Boolean!
    """
    An official code used to identify this symptom.
    """
    faultCode: String!
  }
  
  """
  A registered user object from API. Could be a customer, admin, or partner account.
  """
  type Product {
    """
    The unique identifier for this product
    """
    id: ID!
    """
    The name of this product.
    """
    name: String!
    """
    A brief description of this product.
    """
    description: String!
    """
    All available variations or configurations of this product.
    """
    modelNumbers: [ModelNumber]
  }

  type ModelNumber {
    """
    The model number identifying a product variant.
    """
    id: ID!
    """
    The id of the product this variant belongs to.
    """
    productId: String!
    """
    The product this variant belongs to.
    """
    product: Product
    """
    A brief description of this product variant.
    """
    description: String!
    """
    If a product is lotted it has a class of serial numbers associated to it.
    """
    lotted: Boolean!
    """
    The length of the warranty that applies to this model in months.
    """
    warrantyTerm: Int!
    """
    A description of the warranty that applies to this model.
    """
    warrantyDescription: String!
    """
    How issues will be resolved if this item is covered by a warranty.
    """
    resolutionWithWarranty: String
    """
    How issues will be resolved if this item is not covered by a warranty.
    """
    resolutionWithoutWarranty: String
    """
    How much will it cost to service this item if it is covered by a warranty.
    """
    feeWithWarranty: Float!
    """
    How much will it cost to service this item if it is not covered by a warranty.
    """
    feeWithoutWarranty: Float!
    """
    Any public notes related to servicing this model variation.
    """
    publicNotes: String
    """
    Any internal notes for employess when servicing this model variation.
    """
    privateNotes: String
    """
    A list of all associated symptoms related to this model number.
    """
    symptoms: [SimplifiedProductSymptom]!

  }

  """
  Describes a product to be created or updated.
  """
  input ProductInput {
    """
    The unique identifier for this product
    """
    id: ID
    """
    The name of this product.
    """
    name: String!
    """
    A brief description of this product.
    """
    description: String!
  }

  """
  Describes a model number to be created or updated.
  """
  input ModelNumberInput {
    """
    The model number identifying a product variant.
    """
    id: ID!
    """
    The id of the product this variant belongs to.
    """
    productId: String!
    """
    A brief description of this product variant.
    """
    description: String!
    """
    If a product is lotted it has a class of serial numbers associated to it.
    """
    lotted: Boolean!
    """
    The length of the warranty that applies to this model in months.
    """
    warrantyTerm: Int!
    """
    A description of the warranty that applies to this model.
    """
    warrantyDescription: String!
    """
    How much will it cost to service this item if it is covered by a warranty.
    """
    feeWithWarranty: Float!
    """
    How much will it cost to service this item if it is not covered by a warranty.
    """
    feeWithoutWarranty: Float!
    """
    How issues will be resolved if this item is covered by a warranty.
    """
    resolutionWithWarranty: String
    """
    How issues will be resolved if this item is not covered by a warranty.
    """
    resolutionWithoutWarranty: String
    """
    Any public notes related to servicing this model variation.
    """
    publicNotes: String
    """
    Any internal notes for employess when servicing this model variation.
    """
    privateNotes: String
  }

  """
  The result of a mutation applied to a Product.
  """
  type ProductMutationOutput {
    """
    The resulting model if the operation was successful.
    """
    product: Product
    """
    Any validation errors encountered while running the mutation.
    """
    errors: [ValidationError]
    """
    A simple boolean indicating whether or not the operation was successful.
    """
    success: Boolean!
  }

  """
  The result of a mutation applied to a ModelNumber.
  """
  type ModelNumberMutationOutput {
    """
    The resulting model if the operation was successful.
    """
    modelNumber: ModelNumber
    """
    Any validation errors encountered while running the mutation.
    """
    errors: [ValidationError]
    """
    A simple boolean indicating whether or not the operation was successful.
    """
    success: Boolean!
  }

  type Query {
    """
    All products in the system.
    """
    products(search: String): ProductQueryOutput
    """
    All product variants in the system.
    """
    modelNumbers(search: String, productId: String, symptom: String): ModelNumberQueryOutput
    """
    A specific product in the system via ID.
    """
    product(id: String!): ProductQueryOutput
    """
    A specific model number in the system via ID.
    """
    modelNumber(id: String!): ModelNumberQueryOutput
  }

  """
  The result of a query for a product or products.
  """
  type ProductQueryOutput {
    """
    The resulting product if the operation was successful.
    """
    product: Product
    """
    The resulting products if the operation was successful and multiple results were returned.
    """
    products: [Product]
    """
    The size of the paginated results.
    """
    pageSize: Int
    """
    This key can be used to continue querying paginated results.
    """
    lastEvaluatedKey: String
    """
    Any validation errors encountered while running the mutation.
    """
    errors: [ValidationError]
    """
    A simple boolean indicating whether or not the operation was successful.
    """
    success: Boolean!
  }

    """
  The result of a query for a modelNumber or modelNumbers.
  """
  type ModelNumberQueryOutput {
    """
    The resulting model number if the operation was successful.
    """
    modelNumber: ModelNumber
    """
    The resulting model numbers if the operation was successful and multiple results were returned.
    """
    modelNumbers: [ModelNumber]
    """
    The size of the paginated results.
    """
    pageSize: Int
    """
    This key can be used to continue querying paginated results.
    """
    lastEvaluatedKey: String
    """
    Any validation errors encountered while running the mutation.
    """
    errors: [ValidationError]
    """
    A simple boolean indicating whether or not the operation was successful.
    """
    success: Boolean!
  }

  type Mutation {
    """
    Adds a new product.
    """
    createProduct(productInput: ProductInput!): ProductMutationOutput!
    """
    Updates an existing product.
    """
    updateProduct(productInput: ProductInput!): ProductMutationOutput!
    """
    Removes an existing product.
    """
    destroyProduct(id: ID!): ProductMutationOutput!
    """
    Adds a new product variant.
    """
    createModelNumber(modelNumberInput: ModelNumberInput!): ModelNumberMutationOutput!
    """
    Updates an existing product variant.
    """
    updateModelNumber(modelNumberInput: ModelNumberInput!): ModelNumberMutationOutput!
    """
    Removes an existing product variant.
    """
    destroyModelNumber(id: ID!): ModelNumberMutationOutput!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
