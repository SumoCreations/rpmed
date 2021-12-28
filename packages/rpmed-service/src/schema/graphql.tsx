import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

/** An image that can be associated to any another type. */
export type AttachedImage = {
  __typename?: 'AttachedImage'
  /** The unique ID or Key on AWS S3 representing the image. */
  id: Scalars['ID']
  /** A pre-signed url to fetch this image from S3. */
  url?: Maybe<Scalars['String']>
  /** The user defined sort priority for the attached image. */
  position: Scalars['Int']
  /** The current upload status of the image regarding its availability on S3. */
  status: UploadStatus
}

export type AttachedImageInput = {
  id: Scalars['ID']
  status?: Maybe<UploadStatus>
  position: Scalars['Int']
}

/** A customer of Riverpoint Medical. */
export type Customer = {
  __typename?: 'Customer'
  /** The unique identifier for this customer */
  id: Scalars['ID']
  /** The email of the customer. */
  email?: Maybe<Scalars['String']>
  /** The name of the customer. */
  name?: Maybe<Scalars['String']>
  /** The phone number of the customer. */
  phone?: Maybe<Scalars['String']>
  /** The street address for the customer. */
  street?: Maybe<Scalars['String']>
  /** The street address (line 2) for the customer. */
  street2?: Maybe<Scalars['String']>
  /** The city of the address for the customer. */
  city?: Maybe<Scalars['String']>
  /** The state of the address for the customer. */
  state?: Maybe<Scalars['String']>
  /** The zip of the address for the customer. */
  zip?: Maybe<Scalars['String']>
  /** The country of the address for the customer. */
  country?: Maybe<Scalars['String']>
  /** The specialty of the customer. */
  specialty?: Maybe<Scalars['String']>
}

