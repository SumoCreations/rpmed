import { gql } from "apollo-server-lambda"

export const typeDefs = gql`
  """
  A Request Goods Authorization.
  """
  type RGA {
    """
    The unique identifier for this RGA
    """
    id: ID!
    """
    The date the RGA was submitted.
    """
    submittedOn: String!
    """
    The email address of the user whom submitted the RGA.
    """
    submittedBy: String!
    """
    The distributor associated to the the RGA.
    """
    distributor: Distributor!
    """
    The goods associated to the the RGA.
    """
    goods: [RGAGood]!
  }

  """
  A good associated to a particular RGA.
  """
  type RGAGood {
    """
    The unique serial number or uuid associated to the good.
    """
    id: ID!
    """
    Indicates whether or not this product is currently under warranty.
    """
    warrantied: Boolean!
    """
    The symptom / reason this product is being returned.
    """
    symptomId: String!
    """
    The RGA this good is assigned to.
    """
    rgaId: String!
    """
    The model number for representing the specific product configuration for this good.
    """
    modelNumber: String!
    """
    The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated.
    """
    serial: String
    """
    The associated RMA from our distributor / partner's records.
    """
    rma: String
    """
    The associated PO from our distributor / partner's records.
    """
    po: String
    """
    Any additional notes about this good specifically..
    """
    notes: String
    """
    The name of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerName: String
    """
    The name of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerEmail: String
    """
    The email address of the contact who created the RGA.
    """
    submittedBy: String!
    """
    The date the RGA was submitted.
    """
    submittedOn: String!
  }

  """
  A distributor of Riverpoint Medical.
  """
  type Distributor {
    """
    The unique identifier for this distributor
    """
    id: ID!
    """
    The domain to match email addresses to via this distributor.
    """
    domain: String!
    """
    The actual name of the distributor.
    """
    name: String
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
  The result of a query for a RGA or RGAs.
  """
  type RGAQueryOutput {
    """
    The resulting RGA if the operation was successful.
    """
    rga: RGA
    """
    The resulting RGAs if the operation was successful and multiple results were returned.
    """
    rgas: [RGA]
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
  The result of a mutation applied to a RGA.
  """
  type RGAMutationOutput {
    """
    The resulting RGA if the operation was successful.
    """
    rga: RGA
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
  The result of a mutation applied to a RGA.
  """
  type RGAGoodMutationOutput {
    """
    The resulting RGA Good if the operation was successful.
    """
    rgaGood: RGAGood
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
    All RGAs in the system
    """
    rgas: RGAQueryOutput!
    """
    A specific RGA in the system via ID.
    """
    rga(id: String!): RGAQueryOutput!
  }

  """
  A set of fields used to create or update a RGA.
  """
  input NewRGAInput {
    """
    The email address of the contact who created the RGA.
    """
    submittedBy: String!
    """
    The date the RGA was submitted.
    """
    submittedOn: String!
  }

  """
  A set of fields used to create or update a RGA.
  """
  input NewRGAGoodInput {
    """
    Indicates whether or not this product is currently under warranty.
    """
    warrantied: Boolean!
    """
    The symptom / reason this product is being returned.
    """
    symptomId: String!
    """
    The RGA this good is assigned to.
    """
    rgaId: String!
    """
    The model number for representing the specific product configuration for this good.
    """
    modelNumber: String!
    """
    The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated.
    """
    serial: String
    """
    The associated RMA from our distributor / partner's records.
    """
    rma: String
    """
    The associated PO from our distributor / partner's records.
    """
    po: String
    """
    Any additional notes about this good specifically..
    """
    notes: String
    """
    The name of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerName: String
    """
    The name of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerEmail: String
  }

  type Mutation {
    """
    Creates a new RGA.
    """
    createRGA(
      rgaInput: NewRGAInput!
    ): RGAMutationOutput!
    """
    Creates a new good for an existing RGA.
    """
    createRGAGood(
      rgaGoodInput: NewRGAGoodInput!
    ): RGAGoodMutationOutput!
    """
    Removes an existing RGA good.
    """
    destroyRGAGood(id: ID!, rgaId: String!): RGAGoodMutationOutput!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
