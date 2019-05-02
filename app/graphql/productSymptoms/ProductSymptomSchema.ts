import { gql } from "apollo-server-lambda"

export const typeDefs = gql`
  """
  A troubleshooting symptom for a product.
  """
  type ProductSymptom {
    """
    The unique identifier for this symptom
    """
    id: ID!
    """
    The domain to match email addresses to via this symptom.
    """
    domain: String!
    """
    The actual name of the symptom.
    """
    name: String!
    """
    A hint or maintenance tip to prevent the symptom.
    """
    careTip: String
    """
    A description of the symptom and/or it's cause in detail.
    """
    synopsis: String!
    """
    A solution to resolve the symptom.
    """
    solution: String!
    """
    An associated fee for servicing this issue.
    """
    fee: Int!
    """
    An official code used to identify this symptom.
    """
    faultCode: String!
  }

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
  The result of a query for a symptom or symptoms.
  """
  type ProductSymptomQueryOutput {
    """
    The resulting symptom if the operation was successful.
    """
    productSymptom: ProductSymptom
    """
    The resulting symptoms if the operation was successful and multiple results were returned.
    """
    productSymptoms: [ProductSymptom]
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
  The result of a mutation applied to a symptom.
  """
  type ProductSymptomMutationOutput {
    """
    The resulting symptom if the operation was successful.
    """
    productSymptom: ProductSymptom
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
    All symptoms in the system
    """
    productSymptoms: ProductSymptomQueryOutput!
    """
    A specific symptom in the system via ID.
    """
    productSymptom(id: String!): ProductSymptomQueryOutput!
  }

  """
  A set of fields used to create or update a symptom.
  """
  input NewProductSymptomInput {
    domain: String!
    name: String
  }

  """
  A set of fields used to create or update a symptom.
  """
  input ExistingProductSymptomInput {
    id: ID!
    domain: String!
    name: String
  }

  type Mutation {
    """
    Creates a new symptom.
    """
    createProductSymptom(
      productSymptomInput: NewProductSymptomInput!
    ): ProductSymptomMutationOutput!

    """
    Updates an existing symptom.
    """
    updateProductSymptom(
      productSymptomInput: ExistingProductSymptomInput!
    ): ProductSymptomMutationOutput!

    """
    Removes an existing symptom.
    """
    destroyProductSymptom(
      id: String!
    ): ProductSymptomMutationOutput!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
