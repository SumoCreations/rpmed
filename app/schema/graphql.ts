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
  /** The email address for this customer. */
  email: Scalars['String']
  /** The actual name of the customer. */
  name?: Maybe<Scalars['String']>
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
  feeWithWarranty: FeeStructure
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty: FeeStructure
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>
  /** A list of all associated symptoms related to this model number. */
  symptoms: Array<Maybe<SimplifiedProductSymptom>>
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
  pricing: PricingInput
  /** A brief description of this product variant. */
  description: Scalars['String']
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted: Scalars['Boolean']
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm: Scalars['Int']
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: Maybe<Scalars['String']>
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty: FeeStructureInput
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty: FeeStructureInput
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: Maybe<Scalars['String']>
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: Maybe<Scalars['String']>
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>
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
  /** Creates a new good for an existing RGA. */
  createRGAGood: RgaGoodMutationOutput
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
export type MutationCreateRgaGoodArgs = {
  rgaGoodInput: NewRgaGoodInput
}

/** The root mutation for the schema. */
export type MutationDestroyRgaGoodArgs = {
  id: Scalars['ID']
  rgaId: Scalars['String']
}

/** A set of fields used to create or update a customer. */
export type NewCustomerInput = {
  email: Scalars['String']
  name?: Maybe<Scalars['String']>
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

/** A set of fields used to create or update a RGA. */
export type NewRgaGoodInput = {
  /** Indicates whether or not this product is currently under warranty. */
  warrantied: Scalars['Boolean']
  /** The symptom / reason this product is being returned. */
  symptomId: Scalars['String']
  /** The RGA this good is assigned to. */
  rgaId: Scalars['String']
  /** The model number for representing the specific product configuration for this good. */
  modelNumber: Scalars['String']
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>
  /** The associated RMA from our distributor / partner's records. */
  rma?: Maybe<Scalars['String']>
  /** The associated PO from our distributor / partner's records. */
  po?: Maybe<Scalars['String']>
  /** Any additional notes about this good specifically.. */
  notes?: Maybe<Scalars['String']>
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: Maybe<Scalars['String']>
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>
}

/** A set of fields used to create or update a RGA. */
export type NewRgaInput = {
  /** The email address of the contact who created the RGA. */
  submittedBy: Scalars['String']
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String']
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
  synopsis: Scalars['String']
  /** A solution to resolve the symptom. */
  solution: Scalars['String']
  /** Indicates if there is an associated fee for servicing this issue. */
  fee: Scalars['Boolean']
  /** Indicates whether or not this is a pre-approved repair regardless of warranty. */
  preApproved: Scalars['Boolean']
  /** An official code used to identify this symptom. */
  faultCode: Scalars['String']
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
export type QueryRgaArgs = {
  id: Scalars['String']
}

/** A Request Goods Authorization. */
export type Rga = {
  __typename?: 'RGA'
  /** The unique identifier for this RGA */
  id: Scalars['ID']
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String']
  /** The email address of the user whom submitted the RGA. */
  submittedBy: Scalars['String']
  /** The distributor associated to the the RGA. */
  distributor: Distributor
  /** The goods associated to the the RGA. */
  goods: Array<Maybe<RgaGood>>
}

/** A good associated to a particular RGA. */
export type RgaGood = {
  __typename?: 'RGAGood'
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID']
  /** Indicates whether or not this product is currently under warranty. */
  warrantied: Scalars['Boolean']
  /** The symptom / reason this product is being returned. */
  symptomId: Scalars['String']
  /** The current description of the symptom. */
  symptomDescription: Scalars['String']
  /** The fault code associated to the prescribed symptom. */
  faultCode: Scalars['String']
  /** The RGA this good is assigned to. */
  rgaId: Scalars['String']
  /** The model number for representing the specific product configuration for this good. */
  modelNumber: Scalars['String']
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>
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
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>
  /** The email address of the contact who created the RGA. */
  submittedBy: Scalars['String']
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String']
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

/** A troubleshooting symptom for a product. */
export type SimplifiedProductSymptom = {
  __typename?: 'SimplifiedProductSymptom'
  /** The unique identifier for this symptom. */
  id: Scalars['ID']
  /** The actual name of the symptom. */
  name: Scalars['String']
  /** An associated fee for servicing this issue. */
  fee: Scalars['Boolean']
  /** An official code used to identify this symptom. */
  faultCode: Scalars['String']
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
