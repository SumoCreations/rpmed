import { gql } from "apollo-server-lambda"

export const typeDefs = gql`
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
  }

  type Query {
    """
    All products in the system.
    """
    products: [Product]
    """
    All product variants in the system.
    """
    modelNumbers: [ModelNumber]
    """
    A specific product in the system via ID.
    """
    product(id: String!): Product
  }

  type Mutation {
    """
    Adds a new product to the database.
    """
    createProduct(name: String!, description: String!): Product!
    """
    Adds a new product variant to the database.
    """
    createModelNumber(
      id: String!
      productId: String!
      description: String!
      warrantyTerm: Int!
      warrantyDescription: String!
      feeWithWarranty: Float!
      feeWithoutWarranty: Float!
      resolutionWithWarranty: String
      resolutionWithoutWarranty: String
      publicNotes: String
      privateNotes: String
      lotted: Boolean!
    ): ModelNumber!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