/** The result of a mutation applied to a customer. */
export type CustomerMutationOutput = {
  __typename?: 'CustomerMutationOutput'
  /** The resulting customer if the operation was successful. */
  customer?: Maybe<Customer>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The result of a query for a customer or customers. */
export type CustomerQueryOutput = {
  __typename?: 'CustomerQueryOutput'
  /** The resulting customer if the operation was successful. */
  customer?: Maybe<Customer>
  /** The resulting customers if the operation was successful and multiple results were returned. */
  customers?: Maybe<Array<Maybe<Customer>>>
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** A distributor of Riverpoint Medical. */
export type Distributor = {
  __typename?: 'Distributor'
  /** The unique identifier for this distributor */
  id: Scalars['ID']
  /** The domain to match email addresses to via this distributor. */
  domain: Scalars['String']
  /** The actual name of the distributor. */
  name?: Maybe<Scalars['String']>
}

/** The result of a mutation applied to a distributor. */
export type DistributorMutationOutput = {
  __typename?: 'DistributorMutationOutput'
  /** The resulting distributor if the operation was successful. */
  distributor?: Maybe<Distributor>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The result of a query for a distributor or distributors. */
export type DistributorQueryOutput = {
  __typename?: 'DistributorQueryOutput'
  /** The resulting distributor if the operation was successful. */
  distributor?: Maybe<Distributor>
  /** The resulting distributors if the operation was successful and multiple results were returned. */
  distributors?: Maybe<Array<Maybe<Distributor>>>
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** A set of fields used to create or update a customer. */
export type ExistingCustomerInput = {
  id: Scalars['ID']
  email: Scalars['String']
  name?: Maybe<Scalars['String']>
}

/** A set of fields used to create or update a distributor. */
export type ExistingDistributorInput = {
  id: Scalars['ID']
  domain: Scalars['String']
  name?: Maybe<Scalars['String']>
}

/** A set of fields used to create or update a registration. */
export type ExistingProductRegistrationInput = {
  id: Scalars['ID']
  /** The id of the customer associated to the registration. */
  customerId: Scalars['String']
  /** The model number for representing the specific product configuration being registered. */
  modelNumber: Scalars['String']
  /** The serial number associate to the product if it is lotted. */
  serial?: Maybe<Scalars['String']>
  /** The date the product was registered. */
  registeredOn: Scalars['String']
}

/** A set of fields used to create or update a symptom. */
export type ExistingProductSymptomInput = {
  id: Scalars['ID']
  faultCode?: Maybe<Scalars['String']>
  fee?: Maybe<Scalars['Boolean']>
  preApproved?: Maybe<Scalars['Boolean']>
  careTip?: Maybe<Scalars['String']>
  solution?: Maybe<Scalars['String']>
  synopsis?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** A set of fields used to update certain aspects of an RGA. */
export type ExistingRgaInput = {
  /** The id of the RGA. */
  id: Scalars['String']
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed: Scalars['String']
}

/** A set of fields used to create or update a user. */
export type ExistingUserInput = {
  id: Scalars['ID']
  email: Scalars['String']
  password?: Maybe<Scalars['String']>
  firstName: Scalars['String']
  lastName: Scalars['String']
}

/** Pricing for fees associated to a repair. */
export type FeeStructure = {
  __typename?: 'FeeStructure'
  /** Internal cost pricing for distributors. */
  distributor?: Maybe<Scalars['String']>
  /** Public pricing for end users. */
  endUser?: Maybe<Scalars['String']>
}

/** Pricing for fees associated to a repair. */
export type FeeStructureInput = {
  /** Internal cost pricing for distributors. */
  distributor?: Maybe<Scalars['String']>
  /** Public pricing for end users. */
  endUser?: Maybe<Scalars['String']>
}

export type ModelNumber = {
  __typename?: 'ModelNumber'
  /** The model number identifying a product variant. */
  id: Scalars['ID']
  /** Pricing for this specific model. */
  pricing: Pricing
  /** The ids of the product(s) this variant can be associated with. */
  productIds: Array<Maybe<Scalars['String']>>
  /** The product(s) this variant can be associated with. */
  products: Array<Maybe<Product>>
  /** The high level category for this model number. */
  productType: ProductType
  /** A brief description of this product variant. */
  description: Scalars['String']
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted: Scalars['Boolean']
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm: Scalars['Int']
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: Maybe<Scalars['String']>
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: Maybe<Scalars['String']>
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: Maybe<Scalars['String']>
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty?: Maybe<FeeStructure>
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty?: Maybe<FeeStructure>
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>
  /** If a product model is not publicly viewableit will not show up on forms for a customer. */
  publiclyViewable?: Maybe<Scalars['Boolean']>
  /** A list of all associated symptoms related to this model number. */
  symptoms: Array<Maybe<ProductSymptom>>
}

/** Describes a model number to be created or updated. */
export type ModelNumberInput = {
  /** The model number identifying a product variant. */
  id: Scalars['ID']
  /** The ids of the products this variant belongs to. */
  productIds: Array<Maybe<Scalars['String']>>
  /** The high level category type this product belongs to. */
  productType: ProductType
  /** Pricing for this specific model. */
  pricing?: Maybe<PricingInput>
  /** A brief description of this product variant. */
  description: Scalars['String']
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted: Scalars['Boolean']
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm: Scalars['Int']
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: Maybe<Scalars['String']>
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty?: Maybe<FeeStructureInput>
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty?: Maybe<FeeStructureInput>
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: Maybe<Scalars['String']>
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: Maybe<Scalars['String']>
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>
  /** If a product model is not publicly viewable it will not show up on forms for a customer. */
  publiclyViewable?: Maybe<Scalars['Boolean']>
}

/** The result of a mutation applied to a ModelNumber. */
export type ModelNumberMutationOutput = {
  __typename?: 'ModelNumberMutationOutput'
  /** The resulting model if the operation was successful. */
  modelNumber?: Maybe<ModelNumber>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The result of a query for a modelNumber or modelNumbers. */
export type ModelNumberQueryOutput = {
  __typename?: 'ModelNumberQueryOutput'
  /** The resulting model number if the operation was successful. */
  modelNumber?: Maybe<ModelNumber>
  /** The resulting model numbers if the operation was successful and multiple results were returned. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumber>>>
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** A subset of the model number type */
export type ModelNumberSymptomDetail = {
  __typename?: 'ModelNumberSymptomDetail'
  /** The model number identifying a product variant. */
  id: Scalars['ID']
  /** The id of the product this variant belongs to. */
  productId: Scalars['String']
  /** All associated symptoms related to this model number. */
  symptoms: Array<Maybe<ProductSymptom>>
}

/** The root mutation for the schema. */
export type Mutation = {
  __typename?: 'Mutation'
  version: Scalars['String']
  /** Creates a new customer. */
  createCustomer: CustomerMutationOutput
  /** Updates an existing customer. */
  updateCustomer: CustomerMutationOutput
  /** Removes an existing customer. */
  destroyCustomer: CustomerMutationOutput
  /** Creates a new distributor. */
  createDistributor: DistributorMutationOutput
  /** Updates an existing distributor. */
  updateDistributor: DistributorMutationOutput
  /** Removes an existing distributor. */
  destroyDistributor: DistributorMutationOutput
  /** Adds a new product. */
  createProduct: ProductMutationOutput
  /** Updates an existing product. */
  updateProduct: ProductMutationOutput
  /** Removes an existing product. */
  destroyProduct: ProductMutationOutput
  /** Adds a new product variant. */
  createModelNumber: ModelNumberMutationOutput
  /** Updates an existing product variant. */
  updateModelNumber: ModelNumberMutationOutput
  /** Updates an existing product variant's lotted status. */
  updateModelNumberLotted: ModelNumberMutationOutput
  /** Updates an existing product variant's lotted status. */
  updateModelNumberViewable: ModelNumberMutationOutput
  /** Removes an existing product variant. */
  destroyModelNumber: ModelNumberMutationOutput
  /** Creates a new registration. */
  createProductRegistration: ProductRegistrationMutationOutput
  /** Updates an existing registration. */
  updateProductRegistration: ProductRegistrationMutationOutput
  /** Removes an existing registration. */
  destroyProductRegistration: ProductRegistrationMutationOutput
  /** Creates a new symptom. */
  createProductSymptom: ProductSymptomMutationOutput
  /** Updates an existing symptom. */
  updateProductSymptom: ProductSymptomMutationOutput
  /** Removes an existing symptom. */
  destroyProductSymptom: ProductSymptomMutationOutput
  /** Links an existing model number to an existing symptom. */
  linkSymptomToModel: ProductSymptomMutationOutput
  /** Attaches / removes a images to a product symptom. */
  attachImagesToSymptom: ProductSymptomMutationOutput
  /** Creates a new authenticatable user. */
  createUser: UserMutationOutput
  /** Updates an existing user. */
  updateUser: UserMutationOutput
  /** Removes an existing user. */
  destroyUser: UserMutationOutput
  /** Resets the password for the current user dependent on a temporary access token. */
  resetPassword: UserMutationOutput
  /** Returns a set of upload endpoints from AWS S3. */
  createUploads: UploadMutationOutput
  /** Creates a new RGA. */
  createRGA: RgaMutationOutput
  /** Updates an existing RGA. */
  updateRGA: RgaMutationOutput
  /** Updates the status of a specific RGA. */
  updateRGAStatus: RgaMutationOutput
  /** Allows an end user to submit an RGA Good for review by the RPMed Internal Team. */
  submitRGAForReview: RgaMutationOutput
  /** Updates the shipping status of a specific RGA. */
  updateRGAShippingStatus: RgaMutationOutput
  /** Creates a new good for an existing RGA. */
  createRGAGood: RgaGoodMutationOutput
  /** Updates an existing good for an existing RGA. */
  updateRGAGood: RgaGoodMutationOutput
  /** Removes an existing RGA good. */
  destroyRGAGood: RgaGoodMutationOutput
}

/** The root mutation for the schema. */
export type MutationCreateCustomerArgs = {
  customerInput: NewCustomerInput
}

/** The root mutation for the schema. */
export type MutationUpdateCustomerArgs = {
  customerInput: ExistingCustomerInput
}

/** The root mutation for the schema. */
export type MutationDestroyCustomerArgs = {
  id: Scalars['String']
}

/** The root mutation for the schema. */
export type MutationCreateDistributorArgs = {
  distributorInput: NewDistributorInput
}

/** The root mutation for the schema. */
export type MutationUpdateDistributorArgs = {
  distributorInput: ExistingDistributorInput
}

/** The root mutation for the schema. */
export type MutationDestroyDistributorArgs = {
  id: Scalars['String']
}

/** The root mutation for the schema. */
export type MutationCreateProductArgs = {
  productInput: ProductInput
}

/** The root mutation for the schema. */
export type MutationUpdateProductArgs = {
  productInput: ProductInput
}

/** The root mutation for the schema. */
export type MutationDestroyProductArgs = {
  id: Scalars['ID']
}

/** The root mutation for the schema. */
export type MutationCreateModelNumberArgs = {
  modelNumberInput: ModelNumberInput
}

/** The root mutation for the schema. */
export type MutationUpdateModelNumberArgs = {
  modelNumberInput: ModelNumberInput
}

/** The root mutation for the schema. */
export type MutationUpdateModelNumberLottedArgs = {
  id: Scalars['ID']
  lotted: Scalars['Boolean']
}

/** The root mutation for the schema. */
export type MutationUpdateModelNumberViewableArgs = {
  id: Scalars['ID']
  publiclyViewable: Scalars['Boolean']
}

/** The root mutation for the schema. */
export type MutationDestroyModelNumberArgs = {
  id: Scalars['ID']
}

/** The root mutation for the schema. */
export type MutationCreateProductRegistrationArgs = {
  productRegistrationInput: NewProductRegistrationInput
}

/** The root mutation for the schema. */
export type MutationUpdateProductRegistrationArgs = {
  productRegistrationInput: ExistingProductRegistrationInput
}

/** The root mutation for the schema. */
export type MutationDestroyProductRegistrationArgs = {
  id: Scalars['String']
}

/** The root mutation for the schema. */
export type MutationCreateProductSymptomArgs = {
  productSymptomInput: NewProductSymptomInput
}

/** The root mutation for the schema. */
export type MutationUpdateProductSymptomArgs = {
  productSymptomInput: ExistingProductSymptomInput
}

/** The root mutation for the schema. */
export type MutationDestroyProductSymptomArgs = {
  id: Scalars['String']
}

/** The root mutation for the schema. */
export type MutationLinkSymptomToModelArgs = {
  modelNumber: Scalars['String']
  symptomId: Scalars['String']
  linked: Scalars['Boolean']
}

/** The root mutation for the schema. */
export type MutationAttachImagesToSymptomArgs = {
  symptomId: Scalars['String']
  attachedImages: Array<Maybe<AttachedImageInput>>
}

/** The root mutation for the schema. */
export type MutationCreateUserArgs = {
  userInput: NewUserInput
}

/** The root mutation for the schema. */
export type MutationUpdateUserArgs = {
  userInput: ExistingUserInput
}

/** The root mutation for the schema. */
export type MutationDestroyUserArgs = {
  id: Scalars['String']
}

/** The root mutation for the schema. */
export type MutationResetPasswordArgs = {
  password: Scalars['String']
}

/** The root mutation for the schema. */
export type MutationCreateUploadsArgs = {
  uploadInput: UploadInput
}

/** The root mutation for the schema. */
export type MutationCreateRgaArgs = {
  rgaInput: NewRgaInput
}

/** The root mutation for the schema. */
export type MutationUpdateRgaArgs = {
  rgaInput: ExistingRgaInput
}

/** The root mutation for the schema. */
export type MutationUpdateRgaStatusArgs = {
  id: Scalars['ID']
  status: RgaStatus
  notes?: Maybe<Scalars['String']>
}

/** The root mutation for the schema. */
export type MutationSubmitRgaForReviewArgs = {
  id: Scalars['ID']
  notes?: Maybe<Scalars['String']>
}

/** The root mutation for the schema. */
export type MutationUpdateRgaShippingStatusArgs = {
  id: Scalars['ID']
  notes?: Maybe<Scalars['String']>
  shippingUpdates?: Maybe<Array<Maybe<RgaGoodShippingInput>>>
}

/** The root mutation for the schema. */
export type MutationCreateRgaGoodArgs = {
  rgaId: Scalars['String']
  rgaGoodInput: RgaGoodInput
}

/** The root mutation for the schema. */
export type MutationUpdateRgaGoodArgs = {
  id: Scalars['ID']
  rgaId: Scalars['String']
  rgaGoodInput: RgaGoodInput
}

/** The root mutation for the schema. */
export type MutationDestroyRgaGoodArgs = {
  id: Scalars['ID']
  rgaId: Scalars['String']
}

/** A set of fields used to create or update a customer. */
export type NewCustomerInput = {
  /** The email of the customer. */
  email: Scalars['String']
  /** The name of the customer. */
  name?: Maybe<Scalars['String']>
  /** The phone number of the customer. */
  phone?: Maybe<Scalars['String']>
  /** The street address for the customer. */
  street?: Maybe<Scalars['String']>
  /** The street address (line 2) for the customer. */
  street2?: Maybe<Scalars['String']>
  /** The city of the address for the customer. */
  city?: Maybe<Scalars['String']>
  /** The state of the address for the customer. */
  state?: Maybe<Scalars['String']>
  /** The zip of the address for the customer. */
  zip?: Maybe<Scalars['String']>
  /** The country of the address for the customer. */
  country?: Maybe<Scalars['String']>
  /** The specialty of the customer. */
  specialty?: Maybe<Scalars['String']>
}

/** A set of fields used to create or update a distributor. */
export type NewDistributorInput = {
  domain: Scalars['String']
  name?: Maybe<Scalars['String']>
}

/** A set of fields used to create or update a registration. */
export type NewProductRegistrationInput = {
  /** The id of the customer associated to the registration. */
  customerId: Scalars['String']
  /** The model number for representing the specific product configuration being registered. */
  modelNumber: Scalars['String']
  /** The serial number associate to the product if it is lotted. */
  serial?: Maybe<Scalars['String']>
  /** The date the product was registered. */
  registeredOn: Scalars['String']
}

/** A set of fields used to create or update a symptom. */
export type NewProductSymptomInput = {
  faultCode?: Maybe<Scalars['String']>
  fee?: Maybe<Scalars['Boolean']>
  preApproved?: Maybe<Scalars['Boolean']>
  careTip?: Maybe<Scalars['String']>
  solution?: Maybe<Scalars['String']>
  synopsis?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** A set of fields used to create an RGA. */
export type NewRgaInput = {
  /** The email address of the contact who created the RGA. */
  submittedBy: Scalars['String']
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String']
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>
}

/** A set of fields used to create or update a user. */
export type NewUserInput = {
  email: Scalars['String']
  password: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
}

/** Pricing for a product model variant. */
export type Pricing = {
  __typename?: 'Pricing'
  /** Internal cost pricing for distributors. */
  cost?: Maybe<Scalars['String']>
  /** Public pricing for end users. */
  retail?: Maybe<Scalars['String']>
}

/** Pricing for a product model variant. */
export type PricingInput = {
  /** Internal cost pricing for distributors. */
  cost?: Maybe<Scalars['String']>
  /** Public pricing for end users. */
  retail?: Maybe<Scalars['String']>
}

/** A registered user object from API. Could be a customer, admin, or partner account. */
export type Product = {
  __typename?: 'Product'
  /** The unique identifier for this product */
  id: Scalars['ID']
  /** The name of this product. */
  name: Scalars['String']
  /** A brief description of this product. */
  description: Scalars['String']
  /** All available variations or configurations of this product. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumber>>>
}

/** Describes a product to be created or updated. */
export type ProductInput = {
  /** The unique identifier for this product */
  id?: Maybe<Scalars['ID']>
  /** The name of this product. */
  name: Scalars['String']
  /** A brief description of this product. */
  description: Scalars['String']
}

/** The result of a mutation applied to a Product. */
export type ProductMutationOutput = {
  __typename?: 'ProductMutationOutput'
  /** The resulting model if the operation was successful. */
  product?: Maybe<Product>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The result of a query for a product or products. */
export type ProductQueryOutput = {
  __typename?: 'ProductQueryOutput'
  /** The resulting product if the operation was successful. */
  product?: Maybe<Product>
  /** The resulting products if the operation was successful and multiple results were returned. */
  products?: Maybe<Array<Maybe<Product>>>
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** A troubleshooting registration for a product. */
export type ProductRegistration = {
  __typename?: 'ProductRegistration'
  /** The unique identifier for this registration */
  id: Scalars['ID']
  /** The date the product was registered. */
  registeredOn: Scalars['String']
  /** The customer profile associated to the registration. */
  customer: Customer
  /** The id of the customer the product has been registered. */
  customerId: Scalars['String']
  /** The id of the product that has been registered. */
  productId: Scalars['String']
  /** The the model number of the product that has been registered. */
  modelNumber: Scalars['String']
  /** The serial number associated to the product if applicable. */
  serial?: Maybe<Scalars['String']>
  /** Indicates whether or not the registration belongs to a lotted model number. */
  lotted?: Maybe<Scalars['Boolean']>
}

/** The result of a mutation applied to a registration. */
export type ProductRegistrationMutationOutput = {
  __typename?: 'ProductRegistrationMutationOutput'
  /** The resulting registration if the operation was successful. */
  productRegistration?: Maybe<ProductRegistration>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The result of a query for a registration or registrations. */
export type ProductRegistrationQueryOutput = {
  __typename?: 'ProductRegistrationQueryOutput'
  /** The resulting registration if the operation was successful. */
  productRegistration?: Maybe<ProductRegistration>
  /** The resulting registrations if the operation was successful and multiple results were returned. */
  productRegistrations?: Maybe<Array<Maybe<ProductRegistration>>>
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** A troubleshooting symptom for a product. */
export type ProductSymptom = {
  __typename?: 'ProductSymptom'
  /** The unique identifier for this symptom */
  id: Scalars['ID']
  /** The actual name of the symptom. */
  name: Scalars['String']
  /** A hint or maintenance tip to prevent the symptom. */
  careTip?: Maybe<Scalars['String']>
  /** A description of the symptom and/or it's cause in detail. */
  synopsis?: Maybe<Scalars['String']>
  /** A solution to resolve the symptom. */
  solution?: Maybe<Scalars['String']>
  /** Indicates if there is an associated fee for servicing this issue. */
  fee: Scalars['Boolean']
  /** Indicates whether or not this is a pre-approved repair regardless of warranty. */
  preApproved: Scalars['Boolean']
  /** An official code used to identify this symptom. */
  faultCode?: Maybe<Scalars['String']>
  /** A list of all associated model numbers related to this symptom. */
  associatedModelNumbers: Array<Maybe<Scalars['String']>>
  /** The resulting symptoms if the operation was successful and multiple results were returned. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumberSymptomDetail>>>
  /** An array of attached images hosted via AWS S3. */
  attachedImages?: Maybe<Array<Maybe<AttachedImage>>>
}

/** The result of a mutation applied to a symptom. */
export type ProductSymptomMutationOutput = {
  __typename?: 'ProductSymptomMutationOutput'
  /** The resulting symptom if the operation was successful. */
  productSymptom?: Maybe<ProductSymptom>
  /** The resulting details for the associated model number if am association operation was successful. */
  modelNumber?: Maybe<ModelNumberSymptomDetail>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The result of a query for a symptom or symptoms. */
export type ProductSymptomQueryOutput = {
  __typename?: 'ProductSymptomQueryOutput'
  /** The resulting symptom if the operation was successful. */
  productSymptom?: Maybe<ProductSymptom>
  /** The resulting symptoms if the operation was successful and multiple results were returned. */
  productSymptoms?: Maybe<Array<Maybe<ProductSymptom>>>
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The result of a query for a symptom or symptoms. */
export type ProductSymptomQueryOutputProductSymptomsArgs = {
  modelNumber?: Maybe<Scalars['String']>
}

/** Denotes the high level category for this product. */
export enum ProductType {
  /** A dedicated family of headlight. */
  Headlight = 'HEADLIGHT',
  /** An accessory to a headlight. */
  Accessory = 'ACCESSORY',
}

/** The root query for the schema. */
export type Query = {
  __typename?: 'Query'
  version: Scalars['String']
  /** All customers in the system */
  customers: CustomerQueryOutput
  /** A specific customer in the system via ID. */
  customer: CustomerQueryOutput
  /** All distributors in the system */
  distributors: DistributorQueryOutput
  /** A specific distributor in the system via ID. */
  distributor: DistributorQueryOutput
  /** All products in the system. */
  products?: Maybe<ProductQueryOutput>
  /** All product variants in the system. */
  modelNumbers?: Maybe<ModelNumberQueryOutput>
  /** A specific product in the system via ID. */
  product?: Maybe<ProductQueryOutput>
  /** A specific model number in the system via ID. */
  modelNumber?: Maybe<ModelNumberQueryOutput>
  /** All registrations in the system */
  productRegistrations: ProductRegistrationQueryOutput
  /** A specific registration in the system via ID. */
  productRegistration: ProductRegistrationQueryOutput
  /** All symptoms in the system */
  productSymptoms: ProductSymptomQueryOutput
  /** A specific symptom in the system via ID. */
  productSymptom: ProductSymptomQueryOutput
  /** All users in the system */
  users?: Maybe<Array<Maybe<User>>>
  /** A specific user in the system via ID. */
  user?: Maybe<User>
  /** A specific user in the system via email address. */
  userWithEmail?: Maybe<User>
  info?: Maybe<Scalars['String']>
  /** All RGAs in the system */
  rgas: RgaQueryOutput
  /** Query the total for any filtered output. */
  rgaCount: RgaStatusCountOutput
  /** A specific RGA in the system via ID. */
  rga: RgaQueryOutput
}

/** The root query for the schema. */
export type QueryCustomersArgs = {
  search?: Maybe<Scalars['String']>
}

/** The root query for the schema. */
export type QueryCustomerArgs = {
  id: Scalars['String']
}

/** The root query for the schema. */
export type QueryDistributorArgs = {
  id: Scalars['String']
}

/** The root query for the schema. */
export type QueryProductsArgs = {
  search?: Maybe<Scalars['String']>
}

/** The root query for the schema. */
export type QueryModelNumbersArgs = {
  search?: Maybe<Scalars['String']>
  productId?: Maybe<Scalars['String']>
  productType?: Maybe<ProductType>
  symptom?: Maybe<Scalars['String']>
  public?: Maybe<Scalars['Boolean']>
}

/** The root query for the schema. */
export type QueryProductArgs = {
  id: Scalars['String']
}

/** The root query for the schema. */
export type QueryModelNumberArgs = {
  id: Scalars['String']
}

/** The root query for the schema. */
export type QueryProductRegistrationArgs = {
  id: Scalars['String']
}

/** The root query for the schema. */
export type QueryProductSymptomsArgs = {
  search?: Maybe<Scalars['String']>
  modelNumber?: Maybe<Scalars['String']>
}

/** The root query for the schema. */
export type QueryProductSymptomArgs = {
  id: Scalars['String']
}

/** The root query for the schema. */
export type QueryUserArgs = {
  id: Scalars['String']
}

/** The root query for the schema. */
export type QueryUserWithEmailArgs = {
  email: Scalars['String']
}

/** The root query for the schema. */
export type QueryRgasArgs = {
  status?: Maybe<RgaStatus>
}

/** The root query for the schema. */
export type QueryRgaArgs = {
  id: Scalars['String']
}

/** A Request Goods Authorization. */
export type Rga = {
  __typename?: 'RGA'
  /** The unique identifier for this RGA. */
  id: Scalars['ID']
  /** The current state of the request. */
  status: RgaStatus
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String']
  /** The email address of the user whom submitted the RGA. */
  submittedBy: Scalars['String']
  /** The distributor associated to the the RGA. */
  distributor: Distributor
  /** The goods associated to the the RGA. */
  goods: Array<Maybe<RgaGood>>
  /** A log of all updates to this RGAs status. */
  statusLog?: Maybe<Array<Maybe<RgaStatusUpdate>>>
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>
}

/** A good associated to a particular RGA. */
export type RgaGood = {
  __typename?: 'RGAGood'
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID']
  /** The RGA this good is assigned to. */
  rgaId: Scalars['String']
  /** The model number for representing the specific product configuration for this good. */
  modelNumber: Scalars['String']
  /** Indicates whether or not the model was considered to be lotted. */
  lotted: Scalars['Boolean']
  /** The current status of the good. */
  status: RgaGoodStatus
  /** Indicates whether or not this product is currently under warranty. */
  warrantied: Scalars['Boolean']
  /** Indicates the details of the associated products warranty. */
  warrantyDescription: Scalars['String']
  /** Indicates the number of months the associated product was warrantied for. */
  warrantyTerm: Scalars['Int']
  /** The symptom / reason this product is being returned. */
  symptomId: Scalars['String']
  /** The current description of the symptom. */
  symptomDescription: Scalars['String']
  /** Indicates whether or not the resolution for the symptom was a pre-approved repair. */
  preApproved: Scalars['Boolean']
  /** The fault code associated to the prescribed symptom. */
  faultCode: Scalars['String']
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>
  /** Indicates the product type for this good. */
  productType: ProductType
  /** Indicates the name of product family this good. */
  productName: Scalars['String']
  /** Indicates the product family this good. */
  productId: Scalars['String']
  /** The proposed resolution the issue affecting this good. */
  resolution?: Maybe<Scalars['String']>
  /** The synopsis of the associated symptom. */
  symptomSynopsis?: Maybe<Scalars['String']>
  /** The solution for associated symptom. */
  symptomSolution: Scalars['String']
  /** The fee involved for resolving this issue. */
  resolutionFee?: Maybe<FeeStructure>
  /** The associated RMA from our distributor / partner's records. */
  rma?: Maybe<Scalars['String']>
  /** The associated PO from our distributor / partner's records. */
  po?: Maybe<Scalars['String']>
  /** A URL to download a generated PDF of the associated customerletter. */
  customerLetterUrl?: Maybe<Scalars['String']>
  /** A URL to download a generated PDF of the associated service form. */
  serviceFormUrl?: Maybe<Scalars['String']>
  /** Any additional notes about this good specifically.. */
  notes?: Maybe<Scalars['String']>
  /** The id of the customer if the product has been registered to a user. */
  customerId?: Maybe<Scalars['String']>
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: Maybe<Scalars['String']>
  /** The email of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>
  /** The phone number of the customer this good belongs to. */
  customerPhone?: Maybe<Scalars['String']>
  /** The street address for the customer this good belongs to. */
  customerStreet?: Maybe<Scalars['String']>
  /** The street address (line 2) for the customer this good belongs to. */
  customerStreet2?: Maybe<Scalars['String']>
  /** The city of the address for the customer this good belongs to. */
  customerCity?: Maybe<Scalars['String']>
  /** The state of the address for the customer this good belongs to. */
  customerState?: Maybe<Scalars['String']>
  /** The zip of the address for the customer this good belongs to. */
  customerZip?: Maybe<Scalars['String']>
  /** The country of the address for the customer this good belongs to. */
  customerCountry?: Maybe<Scalars['String']>
  /** The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerSpecialty?: Maybe<Scalars['String']>
  /** The preferred shipping speed assigned to return this good to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>
  /** The tracking number associated to the return shipment. */
  tracking?: Maybe<Scalars['String']>
  /** The carrier used to transport the return shipment. */
  carrier?: Maybe<RgaShippingCarrier>
}

/** The input to make changes to an existing RGA Good. */
export type RgaGoodInput = {
  /** The model number for representing the specific product configuration for this good. */
  modelNumber?: Maybe<Scalars['String']>
  /** Indicates whether or not the model was considered to be lotted. */
  lotted?: Maybe<Scalars['Boolean']>
  /** The current status of the good. */
  status?: Maybe<RgaGoodStatus>
  /** Indicates whether or not this product is currently under warranty. */
  warrantied?: Maybe<Scalars['Boolean']>
  /** Indicates the details of the associated products warranty. */
  warrantyDescription?: Maybe<Scalars['String']>
  /** Indicates the number of months the associated product was warrantied for. */
  warrantyTerm?: Maybe<Scalars['Int']>
  /** The symptom / reason this product is being returned. */
  symptomId?: Maybe<Scalars['String']>
  /** The current description of the symptom. */
  symptomDescription?: Maybe<Scalars['String']>
  /** Indicates whether or not the resolution for the symptom was a pre-approved repair. */
  preApproved?: Maybe<Scalars['Boolean']>
  /** The fault code associated to the prescribed symptom. */
  faultCode?: Maybe<Scalars['String']>
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>
  /** Indicates the product type for this good. */
  productType?: Maybe<ProductType>
  /** Indicates the name of product family this good. */
  productName?: Maybe<Scalars['String']>
  /** Indicates the product family this good. */
  productId?: Maybe<Scalars['String']>
  /** The proposed resolution the issue affecting this good. */
  resolution?: Maybe<Scalars['String']>
  /** The fee involved for resolving this issue. */
  resolutionFee?: Maybe<FeeStructureInput>
  /** The synopsis of the associated symptom. */
  symptomSynopsis?: Maybe<Scalars['String']>
  /** The solution for associated symptom. */
  symptomSolution?: Maybe<Scalars['String']>
  /** The associated RMA from our distributor / partner's records. */
  rma?: Maybe<Scalars['String']>
  /** The associated PO from our distributor / partner's records. */
  po?: Maybe<Scalars['String']>
  /** Any additional notes about this good specifically.. */
  notes?: Maybe<Scalars['String']>
  /** The id of the customer if the product has been registered to a user. */
  customerId?: Maybe<Scalars['String']>
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: Maybe<Scalars['String']>
  /** The email of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>
  /** The phone number of the customer this good belongs to. */
  customerPhone?: Maybe<Scalars['String']>
  /** The street address for the customer this good belongs to. */
  customerStreet?: Maybe<Scalars['String']>
  /** The street address (line 2) for the customer this good belongs to. */
  customerStreet2?: Maybe<Scalars['String']>
  /** The city of the address for the customer this good belongs to. */
  customerCity?: Maybe<Scalars['String']>
  /** The state of the address for the customer this good belongs to. */
  customerState?: Maybe<Scalars['String']>
  /** The zip of the address for the customer this good belongs to. */
  customerZip?: Maybe<Scalars['String']>
  /** The country of the address for the customer this good belongs to. */
  customerCountry?: Maybe<Scalars['String']>
  /** The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerSpecialty?: Maybe<Scalars['String']>
  /** The preferred shipping speed assigned to return this good to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>
}

/** The result of a mutation applied to a RGA. */
export type RgaGoodMutationOutput = {
  __typename?: 'RGAGoodMutationOutput'
  /** The id the resulting RGA Good belongs to if the operation was successful. */
  rgaId?: Maybe<Scalars['String']>
  /** The resulting RGA Good if the operation was successful. */
  rgaGood?: Maybe<RgaGood>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The input to apply a shipping update make changes to an existing RGA Good. */
export type RgaGoodShippingInput = {
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID']
  /** A list of email addresses to notify the shipping alert / tracking message. */
  recipients?: Maybe<Array<Maybe<Scalars['String']>>>
  /** The shipping status for the good. */
  status: RgaShippingStatus
  /** The message to email to all specified recipients */
  message?: Maybe<Scalars['String']>
  /** The tracking number associated to the return shipment. */
  tracking?: Maybe<Scalars['String']>
  /** The carrier used to transport the return shipment. */
  carrier?: Maybe<RgaShippingCarrier>
}

/** The current status of a given good belonging to an RGA. */
export enum RgaGoodStatus {
  /** The good is considered valid and part of the request. */
  Valid = 'VALID',
  /** The good was removed from the request at some point. */
  Archived = 'ARCHIVED',
  /** Indicates a good has been delayed from shipping. */
  Delayed = 'DELAYED',
}

/** The result of a mutation applied to a RGA. */
export type RgaMutationOutput = {
  __typename?: 'RGAMutationOutput'
  /** The resulting RGA if the operation was successful. */
  rga?: Maybe<Rga>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** The result of a query for a RGA or RGAs. */
export type RgaQueryOutput = {
  __typename?: 'RGAQueryOutput'
  /** The resulting RGA if the operation was successful. */
  rga?: Maybe<Rga>
  /** The resulting RGAs if the operation was successful and multiple results were returned. */
  rgas?: Maybe<Array<Maybe<Rga>>>
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** Indicates the shipping carrier used to transport a good associated to an RGA. */
export enum RgaShippingCarrier {
  /** FedEx as a shipping carrier. */
  Fedex = 'FEDEX',
  /** UPS as a shipping carrier. */
  Ups = 'UPS',
  /** DHL as a shipping carrier. */
  Dhl = 'DHL',
  /** Another shipping carrier not fully supported by the system. */
  Other = 'OTHER',
}

/** Indicates the shipping status for a given good that belongs to an RGA. */
export enum RgaShippingStatus {
  /** Indicates that a given item could not be shipped for various reasons. */
  Delayed = 'DELAYED',
  /** Indicates an RGA good has shipped. */
  Shipped = 'SHIPPED',
}

/** Defines a state a given RGA could be in. */
export enum RgaStatus {
  /**
   * An RGA number has been issued to the distributor but the customer
   * has not completed or shipped the package.
   **/
  Issued = 'ISSUED',
  /**
   * The customer has confirmed the goods associated to the request and
   * RPMED is awaiting the delivery of the customer's package.
   **/
  AwaitingArrival = 'AWAITING_ARRIVAL',
  /** RPMED team is assessing the contents of the package. */
  Assessing = 'ASSESSING',
  /** RPMED team is making any necessary repairs. */
  Repairing = 'REPAIRING',
  /** RPMED team has shipped the package back to the customer. */
  Shipping = 'SHIPPING',
  /** The request is complete and no further notes / changes can be made. */
  Closed = 'CLOSED',
  /**
   * The request was canceled at any point during the process. Notes may
   * may be added for further explanation.
   **/
  Canceled = 'CANCELED',
  /**
   * Indicates the RGA may have partially shipped but still has some pending
   * items that have been delayed.
   **/
  Delayed = 'DELAYED',
}

/** A list of totals for any given rga status. */
export type RgaStatusCountOutput = {
  __typename?: 'RGAStatusCountOutput'
  /** Count of all issued RGAs that may not have been shipped. */
  issued?: Maybe<Scalars['Int']>
  /** Count of all RGAs that have delayed items. */
  delayed?: Maybe<Scalars['Int']>
  /** Count of all RGAs awaiting arrival. */
  awaitingArrival?: Maybe<Scalars['Int']>
  /** Count of all received RGAs that have not yet been assessed. */
  received?: Maybe<Scalars['Int']>
  /** Count of all RGAs currently being assessed. */
  assessing?: Maybe<Scalars['Int']>
  /** Count of all RGAs currently being repaired. */
  repairing?: Maybe<Scalars['Int']>
  /** Count of all RGAs being shipped back to customers. */
  shipping?: Maybe<Scalars['Int']>
  /** Count of all closed RGAs. */
  closed?: Maybe<Scalars['Int']>
  /** Count of all canceled RGAs. */
  canceled?: Maybe<Scalars['Int']>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
}

/** A description of a status update for a given RGA. */
export type RgaStatusUpdate = {
  __typename?: 'RGAStatusUpdate'
  /** The new status the request was assigned. */
  status?: Maybe<RgaStatus>
  /** Any notes describing what happened to the request during this update. */
  notes?: Maybe<Scalars['String']>
  /** Details about who made this update. */
  updatedBy?: Maybe<UpdateProfile>
  /** An ISO string representing when this update occurred. */
  updatedOn?: Maybe<Scalars['String']>
}

export type UpdateProfile = {
  __typename?: 'UpdateProfile'
  /** The id of the user who made the update. */
  id?: Maybe<Scalars['String']>
  /** The name of the user who made the update. */
  name?: Maybe<Scalars['String']>
  /** The email address of the user who made the update. */
  email?: Maybe<Scalars['String']>
}

/** A set of file keys to generate S3 endpoint URLS for. */
export type UploadInput = {
  keys: Array<Maybe<Scalars['String']>>
}

/** The result of a mutation applied to a customer. */
export type UploadMutationOutput = {
  __typename?: 'UploadMutationOutput'
  /** The resulting customer if the operation was successful. */
  uploads?: Maybe<Array<Maybe<UploadUrl>>>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** Indicates whether or not an image is currently transferring, available, or even deleted. */
export enum UploadStatus {
  Pending = 'PENDING',
  Available = 'AVAILABLE',
  Deleted = 'DELETED',
}

export type UploadUrl = {
  __typename?: 'UploadURL'
  /** The unique file key to use on AWS S3. */
  id: Scalars['ID']
  /** The endpoint to utilize for uploading the associated file key/id to AWS S3. */
  url: Scalars['String']
}

/** A registered user object from API. Could be a customer, admin, or partner account. */
export type User = {
  __typename?: 'User'
  /** The unique identifier for this user */
  id: Scalars['ID']
  /** The email address for this user. */
  email: Scalars['String']
  /** The actual first name of the user. */
  firstName?: Maybe<Scalars['String']>
  /** The actual last name of the user. */
  lastName?: Maybe<Scalars['String']>
}

/** The result of a mutation applied to a user. */
export type UserMutationOutput = {
  __typename?: 'UserMutationOutput'
  /** The resulting user if the operation was successful. */
  user?: Maybe<User>
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean']
}

/** A validation error that provides details for an unsuccseful mutation or query. */
export type ValidationError = {
  __typename?: 'ValidationError'
  /** A path indicating the attribute that failed validation. */
  path: Scalars['String']
  /** A brief description of why the specified attribute failed validation. */
  message: Scalars['String']
}
export type CreateRgaGoodMutationVariables = {
  rgaId: Scalars['String']
  rgaGoodInput: RgaGoodInput
}

export type CreateRgaGoodMutation = { __typename?: 'Mutation' } & {
  response: { __typename?: 'RGAGoodMutationOutput' } & Pick<
    RgaGoodMutationOutput,
    'rgaId' | 'success'
  > & {
      rgaGood: Maybe<
        { __typename?: 'RGAGood' } & Pick<
          RgaGood,
          | 'id'
          | 'rgaId'
          | 'customerId'
          | 'customerEmail'
          | 'customerName'
          | 'customerPhone'
          | 'customerStreet'
          | 'customerStreet2'
          | 'customerZip'
          | 'customerCity'
          | 'customerState'
          | 'customerCountry'
          | 'faultCode'
          | 'serial'
          | 'lotted'
          | 'preApproved'
          | 'productId'
          | 'productName'
          | 'productType'
          | 'symptomId'
          | 'symptomDescription'
          | 'symptomSolution'
          | 'symptomSynopsis'
          | 'modelNumber'
          | 'po'
          | 'rma'
          | 'warrantied'
          | 'warrantyTerm'
          | 'warrantyDescription'
          | 'notes'
        >
      >
      errors: Maybe<
        Array<
          Maybe<
            { __typename?: 'ValidationError' } & Pick<
              ValidationError,
              'message' | 'path'
            >
          >
        >
      >
    }
}

export type CreateRgaMutationVariables = {
  rgaInput: NewRgaInput
}

export type CreateRgaMutation = { __typename?: 'Mutation' } & {
  response: { __typename?: 'RGAMutationOutput' } & Pick<
    RgaMutationOutput,
    'success'
  > & {
      rga: Maybe<
        { __typename?: 'RGA' } & Pick<
          Rga,
          'id' | 'shippingSpeed' | 'status' | 'submittedBy' | 'submittedOn'
        >
      >
      errors: Maybe<
        Array<
          Maybe<
            { __typename?: 'ValidationError' } & Pick<
              ValidationError,
              'message' | 'path'
            >
          >
        >
      >
    }
}

export type DestroyRgaGoodMutationVariables = {
  id: Scalars['ID']
  rgaId: Scalars['String']
}

export type DestroyRgaGoodMutation = { __typename?: 'Mutation' } & {
  response: { __typename?: 'RGAGoodMutationOutput' } & Pick<
    RgaGoodMutationOutput,
    'rgaId' | 'success'
  > & {
      rgaGood: Maybe<
        { __typename?: 'RGAGood' } & Pick<
          RgaGood,
          | 'modelNumber'
          | 'serial'
          | 'id'
          | 'warrantied'
          | 'faultCode'
          | 'status'
          | 'symptomId'
          | 'symptomDescription'
          | 'customerEmail'
          | 'customerName'
          | 'customerId'
          | 'notes'
          | 'rma'
          | 'po'
        >
      >
      errors: Maybe<
        Array<
          Maybe<
            { __typename?: 'ValidationError' } & Pick<
              ValidationError,
              'message' | 'path'
            >
          >
        >
      >
    }
}

export type ModelNumbersQueryVariables = {
  search?: Maybe<Scalars['String']>
  productId?: Maybe<Scalars['String']>
  productType?: Maybe<ProductType>
}

export type ModelNumbersQuery = { __typename?: 'Query' } & {
  response: Maybe<
    { __typename?: 'ModelNumberQueryOutput' } & Pick<
      ModelNumberQueryOutput,
      'pageSize' | 'success'
    > & {
        modelNumbers: Maybe<
          Array<
            Maybe<
              { __typename?: 'ModelNumber' } & Pick<
                ModelNumber,
                | 'id'
                | 'lotted'
                | 'warrantyTerm'
                | 'warrantyDescription'
                | 'productType'
                | 'description'
              > & {
                  feeWithWarranty: Maybe<
                    { __typename?: 'FeeStructure' } & Pick<
                      FeeStructure,
                      'distributor' | 'endUser'
                    >
                  >
                  products: Array<
                    Maybe<
                      { __typename?: 'Product' } & Pick<Product, 'id' | 'name'>
                    >
                  >
                  feeWithoutWarranty: Maybe<
                    { __typename?: 'FeeStructure' } & Pick<
                      FeeStructure,
                      'distributor' | 'endUser'
                    >
                  >
                }
            >
          >
        >
        errors: Maybe<
          Array<
            Maybe<
              { __typename?: 'ValidationError' } & Pick<
                ValidationError,
                'path' | 'message'
              >
            >
          >
        >
      }
  >
}

export type ProductSymptomsQueryVariables = {
  search?: Maybe<Scalars['String']>
  modelNumber?: Maybe<Scalars['String']>
}

export type ProductSymptomsQuery = { __typename?: 'Query' } & {
  response: { __typename?: 'ProductSymptomQueryOutput' } & Pick<
    ProductSymptomQueryOutput,
    'pageSize' | 'success'
  > & {
      productSymptoms: Maybe<
        Array<
          Maybe<
            { __typename?: 'ProductSymptom' } & Pick<
              ProductSymptom,
              | 'id'
              | 'name'
              | 'faultCode'
              | 'fee'
              | 'preApproved'
              | 'careTip'
              | 'solution'
              | 'synopsis'
            > & {
                attachedImages: Maybe<
                  Array<
                    Maybe<
                      { __typename?: 'AttachedImage' } & Pick<
                        AttachedImage,
                        'id' | 'position' | 'status' | 'url'
                      >
                    >
                  >
                >
              }
          >
        >
      >
      errors: Maybe<
        Array<
          Maybe<
            { __typename?: 'ValidationError' } & Pick<
              ValidationError,
              'message' | 'path'
            >
          >
        >
      >
    }
}

export type ProductsQueryVariables = {
  search?: Maybe<Scalars['String']>
}

export type ProductsQuery = { __typename?: 'Query' } & {
  response: Maybe<
    { __typename?: 'ProductQueryOutput' } & Pick<
      ProductQueryOutput,
      'success'
    > & {
        products: Maybe<
          Array<
            Maybe<
              { __typename?: 'Product' } & Pick<
                Product,
                'id' | 'name' | 'description'
              >
            >
          >
        >
        errors: Maybe<
          Array<
            Maybe<
              { __typename?: 'ValidationError' } & Pick<
                ValidationError,
                'message' | 'path'
              >
            >
          >
        >
      }
  >
}

export type RgaQueryVariables = {
  rgaId: Scalars['String']
}

export type RgaQuery = { __typename?: 'Query' } & {
  response: { __typename?: 'RGAQueryOutput' } & Pick<
    RgaQueryOutput,
    'success'
  > & {
      rga: Maybe<
        { __typename?: 'RGA' } & Pick<
          Rga,
          'id' | 'shippingSpeed' | 'submittedOn' | 'submittedBy' | 'status'
        > & {
            statusLog: Maybe<
              Array<
                Maybe<
                  { __typename?: 'RGAStatusUpdate' } & Pick<
                    RgaStatusUpdate,
                    'status' | 'updatedOn' | 'notes'
                  > & {
                      updatedBy: Maybe<
                        { __typename?: 'UpdateProfile' } & Pick<
                          UpdateProfile,
                          'id' | 'name' | 'email'
                        >
                      >
                    }
                >
              >
            >
            goods: Array<
              Maybe<
                { __typename?: 'RGAGood' } & Pick<
                  RgaGood,
                  | 'id'
                  | 'customerId'
                  | 'customerEmail'
                  | 'customerName'
                  | 'customerPhone'
                  | 'customerStreet'
                  | 'customerStreet2'
                  | 'customerZip'
                  | 'customerCity'
                  | 'customerState'
                  | 'customerCountry'
                  | 'customerSpecialty'
                  | 'faultCode'
                  | 'serial'
                  | 'lotted'
                  | 'preApproved'
                  | 'productId'
                  | 'productName'
                  | 'productType'
                  | 'symptomId'
                  | 'symptomDescription'
                  | 'symptomSolution'
                  | 'symptomSynopsis'
                  | 'modelNumber'
                  | 'po'
                  | 'rma'
                  | 'rgaId'
                  | 'warrantied'
                  | 'warrantyTerm'
                  | 'warrantyDescription'
                  | 'notes'
                  | 'serviceFormUrl'
                  | 'shippingSpeed'
                > & {
                    resolutionFee: Maybe<
                      { __typename?: 'FeeStructure' } & Pick<
                        FeeStructure,
                        'distributor' | 'endUser'
                      >
                    >
                  }
              >
            >
          }
      >
      errors: Maybe<
        Array<
          Maybe<
            { __typename?: 'ValidationError' } & Pick<
              ValidationError,
              'message' | 'path'
            >
          >
        >
      >
    }
}

export type SubmitRgaForReviewMutationVariables = {
  id: Scalars['ID']
  notes?: Maybe<Scalars['String']>
}

export type SubmitRgaForReviewMutation = { __typename?: 'Mutation' } & {
  submitRGAForReview: { __typename?: 'RGAMutationOutput' } & Pick<
    RgaMutationOutput,
    'success'
  > & {
      rga: Maybe<
        { __typename?: 'RGA' } & Pick<
          Rga,
          'id' | 'shippingSpeed' | 'submittedOn' | 'submittedBy' | 'status'
        >
      >
      errors: Maybe<
        Array<
          Maybe<
            { __typename?: 'ValidationError' } & Pick<
              ValidationError,
              'message' | 'path'
            >
          >
        >
      >
    }
}

export type UpdateRgaGoodMutationVariables = {
  id: Scalars['ID']
  rgaId: Scalars['String']
  rgaGoodInput: RgaGoodInput
}

export type UpdateRgaGoodMutation = { __typename?: 'Mutation' } & {
  response: { __typename?: 'RGAGoodMutationOutput' } & Pick<
    RgaGoodMutationOutput,
    'success' | 'rgaId'
  > & {
      errors: Maybe<
        Array<
          Maybe<
            { __typename?: 'ValidationError' } & Pick<
              ValidationError,
              'message' | 'path'
            >
          >
        >
      >
      rgaGood: Maybe<
        { __typename?: 'RGAGood' } & Pick<
          RgaGood,
          | 'id'
          | 'customerEmail'
          | 'customerName'
          | 'customerPhone'
          | 'customerStreet'
          | 'customerStreet2'
          | 'customerZip'
          | 'customerCity'
          | 'customerState'
          | 'customerCountry'
          | 'customerId'
          | 'customerSpecialty'
          | 'faultCode'
          | 'serial'
          | 'lotted'
          | 'preApproved'
          | 'productId'
          | 'productName'
          | 'productType'
          | 'symptomId'
          | 'symptomDescription'
          | 'symptomSolution'
          | 'symptomSynopsis'
          | 'modelNumber'
          | 'po'
          | 'rma'
          | 'warrantied'
          | 'warrantyTerm'
          | 'warrantyDescription'
          | 'notes'
          | 'serviceFormUrl'
          | 'customerLetterUrl'
        > & {
            resolutionFee: Maybe<
              { __typename?: 'FeeStructure' } & Pick<
                FeeStructure,
                'distributor' | 'endUser'
              >
            >
          }
      >
    }
}

export const CreateRgaGoodDocument = gql`
  mutation CreateRGAGood($rgaId: String!, $rgaGoodInput: RGAGoodInput!) {
    response: createRGAGood(rgaId: $rgaId, rgaGoodInput: $rgaGoodInput) {
      rgaId
      rgaGood {
        id
        rgaId
        customerId
        customerEmail
        customerName
        customerPhone
        customerStreet
        customerStreet2
        customerZip
        customerCity
        customerState
        customerCountry
        faultCode
        serial
        lotted
        preApproved
        productId
        productName
        productType
        symptomId
        symptomDescription
        symptomSolution
        symptomSynopsis
        modelNumber
        po
        rma
        warrantied
        warrantyTerm
        warrantyDescription
        notes
      }
      errors {
        message
        path
      }
      success
    }
  }
`
export type CreateRgaGoodMutationFn = ApolloReactCommon.MutationFunction<
  CreateRgaGoodMutation,
  CreateRgaGoodMutationVariables
>

export function useCreateRgaGoodMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateRgaGoodMutation,
    CreateRgaGoodMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateRgaGoodMutation,
    CreateRgaGoodMutationVariables
  >(CreateRgaGoodDocument, baseOptions)
}
export type CreateRgaGoodMutationHookResult = ReturnType<
  typeof useCreateRgaGoodMutation
>
export type CreateRgaGoodMutationResult = ApolloReactCommon.MutationResult<
  CreateRgaGoodMutation
>
export type CreateRgaGoodMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRgaGoodMutation,
  CreateRgaGoodMutationVariables
>
export const CreateRgaDocument = gql`
  mutation CreateRGA($rgaInput: NewRGAInput!) {
    response: createRGA(rgaInput: $rgaInput) {
      rga {
        id
        shippingSpeed
        status
        submittedBy
        submittedOn
      }
      errors {
        message
        path
      }
      success
    }
  }
`
export type CreateRgaMutationFn = ApolloReactCommon.MutationFunction<
  CreateRgaMutation,
  CreateRgaMutationVariables
>

export function useCreateRgaMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateRgaMutation,
    CreateRgaMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateRgaMutation,
    CreateRgaMutationVariables
  >(CreateRgaDocument, baseOptions)
}
export type CreateRgaMutationHookResult = ReturnType<
  typeof useCreateRgaMutation
>
export type CreateRgaMutationResult = ApolloReactCommon.MutationResult<
  CreateRgaMutation
>
export type CreateRgaMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRgaMutation,
  CreateRgaMutationVariables
>
export const DestroyRgaGoodDocument = gql`
  mutation DestroyRGAGood($id: ID!, $rgaId: String!) {
    response: destroyRGAGood(id: $id, rgaId: $rgaId) {
      rgaId
      rgaGood {
        modelNumber
        serial
        id
        warrantied
        faultCode
        status
        symptomId
        symptomDescription
        customerEmail
        customerName
        customerId
        notes
        rma
        po
      }
      errors {
        message
        path
      }
      success
    }
  }
`
export type DestroyRgaGoodMutationFn = ApolloReactCommon.MutationFunction<
  DestroyRgaGoodMutation,
  DestroyRgaGoodMutationVariables
>

export function useDestroyRgaGoodMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyRgaGoodMutation,
    DestroyRgaGoodMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DestroyRgaGoodMutation,
    DestroyRgaGoodMutationVariables
  >(DestroyRgaGoodDocument, baseOptions)
}
export type DestroyRgaGoodMutationHookResult = ReturnType<
  typeof useDestroyRgaGoodMutation
>
export type DestroyRgaGoodMutationResult = ApolloReactCommon.MutationResult<
  DestroyRgaGoodMutation
>
export type DestroyRgaGoodMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyRgaGoodMutation,
  DestroyRgaGoodMutationVariables
>
export const ModelNumbersDocument = gql`
  query ModelNumbers(
    $search: String
    $productId: String
    $productType: ProductType
  ) {
    response: modelNumbers(
      search: $search
      productId: $productId
      productType: $productType
      public: true
    ) {
      modelNumbers {
        id
        lotted
        warrantyTerm
        warrantyDescription
        productType
        feeWithWarranty {
          distributor
          endUser
        }
        products {
          id
          name
        }
        feeWithoutWarranty {
          distributor
          endUser
        }
        description
      }
      pageSize
      success
      errors {
        path
        message
      }
    }
  }
`

export function useModelNumbersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ModelNumbersQuery,
    ModelNumbersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ModelNumbersQuery,
    ModelNumbersQueryVariables
  >(ModelNumbersDocument, baseOptions)
}
export function useModelNumbersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ModelNumbersQuery,
    ModelNumbersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ModelNumbersQuery,
    ModelNumbersQueryVariables
  >(ModelNumbersDocument, baseOptions)
}

export type ModelNumbersQueryHookResult = ReturnType<
  typeof useModelNumbersQuery
>
export type ModelNumbersQueryResult = ApolloReactCommon.QueryResult<
  ModelNumbersQuery,
  ModelNumbersQueryVariables
>
export const ProductSymptomsDocument = gql`
  query ProductSymptoms($search: String, $modelNumber: String) {
    response: productSymptoms(search: $search, modelNumber: $modelNumber) {
      productSymptoms {
        id
        name
        faultCode
        fee
        preApproved
        careTip
        solution
        synopsis
        attachedImages {
          id
          position
          status
          url
        }
      }
      pageSize
      errors {
        message
        path
      }
      success
    }
  }
`

export function useProductSymptomsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ProductSymptomsQuery,
    ProductSymptomsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ProductSymptomsQuery,
    ProductSymptomsQueryVariables
  >(ProductSymptomsDocument, baseOptions)
}
export function useProductSymptomsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ProductSymptomsQuery,
    ProductSymptomsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ProductSymptomsQuery,
    ProductSymptomsQueryVariables
  >(ProductSymptomsDocument, baseOptions)
}

export type ProductSymptomsQueryHookResult = ReturnType<
  typeof useProductSymptomsQuery
>
export type ProductSymptomsQueryResult = ApolloReactCommon.QueryResult<
  ProductSymptomsQuery,
  ProductSymptomsQueryVariables
>
export const ProductsDocument = gql`
  query Products($search: String) {
    response: products(search: $search) {
      products {
        id
        name
        description
      }
      success
      errors {
        message
        path
      }
    }
  }
`

export function useProductsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    baseOptions
  )
}
export function useProductsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    baseOptions
  )
}

export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>
export type ProductsQueryResult = ApolloReactCommon.QueryResult<
  ProductsQuery,
  ProductsQueryVariables
>
export const RgaDocument = gql`
  query RGA($rgaId: String!) {
    response: rga(id: $rgaId) {
      rga {
        id
        shippingSpeed
        submittedOn
        submittedBy
        status
        statusLog {
          status
          updatedOn
          updatedBy {
            id
            name
            email
          }
          notes
        }
        goods {
          id
          customerId
          customerEmail
          customerName
          customerPhone
          customerStreet
          customerStreet2
          customerZip
          customerCity
          customerState
          customerCountry
          customerId
          customerSpecialty
          faultCode
          serial
          lotted
          preApproved
          productId
          productName
          productType
          symptomId
          symptomDescription
          symptomSolution
          symptomSynopsis
          modelNumber
          resolutionFee {
            distributor
            endUser
          }
          po
          rma
          rgaId
          warrantied
          warrantyTerm
          warrantyDescription
          notes
          serviceFormUrl
          shippingSpeed
        }
      }
      errors {
        message
        path
      }
      success
    }
  }
`

export function useRgaQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<RgaQuery, RgaQueryVariables>
) {
  return ApolloReactHooks.useQuery<RgaQuery, RgaQueryVariables>(
    RgaDocument,
    baseOptions
  )
}
export function useRgaLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RgaQuery,
    RgaQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<RgaQuery, RgaQueryVariables>(
    RgaDocument,
    baseOptions
  )
}

export type RgaQueryHookResult = ReturnType<typeof useRgaQuery>
export type RgaQueryResult = ApolloReactCommon.QueryResult<
  RgaQuery,
  RgaQueryVariables
>
export const SubmitRgaForReviewDocument = gql`
  mutation SubmitRGAForReview($id: ID!, $notes: String) {
    submitRGAForReview(id: $id, notes: $notes) {
      rga {
        id
        shippingSpeed
        submittedOn
        submittedBy
        status
      }
      errors {
        message
        path
      }
      success
    }
  }
`
export type SubmitRgaForReviewMutationFn = ApolloReactCommon.MutationFunction<
  SubmitRgaForReviewMutation,
  SubmitRgaForReviewMutationVariables
>

export function useSubmitRgaForReviewMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SubmitRgaForReviewMutation,
    SubmitRgaForReviewMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SubmitRgaForReviewMutation,
    SubmitRgaForReviewMutationVariables
  >(SubmitRgaForReviewDocument, baseOptions)
}
export type SubmitRgaForReviewMutationHookResult = ReturnType<
  typeof useSubmitRgaForReviewMutation
>
export type SubmitRgaForReviewMutationResult = ApolloReactCommon.MutationResult<
  SubmitRgaForReviewMutation
>
export type SubmitRgaForReviewMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SubmitRgaForReviewMutation,
  SubmitRgaForReviewMutationVariables
>
export const UpdateRgaGoodDocument = gql`
  mutation UpdateRGAGood(
    $id: ID!
    $rgaId: String!
    $rgaGoodInput: RGAGoodInput!
  ) {
    response: updateRGAGood(
      id: $id
      rgaId: $rgaId
      rgaGoodInput: $rgaGoodInput
    ) {
      success
      errors {
        message
        path
      }
      rgaId
      rgaGood {
        id
        customerEmail
        customerName
        customerPhone
        customerStreet
        customerStreet2
        customerZip
        customerCity
        customerState
        customerCountry
        customerId
        customerSpecialty
        faultCode
        serial
        lotted
        preApproved
        productId
        productName
        productType
        symptomId
        symptomDescription
        symptomSolution
        symptomSynopsis
        modelNumber
        resolutionFee {
          distributor
          endUser
        }
        po
        rma
        warrantied
        warrantyTerm
        warrantyDescription
        notes
        serviceFormUrl
        customerLetterUrl
      }
    }
  }
`
export type UpdateRgaGoodMutationFn = ApolloReactCommon.MutationFunction<
  UpdateRgaGoodMutation,
  UpdateRgaGoodMutationVariables
>

export function useUpdateRgaGoodMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateRgaGoodMutation,
    UpdateRgaGoodMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateRgaGoodMutation,
    UpdateRgaGoodMutationVariables
  >(UpdateRgaGoodDocument, baseOptions)
}
export type UpdateRgaGoodMutationHookResult = ReturnType<
  typeof useUpdateRgaGoodMutation
>
export type UpdateRgaGoodMutationResult = ApolloReactCommon.MutationResult<
  UpdateRgaGoodMutation
>
export type UpdateRgaGoodMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateRgaGoodMutation,
  UpdateRgaGoodMutationVariables
>
export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}

const result: IntrospectionResultData = {
  __schema: {
    types: [],
  },
}

export default result
