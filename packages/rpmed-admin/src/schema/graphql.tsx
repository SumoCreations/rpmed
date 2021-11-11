import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

/** An image that can be associated to any another type. */
export type AttachedImage = {
   __typename?: 'AttachedImage',
  /** The unique ID or Key on AWS S3 representing the image. */
  id: Scalars['ID'],
  /** A pre-signed url to fetch this image from S3. */
  url?: Maybe<Scalars['String']>,
  /** The user defined sort priority for the attached image. */
  position: Scalars['Int'],
  /** The current upload status of the image regarding its availability on S3. */
  status: UploadStatus,
};

export type AttachedImageInput = {
  id: Scalars['ID'],
  status?: Maybe<UploadStatus>,
  position: Scalars['Int'],
};

/** 
 * Used as an argument on any query incorporating the relay connection spec
 * to orchestrate paginated results
 **/
export type ConnectionPayload = {
  /** The id of the item to fetch forward pagination. Use with first. */
  after?: Maybe<Scalars['ID']>,
  /** The id of the item to fetch backward pagination. Use with last. */
  before?: Maybe<Scalars['ID']>,
  /** A limit when performing forward pagination. */
  first?: Maybe<Scalars['Int']>,
  /** A limit when performing backward pagination. */
  last?: Maybe<Scalars['Int']>,
};

/** A customer of Riverpoint Medical. */
export type Customer = {
   __typename?: 'Customer',
  /** The unique identifier for this customer */
  id: Scalars['ID'],
  /** The email of the customer. */
  email?: Maybe<Scalars['String']>,
  /** The name of the customer. */
  name?: Maybe<Scalars['String']>,
  /** The phone number of the customer. */
  phone?: Maybe<Scalars['String']>,
  /** The street address for the customer. */
  street?: Maybe<Scalars['String']>,
  /** The street address (line 2) for the customer. */
  street2?: Maybe<Scalars['String']>,
  /** The city of the address for the customer. */
  city?: Maybe<Scalars['String']>,
  /** The state of the address for the customer. */
  state?: Maybe<Scalars['String']>,
  /** The zip of the address for the customer. */
  zip?: Maybe<Scalars['String']>,
  /** The country of the address for the customer. */
  country?: Maybe<Scalars['String']>,
  /** The specialty of the customer. */
  specialty?: Maybe<Scalars['String']>,
  /** The hospital of the customer. */
  hospital?: Maybe<Scalars['String']>,
};

