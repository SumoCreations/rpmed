import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  """
  Defines a state a given RGA could be in.
  """
  enum RGAStatus {
    """
    An RGA number has been issued to the distributor but the customer
    has not completed or shipped the package.
    """
    ISSUED
    """
    The customer has confirmed the goods associated to the request and
    RPMED is awaiting the delivery of the customer's package.
    """
    AWAITING_ARRIVAL
    """
    RPMED team is assessing the contents of the package.
    """
    ASSESSING
    """
    RPMED team is making any necessary repairs.
    """
    REPAIRING
    """
    RPMED team has shipped the package back to the customer.
    """
    SHIPPING
    """
    The request is complete and no further notes / changes can be made.
    """
    CLOSED
    """
    The request was canceled at any point during the process. Notes may
    may be added for further explanation.
    """
    CANCELED
    """
    Indicates the RGA may have partially shipped but still has some pending
    items that have been delayed.
    """
    DELAYED
  }

  """
  Indicates the shipping status for a given good that belongs to an RGA.
  """
  enum RGAShippingStatus {
    """
    Indicates that a given item could not be shipped for various reasons.
    """
    DELAYED
    """
    Indicates an RGA good has shipped.
    """
    SHIPPED
  }

  """
  Indicates the shipping carrier used to transport a good associated to an RGA.
  """
  enum RGAShippingCarrier {
    """
    FedEx as a shipping carrier.
    """
    FEDEX
    """
    UPS as a shipping carrier.
    """
    UPS
    """
    DHL as a shipping carrier.
    """
    DHL
    """
    Another shipping carrier not fully supported by the system.
    """
    OTHER
  }

  type UpdateProfile {
    """
    The id of the user who made the update.
    """
    id: String
    """
    The name of the user who made the update.
    """
    name: String
    """
    The email address of the user who made the update.
    """
    email: String
  }

  """
  A description of a status update for a given RGA.
  """
  type RGAStatusUpdate {
    """
    The new status the request was assigned.
    """
    status: RGAStatus
    """
    Any notes describing what happened to the request during this update.
    """
    notes: String
    """
    Details about who made this update.
    """
    updatedBy: UpdateProfile
    """
    An ISO string representing when this update occurred.
    """
    updatedOn: String
  }

  """
  A Request Goods Authorization.
  """
  type RGA {
    """
    The unique identifier for this RGA.
    """
    id: ID!
    """
    The current state of the request.
    """
    status: RGAStatus!
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
    """
    A log of all updates to this RGAs status.
    """
    statusLog: [RGAStatusUpdate]
    """
    The preferred shipping speed assigned to return this request to the customer.
    """
    shippingSpeed: String
  }

  """
  The current status of a given good belonging to an RGA.
  """
  enum RGAGoodStatus {
    """
    The good is considered valid and part of the request.
    """
    VALID
    """
    The good was removed from the request at some point.
    """
    ARCHIVED
    """
    Indicates a good has been delayed from shipping.
    """
    DELAYED
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
    The RGA this good is assigned to.
    """
    rgaId: String!
    """
    The model number for representing the specific product configuration for this good.
    """
    modelNumber: String!
    """
    Indicates whether or not the model was considered to be lotted.
    """
    lotted: Boolean!
    """
    The current status of the good.
    """
    status: RGAGoodStatus!
    """
    Indicates whether or not this product is currently under warranty.
    """
    warrantied: Boolean!
    """
    Indicates the details of the associated products warranty.
    """
    warrantyDescription: String!
    """
    Indicates the number of months the associated product was warrantied for.
    """
    warrantyTerm: Int!
    """
    The symptom / reason this product is being returned.
    """
    symptomId: String!
    """
    The current description of the symptom.
    """
    symptomDescription: String!
    """
    Indicates whether or not the resolution for the symptom was a pre-approved repair.
    """
    preApproved: Boolean!
    """
    The fault code associated to the prescribed symptom.
    """
    faultCode: String!
    """
    The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated.
    """
    serial: String
    """
    Indicates the product type for this good.
    """
    productType: ProductType!
    """
    Indicates the name of product family this good.
    """
    productName: String!
    """
    Indicates the product family this good.
    """
    productId: String!
    """
    The proposed resolution the issue affecting this good.
    """
    resolution: String
    """
    The synopsis of the associated symptom.
    """
    symptomSynopsis: String
    """
    The solution for associated symptom.
    """
    symptomSolution: String!
    """
    The fee involved for resolving this issue.
    """
    resolutionFee: FeeStructure
    """
    The associated RMA from our distributor / partner's records.
    """
    rma: String
    """
    The associated PO from our distributor / partner's records.
    """
    po: String
    """
    A URL to download a generated PDF of the associated customerletter.
    """
    customerLetterUrl: String
    """
    A URL to download a generated PDF of the associated service form.
    """
    serviceFormUrl: String
    """
    Any additional notes about this good specifically..
    """
    notes: String
    """
    The id of the customer if the product has been registered to a user.
    """
    customerId: String
    """
    The name of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerName: String
    """
    The email of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerEmail: String
    """
    The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerSpecialty: String
    """
    The preferred shipping speed assigned to return this good to the customer.
    """
    shippingSpeed: String
    """
    The tracking number associated to the return shipment.
    """
    tracking: String
    """
    The carrier used to transport the return shipment.
    """
    carrier: RGAShippingCarrier
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
    The id the resulting RGA Good belongs to if the operation was successful.
    """
    rgaId: String
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

  """
  A list of totals for any given rga status.
  """
  type RGAStatusCountOutput {
    """
    Count of all issued RGAs that may not have been shipped.
    """
    issued: Int
    """
    Count of all RGAs that have delayed items.
    """
    delayed: Int
    """
    Count of all RGAs awaiting arrival.
    """
    awaitingArrival: Int
    """
    Count of all received RGAs that have not yet been assessed.
    """
    received: Int
    """
    Count of all RGAs currently being assessed.
    """
    assessing: Int
    """
    Count of all RGAs currently being repaired.
    """
    repairing: Int
    """
    Count of all RGAs being shipped back to customers.
    """
    shipping: Int
    """
    Count of all closed RGAs.
    """
    closed: Int
    """
    Count of all canceled RGAs.
    """
    canceled: Int
    """
    A simple boolean indicating whether or not the operation was successful.
    """
    success: Boolean!
    """
    Any validation errors encountered while running the mutation.
    """
    errors: [ValidationError]
  }

  extend type Query {
    """
    All RGAs in the system
    """
    rgas(status: RGAStatus): RGAQueryOutput!

    """
    Query the total for any filtered output.
    """
    rgaCount: RGAStatusCountOutput!

    """
    A specific RGA in the system via ID.
    """
    rga(id: String!): RGAQueryOutput!
  }

  """
  A set of fields used to create an RGA.
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
    """
    The preferred shipping speed assigned to return this request to the customer.
    """
    shippingSpeed: String
  }

  """
  A set of fields used to update certain aspects of an RGA.
  """
  input ExistingRGAInput {
    """
    The id of the RGA.
    """
    id: String!
    """
    The preferred shipping speed assigned to return this request to the customer.
    """
    shippingSpeed: String!
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
    Indicates the id of product family this good was associated with.
    """
    productId: String!
    """
    Indicates the product type for this good.
    """
    productType: ProductType!
    """
    Indicates the name of product family this good.
    """
    productName: String!
    """
    The RGA this good is assigned to.
    """
    rgaId: String!
    """
    The fee involved for resolving this issue.
    """
    resolutionFee: FeeStructureInput
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
    The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerSpecialty: String
    """
    The preferred shipping speed assigned to return this good to the customer.
    """
    shippingSpeed: String
  }

  """
  The input to make changes to an existing RGA Good.
  """
  input ExistingRGAGoodInput {
    """
    The model number for representing the specific product configuration for this good.
    """
    modelNumber: String
    """
    Indicates whether or not the model was considered to be lotted.
    """
    lotted: Boolean
    """
    The current status of the good.
    """
    status: RGAGoodStatus
    """
    Indicates whether or not this product is currently under warranty.
    """
    warrantied: Boolean
    """
    Indicates the details of the associated products warranty.
    """
    warrantyDescription: String
    """
    Indicates the number of months the associated product was warrantied for.
    """
    warrantyTerm: Int
    """
    The symptom / reason this product is being returned.
    """
    symptomId: String
    """
    The current description of the symptom.
    """
    symptomDescription: String
    """
    Indicates whether or not the resolution for the symptom was a pre-approved repair.
    """
    preApproved: Boolean
    """
    The fault code associated to the prescribed symptom.
    """
    faultCode: String
    """
    The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated.
    """
    serial: String
    """
    Indicates the product type for this good.
    """
    productType: ProductType
    """
    Indicates the name of product family this good.
    """
    productName: String
    """
    Indicates the product family this good.
    """
    productId: String
    """
    The proposed resolution the issue affecting this good.
    """
    resolution: String
    """
    The fee involved for resolving this issue.
    """
    resolutionFee: FeeStructureInput
    """
    The synopsis of the associated symptom.
    """
    symptomSynopsis: String
    """
    The solution for associated symptom.
    """
    symptomSolution: String
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
    The id of the customer if the product has been registered to a user.
    """
    customerId: String
    """
    The name of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerName: String
    """
    The email of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerEmail: String
    """
    The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been.
    """
    customerSpecialty: String
    """
    The preferred shipping speed assigned to return this good to the customer.
    """
    shippingSpeed: String
  }

  """
  The input to apply a shipping update make changes to an existing RGA Good.
  """
  input RGAGoodShippingInput {
    """
    The unique serial number or uuid associated to the good.
    """
    id: ID!
    """
    A list of email addresses to notify the shipping alert / tracking message.
    """
    recipients: [String]
    """
    The shipping status for the good.
    """
    status: RGAShippingStatus!
    """
    The message to email to all specified recipients
    """
    message: String
    """
    The tracking number associated to the return shipment.
    """
    tracking: String
    """
    The carrier used to transport the return shipment.
    """
    carrier: RGAShippingCarrier
  }

  extend type Mutation {
    """
    Creates a new RGA.
    """
    createRGA(rgaInput: NewRGAInput!): RGAMutationOutput!
    """
    Updates an existing RGA.
    """
    updateRGA(rgaInput: ExistingRGAInput!): RGAMutationOutput!
    """
    Updates the status of a specific RGA.
    """
    updateRGAStatus(
      """
      The ID of the RGA to update.
      """
      id: ID!
      """
      The new status to apply.
      """
      status: RGAStatus!
      """
      Any additional notes about the update.
      """
      notes: String
    ): RGAMutationOutput!
    """
    Updates the shipping status of a specific RGA.
    """
    updateRGAShippingStatus(
      """
      The ID of the RGA to update.
      """
      id: ID!
      """
      Any additional notes about the update.
      """
      notes: String
      """
      The specific shipping updates for each good belonging to the RGA.
      """
      shippingUpdates: [RGAGoodShippingInput]
    ): RGAMutationOutput!
    """
    Creates a new good for an existing RGA.
    """
    createRGAGood(rgaGoodInput: NewRGAGoodInput!): RGAGoodMutationOutput!
    """
    Updates an existing good for an existing RGA.
    """
    updateRGAGood(
      id: ID!
      rgaId: String!
      rgaGoodInput: ExistingRGAGoodInput!
    ): RGAGoodMutationOutput!
    """
    Removes an existing RGA good.
    """
    destroyRGAGood(id: ID!, rgaId: String!): RGAGoodMutationOutput!
  }
`
