import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  """
  Pricing for a product model variant.
  """
  type Pricing {
    """
    Internal cost pricing for distributors.
    """
    cost: String
    """
    Public pricing for end users.
    """
    retail: String
  }

  """
  Pricing for fees associated to a repair.
  """
  type FeeStructure {
    """
    Internal cost pricing for distributors.
    """
    distributor: String
    """
    Public pricing for end users.
    """
    endUser: String
  }

  """
  Denotes the high level category for this product.
  """
  enum ProductType {
    """
    A dedicated family of headlight.
    """
    HEADLIGHT
    """
    An accessory to a headlight.
    """
    ACCESSORY
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
    Pricing for this specific model.
    """
    pricing: Pricing
    """
    The ids of the product(s) this variant can be associated with.
    """
    productIds: [String]
    """
    The product(s) this variant can be associated with.
    """
    products: [Product]
    """
    The high level category for this model number.
    """
    productType: ProductType
    """
    A brief description of this product variant.
    """
    description: String
    """
    If a product is lotted it has a class of serial numbers associated to it.
    """
    lotted: Boolean
    """
    The length of the warranty that applies to this model in months.
    """
    warrantyTerm: Int
    """
    A description of the warranty that applies to this model.
    """
    warrantyDescription: String
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
    feeWithWarranty: FeeStructure
    """
    How much will it cost to service this item if it is not covered by a warranty.
    """
    feeWithoutWarranty: FeeStructure
    """
    Any public notes related to servicing this model variation.
    """
    publicNotes: String
    """
    Any internal notes for employess when servicing this model variation.
    """
    privateNotes: String
    """
    If a product model is not publicly viewableit will not show up on forms for a customer.
    """
    publiclyViewable: Boolean
    """
    A list of all associated symptoms related to this model number.
    """
    symptoms: [ProductSymptom]
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
  Pricing for a product model variant.
  """
  input PricingInput {
    """
    Internal cost pricing for distributors.
    """
    cost: String
    """
    Public pricing for end users.
    """
    retail: String
  }

  """
  Pricing for fees associated to a repair.
  """
  input FeeStructureInput {
    """
    Internal cost pricing for distributors.
    """
    distributor: String
    """
    Public pricing for end users.
    """
    endUser: String
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
    The ids of the products this variant belongs to.
    """
    productIds: [String]
    """
    The high level category type this product belongs to.
    """
    productType: ProductType
    """
    Pricing for this specific model.
    """
    pricing: PricingInput
    """
    A brief description of this product variant.
    """
    description: String
    """
    If a product is lotted it has a class of serial numbers associated to it.
    """
    lotted: Boolean
    """
    The length of the warranty that applies to this model in months.
    """
    warrantyTerm: Int
    """
    A description of the warranty that applies to this model.
    """
    warrantyDescription: String
    """
    How much will it cost to service this item if it is covered by a warranty.
    """
    feeWithWarranty: FeeStructureInput
    """
    How much will it cost to service this item if it is not covered by a warranty.
    """
    feeWithoutWarranty: FeeStructureInput
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
    """
    If a product model is not publicly viewable it will not show up on forms for a customer.
    """
    publiclyViewable: Boolean
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

  extend type Query {
    """
    All products in the system.
    """
    products(search: String): ProductQueryOutput
    """
    All product variants in the system.
    """
    modelNumbers(
      search: String
      productId: String
      productType: ProductType
      symptom: String
      public: Boolean
    ): ModelNumberQueryOutput
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

  extend type Mutation {
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
    createModelNumber(
      modelNumberInput: ModelNumberInput!
    ): ModelNumberMutationOutput!
    """
    Updates an existing product variant.
    """
    updateModelNumber(
      modelNumberInput: ModelNumberInput!
    ): ModelNumberMutationOutput!
    """
    Updates an existing product variant's lotted status.
    """
    updateModelNumberLotted(
      id: ID!
      lotted: Boolean!
    ): ModelNumberMutationOutput!
    """
    Updates an existing product variant's lotted status.
    """
    updateModelNumberViewable(
      id: ID!
      publiclyViewable: Boolean!
    ): ModelNumberMutationOutput!
    """
    Removes an existing product variant.
    """
    destroyModelNumber(id: ID!): ModelNumberMutationOutput!
  }
`