/** The result of a mutation applied to a customer. */
export type CustomerMutationOutput = {
   __typename?: 'CustomerMutationOutput',
  /** The resulting customer if the operation was successful. */
  customer?: Maybe<Customer>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** The result of a query for a customer or customers. */
export type CustomerQueryOutput = {
   __typename?: 'CustomerQueryOutput',
  /** The resulting customer if the operation was successful. */
  customer?: Maybe<Customer>,
  /** The resulting customers if the operation was successful and multiple results were returned. */
  customers?: Maybe<Array<Maybe<Customer>>>,
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>,
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** A distributor of Riverpoint Medical. */
export type Distributor = {
   __typename?: 'Distributor',
  /** The unique identifier for this distributor */
  id: Scalars['ID'],
  /** The domain to match email addresses to via this distributor. */
  domain: Scalars['String'],
  /** The actual name of the distributor. */
  name?: Maybe<Scalars['String']>,
};

/** The result of a mutation applied to a distributor. */
export type DistributorMutationOutput = {
   __typename?: 'DistributorMutationOutput',
  /** The resulting distributor if the operation was successful. */
  distributor?: Maybe<Distributor>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** The result of a query for a distributor or distributors. */
export type DistributorQueryOutput = {
   __typename?: 'DistributorQueryOutput',
  /** The resulting distributor if the operation was successful. */
  distributor?: Maybe<Distributor>,
  /** The resulting distributors if the operation was successful and multiple results were returned. */
  distributors?: Maybe<Array<Maybe<Distributor>>>,
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>,
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** A set of fields used to create or update a customer. */
export type ExistingCustomerInput = {
  id: Scalars['ID'],
  email: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

/** A set of fields used to create or update a distributor. */
export type ExistingDistributorInput = {
  id: Scalars['ID'],
  domain: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

/** A set of fields used to create or update a registration. */
export type ExistingProductRegistrationInput = {
  id: Scalars['ID'],
  /** The id of the customer associated to the registration. */
  customerId: Scalars['String'],
  /** The model number for representing the specific product configuration being registered. */
  modelNumber: Scalars['String'],
  /** The serial number associate to the product if it is lotted. */
  serial?: Maybe<Scalars['String']>,
  /** The date the product was registered. */
  registeredOn: Scalars['String'],
};

/** A set of fields used to create or update a symptom. */
export type ExistingProductSymptomInput = {
  id: Scalars['ID'],
  faultCode?: Maybe<Scalars['String']>,
  fee?: Maybe<Scalars['Boolean']>,
  preApproved?: Maybe<Scalars['Boolean']>,
  careTip?: Maybe<Scalars['String']>,
  solution?: Maybe<Scalars['String']>,
  synopsis?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

/** A set of fields used to update certain aspects of an RGA. */
export type ExistingRgaInput = {
  /** The id of the RGA. */
  id: Scalars['String'],
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed: Scalars['String'],
};

/** A set of fields used to create or update a user. */
export type ExistingUserInput = {
  id: Scalars['ID'],
  email: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};

/** Pricing for fees associated to a repair. */
export type FeeStructure = {
   __typename?: 'FeeStructure',
  /** Internal cost pricing for distributors. */
  distributor?: Maybe<Scalars['String']>,
  /** Public pricing for end users. */
  endUser?: Maybe<Scalars['String']>,
};

/** Pricing for fees associated to a repair. */
export type FeeStructureInput = {
  /** Internal cost pricing for distributors. */
  distributor?: Maybe<Scalars['String']>,
  /** Public pricing for end users. */
  endUser?: Maybe<Scalars['String']>,
};

export type ModelNumber = {
   __typename?: 'ModelNumber',
  /** The model number identifying a product variant. */
  id: Scalars['ID'],
  /** Pricing for this specific model. */
  pricing?: Maybe<Pricing>,
  /** The ids of the product(s) this variant can be associated with. */
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** The product(s) this variant can be associated with. */
  products?: Maybe<Array<Maybe<Product>>>,
  /** The high level category for this model number. */
  productType?: Maybe<ProductType>,
  /** A brief description of this product variant. */
  description?: Maybe<Scalars['String']>,
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted?: Maybe<Scalars['Boolean']>,
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm?: Maybe<Scalars['Int']>,
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: Maybe<Scalars['String']>,
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: Maybe<Scalars['String']>,
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: Maybe<Scalars['String']>,
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty?: Maybe<FeeStructure>,
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty?: Maybe<FeeStructure>,
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>,
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>,
  /** If a product model is not publicly viewableit will not show up on forms for a customer. */
  publiclyViewable?: Maybe<Scalars['Boolean']>,
  /** A list of all associated symptoms related to this model number. */
  symptoms?: Maybe<Array<Maybe<ProductSymptom>>>,
};

/** Describes a model number to be created or updated. */
export type ModelNumberInput = {
  /** The model number identifying a product variant. */
  id: Scalars['ID'],
  /** The ids of the products this variant belongs to. */
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** The high level category type this product belongs to. */
  productType?: Maybe<ProductType>,
  /** Pricing for this specific model. */
  pricing?: Maybe<PricingInput>,
  /** A brief description of this product variant. */
  description?: Maybe<Scalars['String']>,
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted?: Maybe<Scalars['Boolean']>,
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm?: Maybe<Scalars['Int']>,
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: Maybe<Scalars['String']>,
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty?: Maybe<FeeStructureInput>,
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty?: Maybe<FeeStructureInput>,
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: Maybe<Scalars['String']>,
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: Maybe<Scalars['String']>,
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>,
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>,
  /** If a product model is not publicly viewable it will not show up on forms for a customer. */
  publiclyViewable?: Maybe<Scalars['Boolean']>,
};

/** The result of a mutation applied to a ModelNumber. */
export type ModelNumberMutationOutput = {
   __typename?: 'ModelNumberMutationOutput',
  /** The resulting model if the operation was successful. */
  modelNumber?: Maybe<ModelNumber>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** The result of a query for a modelNumber or modelNumbers. */
export type ModelNumberQueryOutput = {
   __typename?: 'ModelNumberQueryOutput',
  /** The resulting model number if the operation was successful. */
  modelNumber?: Maybe<ModelNumber>,
  /** The resulting model numbers if the operation was successful and multiple results were returned. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumber>>>,
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>,
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** A subset of the model number type */
export type ModelNumberSymptomDetail = {
   __typename?: 'ModelNumberSymptomDetail',
  /** The model number identifying a product variant. */
  id: Scalars['ID'],
  /** The id of the product this variant belongs to. */
  productId: Scalars['String'],
  /** All associated symptoms related to this model number. */
  symptoms: Array<Maybe<ProductSymptom>>,
};

/** The root mutation for the schema. */
export type Mutation = {
   __typename?: 'Mutation',
  version: Scalars['String'],
  /** Creates a new customer. */
  createCustomer: CustomerMutationOutput,
  /** Updates an existing customer. */
  updateCustomer: CustomerMutationOutput,
  /** Removes an existing customer. */
  destroyCustomer: CustomerMutationOutput,
  /** Creates a new distributor. */
  createDistributor: DistributorMutationOutput,
  /** Updates an existing distributor. */
  updateDistributor: DistributorMutationOutput,
  /** Removes an existing distributor. */
  destroyDistributor: DistributorMutationOutput,
  /** Adds a new product. */
  createProduct: ProductMutationOutput,
  /** Updates an existing product. */
  updateProduct: ProductMutationOutput,
  /** Removes an existing product. */
  destroyProduct: ProductMutationOutput,
  /** Adds a new product variant. */
  createModelNumber: ModelNumberMutationOutput,
  /** Updates an existing product variant. */
  updateModelNumber: ModelNumberMutationOutput,
  /** Updates an existing product variant's lotted status. */
  updateModelNumberLotted: ModelNumberMutationOutput,
  /** Updates an existing product variant's lotted status. */
  updateModelNumberViewable: ModelNumberMutationOutput,
  /** Removes an existing product variant. */
  destroyModelNumber: ModelNumberMutationOutput,
  /** Creates a new registration. */
  createProductRegistration: ProductRegistrationMutationOutput,
  /** Updates an existing registration. */
  updateProductRegistration: ProductRegistrationMutationOutput,
  /** Removes an existing registration. */
  destroyProductRegistration: ProductRegistrationMutationOutput,
  /** Creates a new symptom. */
  createProductSymptom: ProductSymptomMutationOutput,
  /** Updates an existing symptom. */
  updateProductSymptom: ProductSymptomMutationOutput,
  /** Removes an existing symptom. */
  destroyProductSymptom: ProductSymptomMutationOutput,
  /** Links an existing model number to an existing symptom. */
  linkSymptomToModel: ProductSymptomMutationOutput,
  /** Attaches / removes a images to a product symptom. */
  attachImagesToSymptom: ProductSymptomMutationOutput,
  /** Creates a new authenticatable user. */
  createUser: UserMutationOutput,
  /** Updates an existing user. */
  updateUser: UserMutationOutput,
  /** Removes an existing user. */
  destroyUser: UserMutationOutput,
  /** Resets the password for the current user dependent on a temporary access token. */
  resetPassword: UserMutationOutput,
  /** Returns a set of upload endpoints from AWS S3. */
  createUploads: UploadMutationOutput,
  /** Creates a new RGA. */
  createRGA: RgaMutationOutput,
  /** Updates an existing RGA. */
  updateRGA: RgaMutationOutput,
  /** Updates the status of a specific RGA. */
  updateRGAStatus: RgaMutationOutput,
  /** Allows an end user to submit an RGA Good for review by the RPMed Internal Team. */
  submitRGAForReview: RgaMutationOutput,
  /** Updates the shipping status of a specific RGA. */
  updateRGAShippingStatus: RgaMutationOutput,
  /** Creates a new good for an existing RGA. */
  createRGAGood: RgaGoodMutationOutput,
  /** Updates an existing good for an existing RGA. */
  updateRGAGood: RgaGoodMutationOutput,
  /** Removes an existing RGA good. */
  destroyRGAGood: RgaGoodMutationOutput,
};


/** The root mutation for the schema. */
export type MutationCreateCustomerArgs = {
  customerInput: NewCustomerInput
};


/** The root mutation for the schema. */
export type MutationUpdateCustomerArgs = {
  customerInput: ExistingCustomerInput
};


/** The root mutation for the schema. */
export type MutationDestroyCustomerArgs = {
  id: Scalars['String']
};


/** The root mutation for the schema. */
export type MutationCreateDistributorArgs = {
  distributorInput: NewDistributorInput
};


/** The root mutation for the schema. */
export type MutationUpdateDistributorArgs = {
  distributorInput: ExistingDistributorInput
};


/** The root mutation for the schema. */
export type MutationDestroyDistributorArgs = {
  id: Scalars['String']
};


/** The root mutation for the schema. */
export type MutationCreateProductArgs = {
  productInput: ProductInput
};


/** The root mutation for the schema. */
export type MutationUpdateProductArgs = {
  productInput: ProductInput
};


/** The root mutation for the schema. */
export type MutationDestroyProductArgs = {
  id: Scalars['ID']
};


/** The root mutation for the schema. */
export type MutationCreateModelNumberArgs = {
  modelNumberInput: ModelNumberInput
};


/** The root mutation for the schema. */
export type MutationUpdateModelNumberArgs = {
  modelNumberInput: ModelNumberInput
};


/** The root mutation for the schema. */
export type MutationUpdateModelNumberLottedArgs = {
  id: Scalars['ID'],
  lotted: Scalars['Boolean']
};


/** The root mutation for the schema. */
export type MutationUpdateModelNumberViewableArgs = {
  id: Scalars['ID'],
  publiclyViewable: Scalars['Boolean']
};


/** The root mutation for the schema. */
export type MutationDestroyModelNumberArgs = {
  id: Scalars['ID']
};


/** The root mutation for the schema. */
export type MutationCreateProductRegistrationArgs = {
  productRegistrationInput: NewProductRegistrationInput
};


/** The root mutation for the schema. */
export type MutationUpdateProductRegistrationArgs = {
  productRegistrationInput: ExistingProductRegistrationInput
};


/** The root mutation for the schema. */
export type MutationDestroyProductRegistrationArgs = {
  id: Scalars['String']
};


/** The root mutation for the schema. */
export type MutationCreateProductSymptomArgs = {
  productSymptomInput: NewProductSymptomInput
};


/** The root mutation for the schema. */
export type MutationUpdateProductSymptomArgs = {
  productSymptomInput: ExistingProductSymptomInput
};


/** The root mutation for the schema. */
export type MutationDestroyProductSymptomArgs = {
  id: Scalars['String']
};


/** The root mutation for the schema. */
export type MutationLinkSymptomToModelArgs = {
  modelNumber: Scalars['String'],
  symptomId: Scalars['String'],
  linked: Scalars['Boolean']
};


/** The root mutation for the schema. */
export type MutationAttachImagesToSymptomArgs = {
  symptomId: Scalars['String'],
  attachedImages: Array<Maybe<AttachedImageInput>>
};


/** The root mutation for the schema. */
export type MutationCreateUserArgs = {
  userInput: NewUserInput
};


/** The root mutation for the schema. */
export type MutationUpdateUserArgs = {
  userInput: ExistingUserInput
};


/** The root mutation for the schema. */
export type MutationDestroyUserArgs = {
  id: Scalars['String']
};


/** The root mutation for the schema. */
export type MutationResetPasswordArgs = {
  password: Scalars['String']
};


/** The root mutation for the schema. */
export type MutationCreateUploadsArgs = {
  uploadInput: UploadInput
};


/** The root mutation for the schema. */
export type MutationCreateRgaArgs = {
  rgaInput: NewRgaInput
};


/** The root mutation for the schema. */
export type MutationUpdateRgaArgs = {
  rgaInput: ExistingRgaInput
};


/** The root mutation for the schema. */
export type MutationUpdateRgaStatusArgs = {
  id: Scalars['ID'],
  status: RgaStatus,
  notes?: Maybe<Scalars['String']>
};


/** The root mutation for the schema. */
export type MutationSubmitRgaForReviewArgs = {
  id: Scalars['ID'],
  notes?: Maybe<Scalars['String']>
};


/** The root mutation for the schema. */
export type MutationUpdateRgaShippingStatusArgs = {
  id: Scalars['ID'],
  notes?: Maybe<Scalars['String']>,
  shippingUpdates?: Maybe<Array<Maybe<RgaGoodShippingInput>>>
};


/** The root mutation for the schema. */
export type MutationCreateRgaGoodArgs = {
  rgaId: Scalars['String'],
  rgaGoodInput: RgaGoodInput
};


/** The root mutation for the schema. */
export type MutationUpdateRgaGoodArgs = {
  id: Scalars['ID'],
  rgaId: Scalars['String'],
  rgaGoodInput: RgaGoodInput
};


/** The root mutation for the schema. */
export type MutationDestroyRgaGoodArgs = {
  id: Scalars['ID'],
  rgaId: Scalars['String']
};

/** A set of fields used to create or update a customer. */
export type NewCustomerInput = {
  /** The email of the customer. */
  email: Scalars['String'],
  /** The name of the customer. */
  name?: Maybe<Scalars['String']>,
  /** The phone number of the customer. */
  phone?: Maybe<Scalars['String']>,
  /** The street address for the customer. */
  street?: Maybe<Scalars['String']>,
  /** The street address (line 2) for the customer. */
  street2?: Maybe<Scalars['String']>,
  /** The city of the address for the customer. */
  city?: Maybe<Scalars['String']>,
  /** The state of the address for the customer. */
  state?: Maybe<Scalars['String']>,
  /** The zip of the address for the customer. */
  zip?: Maybe<Scalars['String']>,
  /** The country of the address for the customer. */
  country?: Maybe<Scalars['String']>,
  /** The specialty of the customer. */
  specialty?: Maybe<Scalars['String']>,
};

/** A set of fields used to create or update a distributor. */
export type NewDistributorInput = {
  domain: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

/** A set of fields used to create or update a registration. */
export type NewProductRegistrationInput = {
  /** The id of the customer associated to the registration. */
  customerId: Scalars['String'],
  /** The model number for representing the specific product configuration being registered. */
  modelNumber: Scalars['String'],
  /** The serial number associate to the product if it is lotted. */
  serial?: Maybe<Scalars['String']>,
  /** The date the product was registered. */
  registeredOn: Scalars['String'],
};

/** A set of fields used to create or update a symptom. */
export type NewProductSymptomInput = {
  faultCode?: Maybe<Scalars['String']>,
  fee?: Maybe<Scalars['Boolean']>,
  preApproved?: Maybe<Scalars['Boolean']>,
  careTip?: Maybe<Scalars['String']>,
  solution?: Maybe<Scalars['String']>,
  synopsis?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

/** A set of fields used to create an RGA. */
export type NewRgaInput = {
  /** The email address of the contact who created the RGA. */
  submittedBy: Scalars['String'],
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String'],
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>,
};

/** A set of fields used to create or update a user. */
export type NewUserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};

/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfo = {
   __typename?: 'PageInfo',
  /** Indicates whether or not there is a next page after this connection result. */
  hasNextPage: Scalars['Boolean'],
  /** Returns any available pages after to the current set based on the limit. */
  hasNextPages: Array<Maybe<PaginationEntry>>,
  /** Indicates whether or not there is a previous page before this connection result. */
  hasPreviousPage: Scalars['Boolean'],
  /** Returns any available pages prior to the current set based on the limit. */
  hasPreviousPages: Array<Maybe<PaginationEntry>>,
  /** The cursor representing the id of the first item in the connection result. */
  startCursor: Scalars['ID'],
  /** The cursor representing the id of the last item in the connection result. */
  endCursor: Scalars['ID'],
};


/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfoHasNextPagesArgs = {
  amount: Scalars['Int']
};


/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfoHasPreviousPagesArgs = {
  amount: Scalars['Int']
};

/** A description of a pagination destination to fetch additional paginated results. */
export type PaginationEntry = {
   __typename?: 'PaginationEntry',
  /** The id of the entry to use for the pagination request. */
  cursor: Scalars['ID'],
};

/** Pricing for a product model variant. */
export type Pricing = {
   __typename?: 'Pricing',
  /** Internal cost pricing for distributors. */
  cost?: Maybe<Scalars['String']>,
  /** Public pricing for end users. */
  retail?: Maybe<Scalars['String']>,
};

/** Pricing for a product model variant. */
export type PricingInput = {
  /** Internal cost pricing for distributors. */
  cost?: Maybe<Scalars['String']>,
  /** Public pricing for end users. */
  retail?: Maybe<Scalars['String']>,
};

/** A registered user object from API. Could be a customer, admin, or partner account. */
export type Product = {
   __typename?: 'Product',
  /** The unique identifier for this product */
  id: Scalars['ID'],
  /** The name of this product. */
  name: Scalars['String'],
  /** A brief description of this product. */
  description: Scalars['String'],
  /** All available variations or configurations of this product. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumber>>>,
};

/** Describes a product to be created or updated. */
export type ProductInput = {
  /** The unique identifier for this product */
  id?: Maybe<Scalars['ID']>,
  /** The name of this product. */
  name: Scalars['String'],
  /** A brief description of this product. */
  description: Scalars['String'],
};

/** The result of a mutation applied to a Product. */
export type ProductMutationOutput = {
   __typename?: 'ProductMutationOutput',
  /** The resulting model if the operation was successful. */
  product?: Maybe<Product>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** The result of a query for a product or products. */
export type ProductQueryOutput = {
   __typename?: 'ProductQueryOutput',
  /** The resulting product if the operation was successful. */
  product?: Maybe<Product>,
  /** The resulting products if the operation was successful and multiple results were returned. */
  products?: Maybe<Array<Maybe<Product>>>,
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>,
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** A troubleshooting registration for a product. */
export type ProductRegistration = {
   __typename?: 'ProductRegistration',
  /** The unique identifier for this registration */
  id: Scalars['ID'],
  /** The date the product was registered. */
  registeredOn: Scalars['String'],
  /** The customer profile associated to the registration. */
  customer: Customer,
  /** The id of the customer the product has been registered. */
  customerId: Scalars['String'],
  /** The id of the product that has been registered. */
  productId: Scalars['String'],
  /** The the model number of the product that has been registered. */
  modelNumber: Scalars['String'],
  /** The serial number associated to the product if applicable. */
  serial?: Maybe<Scalars['String']>,
  /** Indicates whether or not the registration belongs to a lotted model number. */
  lotted?: Maybe<Scalars['Boolean']>,
};

/** The result of a mutation applied to a registration. */
export type ProductRegistrationMutationOutput = {
   __typename?: 'ProductRegistrationMutationOutput',
  /** The resulting registration if the operation was successful. */
  productRegistration?: Maybe<ProductRegistration>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** The result of a query for a registration or registrations. */
export type ProductRegistrationQueryOutput = {
   __typename?: 'ProductRegistrationQueryOutput',
  /** The resulting registration if the operation was successful. */
  productRegistration?: Maybe<ProductRegistration>,
  /** The resulting registrations if the operation was successful and multiple results were returned. */
  productRegistrations?: Maybe<Array<Maybe<ProductRegistration>>>,
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>,
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** A troubleshooting symptom for a product. */
export type ProductSymptom = {
   __typename?: 'ProductSymptom',
  /** The unique identifier for this symptom */
  id: Scalars['ID'],
  /** The actual name of the symptom. */
  name: Scalars['String'],
  /** A hint or maintenance tip to prevent the symptom. */
  careTip?: Maybe<Scalars['String']>,
  /** A description of the symptom and/or it's cause in detail. */
  synopsis?: Maybe<Scalars['String']>,
  /** A solution to resolve the symptom. */
  solution?: Maybe<Scalars['String']>,
  /** Indicates if there is an associated fee for servicing this issue. */
  fee: Scalars['Boolean'],
  /** Indicates whether or not this is a pre-approved repair regardless of warranty. */
  preApproved: Scalars['Boolean'],
  /** An official code used to identify this symptom. */
  faultCode?: Maybe<Scalars['String']>,
  /** A list of all associated model numbers related to this symptom. */
  associatedModelNumbers: Array<Maybe<Scalars['String']>>,
  /** The resulting symptoms if the operation was successful and multiple results were returned. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumberSymptomDetail>>>,
  /** An array of attached images hosted via AWS S3. */
  attachedImages?: Maybe<Array<Maybe<AttachedImage>>>,
};

/** The result of a mutation applied to a symptom. */
export type ProductSymptomMutationOutput = {
   __typename?: 'ProductSymptomMutationOutput',
  /** The resulting symptom if the operation was successful. */
  productSymptom?: Maybe<ProductSymptom>,
  /** The resulting details for the associated model number if am association operation was successful. */
  modelNumber?: Maybe<ModelNumberSymptomDetail>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** The result of a query for a symptom or symptoms. */
export type ProductSymptomQueryOutput = {
   __typename?: 'ProductSymptomQueryOutput',
  /** The resulting symptom if the operation was successful. */
  productSymptom?: Maybe<ProductSymptom>,
  /** The resulting symptoms if the operation was successful and multiple results were returned. */
  productSymptoms?: Maybe<Array<Maybe<ProductSymptom>>>,
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>,
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};


/** The result of a query for a symptom or symptoms. */
export type ProductSymptomQueryOutputProductSymptomsArgs = {
  modelNumber?: Maybe<Scalars['String']>
};

/** Denotes the high level category for this product. */
export enum ProductType {
  /** A dedicated family of headlight. */
  Headlight = 'HEADLIGHT',
  /** An accessory to a headlight. */
  Accessory = 'ACCESSORY'
}

/** The root query for the schema. */
export type Query = {
   __typename?: 'Query',
  version: Scalars['String'],
  /** All customers in the system */
  customers: CustomerQueryOutput,
  /** A specific customer in the system via ID. */
  customer: CustomerQueryOutput,
  /** All distributors in the system */
  distributors: DistributorQueryOutput,
  /** A specific distributor in the system via ID. */
  distributor: DistributorQueryOutput,
  /** All products in the system. */
  products?: Maybe<ProductQueryOutput>,
  /** All product variants in the system. */
  modelNumbers?: Maybe<ModelNumberQueryOutput>,
  /** A specific product in the system via ID. */
  product?: Maybe<ProductQueryOutput>,
  /** A specific model number in the system via ID. */
  modelNumber?: Maybe<ModelNumberQueryOutput>,
  /** All registrations in the system */
  productRegistrations: ProductRegistrationQueryOutput,
  /** A specific registration in the system via ID. */
  productRegistration: ProductRegistrationQueryOutput,
  /** All symptoms in the system */
  productSymptoms: ProductSymptomQueryOutput,
  /** A specific symptom in the system via ID. */
  productSymptom: ProductSymptomQueryOutput,
  /** All users in the system */
  users?: Maybe<Array<Maybe<User>>>,
  /** A specific user in the system via ID. */
  user?: Maybe<User>,
  /** A specific user in the system via email address. */
  userWithEmail?: Maybe<User>,
  info?: Maybe<Scalars['String']>,
  /** All RGAs in the system */
  rgas: RgaQueryOutput,
  /** Query the total for any filtered output. */
  rgaCount: RgaStatusCountOutput,
  /** A specific RGA in the system via ID. */
  rga: RgaQueryOutput,
};


/** The root query for the schema. */
export type QueryCustomersArgs = {
  search?: Maybe<Scalars['String']>
};


/** The root query for the schema. */
export type QueryCustomerArgs = {
  id: Scalars['String']
};


/** The root query for the schema. */
export type QueryDistributorArgs = {
  id: Scalars['String']
};


/** The root query for the schema. */
export type QueryProductsArgs = {
  search?: Maybe<Scalars['String']>
};


/** The root query for the schema. */
export type QueryModelNumbersArgs = {
  search?: Maybe<Scalars['String']>,
  productId?: Maybe<Scalars['String']>,
  productType?: Maybe<ProductType>,
  symptom?: Maybe<Scalars['String']>,
  public?: Maybe<Scalars['Boolean']>
};


/** The root query for the schema. */
export type QueryProductArgs = {
  id: Scalars['String']
};


/** The root query for the schema. */
export type QueryModelNumberArgs = {
  id: Scalars['String']
};


/** The root query for the schema. */
export type QueryProductRegistrationArgs = {
  id: Scalars['String']
};


/** The root query for the schema. */
export type QueryProductSymptomsArgs = {
  search?: Maybe<Scalars['String']>,
  modelNumber?: Maybe<Scalars['String']>
};


/** The root query for the schema. */
export type QueryProductSymptomArgs = {
  id: Scalars['String']
};


/** The root query for the schema. */
export type QueryUserArgs = {
  id: Scalars['String']
};


/** The root query for the schema. */
export type QueryUserWithEmailArgs = {
  email: Scalars['String']
};


/** The root query for the schema. */
export type QueryRgasArgs = {
  status?: Maybe<RgaStatus>
};


/** The root query for the schema. */
export type QueryRgaArgs = {
  id: Scalars['String']
};

/** A Request Goods Authorization. */
export type Rga = {
   __typename?: 'RGA',
  /** The unique identifier for this RGA. */
  id: Scalars['ID'],
  /** The current state of the request. */
  status: RgaStatus,
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String'],
  /** The email address of the user whom submitted the RGA. */
  submittedBy: Scalars['String'],
  /** The distributor associated to the the RGA. */
  distributor: Distributor,
  /** The goods associated to the the RGA. */
  goods: Array<Maybe<RgaGood>>,
  /** A log of all updates to this RGAs status. */
  statusLog?: Maybe<Array<Maybe<RgaStatusUpdate>>>,
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>,
};

/** A good associated to a particular RGA. */
export type RgaGood = {
   __typename?: 'RGAGood',
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID'],
  /** The RGA this good is assigned to. */
  rgaId: Scalars['String'],
  /** The unique service id for this good. */
  serviceId?: Maybe<Scalars['String']>,
  /** The model number for representing the specific product configuration for this good. */
  modelNumber?: Maybe<Scalars['String']>,
  /** Indicates whether or not the model was considered to be lotted. */
  lotted?: Maybe<Scalars['Boolean']>,
  /** The current status of the good. */
  status?: Maybe<RgaGoodStatus>,
  /** Indicates whether or not this product is currently under warranty. */
  warrantied?: Maybe<Scalars['Boolean']>,
  /** Indicates whether or not an SSD is applicable to this good. */
  ssd?: Maybe<Scalars['Boolean']>,
  /** Indicates the details of the associated products warranty. */
  warrantyDescription?: Maybe<Scalars['String']>,
  /** Indicates the number of months the associated product was warrantied for. */
  warrantyTerm?: Maybe<Scalars['Int']>,
  /** The symptom / reason this product is being returned. */
  symptomId?: Maybe<Scalars['String']>,
  /** The current description of the symptom. */
  symptomDescription?: Maybe<Scalars['String']>,
  /** Indicates whether or not the resolution for the symptom was a pre-approved repair. */
  preApproved?: Maybe<Scalars['Boolean']>,
  /** The fault code associated to the prescribed symptom. */
  faultCode?: Maybe<Scalars['String']>,
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>,
  /** A new serial number if the unit was replaced. */
  newSerial?: Maybe<Scalars['String']>,
  /** Indicates the product type for this good. */
  productType?: Maybe<ProductType>,
  /** Indicates the name of product family this good. */
  productName?: Maybe<Scalars['String']>,
  /** Indicates the product family this good. */
  productId?: Maybe<Scalars['String']>,
  /** The proposed resolution the issue affecting this good. */
  resolution?: Maybe<Scalars['String']>,
  /** The synopsis of the associated symptom. */
  symptomSynopsis?: Maybe<Scalars['String']>,
  /** The solution for associated symptom. */
  symptomSolution?: Maybe<Scalars['String']>,
  /** The fee involved for resolving this issue. */
  resolutionFee?: Maybe<FeeStructure>,
  /** The associated RMA from our distributor / partner's records. */
  rma?: Maybe<Scalars['String']>,
  /** The associated PO from our distributor / partner's records. */
  po?: Maybe<Scalars['String']>,
  /** A URL to download a generated PDF of the associated customerletter. */
  customerLetterUrl?: Maybe<Scalars['String']>,
  /** A URL to download a generated PDF of the associated service form. */
  serviceFormUrl?: Maybe<Scalars['String']>,
  /** Any additional notes about this good specifically.. */
  notes?: Maybe<Scalars['String']>,
  /** The id of the customer if the product has been registered to a user. */
  customerId?: Maybe<Scalars['String']>,
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: Maybe<Scalars['String']>,
  /** The email of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>,
  /** The phone number of the customer this good belongs to. */
  customerPhone?: Maybe<Scalars['String']>,
  /** The street address for the customer this good belongs to. */
  customerStreet?: Maybe<Scalars['String']>,
  /** The street address (line 2) for the customer this good belongs to. */
  customerStreet2?: Maybe<Scalars['String']>,
  /** The city of the address for the customer this good belongs to. */
  customerCity?: Maybe<Scalars['String']>,
  /** The state of the address for the customer this good belongs to. */
  customerState?: Maybe<Scalars['String']>,
  /** The zip of the address for the customer this good belongs to. */
  customerZip?: Maybe<Scalars['String']>,
  /** The country of the address for the customer this good belongs to. */
  customerCountry?: Maybe<Scalars['String']>,
  /** The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerSpecialty?: Maybe<Scalars['String']>,
  /** The preferred shipping speed assigned to return this good to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>,
  /** The tracking number associated to the return shipment. */
  tracking?: Maybe<Scalars['String']>,
  /** The carrier used to transport the return shipment. */
  carrier?: Maybe<RgaShippingCarrier>,
  /** The original date of purchase if known. */
  datePurchased?: Maybe<Scalars['String']>,
  /** The disposition of the good after evaluation. */
  disposition?: Maybe<Scalars['String']>,
  /** Any additional comments for the service letter. */
  additionalComments?: Maybe<Scalars['String']>,
};

/** The input to make changes to an existing RGA Good. */
export type RgaGoodInput = {
  /** The model number for representing the specific product configuration for this good. */
  modelNumber?: Maybe<Scalars['String']>,
  /** Indicates whether or not the model was considered to be lotted. */
  lotted?: Maybe<Scalars['Boolean']>,
  /** The current status of the good. */
  status?: Maybe<RgaGoodStatus>,
  /** Indicates whether or not this product is currently under warranty. */
  warrantied?: Maybe<Scalars['Boolean']>,
  /** Indicates the details of the associated products warranty. */
  warrantyDescription?: Maybe<Scalars['String']>,
  /** Indicates the number of months the associated product was warrantied for. */
  warrantyTerm?: Maybe<Scalars['Int']>,
  /** The symptom / reason this product is being returned. */
  symptomId?: Maybe<Scalars['String']>,
  /** The current description of the symptom. */
  symptomDescription?: Maybe<Scalars['String']>,
  /** Indicates whether or not the resolution for the symptom was a pre-approved repair. */
  preApproved?: Maybe<Scalars['Boolean']>,
  /** The fault code associated to the prescribed symptom. */
  faultCode?: Maybe<Scalars['String']>,
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>,
  /** A new serial number if the unit was replaced. */
  newSerial?: Maybe<Scalars['String']>,
  /** Indicates the product type for this good. */
  productType?: Maybe<ProductType>,
  /** Indicates the name of product family this good. */
  productName?: Maybe<Scalars['String']>,
  /** Indicates the product family this good. */
  productId?: Maybe<Scalars['String']>,
  /** The proposed resolution the issue affecting this good. */
  resolution?: Maybe<Scalars['String']>,
  /** The fee involved for resolving this issue. */
  resolutionFee?: Maybe<FeeStructureInput>,
  /** The synopsis of the associated symptom. */
  symptomSynopsis?: Maybe<Scalars['String']>,
  /** The solution for associated symptom. */
  symptomSolution?: Maybe<Scalars['String']>,
  /** The associated RMA from our distributor / partner's records. */
  rma?: Maybe<Scalars['String']>,
  /** The associated PO from our distributor / partner's records. */
  po?: Maybe<Scalars['String']>,
  /** Any additional notes about this good specifically.. */
  notes?: Maybe<Scalars['String']>,
  /** The id of the customer if the product has been registered to a user. */
  customerId?: Maybe<Scalars['String']>,
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: Maybe<Scalars['String']>,
  /** The email of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>,
  /** The phone number of the customer this good belongs to. */
  customerPhone?: Maybe<Scalars['String']>,
  /** The street address for the customer this good belongs to. */
  customerStreet?: Maybe<Scalars['String']>,
  /** The street address (line 2) for the customer this good belongs to. */
  customerStreet2?: Maybe<Scalars['String']>,
  /** The city of the address for the customer this good belongs to. */
  customerCity?: Maybe<Scalars['String']>,
  /** The state of the address for the customer this good belongs to. */
  customerState?: Maybe<Scalars['String']>,
  /** The zip of the address for the customer this good belongs to. */
  customerZip?: Maybe<Scalars['String']>,
  /** The country of the address for the customer this good belongs to. */
  customerCountry?: Maybe<Scalars['String']>,
  /** The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerSpecialty?: Maybe<Scalars['String']>,
  /** The preferred shipping speed assigned to return this good to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>,
  /** The original date of purchase if known. */
  datePurchased?: Maybe<Scalars['String']>,
  /** The disposition of the good after evaluation. */
  disposition?: Maybe<Scalars['String']>,
  /** Indicates whether or not an SSD is applicable to this good. */
  ssd?: Maybe<Scalars['Boolean']>,
  /** Any additional comments for the service letter. */
  additionalComments?: Maybe<Scalars['String']>,
};

/** The result of a mutation applied to a RGA. */
export type RgaGoodMutationOutput = {
   __typename?: 'RGAGoodMutationOutput',
  /** The id the resulting RGA Good belongs to if the operation was successful. */
  rgaId?: Maybe<Scalars['String']>,
  /** The resulting RGA Good if the operation was successful. */
  rgaGood?: Maybe<RgaGood>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** The input to apply a shipping update make changes to an existing RGA Good. */
export type RgaGoodShippingInput = {
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID'],
  /** A list of email addresses to notify the shipping alert / tracking message. */
  recipients?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** The shipping status for the good. */
  status: RgaShippingStatus,
  /** The message to email to all specified recipients */
  message?: Maybe<Scalars['String']>,
  /** The tracking number associated to the return shipment. */
  tracking?: Maybe<Scalars['String']>,
  /** The carrier used to transport the return shipment. */
  carrier?: Maybe<RgaShippingCarrier>,
};

/** The current status of a given good belonging to an RGA. */
export enum RgaGoodStatus {
  /** The good is considered valid and part of the request. */
  Valid = 'VALID',
  /** The good was removed from the request at some point. */
  Archived = 'ARCHIVED',
  /** Indicates a good has been delayed from shipping. */
  Delayed = 'DELAYED'
}

/** The result of a mutation applied to a RGA. */
export type RgaMutationOutput = {
   __typename?: 'RGAMutationOutput',
  /** The resulting RGA if the operation was successful. */
  rga?: Maybe<Rga>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** The result of a query for a RGA or RGAs. */
export type RgaQueryOutput = {
   __typename?: 'RGAQueryOutput',
  /** The resulting RGA if the operation was successful. */
  rga?: Maybe<Rga>,
  /** The resulting RGAs if the operation was successful and multiple results were returned. */
  rgas?: Maybe<Array<Maybe<Rga>>>,
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>,
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** Indicates the shipping carrier used to transport a good associated to an RGA. */
export enum RgaShippingCarrier {
  /** FedEx as a shipping carrier. */
  Fedex = 'FEDEX',
  /** UPS as a shipping carrier. */
  Ups = 'UPS',
  /** DHL as a shipping carrier. */
  Dhl = 'DHL',
  /** Another shipping carrier not fully supported by the system. */
  Other = 'OTHER'
}

/** Indicates the shipping status for a given good that belongs to an RGA. */
export enum RgaShippingStatus {
  /** Indicates that a given item could not be shipped for various reasons. */
  Delayed = 'DELAYED',
  /** Indicates an RGA good has shipped. */
  Shipped = 'SHIPPED'
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
  Delayed = 'DELAYED'
}

/** A list of totals for any given rga status. */
export type RgaStatusCountOutput = {
   __typename?: 'RGAStatusCountOutput',
  /** Count of all issued RGAs that may not have been shipped. */
  issued?: Maybe<Scalars['Int']>,
  /** Count of all RGAs that have delayed items. */
  delayed?: Maybe<Scalars['Int']>,
  /** Count of all RGAs awaiting arrival. */
  awaitingArrival?: Maybe<Scalars['Int']>,
  /** Count of all received RGAs that have not yet been assessed. */
  received?: Maybe<Scalars['Int']>,
  /** Count of all RGAs currently being assessed. */
  assessing?: Maybe<Scalars['Int']>,
  /** Count of all RGAs currently being repaired. */
  repairing?: Maybe<Scalars['Int']>,
  /** Count of all RGAs being shipped back to customers. */
  shipping?: Maybe<Scalars['Int']>,
  /** Count of all closed RGAs. */
  closed?: Maybe<Scalars['Int']>,
  /** Count of all canceled RGAs. */
  canceled?: Maybe<Scalars['Int']>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
};

/** A description of a status update for a given RGA. */
export type RgaStatusUpdate = {
   __typename?: 'RGAStatusUpdate',
  /** The new status the request was assigned. */
  status?: Maybe<RgaStatus>,
  /** Any notes describing what happened to the request during this update. */
  notes?: Maybe<Scalars['String']>,
  /** Details about who made this update. */
  updatedBy?: Maybe<UpdateProfile>,
  /** An ISO string representing when this update occurred. */
  updatedOn?: Maybe<Scalars['String']>,
};

export type UpdateProfile = {
   __typename?: 'UpdateProfile',
  /** The id of the user who made the update. */
  id?: Maybe<Scalars['String']>,
  /** The name of the user who made the update. */
  name?: Maybe<Scalars['String']>,
  /** The email address of the user who made the update. */
  email?: Maybe<Scalars['String']>,
};

/** A set of file keys to generate S3 endpoint URLS for. */
export type UploadInput = {
  keys: Array<Maybe<Scalars['String']>>,
};

/** The result of a mutation applied to a customer. */
export type UploadMutationOutput = {
   __typename?: 'UploadMutationOutput',
  /** The resulting customer if the operation was successful. */
  uploads?: Maybe<Array<Maybe<UploadUrl>>>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** Indicates whether or not an image is currently transferring, available, or even deleted. */
export enum UploadStatus {
  Pending = 'PENDING',
  Available = 'AVAILABLE',
  Deleted = 'DELETED'
}

export type UploadUrl = {
   __typename?: 'UploadURL',
  /** The unique file key to use on AWS S3. */
  id: Scalars['ID'],
  /** The endpoint to utilize for uploading the associated file key/id to AWS S3. */
  url: Scalars['String'],
};

/** A registered user object from API. Could be a customer, admin, or partner account. */
export type User = {
   __typename?: 'User',
  /** The unique identifier for this user */
  id: Scalars['ID'],
  /** The email address for this user. */
  email: Scalars['String'],
  /** The actual first name of the user. */
  firstName?: Maybe<Scalars['String']>,
  /** The actual last name of the user. */
  lastName?: Maybe<Scalars['String']>,
};

/** The result of a mutation applied to a user. */
export type UserMutationOutput = {
   __typename?: 'UserMutationOutput',
  /** The resulting user if the operation was successful. */
  user?: Maybe<User>,
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>,
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'],
};

/** A validation error that provides details for an unsuccesful mutation or query. */
export type ValidationError = {
   __typename?: 'ValidationError',
  /** A path indicating the attribute that failed validation. */
  path: Scalars['String'],
  /** A brief description of why the specified attribute failed validation. */
  message: Scalars['String'],
};
export type CreateUploadsMutationVariables = {
  uploadInput: UploadInput
};


export type CreateUploadsMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UploadMutationOutput' }
    & Pick<UploadMutationOutput, 'success'>
    & { uploads: Maybe<Array<Maybe<(
      { __typename?: 'UploadURL' }
      & Pick<UploadUrl, 'id' | 'url'>
    )>>> }
  ) }
);

export type CreateCustomerMutationVariables = {
  customerInput: NewCustomerInput
};


export type CreateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'CustomerMutationOutput' }
    & { customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CustomerQueryVariables = {
  customerId: Scalars['String']
};


export type CustomerQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'CustomerQueryOutput' }
    & Pick<CustomerQueryOutput, 'success'>
    & { customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CustomersQueryVariables = {
  search?: Maybe<Scalars['String']>
};


export type CustomersQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'CustomerQueryOutput' }
    & Pick<CustomerQueryOutput, 'success'>
    & { customers: Maybe<Array<Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyCustomerMutationVariables = {
  id: Scalars['String']
};


export type DestroyCustomerMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'CustomerMutationOutput' }
    & { customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateCustomerMutationVariables = {
  customerInput: ExistingCustomerInput
};


export type UpdateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'CustomerMutationOutput' }
    & { customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateDistributorMutationVariables = {
  distributorInput: NewDistributorInput
};


export type CreateDistributorMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'DistributorMutationOutput' }
    & Pick<DistributorMutationOutput, 'success'>
    & { distributor: Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyDistributorMutationVariables = {
  id: Scalars['String']
};


export type DestroyDistributorMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'DistributorMutationOutput' }
    & { distributor: Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DistributorQueryVariables = {
  distributorId: Scalars['String']
};


export type DistributorQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'DistributorQueryOutput' }
    & Pick<DistributorQueryOutput, 'success'>
    & { distributor: Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DistributorsQueryVariables = {};


export type DistributorsQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'DistributorQueryOutput' }
    & Pick<DistributorQueryOutput, 'success'>
    & { distributors: Maybe<Array<Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateDistributorMutationVariables = {
  distributorInput: ExistingDistributorInput
};


export type UpdateDistributorMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'DistributorMutationOutput' }
    & { distributor: Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ResetPasswordMutationVariables = {
  password: Scalars['String']
};


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UserMutationOutput' }
    & Pick<UserMutationOutput, 'success'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type CreateProductRegistrationMutationVariables = {
  productRegistrationInput: NewProductRegistrationInput
};


export type CreateProductRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductRegistrationMutationOutput' }
    & Pick<ProductRegistrationMutationOutput, 'success'>
    & { productRegistration: Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id' | 'modelNumber' | 'productId' | 'customerId' | 'serial'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'email' | 'name'>
      ) }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type DestroyProductRegistrationMutationVariables = {
  id: Scalars['String']
};


export type DestroyProductRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductRegistrationMutationOutput' }
    & { productRegistration: Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ProductRegistrationQueryVariables = {
  productRegistrationId: Scalars['String']
};


export type ProductRegistrationQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'ProductRegistrationQueryOutput' }
    & Pick<ProductRegistrationQueryOutput, 'success'>
    & { productRegistration: Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id' | 'productId' | 'customerId' | 'lotted' | 'serial' | 'modelNumber' | 'registeredOn'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'name' | 'email'>
      ) }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ProductRegistrationsQueryVariables = {};


export type ProductRegistrationsQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'ProductRegistrationQueryOutput' }
    & Pick<ProductRegistrationQueryOutput, 'success'>
    & { productRegistrations: Maybe<Array<Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id' | 'productId' | 'customerId' | 'serial' | 'modelNumber'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'name' | 'email'>
      ) }
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateProductRegistrationMutationVariables = {
  productRegistrationInput: ExistingProductRegistrationInput
};


export type UpdateProductRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductRegistrationMutationOutput' }
    & Pick<ProductRegistrationMutationOutput, 'success'>
    & { productRegistration: Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id' | 'modelNumber' | 'productId' | 'customerId' | 'serial'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'email' | 'name'>
      ) }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type ModelNumbersViewableQueryVariables = {};


export type ModelNumbersViewableQuery = (
  { __typename?: 'Query' }
  & { response: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'pageSize' | 'success'>
    & { modelNumbers: Maybe<Array<Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'publiclyViewable'>
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type UpdateModelNumberViewableMutationVariables = {
  id: Scalars['ID'],
  publiclyViewable: Scalars['Boolean']
};


export type UpdateModelNumberViewableMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & { modelNumber: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'publiclyViewable'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateModelNumberMutationVariables = {
  modelNumberInput: ModelNumberInput
};


export type CreateModelNumberMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & Pick<ModelNumberMutationOutput, 'success'>
    & { modelNumber: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'description' | 'productIds' | 'productType' | 'lotted' | 'warrantyTerm' | 'warrantyDescription' | 'resolutionWithWarranty' | 'resolutionWithoutWarranty' | 'publicNotes' | 'privateNotes'>
      & { products: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      )>>>, feeWithWarranty: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, feeWithoutWarranty: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, pricing: Maybe<(
        { __typename?: 'Pricing' }
        & Pick<Pricing, 'cost' | 'retail'>
      )> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateProductMutationVariables = {
  productInput: ProductInput
};


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductMutationOutput' }
    & Pick<ProductMutationOutput, 'success'>
    & { product: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyModelNumberMutationVariables = {
  id: Scalars['ID']
};


export type DestroyModelNumberMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & { modelNumber: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyProductMutationVariables = {
  id: Scalars['ID']
};


export type DestroyProductMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductMutationOutput' }
    & { product: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ModelNumberQueryVariables = {
  modelNumberId: Scalars['String']
};


export type ModelNumberQuery = (
  { __typename?: 'Query' }
  & { response: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'success'>
    & { modelNumber: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'description' | 'productIds' | 'productType' | 'lotted' | 'warrantyTerm' | 'warrantyDescription' | 'resolutionWithWarranty' | 'resolutionWithoutWarranty' | 'publicNotes' | 'privateNotes'>
      & { products: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      )>>>, symptoms: Maybe<Array<Maybe<(
        { __typename?: 'ProductSymptom' }
        & Pick<ProductSymptom, 'id' | 'name' | 'faultCode'>
      )>>>, feeWithWarranty: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, feeWithoutWarranty: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, pricing: Maybe<(
        { __typename?: 'Pricing' }
        & Pick<Pricing, 'cost' | 'retail'>
      )> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ModelNumbersQueryVariables = {
  search?: Maybe<Scalars['String']>,
  productId?: Maybe<Scalars['String']>,
  productType?: Maybe<ProductType>
};


export type ModelNumbersQuery = (
  { __typename?: 'Query' }
  & { response: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'pageSize' | 'success'>
    & { modelNumbers: Maybe<Array<Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'lotted' | 'warrantyTerm' | 'warrantyDescription' | 'productType' | 'description'>
      & { feeWithWarranty: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, products: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      )>>>, feeWithoutWarranty: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )> }
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ProductQueryVariables = {
  productId: Scalars['String']
};


export type ProductQuery = (
  { __typename?: 'Query' }
  & { response: Maybe<(
    { __typename?: 'ProductQueryOutput' }
    & Pick<ProductQueryOutput, 'success'>
    & { product: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
      & { modelNumbers: Maybe<Array<Maybe<(
        { __typename?: 'ModelNumber' }
        & Pick<ModelNumber, 'id' | 'description' | 'lotted' | 'warrantyTerm'>
      )>>> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ProductsQueryVariables = {
  search?: Maybe<Scalars['String']>
};


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { response: Maybe<(
    { __typename?: 'ProductQueryOutput' }
    & Pick<ProductQueryOutput, 'pageSize' | 'success'>
    & { products: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  )> }
);

export type UpdateModelNumberMutationVariables = {
  modelNumberInput: ModelNumberInput
};


export type UpdateModelNumberMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & { modelNumber: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'description' | 'productIds' | 'productType' | 'lotted' | 'warrantyTerm' | 'warrantyDescription' | 'resolutionWithWarranty' | 'resolutionWithoutWarranty' | 'publicNotes' | 'privateNotes'>
      & { products: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      )>>>, pricing: Maybe<(
        { __typename?: 'Pricing' }
        & Pick<Pricing, 'cost' | 'retail'>
      )>, feeWithWarranty: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, feeWithoutWarranty: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateProductMutationVariables = {
  productInput: ProductInput
};


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductMutationOutput' }
    & { product: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyProductSymptomMutationVariables = {
  id: Scalars['String']
};


export type DestroyProductSymptomMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & { productSymptom: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'faultCode' | 'fee'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ModelNumbersLottedQueryVariables = {};


export type ModelNumbersLottedQuery = (
  { __typename?: 'Query' }
  & { response: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'pageSize' | 'success'>
    & { modelNumbers: Maybe<Array<Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'lotted'>
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ModelNumbersSimpleQueryVariables = {};


export type ModelNumbersSimpleQuery = (
  { __typename?: 'Query' }
  & { response: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'pageSize' | 'success'>
    & { modelNumbers: Maybe<Array<Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id'>
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ProductSymptomQueryVariables = {
  productSymptomId: Scalars['String']
};


export type ProductSymptomQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'ProductSymptomQueryOutput' }
    & Pick<ProductSymptomQueryOutput, 'success'>
    & { productSymptom: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'faultCode' | 'fee' | 'preApproved' | 'synopsis' | 'solution' | 'careTip' | 'associatedModelNumbers'>
      & { attachedImages: Maybe<Array<Maybe<(
        { __typename?: 'AttachedImage' }
        & Pick<AttachedImage, 'id' | 'position' | 'status' | 'url'>
      )>>> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateModelNumberLottedMutationVariables = {
  id: Scalars['ID'],
  lotted: Scalars['Boolean']
};


export type UpdateModelNumberLottedMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & { modelNumber: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'lotted'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type AttachImagesToSymptomMutationVariables = {
  symptomId: Scalars['String'],
  attachedImages: Array<Maybe<AttachedImageInput>>
};


export type AttachImagesToSymptomMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & Pick<ProductSymptomMutationOutput, 'success'>
    & { productSymptom: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id'>
      & { attachedImages: Maybe<Array<Maybe<(
        { __typename?: 'AttachedImage' }
        & Pick<AttachedImage, 'position' | 'status' | 'id' | 'url'>
      )>>> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CacheUpdateSymptomImagesFragment = (
  { __typename: 'ProductSymptom' }
  & { attachedImages: Maybe<Array<Maybe<(
    { __typename?: 'AttachedImage' }
    & Pick<AttachedImage, 'id'>
  )>>> }
);

export type CreateProductSymptomMutationVariables = {
  productSymptomInput: NewProductSymptomInput
};


export type CreateProductSymptomMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & { productSymptom: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'faultCode' | 'synopsis' | 'solution'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type LinkSymptomToModelNumberMutationVariables = {
  modelNumber: Scalars['String'],
  symptomId: Scalars['String'],
  linked: Scalars['Boolean']
};


export type LinkSymptomToModelNumberMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & Pick<ProductSymptomMutationOutput, 'success'>
    & { productSymptom: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'associatedModelNumbers'>
    )>, modelNumber: Maybe<(
      { __typename?: 'ModelNumberSymptomDetail' }
      & Pick<ModelNumberSymptomDetail, 'id'>
      & { symptoms: Array<Maybe<(
        { __typename?: 'ProductSymptom' }
        & Pick<ProductSymptom, 'id' | 'faultCode' | 'name'>
      )>> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type LinkedSymptomFragment = (
  { __typename: 'ProductSymptom' }
  & Pick<ProductSymptom, 'associatedModelNumbers'>
);

export type ProductSymptomsQueryVariables = {
  search?: Maybe<Scalars['String']>,
  modelNumber?: Maybe<Scalars['String']>
};


export type ProductSymptomsQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'ProductSymptomQueryOutput' }
    & Pick<ProductSymptomQueryOutput, 'pageSize' | 'success'>
    & { productSymptoms: Maybe<Array<Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'faultCode' | 'fee' | 'preApproved' | 'careTip' | 'solution' | 'synopsis' | 'associatedModelNumbers'>
      & { attachedImages: Maybe<Array<Maybe<(
        { __typename?: 'AttachedImage' }
        & Pick<AttachedImage, 'id' | 'position' | 'status' | 'url'>
      )>>> }
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateProductSymptomMutationVariables = {
  productSymptomInput: ExistingProductSymptomInput
};


export type UpdateProductSymptomMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & { productSymptom: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'fee' | 'faultCode' | 'synopsis' | 'solution' | 'careTip'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdatedSymptomImagesFragment = (
  { __typename: 'ProductSymptom' }
  & { attachedImages: Maybe<Array<Maybe<(
    { __typename?: 'AttachedImage' }
    & Pick<AttachedImage, 'id'>
  )>>> }
);

export type CreateRgaGoodMutationVariables = {
  rgaId: Scalars['String'],
  rgaGoodInput: RgaGoodInput
};


export type CreateRgaGoodMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAGoodMutationOutput' }
    & Pick<RgaGoodMutationOutput, 'rgaId' | 'success'>
    & { rgaGood: Maybe<(
      { __typename?: 'RGAGood' }
      & Pick<RgaGood, 'id' | 'rgaId' | 'serviceId' | 'customerId' | 'customerEmail' | 'customerName' | 'customerPhone' | 'customerStreet' | 'customerStreet2' | 'customerZip' | 'customerCity' | 'customerState' | 'customerCountry' | 'customerSpecialty' | 'faultCode' | 'serial' | 'newSerial' | 'lotted' | 'preApproved' | 'productId' | 'productName' | 'productType' | 'symptomId' | 'symptomDescription' | 'symptomSolution' | 'symptomSynopsis' | 'modelNumber' | 'po' | 'rma' | 'warrantied' | 'warrantyTerm' | 'warrantyDescription' | 'notes' | 'serviceFormUrl' | 'customerLetterUrl' | 'additionalComments' | 'datePurchased' | 'disposition'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateRgaMutationVariables = {
  rgaInput: NewRgaInput
};


export type CreateRgaMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAMutationOutput' }
    & Pick<RgaMutationOutput, 'success'>
    & { rga: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'shippingSpeed' | 'status' | 'submittedBy' | 'submittedOn'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyRgaGoodMutationVariables = {
  id: Scalars['ID'],
  rgaId: Scalars['String']
};


export type DestroyRgaGoodMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAGoodMutationOutput' }
    & Pick<RgaGoodMutationOutput, 'rgaId' | 'success'>
    & { rgaGood: Maybe<(
      { __typename?: 'RGAGood' }
      & Pick<RgaGood, 'modelNumber' | 'serial' | 'id' | 'warrantied' | 'faultCode' | 'status' | 'symptomId' | 'symptomDescription' | 'customerId' | 'customerEmail' | 'customerName' | 'customerPhone' | 'customerStreet' | 'customerStreet2' | 'customerZip' | 'customerCity' | 'customerState' | 'customerCountry' | 'customerSpecialty' | 'notes' | 'rma' | 'po' | 'additionalComments' | 'datePurchased' | 'disposition'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type RgaCountsQueryVariables = {};


export type RgaCountsQuery = (
  { __typename?: 'Query' }
  & { rgaCount: (
    { __typename?: 'RGAStatusCountOutput' }
    & Pick<RgaStatusCountOutput, 'issued' | 'delayed' | 'awaitingArrival' | 'received' | 'assessing' | 'repairing' | 'shipping' | 'closed' | 'canceled' | 'success'>
    & { errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type RgaQueryVariables = {
  rgaId: Scalars['String']
};


export type RgaQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'RGAQueryOutput' }
    & Pick<RgaQueryOutput, 'success'>
    & { rga: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'shippingSpeed' | 'submittedOn' | 'submittedBy' | 'status'>
      & { statusLog: Maybe<Array<Maybe<(
        { __typename?: 'RGAStatusUpdate' }
        & Pick<RgaStatusUpdate, 'status' | 'updatedOn' | 'notes'>
        & { updatedBy: Maybe<(
          { __typename?: 'UpdateProfile' }
          & Pick<UpdateProfile, 'id' | 'name' | 'email'>
        )> }
      )>>>, goods: Array<Maybe<(
        { __typename?: 'RGAGood' }
        & Pick<RgaGood, 'id' | 'serviceId' | 'customerEmail' | 'customerId' | 'customerName' | 'customerLetterUrl' | 'customerSpecialty' | 'faultCode' | 'serial' | 'newSerial' | 'lotted' | 'preApproved' | 'productId' | 'productName' | 'productType' | 'symptomId' | 'symptomDescription' | 'symptomSolution' | 'symptomSynopsis' | 'modelNumber' | 'po' | 'rma' | 'rgaId' | 'warrantied' | 'warrantyTerm' | 'warrantyDescription' | 'notes' | 'serviceFormUrl' | 'shippingSpeed' | 'ssd' | 'additionalComments' | 'datePurchased' | 'disposition'>
        & { resolutionFee: Maybe<(
          { __typename?: 'FeeStructure' }
          & Pick<FeeStructure, 'distributor' | 'endUser'>
        )> }
      )>> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type RgasQueryVariables = {
  status?: Maybe<RgaStatus>
};


export type RgasQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'RGAQueryOutput' }
    & Pick<RgaQueryOutput, 'success'>
    & { rgas: Maybe<Array<Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'submittedOn' | 'submittedBy' | 'status'>
      & { goods: Array<Maybe<(
        { __typename?: 'RGAGood' }
        & Pick<RgaGood, 'id'>
      )>> }
    )>>>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateRgaGoodMutationVariables = {
  id: Scalars['ID'],
  rgaId: Scalars['String'],
  rgaGoodInput: RgaGoodInput
};


export type UpdateRgaGoodMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAGoodMutationOutput' }
    & Pick<RgaGoodMutationOutput, 'success' | 'rgaId'>
    & { errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>>, rgaGood: Maybe<(
      { __typename?: 'RGAGood' }
      & Pick<RgaGood, 'id' | 'serviceId' | 'customerId' | 'customerEmail' | 'customerName' | 'customerPhone' | 'customerStreet' | 'customerStreet2' | 'customerZip' | 'customerCity' | 'customerState' | 'customerCountry' | 'customerSpecialty' | 'faultCode' | 'serial' | 'newSerial' | 'lotted' | 'preApproved' | 'productId' | 'productName' | 'productType' | 'symptomId' | 'symptomDescription' | 'symptomSolution' | 'symptomSynopsis' | 'modelNumber' | 'po' | 'rma' | 'warrantied' | 'warrantyTerm' | 'warrantyDescription' | 'notes' | 'serviceFormUrl' | 'customerLetterUrl' | 'ssd' | 'additionalComments' | 'datePurchased' | 'disposition'>
      & { resolutionFee: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )> }
    )> }
  ) }
);

export type UpdateRgaMutationVariables = {
  rgaInput: ExistingRgaInput
};


export type UpdateRgaMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAMutationOutput' }
    & Pick<RgaMutationOutput, 'success'>
    & { rga: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'shippingSpeed' | 'status' | 'submittedBy' | 'submittedOn'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateRgaShippingStatusMutationVariables = {
  id: Scalars['ID'],
  shippingUpdates?: Maybe<Array<Maybe<RgaGoodShippingInput>>>,
  notes?: Maybe<Scalars['String']>
};


export type UpdateRgaShippingStatusMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAMutationOutput' }
    & Pick<RgaMutationOutput, 'success'>
    & { rga: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'status' | 'submittedBy' | 'submittedOn' | 'shippingSpeed'>
      & { statusLog: Maybe<Array<Maybe<(
        { __typename?: 'RGAStatusUpdate' }
        & Pick<RgaStatusUpdate, 'status' | 'notes' | 'updatedOn'>
        & { updatedBy: Maybe<(
          { __typename?: 'UpdateProfile' }
          & Pick<UpdateProfile, 'name' | 'id' | 'email'>
        )> }
      )>>> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateRgaStatusMutationVariables = {
  id: Scalars['ID'],
  status: RgaStatus,
  notes?: Maybe<Scalars['String']>
};


export type UpdateRgaStatusMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAMutationOutput' }
    & Pick<RgaMutationOutput, 'success'>
    & { rga: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'status' | 'submittedBy' | 'submittedOn' | 'shippingSpeed'>
      & { statusLog: Maybe<Array<Maybe<(
        { __typename?: 'RGAStatusUpdate' }
        & Pick<RgaStatusUpdate, 'status' | 'notes' | 'updatedOn'>
        & { updatedBy: Maybe<(
          { __typename?: 'UpdateProfile' }
          & Pick<UpdateProfile, 'name' | 'id' | 'email'>
        )> }
      )>>> }
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateUserMutationVariables = {
  userInput: NewUserInput
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UserMutationOutput' }
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyUserMutationVariables = {
  id: Scalars['String']
};


export type DestroyUserMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UserMutationOutput' }
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateUserMutationVariables = {
  userInput: ExistingUserInput
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UserMutationOutput' }
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UserQueryVariables = {
  userId: Scalars['String']
};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
  )> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )>>> }
);
export const CacheUpdateSymptomImagesFragmentDoc = gql`
    fragment cacheUpdateSymptomImages on ProductSymptom {
  attachedImages {
    id
  }
  __typename
}
    `;
export const LinkedSymptomFragmentDoc = gql`
    fragment linkedSymptom on ProductSymptom {
  associatedModelNumbers
  __typename
}
    `;
export const UpdatedSymptomImagesFragmentDoc = gql`
    fragment updatedSymptomImages on ProductSymptom {
  attachedImages {
    id
  }
  __typename
}
    `;
export const CreateUploadsDocument = gql`
    mutation CreateUploads($uploadInput: UploadInput!) {
  response: createUploads(uploadInput: $uploadInput) {
    uploads {
      id
      url
    }
    success
  }
}
    `;
export type CreateUploadsMutationFn = ApolloReactCommon.MutationFunction<CreateUploadsMutation, CreateUploadsMutationVariables>;

    export function useCreateUploadsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUploadsMutation, CreateUploadsMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateUploadsMutation, CreateUploadsMutationVariables>(CreateUploadsDocument, baseOptions);
    }
export type CreateUploadsMutationHookResult = ReturnType<typeof useCreateUploadsMutation>;
export type CreateUploadsMutationResult = ApolloReactCommon.MutationResult<CreateUploadsMutation>;
export type CreateUploadsMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUploadsMutation, CreateUploadsMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($customerInput: NewCustomerInput!) {
  response: createCustomer(customerInput: $customerInput) {
    customer {
      id
      name
      email
    }
    errors {
      message
      path
    }
  }
}
    `;
export type CreateCustomerMutationFn = ApolloReactCommon.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

    export function useCreateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, baseOptions);
    }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = ApolloReactCommon.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const CustomerDocument = gql`
    query Customer($customerId: String!) {
  response: customer(id: $customerId) {
    customer {
      id
      name
      email
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useCustomerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
      return ApolloReactHooks.useQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, baseOptions);
    }
      export function useCustomerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, baseOptions);
      }
      
export type CustomerQueryHookResult = ReturnType<typeof useCustomerQuery>;
export type CustomerQueryResult = ApolloReactCommon.QueryResult<CustomerQuery, CustomerQueryVariables>;
export const CustomersDocument = gql`
    query Customers($search: String) {
  response: customers(search: $search) {
    customers {
      id
      name
      email
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomersQuery, CustomersQueryVariables>) {
      return ApolloReactHooks.useQuery<CustomersQuery, CustomersQueryVariables>(CustomersDocument, baseOptions);
    }
      export function useCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomersQuery, CustomersQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<CustomersQuery, CustomersQueryVariables>(CustomersDocument, baseOptions);
      }
      
export type CustomersQueryHookResult = ReturnType<typeof useCustomersQuery>;
export type CustomersQueryResult = ApolloReactCommon.QueryResult<CustomersQuery, CustomersQueryVariables>;
export const DestroyCustomerDocument = gql`
    mutation destroyCustomer($id: String!) {
  response: destroyCustomer(id: $id) {
    customer {
      id
      name
      email
    }
    errors {
      message
      path
    }
  }
}
    `;
export type DestroyCustomerMutationFn = ApolloReactCommon.MutationFunction<DestroyCustomerMutation, DestroyCustomerMutationVariables>;

    export function useDestroyCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyCustomerMutation, DestroyCustomerMutationVariables>) {
      return ApolloReactHooks.useMutation<DestroyCustomerMutation, DestroyCustomerMutationVariables>(DestroyCustomerDocument, baseOptions);
    }
export type DestroyCustomerMutationHookResult = ReturnType<typeof useDestroyCustomerMutation>;
export type DestroyCustomerMutationResult = ApolloReactCommon.MutationResult<DestroyCustomerMutation>;
export type DestroyCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyCustomerMutation, DestroyCustomerMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($customerInput: ExistingCustomerInput!) {
  response: updateCustomer(customerInput: $customerInput) {
    customer {
      id
      name
      email
    }
    errors {
      message
      path
    }
  }
}
    `;
export type UpdateCustomerMutationFn = ApolloReactCommon.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

    export function useUpdateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, baseOptions);
    }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = ApolloReactCommon.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const CreateDistributorDocument = gql`
    mutation CreateDistributor($distributorInput: NewDistributorInput!) {
  response: createDistributor(distributorInput: $distributorInput) {
    distributor {
      id
      name
      domain
    }
    errors {
      message
      path
    }
    success
  }
}
    `;
export type CreateDistributorMutationFn = ApolloReactCommon.MutationFunction<CreateDistributorMutation, CreateDistributorMutationVariables>;

    export function useCreateDistributorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDistributorMutation, CreateDistributorMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateDistributorMutation, CreateDistributorMutationVariables>(CreateDistributorDocument, baseOptions);
    }
export type CreateDistributorMutationHookResult = ReturnType<typeof useCreateDistributorMutation>;
export type CreateDistributorMutationResult = ApolloReactCommon.MutationResult<CreateDistributorMutation>;
export type CreateDistributorMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDistributorMutation, CreateDistributorMutationVariables>;
export const DestroyDistributorDocument = gql`
    mutation destroyDistributor($id: String!) {
  response: destroyDistributor(id: $id) {
    distributor {
      id
      name
      domain
    }
    errors {
      message
      path
    }
  }
}
    `;
export type DestroyDistributorMutationFn = ApolloReactCommon.MutationFunction<DestroyDistributorMutation, DestroyDistributorMutationVariables>;

    export function useDestroyDistributorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyDistributorMutation, DestroyDistributorMutationVariables>) {
      return ApolloReactHooks.useMutation<DestroyDistributorMutation, DestroyDistributorMutationVariables>(DestroyDistributorDocument, baseOptions);
    }
export type DestroyDistributorMutationHookResult = ReturnType<typeof useDestroyDistributorMutation>;
export type DestroyDistributorMutationResult = ApolloReactCommon.MutationResult<DestroyDistributorMutation>;
export type DestroyDistributorMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyDistributorMutation, DestroyDistributorMutationVariables>;
export const DistributorDocument = gql`
    query Distributor($distributorId: String!) {
  response: distributor(id: $distributorId) {
    distributor {
      id
      name
      domain
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useDistributorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DistributorQuery, DistributorQueryVariables>) {
      return ApolloReactHooks.useQuery<DistributorQuery, DistributorQueryVariables>(DistributorDocument, baseOptions);
    }
      export function useDistributorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DistributorQuery, DistributorQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<DistributorQuery, DistributorQueryVariables>(DistributorDocument, baseOptions);
      }
      
export type DistributorQueryHookResult = ReturnType<typeof useDistributorQuery>;
export type DistributorQueryResult = ApolloReactCommon.QueryResult<DistributorQuery, DistributorQueryVariables>;
export const DistributorsDocument = gql`
    query Distributors {
  response: distributors {
    distributors {
      id
      name
      domain
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useDistributorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DistributorsQuery, DistributorsQueryVariables>) {
      return ApolloReactHooks.useQuery<DistributorsQuery, DistributorsQueryVariables>(DistributorsDocument, baseOptions);
    }
      export function useDistributorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DistributorsQuery, DistributorsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<DistributorsQuery, DistributorsQueryVariables>(DistributorsDocument, baseOptions);
      }
      
export type DistributorsQueryHookResult = ReturnType<typeof useDistributorsQuery>;
export type DistributorsQueryResult = ApolloReactCommon.QueryResult<DistributorsQuery, DistributorsQueryVariables>;
export const UpdateDistributorDocument = gql`
    mutation UpdateDistributor($distributorInput: ExistingDistributorInput!) {
  response: updateDistributor(distributorInput: $distributorInput) {
    distributor {
      id
      name
      domain
    }
    errors {
      message
      path
    }
  }
}
    `;
export type UpdateDistributorMutationFn = ApolloReactCommon.MutationFunction<UpdateDistributorMutation, UpdateDistributorMutationVariables>;

    export function useUpdateDistributorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDistributorMutation, UpdateDistributorMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateDistributorMutation, UpdateDistributorMutationVariables>(UpdateDistributorDocument, baseOptions);
    }
export type UpdateDistributorMutationHookResult = ReturnType<typeof useUpdateDistributorMutation>;
export type UpdateDistributorMutationResult = ApolloReactCommon.MutationResult<UpdateDistributorMutation>;
export type UpdateDistributorMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateDistributorMutation, UpdateDistributorMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($password: String!) {
  response: resetPassword(password: $password) {
    user {
      email
    }
    errors {
      path
      message
    }
    success
  }
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

    export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
      return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
    }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const CreateProductRegistrationDocument = gql`
    mutation CreateProductRegistration($productRegistrationInput: NewProductRegistrationInput!) {
  response: createProductRegistration(productRegistrationInput: $productRegistrationInput) {
    success
    productRegistration {
      id
      customer {
        id
        email
        name
      }
      modelNumber
      productId
      customerId
      serial
    }
    errors {
      path
      message
    }
  }
}
    `;
export type CreateProductRegistrationMutationFn = ApolloReactCommon.MutationFunction<CreateProductRegistrationMutation, CreateProductRegistrationMutationVariables>;

    export function useCreateProductRegistrationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductRegistrationMutation, CreateProductRegistrationMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateProductRegistrationMutation, CreateProductRegistrationMutationVariables>(CreateProductRegistrationDocument, baseOptions);
    }
export type CreateProductRegistrationMutationHookResult = ReturnType<typeof useCreateProductRegistrationMutation>;
export type CreateProductRegistrationMutationResult = ApolloReactCommon.MutationResult<CreateProductRegistrationMutation>;
export type CreateProductRegistrationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductRegistrationMutation, CreateProductRegistrationMutationVariables>;
export const DestroyProductRegistrationDocument = gql`
    mutation destroyProductRegistration($id: String!) {
  response: destroyProductRegistration(id: $id) {
    productRegistration {
      id
    }
    errors {
      message
      path
    }
  }
}
    `;
export type DestroyProductRegistrationMutationFn = ApolloReactCommon.MutationFunction<DestroyProductRegistrationMutation, DestroyProductRegistrationMutationVariables>;

    export function useDestroyProductRegistrationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyProductRegistrationMutation, DestroyProductRegistrationMutationVariables>) {
      return ApolloReactHooks.useMutation<DestroyProductRegistrationMutation, DestroyProductRegistrationMutationVariables>(DestroyProductRegistrationDocument, baseOptions);
    }
export type DestroyProductRegistrationMutationHookResult = ReturnType<typeof useDestroyProductRegistrationMutation>;
export type DestroyProductRegistrationMutationResult = ApolloReactCommon.MutationResult<DestroyProductRegistrationMutation>;
export type DestroyProductRegistrationMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyProductRegistrationMutation, DestroyProductRegistrationMutationVariables>;
export const ProductRegistrationDocument = gql`
    query ProductRegistration($productRegistrationId: String!) {
  response: productRegistration(id: $productRegistrationId) {
    productRegistration {
      id
      productId
      customerId
      customer {
        id
        name
        email
      }
      lotted
      serial
      modelNumber
      registeredOn
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useProductRegistrationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductRegistrationQuery, ProductRegistrationQueryVariables>) {
      return ApolloReactHooks.useQuery<ProductRegistrationQuery, ProductRegistrationQueryVariables>(ProductRegistrationDocument, baseOptions);
    }
      export function useProductRegistrationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductRegistrationQuery, ProductRegistrationQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProductRegistrationQuery, ProductRegistrationQueryVariables>(ProductRegistrationDocument, baseOptions);
      }
      
export type ProductRegistrationQueryHookResult = ReturnType<typeof useProductRegistrationQuery>;
export type ProductRegistrationQueryResult = ApolloReactCommon.QueryResult<ProductRegistrationQuery, ProductRegistrationQueryVariables>;
export const ProductRegistrationsDocument = gql`
    query ProductRegistrations {
  response: productRegistrations {
    productRegistrations {
      id
      productId
      customerId
      customer {
        id
        name
        email
      }
      serial
      modelNumber
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useProductRegistrationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>) {
      return ApolloReactHooks.useQuery<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>(ProductRegistrationsDocument, baseOptions);
    }
      export function useProductRegistrationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>(ProductRegistrationsDocument, baseOptions);
      }
      
export type ProductRegistrationsQueryHookResult = ReturnType<typeof useProductRegistrationsQuery>;
export type ProductRegistrationsQueryResult = ApolloReactCommon.QueryResult<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>;
export const UpdateProductRegistrationDocument = gql`
    mutation UpdateProductRegistration($productRegistrationInput: ExistingProductRegistrationInput!) {
  response: updateProductRegistration(productRegistrationInput: $productRegistrationInput) {
    success
    productRegistration {
      id
      customer {
        id
        email
        name
      }
      modelNumber
      productId
      customerId
      serial
    }
    errors {
      path
      message
    }
  }
}
    `;
export type UpdateProductRegistrationMutationFn = ApolloReactCommon.MutationFunction<UpdateProductRegistrationMutation, UpdateProductRegistrationMutationVariables>;

    export function useUpdateProductRegistrationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductRegistrationMutation, UpdateProductRegistrationMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateProductRegistrationMutation, UpdateProductRegistrationMutationVariables>(UpdateProductRegistrationDocument, baseOptions);
    }
export type UpdateProductRegistrationMutationHookResult = ReturnType<typeof useUpdateProductRegistrationMutation>;
export type UpdateProductRegistrationMutationResult = ApolloReactCommon.MutationResult<UpdateProductRegistrationMutation>;
export type UpdateProductRegistrationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductRegistrationMutation, UpdateProductRegistrationMutationVariables>;
export const ModelNumbersViewableDocument = gql`
    query ModelNumbersViewable {
  response: modelNumbers {
    modelNumbers {
      id
      publiclyViewable
    }
    pageSize
    success
    errors {
      path
      message
    }
  }
}
    `;

    export function useModelNumbersViewableQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>) {
      return ApolloReactHooks.useQuery<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>(ModelNumbersViewableDocument, baseOptions);
    }
      export function useModelNumbersViewableLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>(ModelNumbersViewableDocument, baseOptions);
      }
      
export type ModelNumbersViewableQueryHookResult = ReturnType<typeof useModelNumbersViewableQuery>;
export type ModelNumbersViewableQueryResult = ApolloReactCommon.QueryResult<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>;
export const UpdateModelNumberViewableDocument = gql`
    mutation UpdateModelNumberViewable($id: ID!, $publiclyViewable: Boolean!) {
  response: updateModelNumberViewable(id: $id, publiclyViewable: $publiclyViewable) {
    modelNumber {
      id
      publiclyViewable
    }
    errors {
      message
      path
    }
  }
}
    `;
export type UpdateModelNumberViewableMutationFn = ApolloReactCommon.MutationFunction<UpdateModelNumberViewableMutation, UpdateModelNumberViewableMutationVariables>;

    export function useUpdateModelNumberViewableMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateModelNumberViewableMutation, UpdateModelNumberViewableMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateModelNumberViewableMutation, UpdateModelNumberViewableMutationVariables>(UpdateModelNumberViewableDocument, baseOptions);
    }
export type UpdateModelNumberViewableMutationHookResult = ReturnType<typeof useUpdateModelNumberViewableMutation>;
export type UpdateModelNumberViewableMutationResult = ApolloReactCommon.MutationResult<UpdateModelNumberViewableMutation>;
export type UpdateModelNumberViewableMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateModelNumberViewableMutation, UpdateModelNumberViewableMutationVariables>;
export const CreateModelNumberDocument = gql`
    mutation CreateModelNumber($modelNumberInput: ModelNumberInput!) {
  response: createModelNumber(modelNumberInput: $modelNumberInput) {
    modelNumber {
      id
      description
      productIds
      products {
        id
        name
      }
      productType
      lotted
      warrantyTerm
      warrantyDescription
      feeWithWarranty {
        distributor
        endUser
      }
      feeWithoutWarranty {
        distributor
        endUser
      }
      pricing {
        cost
        retail
      }
      resolutionWithWarranty
      resolutionWithoutWarranty
      publicNotes
      privateNotes
    }
    errors {
      message
      path
    }
    success
  }
}
    `;
export type CreateModelNumberMutationFn = ApolloReactCommon.MutationFunction<CreateModelNumberMutation, CreateModelNumberMutationVariables>;

    export function useCreateModelNumberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateModelNumberMutation, CreateModelNumberMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateModelNumberMutation, CreateModelNumberMutationVariables>(CreateModelNumberDocument, baseOptions);
    }
export type CreateModelNumberMutationHookResult = ReturnType<typeof useCreateModelNumberMutation>;
export type CreateModelNumberMutationResult = ApolloReactCommon.MutationResult<CreateModelNumberMutation>;
export type CreateModelNumberMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateModelNumberMutation, CreateModelNumberMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($productInput: ProductInput!) {
  response: createProduct(productInput: $productInput) {
    product {
      id
      name
      description
    }
    errors {
      message
      path
    }
    success
  }
}
    `;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

    export function useCreateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
    }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const DestroyModelNumberDocument = gql`
    mutation destroyModelNumber($id: ID!) {
  response: destroyModelNumber(id: $id) {
    modelNumber {
      id
    }
    errors {
      message
      path
    }
  }
}
    `;
export type DestroyModelNumberMutationFn = ApolloReactCommon.MutationFunction<DestroyModelNumberMutation, DestroyModelNumberMutationVariables>;

    export function useDestroyModelNumberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyModelNumberMutation, DestroyModelNumberMutationVariables>) {
      return ApolloReactHooks.useMutation<DestroyModelNumberMutation, DestroyModelNumberMutationVariables>(DestroyModelNumberDocument, baseOptions);
    }
export type DestroyModelNumberMutationHookResult = ReturnType<typeof useDestroyModelNumberMutation>;
export type DestroyModelNumberMutationResult = ApolloReactCommon.MutationResult<DestroyModelNumberMutation>;
export type DestroyModelNumberMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyModelNumberMutation, DestroyModelNumberMutationVariables>;
export const DestroyProductDocument = gql`
    mutation destroyProduct($id: ID!) {
  response: destroyProduct(id: $id) {
    product {
      id
      name
      description
    }
    errors {
      message
      path
    }
  }
}
    `;
export type DestroyProductMutationFn = ApolloReactCommon.MutationFunction<DestroyProductMutation, DestroyProductMutationVariables>;

    export function useDestroyProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyProductMutation, DestroyProductMutationVariables>) {
      return ApolloReactHooks.useMutation<DestroyProductMutation, DestroyProductMutationVariables>(DestroyProductDocument, baseOptions);
    }
export type DestroyProductMutationHookResult = ReturnType<typeof useDestroyProductMutation>;
export type DestroyProductMutationResult = ApolloReactCommon.MutationResult<DestroyProductMutation>;
export type DestroyProductMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyProductMutation, DestroyProductMutationVariables>;
export const ModelNumberDocument = gql`
    query ModelNumber($modelNumberId: String!) {
  response: modelNumber(id: $modelNumberId) {
    modelNumber {
      id
      description
      productIds
      productType
      products {
        id
        name
      }
      symptoms {
        id
        name
        faultCode
      }
      lotted
      warrantyTerm
      warrantyDescription
      feeWithWarranty {
        distributor
        endUser
      }
      feeWithoutWarranty {
        distributor
        endUser
      }
      pricing {
        cost
        retail
      }
      resolutionWithWarranty
      resolutionWithoutWarranty
      publicNotes
      privateNotes
    }
    success
    errors {
      path
      message
    }
  }
}
    `;

    export function useModelNumberQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ModelNumberQuery, ModelNumberQueryVariables>) {
      return ApolloReactHooks.useQuery<ModelNumberQuery, ModelNumberQueryVariables>(ModelNumberDocument, baseOptions);
    }
      export function useModelNumberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ModelNumberQuery, ModelNumberQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ModelNumberQuery, ModelNumberQueryVariables>(ModelNumberDocument, baseOptions);
      }
      
export type ModelNumberQueryHookResult = ReturnType<typeof useModelNumberQuery>;
export type ModelNumberQueryResult = ApolloReactCommon.QueryResult<ModelNumberQuery, ModelNumberQueryVariables>;
export const ModelNumbersDocument = gql`
    query ModelNumbers($search: String, $productId: String, $productType: ProductType) {
  response: modelNumbers(search: $search, productId: $productId, productType: $productType) {
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
    `;

    export function useModelNumbersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ModelNumbersQuery, ModelNumbersQueryVariables>) {
      return ApolloReactHooks.useQuery<ModelNumbersQuery, ModelNumbersQueryVariables>(ModelNumbersDocument, baseOptions);
    }
      export function useModelNumbersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ModelNumbersQuery, ModelNumbersQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ModelNumbersQuery, ModelNumbersQueryVariables>(ModelNumbersDocument, baseOptions);
      }
      
export type ModelNumbersQueryHookResult = ReturnType<typeof useModelNumbersQuery>;
export type ModelNumbersQueryResult = ApolloReactCommon.QueryResult<ModelNumbersQuery, ModelNumbersQueryVariables>;
export const ProductDocument = gql`
    query Product($productId: String!) {
  response: product(id: $productId) {
    product {
      id
      name
      description
      modelNumbers {
        id
        description
        lotted
        warrantyTerm
      }
    }
    errors {
      path
      message
    }
    success
  }
}
    `;

    export function useProductQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
      return ApolloReactHooks.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, baseOptions);
    }
      export function useProductLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, baseOptions);
      }
      
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductQueryResult = ApolloReactCommon.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products($search: String) {
  response: products(search: $search) {
    products {
      id
      name
      description
    }
    pageSize
    success
    errors {
      message
      path
    }
  }
}
    `;

    export function useProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
      return ApolloReactHooks.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
    }
      export function useProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
      
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsQueryResult = ApolloReactCommon.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const UpdateModelNumberDocument = gql`
    mutation UpdateModelNumber($modelNumberInput: ModelNumberInput!) {
  response: updateModelNumber(modelNumberInput: $modelNumberInput) {
    modelNumber {
      id
      description
      productIds
      products {
        id
        name
      }
      productType
      pricing {
        cost
        retail
      }
      lotted
      warrantyTerm
      warrantyDescription
      feeWithWarranty {
        distributor
        endUser
      }
      feeWithoutWarranty {
        distributor
        endUser
      }
      resolutionWithWarranty
      resolutionWithoutWarranty
      publicNotes
      privateNotes
    }
    errors {
      message
      path
    }
  }
}
    `;
export type UpdateModelNumberMutationFn = ApolloReactCommon.MutationFunction<UpdateModelNumberMutation, UpdateModelNumberMutationVariables>;

    export function useUpdateModelNumberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateModelNumberMutation, UpdateModelNumberMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateModelNumberMutation, UpdateModelNumberMutationVariables>(UpdateModelNumberDocument, baseOptions);
    }
export type UpdateModelNumberMutationHookResult = ReturnType<typeof useUpdateModelNumberMutation>;
export type UpdateModelNumberMutationResult = ApolloReactCommon.MutationResult<UpdateModelNumberMutation>;
export type UpdateModelNumberMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateModelNumberMutation, UpdateModelNumberMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($productInput: ProductInput!) {
  response: updateProduct(productInput: $productInput) {
    product {
      id
      name
      description
    }
    errors {
      message
      path
    }
  }
}
    `;
export type UpdateProductMutationFn = ApolloReactCommon.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

    export function useUpdateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, baseOptions);
    }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = ApolloReactCommon.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DestroyProductSymptomDocument = gql`
    mutation destroyProductSymptom($id: String!) {
  response: destroyProductSymptom(id: $id) {
    productSymptom {
      id
      name
      faultCode
      fee
    }
    errors {
      message
      path
    }
  }
}
    `;
export type DestroyProductSymptomMutationFn = ApolloReactCommon.MutationFunction<DestroyProductSymptomMutation, DestroyProductSymptomMutationVariables>;

    export function useDestroyProductSymptomMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyProductSymptomMutation, DestroyProductSymptomMutationVariables>) {
      return ApolloReactHooks.useMutation<DestroyProductSymptomMutation, DestroyProductSymptomMutationVariables>(DestroyProductSymptomDocument, baseOptions);
    }
export type DestroyProductSymptomMutationHookResult = ReturnType<typeof useDestroyProductSymptomMutation>;
export type DestroyProductSymptomMutationResult = ApolloReactCommon.MutationResult<DestroyProductSymptomMutation>;
export type DestroyProductSymptomMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyProductSymptomMutation, DestroyProductSymptomMutationVariables>;
export const ModelNumbersLottedDocument = gql`
    query ModelNumbersLotted {
  response: modelNumbers {
    modelNumbers {
      id
      lotted
    }
    pageSize
    success
    errors {
      path
      message
    }
  }
}
    `;

    export function useModelNumbersLottedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>) {
      return ApolloReactHooks.useQuery<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>(ModelNumbersLottedDocument, baseOptions);
    }
      export function useModelNumbersLottedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>(ModelNumbersLottedDocument, baseOptions);
      }
      
export type ModelNumbersLottedQueryHookResult = ReturnType<typeof useModelNumbersLottedQuery>;
export type ModelNumbersLottedQueryResult = ApolloReactCommon.QueryResult<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>;
export const ModelNumbersSimpleDocument = gql`
    query ModelNumbersSimple {
  response: modelNumbers {
    modelNumbers {
      id
    }
    pageSize
    success
    errors {
      path
      message
    }
  }
}
    `;

    export function useModelNumbersSimpleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>) {
      return ApolloReactHooks.useQuery<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>(ModelNumbersSimpleDocument, baseOptions);
    }
      export function useModelNumbersSimpleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>(ModelNumbersSimpleDocument, baseOptions);
      }
      
export type ModelNumbersSimpleQueryHookResult = ReturnType<typeof useModelNumbersSimpleQuery>;
export type ModelNumbersSimpleQueryResult = ApolloReactCommon.QueryResult<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>;
export const ProductSymptomDocument = gql`
    query ProductSymptom($productSymptomId: String!) {
  response: productSymptom(id: $productSymptomId) {
    productSymptom {
      id
      name
      faultCode
      fee
      preApproved
      synopsis
      solution
      careTip
      associatedModelNumbers
      attachedImages {
        id
        position
        status
        url
      }
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useProductSymptomQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductSymptomQuery, ProductSymptomQueryVariables>) {
      return ApolloReactHooks.useQuery<ProductSymptomQuery, ProductSymptomQueryVariables>(ProductSymptomDocument, baseOptions);
    }
      export function useProductSymptomLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductSymptomQuery, ProductSymptomQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProductSymptomQuery, ProductSymptomQueryVariables>(ProductSymptomDocument, baseOptions);
      }
      
export type ProductSymptomQueryHookResult = ReturnType<typeof useProductSymptomQuery>;
export type ProductSymptomQueryResult = ApolloReactCommon.QueryResult<ProductSymptomQuery, ProductSymptomQueryVariables>;
export const UpdateModelNumberLottedDocument = gql`
    mutation UpdateModelNumberLotted($id: ID!, $lotted: Boolean!) {
  response: updateModelNumberLotted(id: $id, lotted: $lotted) {
    modelNumber {
      id
      lotted
    }
    errors {
      message
      path
    }
  }
}
    `;
export type UpdateModelNumberLottedMutationFn = ApolloReactCommon.MutationFunction<UpdateModelNumberLottedMutation, UpdateModelNumberLottedMutationVariables>;

    export function useUpdateModelNumberLottedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateModelNumberLottedMutation, UpdateModelNumberLottedMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateModelNumberLottedMutation, UpdateModelNumberLottedMutationVariables>(UpdateModelNumberLottedDocument, baseOptions);
    }
export type UpdateModelNumberLottedMutationHookResult = ReturnType<typeof useUpdateModelNumberLottedMutation>;
export type UpdateModelNumberLottedMutationResult = ApolloReactCommon.MutationResult<UpdateModelNumberLottedMutation>;
export type UpdateModelNumberLottedMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateModelNumberLottedMutation, UpdateModelNumberLottedMutationVariables>;
export const AttachImagesToSymptomDocument = gql`
    mutation AttachImagesToSymptom($symptomId: String!, $attachedImages: [AttachedImageInput]!) {
  response: attachImagesToSymptom(symptomId: $symptomId, attachedImages: $attachedImages) {
    productSymptom {
      id
      attachedImages {
        position
        status
        id
        url
      }
    }
    success
    errors {
      message
      path
    }
  }
}
    `;
export type AttachImagesToSymptomMutationFn = ApolloReactCommon.MutationFunction<AttachImagesToSymptomMutation, AttachImagesToSymptomMutationVariables>;

    export function useAttachImagesToSymptomMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttachImagesToSymptomMutation, AttachImagesToSymptomMutationVariables>) {
      return ApolloReactHooks.useMutation<AttachImagesToSymptomMutation, AttachImagesToSymptomMutationVariables>(AttachImagesToSymptomDocument, baseOptions);
    }
export type AttachImagesToSymptomMutationHookResult = ReturnType<typeof useAttachImagesToSymptomMutation>;
export type AttachImagesToSymptomMutationResult = ApolloReactCommon.MutationResult<AttachImagesToSymptomMutation>;
export type AttachImagesToSymptomMutationOptions = ApolloReactCommon.BaseMutationOptions<AttachImagesToSymptomMutation, AttachImagesToSymptomMutationVariables>;
export const CreateProductSymptomDocument = gql`
    mutation CreateProductSymptom($productSymptomInput: NewProductSymptomInput!) {
  response: createProductSymptom(productSymptomInput: $productSymptomInput) {
    productSymptom {
      id
      faultCode
      synopsis
      solution
    }
    errors {
      message
      path
    }
  }
}
    `;
export type CreateProductSymptomMutationFn = ApolloReactCommon.MutationFunction<CreateProductSymptomMutation, CreateProductSymptomMutationVariables>;

    export function useCreateProductSymptomMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductSymptomMutation, CreateProductSymptomMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateProductSymptomMutation, CreateProductSymptomMutationVariables>(CreateProductSymptomDocument, baseOptions);
    }
export type CreateProductSymptomMutationHookResult = ReturnType<typeof useCreateProductSymptomMutation>;
export type CreateProductSymptomMutationResult = ApolloReactCommon.MutationResult<CreateProductSymptomMutation>;
export type CreateProductSymptomMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductSymptomMutation, CreateProductSymptomMutationVariables>;
export const LinkSymptomToModelNumberDocument = gql`
    mutation LinkSymptomToModelNumber($modelNumber: String!, $symptomId: String!, $linked: Boolean!) {
  response: linkSymptomToModel(modelNumber: $modelNumber, symptomId: $symptomId, linked: $linked) {
    success
    productSymptom {
      id
      name
      associatedModelNumbers
    }
    modelNumber {
      id
      symptoms {
        id
        faultCode
        name
      }
    }
    errors {
      message
      path
    }
  }
}
    `;
export type LinkSymptomToModelNumberMutationFn = ApolloReactCommon.MutationFunction<LinkSymptomToModelNumberMutation, LinkSymptomToModelNumberMutationVariables>;

    export function useLinkSymptomToModelNumberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LinkSymptomToModelNumberMutation, LinkSymptomToModelNumberMutationVariables>) {
      return ApolloReactHooks.useMutation<LinkSymptomToModelNumberMutation, LinkSymptomToModelNumberMutationVariables>(LinkSymptomToModelNumberDocument, baseOptions);
    }
export type LinkSymptomToModelNumberMutationHookResult = ReturnType<typeof useLinkSymptomToModelNumberMutation>;
export type LinkSymptomToModelNumberMutationResult = ApolloReactCommon.MutationResult<LinkSymptomToModelNumberMutation>;
export type LinkSymptomToModelNumberMutationOptions = ApolloReactCommon.BaseMutationOptions<LinkSymptomToModelNumberMutation, LinkSymptomToModelNumberMutationVariables>;
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
      associatedModelNumbers
    }
    pageSize
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useProductSymptomsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductSymptomsQuery, ProductSymptomsQueryVariables>) {
      return ApolloReactHooks.useQuery<ProductSymptomsQuery, ProductSymptomsQueryVariables>(ProductSymptomsDocument, baseOptions);
    }
      export function useProductSymptomsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductSymptomsQuery, ProductSymptomsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProductSymptomsQuery, ProductSymptomsQueryVariables>(ProductSymptomsDocument, baseOptions);
      }
      
export type ProductSymptomsQueryHookResult = ReturnType<typeof useProductSymptomsQuery>;
export type ProductSymptomsQueryResult = ApolloReactCommon.QueryResult<ProductSymptomsQuery, ProductSymptomsQueryVariables>;
export const UpdateProductSymptomDocument = gql`
    mutation UpdateProductSymptom($productSymptomInput: ExistingProductSymptomInput!) {
  response: updateProductSymptom(productSymptomInput: $productSymptomInput) {
    productSymptom {
      id
      name
      fee
      faultCode
      synopsis
      solution
      careTip
    }
    errors {
      message
      path
    }
  }
}
    `;
export type UpdateProductSymptomMutationFn = ApolloReactCommon.MutationFunction<UpdateProductSymptomMutation, UpdateProductSymptomMutationVariables>;

    export function useUpdateProductSymptomMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductSymptomMutation, UpdateProductSymptomMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateProductSymptomMutation, UpdateProductSymptomMutationVariables>(UpdateProductSymptomDocument, baseOptions);
    }
export type UpdateProductSymptomMutationHookResult = ReturnType<typeof useUpdateProductSymptomMutation>;
export type UpdateProductSymptomMutationResult = ApolloReactCommon.MutationResult<UpdateProductSymptomMutation>;
export type UpdateProductSymptomMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductSymptomMutation, UpdateProductSymptomMutationVariables>;
export const CreateRgaGoodDocument = gql`
    mutation CreateRGAGood($rgaId: String!, $rgaGoodInput: RGAGoodInput!) {
  response: createRGAGood(rgaId: $rgaId, rgaGoodInput: $rgaGoodInput) {
    rgaId
    rgaGood {
      id
      rgaId
      serviceId
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
      customerSpecialty
      faultCode
      serial
      newSerial
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
      serviceFormUrl
      customerLetterUrl
      additionalComments
      datePurchased
      disposition
    }
    errors {
      message
      path
    }
    success
  }
}
    `;
export type CreateRgaGoodMutationFn = ApolloReactCommon.MutationFunction<CreateRgaGoodMutation, CreateRgaGoodMutationVariables>;

    export function useCreateRgaGoodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRgaGoodMutation, CreateRgaGoodMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateRgaGoodMutation, CreateRgaGoodMutationVariables>(CreateRgaGoodDocument, baseOptions);
    }
export type CreateRgaGoodMutationHookResult = ReturnType<typeof useCreateRgaGoodMutation>;
export type CreateRgaGoodMutationResult = ApolloReactCommon.MutationResult<CreateRgaGoodMutation>;
export type CreateRgaGoodMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRgaGoodMutation, CreateRgaGoodMutationVariables>;
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
    `;
export type CreateRgaMutationFn = ApolloReactCommon.MutationFunction<CreateRgaMutation, CreateRgaMutationVariables>;

    export function useCreateRgaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRgaMutation, CreateRgaMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateRgaMutation, CreateRgaMutationVariables>(CreateRgaDocument, baseOptions);
    }
export type CreateRgaMutationHookResult = ReturnType<typeof useCreateRgaMutation>;
export type CreateRgaMutationResult = ApolloReactCommon.MutationResult<CreateRgaMutation>;
export type CreateRgaMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRgaMutation, CreateRgaMutationVariables>;
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
      customerSpecialty
      notes
      rma
      po
      additionalComments
      datePurchased
      disposition
    }
    errors {
      message
      path
    }
    success
  }
}
    `;
export type DestroyRgaGoodMutationFn = ApolloReactCommon.MutationFunction<DestroyRgaGoodMutation, DestroyRgaGoodMutationVariables>;

    export function useDestroyRgaGoodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyRgaGoodMutation, DestroyRgaGoodMutationVariables>) {
      return ApolloReactHooks.useMutation<DestroyRgaGoodMutation, DestroyRgaGoodMutationVariables>(DestroyRgaGoodDocument, baseOptions);
    }
export type DestroyRgaGoodMutationHookResult = ReturnType<typeof useDestroyRgaGoodMutation>;
export type DestroyRgaGoodMutationResult = ApolloReactCommon.MutationResult<DestroyRgaGoodMutation>;
export type DestroyRgaGoodMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyRgaGoodMutation, DestroyRgaGoodMutationVariables>;
export const RgaCountsDocument = gql`
    query RgaCounts {
  rgaCount {
    issued
    delayed
    awaitingArrival
    received
    assessing
    repairing
    shipping
    closed
    canceled
    success
    errors {
      message
      path
    }
  }
}
    `;

    export function useRgaCountsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RgaCountsQuery, RgaCountsQueryVariables>) {
      return ApolloReactHooks.useQuery<RgaCountsQuery, RgaCountsQueryVariables>(RgaCountsDocument, baseOptions);
    }
      export function useRgaCountsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RgaCountsQuery, RgaCountsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<RgaCountsQuery, RgaCountsQueryVariables>(RgaCountsDocument, baseOptions);
      }
      
export type RgaCountsQueryHookResult = ReturnType<typeof useRgaCountsQuery>;
export type RgaCountsQueryResult = ApolloReactCommon.QueryResult<RgaCountsQuery, RgaCountsQueryVariables>;
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
        serviceId
        customerEmail
        customerId
        customerName
        customerLetterUrl
        customerSpecialty
        faultCode
        serial
        newSerial
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
        ssd
        additionalComments
        datePurchased
        disposition
      }
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useRgaQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RgaQuery, RgaQueryVariables>) {
      return ApolloReactHooks.useQuery<RgaQuery, RgaQueryVariables>(RgaDocument, baseOptions);
    }
      export function useRgaLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RgaQuery, RgaQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<RgaQuery, RgaQueryVariables>(RgaDocument, baseOptions);
      }
      
export type RgaQueryHookResult = ReturnType<typeof useRgaQuery>;
export type RgaQueryResult = ApolloReactCommon.QueryResult<RgaQuery, RgaQueryVariables>;
export const RgasDocument = gql`
    query Rgas($status: RGAStatus) {
  response: rgas(status: $status) {
    rgas {
      id
      submittedOn
      submittedBy
      status
      goods {
        id
      }
    }
    errors {
      message
      path
    }
    success
  }
}
    `;

    export function useRgasQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RgasQuery, RgasQueryVariables>) {
      return ApolloReactHooks.useQuery<RgasQuery, RgasQueryVariables>(RgasDocument, baseOptions);
    }
      export function useRgasLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RgasQuery, RgasQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<RgasQuery, RgasQueryVariables>(RgasDocument, baseOptions);
      }
      
export type RgasQueryHookResult = ReturnType<typeof useRgasQuery>;
export type RgasQueryResult = ApolloReactCommon.QueryResult<RgasQuery, RgasQueryVariables>;
export const UpdateRgaGoodDocument = gql`
    mutation UpdateRGAGood($id: ID!, $rgaId: String!, $rgaGoodInput: RGAGoodInput!) {
  response: updateRGAGood(id: $id, rgaId: $rgaId, rgaGoodInput: $rgaGoodInput) {
    success
    errors {
      message
      path
    }
    rgaId
    rgaGood {
      id
      serviceId
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
      customerSpecialty
      faultCode
      serial
      newSerial
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
      ssd
      additionalComments
      datePurchased
      disposition
    }
  }
}
    `;
export type UpdateRgaGoodMutationFn = ApolloReactCommon.MutationFunction<UpdateRgaGoodMutation, UpdateRgaGoodMutationVariables>;

    export function useUpdateRgaGoodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRgaGoodMutation, UpdateRgaGoodMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateRgaGoodMutation, UpdateRgaGoodMutationVariables>(UpdateRgaGoodDocument, baseOptions);
    }
export type UpdateRgaGoodMutationHookResult = ReturnType<typeof useUpdateRgaGoodMutation>;
export type UpdateRgaGoodMutationResult = ApolloReactCommon.MutationResult<UpdateRgaGoodMutation>;
export type UpdateRgaGoodMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRgaGoodMutation, UpdateRgaGoodMutationVariables>;
export const UpdateRgaDocument = gql`
    mutation UpdateRGA($rgaInput: ExistingRGAInput!) {
  response: updateRGA(rgaInput: $rgaInput) {
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
    `;
export type UpdateRgaMutationFn = ApolloReactCommon.MutationFunction<UpdateRgaMutation, UpdateRgaMutationVariables>;

    export function useUpdateRgaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRgaMutation, UpdateRgaMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateRgaMutation, UpdateRgaMutationVariables>(UpdateRgaDocument, baseOptions);
    }
export type UpdateRgaMutationHookResult = ReturnType<typeof useUpdateRgaMutation>;
export type UpdateRgaMutationResult = ApolloReactCommon.MutationResult<UpdateRgaMutation>;
export type UpdateRgaMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRgaMutation, UpdateRgaMutationVariables>;
export const UpdateRgaShippingStatusDocument = gql`
    mutation UpdateRGAShippingStatus($id: ID!, $shippingUpdates: [RGAGoodShippingInput], $notes: String) {
  response: updateRGAShippingStatus(id: $id, shippingUpdates: $shippingUpdates, notes: $notes) {
    rga {
      id
      status
      submittedBy
      submittedOn
      shippingSpeed
      statusLog {
        status
        notes
        updatedOn
        updatedBy {
          name
          id
          email
        }
      }
    }
    errors {
      message
      path
    }
    success
  }
}
    `;
export type UpdateRgaShippingStatusMutationFn = ApolloReactCommon.MutationFunction<UpdateRgaShippingStatusMutation, UpdateRgaShippingStatusMutationVariables>;

    export function useUpdateRgaShippingStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRgaShippingStatusMutation, UpdateRgaShippingStatusMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateRgaShippingStatusMutation, UpdateRgaShippingStatusMutationVariables>(UpdateRgaShippingStatusDocument, baseOptions);
    }
export type UpdateRgaShippingStatusMutationHookResult = ReturnType<typeof useUpdateRgaShippingStatusMutation>;
export type UpdateRgaShippingStatusMutationResult = ApolloReactCommon.MutationResult<UpdateRgaShippingStatusMutation>;
export type UpdateRgaShippingStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRgaShippingStatusMutation, UpdateRgaShippingStatusMutationVariables>;
export const UpdateRgaStatusDocument = gql`
    mutation UpdateRgaStatus($id: ID!, $status: RGAStatus!, $notes: String) {
  response: updateRGAStatus(id: $id, status: $status, notes: $notes) {
    rga {
      id
      status
      submittedBy
      submittedOn
      shippingSpeed
      statusLog {
        status
        notes
        updatedOn
        updatedBy {
          name
          id
          email
        }
      }
    }
    errors {
      message
      path
    }
    success
  }
}
    `;
export type UpdateRgaStatusMutationFn = ApolloReactCommon.MutationFunction<UpdateRgaStatusMutation, UpdateRgaStatusMutationVariables>;

    export function useUpdateRgaStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRgaStatusMutation, UpdateRgaStatusMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateRgaStatusMutation, UpdateRgaStatusMutationVariables>(UpdateRgaStatusDocument, baseOptions);
    }
export type UpdateRgaStatusMutationHookResult = ReturnType<typeof useUpdateRgaStatusMutation>;
export type UpdateRgaStatusMutationResult = ApolloReactCommon.MutationResult<UpdateRgaStatusMutation>;
export type UpdateRgaStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRgaStatusMutation, UpdateRgaStatusMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($userInput: NewUserInput!) {
  response: createUser(userInput: $userInput) {
    user {
      id
      firstName
      lastName
      email
    }
    errors {
      message
      path
    }
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

    export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
    }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DestroyUserDocument = gql`
    mutation destroyUser($id: String!) {
  response: destroyUser(id: $id) {
    user {
      id
      firstName
      lastName
      email
    }
    errors {
      message
      path
    }
  }
}
    `;
export type DestroyUserMutationFn = ApolloReactCommon.MutationFunction<DestroyUserMutation, DestroyUserMutationVariables>;

    export function useDestroyUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyUserMutation, DestroyUserMutationVariables>) {
      return ApolloReactHooks.useMutation<DestroyUserMutation, DestroyUserMutationVariables>(DestroyUserDocument, baseOptions);
    }
export type DestroyUserMutationHookResult = ReturnType<typeof useDestroyUserMutation>;
export type DestroyUserMutationResult = ApolloReactCommon.MutationResult<DestroyUserMutation>;
export type DestroyUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyUserMutation, DestroyUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userInput: ExistingUserInput!) {
  response: updateUser(userInput: $userInput) {
    user {
      id
      firstName
      lastName
      email
    }
    errors {
      message
      path
    }
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

    export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
    }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserDocument = gql`
    query User($userId: String!) {
  user(id: $userId) {
    id
    email
    firstName
    lastName
  }
}
    `;

    export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
      return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
    }
      export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
      
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    firstName
    lastName
    email
  }
}
    `;

    export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
      return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
    }
      export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
      
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }

      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};

      export default result;
    