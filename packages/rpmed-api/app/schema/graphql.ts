import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** An image that can be associated to any another type. */
export type AttachedImage = {
  __typename?: 'AttachedImage';
  /** The unique ID or Key on AWS S3 representing the image. */
  id: Scalars['ID'];
  /** A pre-signed url to fetch this image from S3. */
  url?: Maybe<Scalars['String']>;
  /** The user defined sort priority for the attached image. */
  position: Scalars['Int'];
  /** The current upload status of the image regarding its availability on S3. */
  status: UploadStatus;
};

export type AttachedImageInput = {
  id: Scalars['ID'];
  status?: Maybe<UploadStatus>;
  position: Scalars['Int'];
};

/**
 * Used as an argument on any query incorporating the relay connection spec
 * to orchestrate paginated results
 */
export type ConnectionPayload = {
  /** The id of the item to fetch forward pagination. Use with first. */
  after?: Maybe<Scalars['ID']>;
  /** The id of the item to fetch backward pagination. Use with last. */
  before?: Maybe<Scalars['ID']>;
  /** A limit when performing forward pagination. */
  first?: Maybe<Scalars['Int']>;
  /** A limit when performing backward pagination. */
  last?: Maybe<Scalars['Int']>;
};

/** A customer of Riverpoint Medical. */
export type Customer = {
  __typename?: 'Customer';
  /** The unique identifier for this customer */
  id: Scalars['ID'];
  /** The email of the customer. */
  email?: Maybe<Scalars['String']>;
  /** The name of the customer. */
  name?: Maybe<Scalars['String']>;
  /** The phone number of the customer. */
  phone?: Maybe<Scalars['String']>;
  /** The street address for the customer. */
  street?: Maybe<Scalars['String']>;
  /** The street address (line 2) for the customer. */
  street2?: Maybe<Scalars['String']>;
  /** The city of the address for the customer. */
  city?: Maybe<Scalars['String']>;
  /** The state of the address for the customer. */
  state?: Maybe<Scalars['String']>;
  /** The zip of the address for the customer. */
  zip?: Maybe<Scalars['String']>;
  /** The country of the address for the customer. */
  country?: Maybe<Scalars['String']>;
  /** The specialty of the customer. */
  specialty?: Maybe<Scalars['String']>;
  /** The hospital of the customer. */
  hospital?: Maybe<Scalars['String']>;
};

/** The result of a mutation applied to a customer. */
export type CustomerMutationOutput = {
  __typename?: 'CustomerMutationOutput';
  /** The resulting customer if the operation was successful. */
  customer?: Maybe<Customer>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a customer or customers. */
export type CustomerQueryOutput = {
  __typename?: 'CustomerQueryOutput';
  /** The resulting customer if the operation was successful. */
  customer?: Maybe<Customer>;
  /** The resulting customers if the operation was successful and multiple results were returned. */
  customers?: Maybe<Array<Maybe<Customer>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A distributor of Riverpoint Medical. */
export type Distributor = {
  __typename?: 'Distributor';
  /** The unique identifier for this distributor */
  id: Scalars['ID'];
  /** The domain to match email addresses to via this distributor. */
  domain: Scalars['String'];
  /** The actual name of the distributor. */
  name?: Maybe<Scalars['String']>;
};

/** The result of a mutation applied to a distributor. */
export type DistributorMutationOutput = {
  __typename?: 'DistributorMutationOutput';
  /** The resulting distributor if the operation was successful. */
  distributor?: Maybe<Distributor>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a distributor or distributors. */
export type DistributorQueryOutput = {
  __typename?: 'DistributorQueryOutput';
  /** The resulting distributor if the operation was successful. */
  distributor?: Maybe<Distributor>;
  /** The resulting distributors if the operation was successful and multiple results were returned. */
  distributors?: Maybe<Array<Maybe<Distributor>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A set of fields used to create or update a customer. */
export type ExistingCustomerInput = {
  id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

/** A set of fields used to create or update a distributor. */
export type ExistingDistributorInput = {
  id: Scalars['ID'];
  domain: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

/** A set of fields used to create or update a registration. */
export type ExistingProductRegistrationInput = {
  id: Scalars['ID'];
  /** The id of the customer associated to the registration. */
  customerId: Scalars['String'];
  /** The model number for representing the specific product configuration being registered. */
  modelNumber: Scalars['String'];
  /** The serial number associate to the product if it is lotted. */
  serial?: Maybe<Scalars['String']>;
  /** The date the product was registered. */
  registeredOn: Scalars['String'];
};

/** A set of fields used to create or update a symptom. */
export type ExistingProductSymptomInput = {
  id: Scalars['ID'];
  faultCode?: Maybe<Scalars['String']>;
  fee?: Maybe<Scalars['Boolean']>;
  preApproved?: Maybe<Scalars['Boolean']>;
  careTip?: Maybe<Scalars['String']>;
  solution?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** A set of fields used to update certain aspects of an RGA. */
export type ExistingRgaInput = {
  /** The id of the RGA. */
  id: Scalars['String'];
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed: Scalars['String'];
};

/** A set of fields used to create or update a user. */
export type ExistingUserInput = {
  id: Scalars['ID'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

/** Pricing for fees associated to a repair. */
export type FeeStructure = {
  __typename?: 'FeeStructure';
  /** Internal cost pricing for distributors. */
  distributor?: Maybe<Scalars['String']>;
  /** Public pricing for end users. */
  endUser?: Maybe<Scalars['String']>;
};

/** Pricing for fees associated to a repair. */
export type FeeStructureInput = {
  /** Internal cost pricing for distributors. */
  distributor?: Maybe<Scalars['String']>;
  /** Public pricing for end users. */
  endUser?: Maybe<Scalars['String']>;
};

export type ModelNumber = {
  __typename?: 'ModelNumber';
  /** The model number identifying a product variant. */
  id: Scalars['ID'];
  /** Pricing for this specific model. */
  pricing?: Maybe<Pricing>;
  /** The ids of the product(s) this variant can be associated with. */
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The product(s) this variant can be associated with. */
  products?: Maybe<Array<Maybe<Product>>>;
  /** The high level category for this model number. */
  productType?: Maybe<ProductType>;
  /** A brief description of this product variant. */
  description?: Maybe<Scalars['String']>;
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted?: Maybe<Scalars['Boolean']>;
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm?: Maybe<Scalars['Int']>;
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: Maybe<Scalars['String']>;
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: Maybe<Scalars['String']>;
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: Maybe<Scalars['String']>;
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty?: Maybe<FeeStructure>;
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty?: Maybe<FeeStructure>;
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>;
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>;
  /** If a product model is not publicly viewableit will not show up on forms for a customer. */
  publiclyViewable?: Maybe<Scalars['Boolean']>;
  /** A list of all associated symptoms related to this model number. */
  symptoms?: Maybe<Array<Maybe<ProductSymptom>>>;
};

/** Describes a model number to be created or updated. */
export type ModelNumberInput = {
  /** The model number identifying a product variant. */
  id: Scalars['ID'];
  /** The ids of the products this variant belongs to. */
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The high level category type this product belongs to. */
  productType?: Maybe<ProductType>;
  /** Pricing for this specific model. */
  pricing?: Maybe<PricingInput>;
  /** A brief description of this product variant. */
  description?: Maybe<Scalars['String']>;
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted?: Maybe<Scalars['Boolean']>;
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm?: Maybe<Scalars['Int']>;
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: Maybe<Scalars['String']>;
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty?: Maybe<FeeStructureInput>;
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty?: Maybe<FeeStructureInput>;
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: Maybe<Scalars['String']>;
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: Maybe<Scalars['String']>;
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>;
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>;
  /** If a product model is not publicly viewable it will not show up on forms for a customer. */
  publiclyViewable?: Maybe<Scalars['Boolean']>;
};

/** The result of a mutation applied to a ModelNumber. */
export type ModelNumberMutationOutput = {
  __typename?: 'ModelNumberMutationOutput';
  /** The resulting model if the operation was successful. */
  modelNumber?: Maybe<ModelNumber>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a modelNumber or modelNumbers. */
export type ModelNumberQueryOutput = {
  __typename?: 'ModelNumberQueryOutput';
  /** The resulting model number if the operation was successful. */
  modelNumber?: Maybe<ModelNumber>;
  /** The resulting model numbers if the operation was successful and multiple results were returned. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumber>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A subset of the model number type */
export type ModelNumberSymptomDetail = {
  __typename?: 'ModelNumberSymptomDetail';
  /** The model number identifying a product variant. */
  id: Scalars['ID'];
  /** The id of the product this variant belongs to. */
  productId: Scalars['String'];
  /** All associated symptoms related to this model number. */
  symptoms: Array<Maybe<ProductSymptom>>;
};

/** The root mutation for the schema. */
export type Mutation = {
  __typename?: 'Mutation';
  version: Scalars['String'];
  /** Creates a new customer. */
  createCustomer: CustomerMutationOutput;
  /** Updates an existing customer. */
  updateCustomer: CustomerMutationOutput;
  /** Removes an existing customer. */
  destroyCustomer: CustomerMutationOutput;
  /** Creates a new distributor. */
  createDistributor: DistributorMutationOutput;
  /** Updates an existing distributor. */
  updateDistributor: DistributorMutationOutput;
  /** Removes an existing distributor. */
  destroyDistributor: DistributorMutationOutput;
  /** Adds a new product. */
  createProduct: ProductMutationOutput;
  /** Updates an existing product. */
  updateProduct: ProductMutationOutput;
  /** Removes an existing product. */
  destroyProduct: ProductMutationOutput;
  /** Adds a new product variant. */
  createModelNumber: ModelNumberMutationOutput;
  /** Updates an existing product variant. */
  updateModelNumber: ModelNumberMutationOutput;
  /** Updates an existing product variant's lotted status. */
  updateModelNumberLotted: ModelNumberMutationOutput;
  /** Updates an existing product variant's lotted status. */
  updateModelNumberViewable: ModelNumberMutationOutput;
  /** Removes an existing product variant. */
  destroyModelNumber: ModelNumberMutationOutput;
  /** Creates a new registration. */
  createProductRegistration: ProductRegistrationMutationOutput;
  /** Updates an existing registration. */
  updateProductRegistration: ProductRegistrationMutationOutput;
  /** Removes an existing registration. */
  destroyProductRegistration: ProductRegistrationMutationOutput;
  /** Creates a new symptom. */
  createProductSymptom: ProductSymptomMutationOutput;
  /** Updates an existing symptom. */
  updateProductSymptom: ProductSymptomMutationOutput;
  /** Removes an existing symptom. */
  destroyProductSymptom: ProductSymptomMutationOutput;
  /** Links an existing model number to an existing symptom. */
  linkSymptomToModel: ProductSymptomMutationOutput;
  /** Attaches / removes a images to a product symptom. */
  attachImagesToSymptom: ProductSymptomMutationOutput;
  /** Creates a new authenticatable user. */
  createUser: UserMutationOutput;
  /** Updates an existing user. */
  updateUser: UserMutationOutput;
  /** Removes an existing user. */
  destroyUser: UserMutationOutput;
  /** Resets the password for the current user dependent on a temporary access token. */
  resetPassword: UserMutationOutput;
  /** Returns a set of upload endpoints from AWS S3. */
  createUploads: UploadMutationOutput;
  /** Creates a new RGA. */
  createRGA: RgaMutationOutput;
  /** Updates an existing RGA. */
  updateRGA: RgaMutationOutput;
  /** Updates the status of a specific RGA. */
  updateRGAStatus: RgaMutationOutput;
  /** Allows an end user to submit an RGA Good for review by the RPMed Internal Team. */
  submitRGAForReview: RgaMutationOutput;
  /** Updates the shipping status of a specific RGA. */
  updateRGAShippingStatus: RgaMutationOutput;
  /** Creates a new good for an existing RGA. */
  createRGAGood: RgaGoodMutationOutput;
  /** Updates an existing good for an existing RGA. */
  updateRGAGood: RgaGoodMutationOutput;
  /** Removes an existing RGA good. */
  destroyRGAGood: RgaGoodMutationOutput;
};


/** The root mutation for the schema. */
export type MutationCreateCustomerArgs = {
  customerInput: NewCustomerInput;
};


/** The root mutation for the schema. */
export type MutationUpdateCustomerArgs = {
  customerInput: ExistingCustomerInput;
};


/** The root mutation for the schema. */
export type MutationDestroyCustomerArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationCreateDistributorArgs = {
  distributorInput: NewDistributorInput;
};


/** The root mutation for the schema. */
export type MutationUpdateDistributorArgs = {
  distributorInput: ExistingDistributorInput;
};


/** The root mutation for the schema. */
export type MutationDestroyDistributorArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationCreateProductArgs = {
  productInput: ProductInput;
};


/** The root mutation for the schema. */
export type MutationUpdateProductArgs = {
  productInput: ProductInput;
};


/** The root mutation for the schema. */
export type MutationDestroyProductArgs = {
  id: Scalars['ID'];
};


/** The root mutation for the schema. */
export type MutationCreateModelNumberArgs = {
  modelNumberInput: ModelNumberInput;
};


/** The root mutation for the schema. */
export type MutationUpdateModelNumberArgs = {
  modelNumberInput: ModelNumberInput;
};


/** The root mutation for the schema. */
export type MutationUpdateModelNumberLottedArgs = {
  id: Scalars['ID'];
  lotted: Scalars['Boolean'];
};


/** The root mutation for the schema. */
export type MutationUpdateModelNumberViewableArgs = {
  id: Scalars['ID'];
  publiclyViewable: Scalars['Boolean'];
};


/** The root mutation for the schema. */
export type MutationDestroyModelNumberArgs = {
  id: Scalars['ID'];
};


/** The root mutation for the schema. */
export type MutationCreateProductRegistrationArgs = {
  productRegistrationInput: NewProductRegistrationInput;
};


/** The root mutation for the schema. */
export type MutationUpdateProductRegistrationArgs = {
  productRegistrationInput: ExistingProductRegistrationInput;
};


/** The root mutation for the schema. */
export type MutationDestroyProductRegistrationArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationCreateProductSymptomArgs = {
  productSymptomInput: NewProductSymptomInput;
};


/** The root mutation for the schema. */
export type MutationUpdateProductSymptomArgs = {
  productSymptomInput: ExistingProductSymptomInput;
};


/** The root mutation for the schema. */
export type MutationDestroyProductSymptomArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationLinkSymptomToModelArgs = {
  modelNumber: Scalars['String'];
  symptomId: Scalars['String'];
  linked: Scalars['Boolean'];
};


/** The root mutation for the schema. */
export type MutationAttachImagesToSymptomArgs = {
  symptomId: Scalars['String'];
  attachedImages: Array<Maybe<AttachedImageInput>>;
};


/** The root mutation for the schema. */
export type MutationCreateUserArgs = {
  userInput: NewUserInput;
};


/** The root mutation for the schema. */
export type MutationUpdateUserArgs = {
  userInput: ExistingUserInput;
};


/** The root mutation for the schema. */
export type MutationDestroyUserArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationResetPasswordArgs = {
  password: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationCreateUploadsArgs = {
  uploadInput: UploadInput;
};


/** The root mutation for the schema. */
export type MutationCreateRgaArgs = {
  rgaInput: NewRgaInput;
};


/** The root mutation for the schema. */
export type MutationUpdateRgaArgs = {
  rgaInput: ExistingRgaInput;
};


/** The root mutation for the schema. */
export type MutationUpdateRgaStatusArgs = {
  id: Scalars['ID'];
  status: RgaStatus;
  notes?: Maybe<Scalars['String']>;
};


/** The root mutation for the schema. */
export type MutationSubmitRgaForReviewArgs = {
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
};


/** The root mutation for the schema. */
export type MutationUpdateRgaShippingStatusArgs = {
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  shippingUpdates?: Maybe<Array<Maybe<RgaGoodShippingInput>>>;
};


/** The root mutation for the schema. */
export type MutationCreateRgaGoodArgs = {
  rgaId: Scalars['String'];
  rgaGoodInput: RgaGoodInput;
};


/** The root mutation for the schema. */
export type MutationUpdateRgaGoodArgs = {
  id: Scalars['ID'];
  rgaId: Scalars['String'];
  rgaGoodInput: RgaGoodInput;
};


/** The root mutation for the schema. */
export type MutationDestroyRgaGoodArgs = {
  id: Scalars['ID'];
  rgaId: Scalars['String'];
};

/** A set of fields used to create or update a customer. */
export type NewCustomerInput = {
  /** The email of the customer. */
  email: Scalars['String'];
  /** The name of the customer. */
  name?: Maybe<Scalars['String']>;
  /** The phone number of the customer. */
  phone?: Maybe<Scalars['String']>;
  /** The street address for the customer. */
  street?: Maybe<Scalars['String']>;
  /** The street address (line 2) for the customer. */
  street2?: Maybe<Scalars['String']>;
  /** The city of the address for the customer. */
  city?: Maybe<Scalars['String']>;
  /** The state of the address for the customer. */
  state?: Maybe<Scalars['String']>;
  /** The zip of the address for the customer. */
  zip?: Maybe<Scalars['String']>;
  /** The country of the address for the customer. */
  country?: Maybe<Scalars['String']>;
  /** The specialty of the customer. */
  specialty?: Maybe<Scalars['String']>;
};

/** A set of fields used to create or update a distributor. */
export type NewDistributorInput = {
  domain: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

/** A set of fields used to create or update a registration. */
export type NewProductRegistrationInput = {
  /** The id of the customer associated to the registration. */
  customerId: Scalars['String'];
  /** The model number for representing the specific product configuration being registered. */
  modelNumber: Scalars['String'];
  /** The serial number associate to the product if it is lotted. */
  serial?: Maybe<Scalars['String']>;
  /** The date the product was registered. */
  registeredOn: Scalars['String'];
};

/** A set of fields used to create or update a symptom. */
export type NewProductSymptomInput = {
  faultCode?: Maybe<Scalars['String']>;
  fee?: Maybe<Scalars['Boolean']>;
  preApproved?: Maybe<Scalars['Boolean']>;
  careTip?: Maybe<Scalars['String']>;
  solution?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** A set of fields used to create an RGA. */
export type NewRgaInput = {
  /** The email address of the contact who created the RGA. */
  submittedBy: Scalars['String'];
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String'];
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>;
};

/** A set of fields used to create or update a user. */
export type NewUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Indicates whether or not there is a next page after this connection result. */
  hasNextPage: Scalars['Boolean'];
  /** Returns any available pages after to the current set based on the limit. */
  hasNextPages: Array<Maybe<PaginationEntry>>;
  /** Indicates whether or not there is a previous page before this connection result. */
  hasPreviousPage: Scalars['Boolean'];
  /** Returns any available pages prior to the current set based on the limit. */
  hasPreviousPages: Array<Maybe<PaginationEntry>>;
  /** The cursor representing the id of the first item in the connection result. */
  startCursor: Scalars['ID'];
  /** The cursor representing the id of the last item in the connection result. */
  endCursor: Scalars['ID'];
};


/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfoHasNextPagesArgs = {
  amount: Scalars['Int'];
};


/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfoHasPreviousPagesArgs = {
  amount: Scalars['Int'];
};

/** A description of a pagination destination to fetch additional paginated results. */
export type PaginationEntry = {
  __typename?: 'PaginationEntry';
  /** The id of the entry to use for the pagination request. */
  cursor: Scalars['ID'];
};

/** Pricing for a product model variant. */
export type Pricing = {
  __typename?: 'Pricing';
  /** Internal cost pricing for distributors. */
  cost?: Maybe<Scalars['String']>;
  /** Public pricing for end users. */
  retail?: Maybe<Scalars['String']>;
};

/** Pricing for a product model variant. */
export type PricingInput = {
  /** Internal cost pricing for distributors. */
  cost?: Maybe<Scalars['String']>;
  /** Public pricing for end users. */
  retail?: Maybe<Scalars['String']>;
};

/** A registered user object from API. Could be a customer, admin, or partner account. */
export type Product = {
  __typename?: 'Product';
  /** The unique identifier for this product */
  id: Scalars['ID'];
  /** The name of this product. */
  name: Scalars['String'];
  /** A brief description of this product. */
  description: Scalars['String'];
  /** All available variations or configurations of this product. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumber>>>;
};

/** Describes a product to be created or updated. */
export type ProductInput = {
  /** The unique identifier for this product */
  id?: Maybe<Scalars['ID']>;
  /** The name of this product. */
  name: Scalars['String'];
  /** A brief description of this product. */
  description: Scalars['String'];
};

/** The result of a mutation applied to a Product. */
export type ProductMutationOutput = {
  __typename?: 'ProductMutationOutput';
  /** The resulting model if the operation was successful. */
  product?: Maybe<Product>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a product or products. */
export type ProductQueryOutput = {
  __typename?: 'ProductQueryOutput';
  /** The resulting product if the operation was successful. */
  product?: Maybe<Product>;
  /** The resulting products if the operation was successful and multiple results were returned. */
  products?: Maybe<Array<Maybe<Product>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A troubleshooting registration for a product. */
export type ProductRegistration = {
  __typename?: 'ProductRegistration';
  /** The unique identifier for this registration */
  id: Scalars['ID'];
  /** The date the product was registered. */
  registeredOn: Scalars['String'];
  /** The customer profile associated to the registration. */
  customer: Customer;
  /** The id of the customer the product has been registered. */
  customerId: Scalars['String'];
  /** The id of the product that has been registered. */
  productId: Scalars['String'];
  /** The the model number of the product that has been registered. */
  modelNumber: Scalars['String'];
  /** The serial number associated to the product if applicable. */
  serial?: Maybe<Scalars['String']>;
  /** Indicates whether or not the registration belongs to a lotted model number. */
  lotted?: Maybe<Scalars['Boolean']>;
};

/** The result of a mutation applied to a registration. */
export type ProductRegistrationMutationOutput = {
  __typename?: 'ProductRegistrationMutationOutput';
  /** The resulting registration if the operation was successful. */
  productRegistration?: Maybe<ProductRegistration>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a registration or registrations. */
export type ProductRegistrationQueryOutput = {
  __typename?: 'ProductRegistrationQueryOutput';
  /** The resulting registration if the operation was successful. */
  productRegistration?: Maybe<ProductRegistration>;
  /** The resulting registrations if the operation was successful and multiple results were returned. */
  productRegistrations?: Maybe<Array<Maybe<ProductRegistration>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A troubleshooting symptom for a product. */
export type ProductSymptom = {
  __typename?: 'ProductSymptom';
  /** The unique identifier for this symptom */
  id: Scalars['ID'];
  /** The actual name of the symptom. */
  name: Scalars['String'];
  /** A hint or maintenance tip to prevent the symptom. */
  careTip?: Maybe<Scalars['String']>;
  /** A description of the symptom and/or it's cause in detail. */
  synopsis?: Maybe<Scalars['String']>;
  /** A solution to resolve the symptom. */
  solution?: Maybe<Scalars['String']>;
  /** Indicates if there is an associated fee for servicing this issue. */
  fee: Scalars['Boolean'];
  /** Indicates whether or not this is a pre-approved repair regardless of warranty. */
  preApproved: Scalars['Boolean'];
  /** An official code used to identify this symptom. */
  faultCode?: Maybe<Scalars['String']>;
  /** A list of all associated model numbers related to this symptom. */
  associatedModelNumbers: Array<Maybe<Scalars['String']>>;
  /** The resulting symptoms if the operation was successful and multiple results were returned. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumberSymptomDetail>>>;
  /** An array of attached images hosted via AWS S3. */
  attachedImages?: Maybe<Array<Maybe<AttachedImage>>>;
};

/** The result of a mutation applied to a symptom. */
export type ProductSymptomMutationOutput = {
  __typename?: 'ProductSymptomMutationOutput';
  /** The resulting symptom if the operation was successful. */
  productSymptom?: Maybe<ProductSymptom>;
  /** The resulting details for the associated model number if am association operation was successful. */
  modelNumber?: Maybe<ModelNumberSymptomDetail>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a symptom or symptoms. */
export type ProductSymptomQueryOutput = {
  __typename?: 'ProductSymptomQueryOutput';
  /** The resulting symptom if the operation was successful. */
  productSymptom?: Maybe<ProductSymptom>;
  /** The resulting symptoms if the operation was successful and multiple results were returned. */
  productSymptoms?: Maybe<Array<Maybe<ProductSymptom>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};


/** The result of a query for a symptom or symptoms. */
export type ProductSymptomQueryOutputProductSymptomsArgs = {
  modelNumber?: Maybe<Scalars['String']>;
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
  __typename?: 'Query';
  version: Scalars['String'];
  /** All customers in the system */
  customers: CustomerQueryOutput;
  /** A specific customer in the system via ID. */
  customer: CustomerQueryOutput;
  /** All distributors in the system */
  distributors: DistributorQueryOutput;
  /** A specific distributor in the system via ID. */
  distributor: DistributorQueryOutput;
  /** All products in the system. */
  products?: Maybe<ProductQueryOutput>;
  /** All product variants in the system. */
  modelNumbers?: Maybe<ModelNumberQueryOutput>;
  /** A specific product in the system via ID. */
  product?: Maybe<ProductQueryOutput>;
  /** A specific model number in the system via ID. */
  modelNumber?: Maybe<ModelNumberQueryOutput>;
  /** All registrations in the system */
  productRegistrations: ProductRegistrationQueryOutput;
  /** A specific registration in the system via ID. */
  productRegistration: ProductRegistrationQueryOutput;
  /** All symptoms in the system */
  productSymptoms: ProductSymptomQueryOutput;
  /** A specific symptom in the system via ID. */
  productSymptom: ProductSymptomQueryOutput;
  /** All users in the system */
  users?: Maybe<Array<Maybe<User>>>;
  /** A specific user in the system via ID. */
  user?: Maybe<User>;
  /** A specific user in the system via email address. */
  userWithEmail?: Maybe<User>;
  info?: Maybe<Scalars['String']>;
  /** All RGAs in the system */
  rgas: RgaQueryOutput;
  /** Query the total for any filtered output. */
  rgaCount: RgaStatusCountOutput;
  /** A specific RGA in the system via ID. */
  rga: RgaQueryOutput;
};


/** The root query for the schema. */
export type QueryCustomersArgs = {
  search?: Maybe<Scalars['String']>;
};


/** The root query for the schema. */
export type QueryCustomerArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryDistributorArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryProductsArgs = {
  search?: Maybe<Scalars['String']>;
};


/** The root query for the schema. */
export type QueryModelNumbersArgs = {
  search?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productType?: Maybe<ProductType>;
  symptom?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
};


/** The root query for the schema. */
export type QueryProductArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryModelNumberArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryProductRegistrationArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryProductSymptomsArgs = {
  search?: Maybe<Scalars['String']>;
  modelNumber?: Maybe<Scalars['String']>;
};


/** The root query for the schema. */
export type QueryProductSymptomArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryUserArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryUserWithEmailArgs = {
  email: Scalars['String'];
};


/** The root query for the schema. */
export type QueryRgasArgs = {
  status?: Maybe<RgaStatus>;
};


/** The root query for the schema. */
export type QueryRgaArgs = {
  id: Scalars['String'];
};

/** A Request Goods Authorization. */
export type Rga = {
  __typename?: 'RGA';
  /** The unique identifier for this RGA. */
  id: Scalars['ID'];
  /** The current state of the request. */
  status: RgaStatus;
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String'];
  /** The email address of the user whom submitted the RGA. */
  submittedBy: Scalars['String'];
  /** The distributor associated to the the RGA. */
  distributor: Distributor;
  /** The goods associated to the the RGA. */
  goods: Array<Maybe<RgaGood>>;
  /** A log of all updates to this RGAs status. */
  statusLog?: Maybe<Array<Maybe<RgaStatusUpdate>>>;
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>;
};

/** A good associated to a particular RGA. */
export type RgaGood = {
  __typename?: 'RGAGood';
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID'];
  /** The RGA this good is assigned to. */
  rgaId: Scalars['String'];
  /** The unique service id for this good. */
  serviceId?: Maybe<Scalars['String']>;
  /** The model number for representing the specific product configuration for this good. */
  modelNumber?: Maybe<Scalars['String']>;
  /** Indicates whether or not the model was considered to be lotted. */
  lotted?: Maybe<Scalars['Boolean']>;
  /** The current status of the good. */
  status?: Maybe<RgaGoodStatus>;
  /** Indicates whether or not this product is currently under warranty. */
  warrantied?: Maybe<Scalars['Boolean']>;
  /** Indicates whether or not an SSD is applicable to this good. */
  ssd?: Maybe<Scalars['Boolean']>;
  /** Indicates the details of the associated products warranty. */
  warrantyDescription?: Maybe<Scalars['String']>;
  /** Indicates the number of months the associated product was warrantied for. */
  warrantyTerm?: Maybe<Scalars['Int']>;
  /** The symptom / reason this product is being returned. */
  symptomId?: Maybe<Scalars['String']>;
  /** The current description of the symptom. */
  symptomDescription?: Maybe<Scalars['String']>;
  /** Indicates whether or not the resolution for the symptom was a pre-approved repair. */
  preApproved?: Maybe<Scalars['Boolean']>;
  /** The fault code associated to the prescribed symptom. */
  faultCode?: Maybe<Scalars['String']>;
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>;
  /** A new serial number if the unit was replaced. */
  newSerial?: Maybe<Scalars['String']>;
  /** Indicates the product type for this good. */
  productType?: Maybe<ProductType>;
  /** Indicates the name of product family this good. */
  productName?: Maybe<Scalars['String']>;
  /** Indicates the product family this good. */
  productId?: Maybe<Scalars['String']>;
  /** The proposed resolution the issue affecting this good. */
  resolution?: Maybe<Scalars['String']>;
  /** The synopsis of the associated symptom. */
  symptomSynopsis?: Maybe<Scalars['String']>;
  /** The solution for associated symptom. */
  symptomSolution?: Maybe<Scalars['String']>;
  /** The fee involved for resolving this issue. */
  resolutionFee?: Maybe<FeeStructure>;
  /** The associated RMA from our distributor / partner's records. */
  rma?: Maybe<Scalars['String']>;
  /** The associated PO from our distributor / partner's records. */
  po?: Maybe<Scalars['String']>;
  /** A URL to download a generated PDF of the associated customerletter. */
  customerLetterUrl?: Maybe<Scalars['String']>;
  /** A URL to download a generated PDF of the associated service form. */
  serviceFormUrl?: Maybe<Scalars['String']>;
  /** Any additional notes about this good specifically.. */
  notes?: Maybe<Scalars['String']>;
  /** The id of the customer if the product has been registered to a user. */
  customerId?: Maybe<Scalars['String']>;
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: Maybe<Scalars['String']>;
  /** The email of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>;
  /** The phone number of the customer this good belongs to. */
  customerPhone?: Maybe<Scalars['String']>;
  /** The street address for the customer this good belongs to. */
  customerStreet?: Maybe<Scalars['String']>;
  /** The street address (line 2) for the customer this good belongs to. */
  customerStreet2?: Maybe<Scalars['String']>;
  /** The city of the address for the customer this good belongs to. */
  customerCity?: Maybe<Scalars['String']>;
  /** The state of the address for the customer this good belongs to. */
  customerState?: Maybe<Scalars['String']>;
  /** The zip of the address for the customer this good belongs to. */
  customerZip?: Maybe<Scalars['String']>;
  /** The country of the address for the customer this good belongs to. */
  customerCountry?: Maybe<Scalars['String']>;
  /** The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerSpecialty?: Maybe<Scalars['String']>;
  /** The preferred shipping speed assigned to return this good to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>;
  /** The tracking number associated to the return shipment. */
  tracking?: Maybe<Scalars['String']>;
  /** The carrier used to transport the return shipment. */
  carrier?: Maybe<RgaShippingCarrier>;
  /** The original date of purchase if known. */
  datePurchased?: Maybe<Scalars['String']>;
  /** The disposition of the good after evaluation. */
  disposition?: Maybe<Scalars['String']>;
  /** Any additional comments for the service letter. */
  additionalComments?: Maybe<Scalars['String']>;
};

/** The input to make changes to an existing RGA Good. */
export type RgaGoodInput = {
  /** The model number for representing the specific product configuration for this good. */
  modelNumber?: Maybe<Scalars['String']>;
  /** Indicates whether or not the model was considered to be lotted. */
  lotted?: Maybe<Scalars['Boolean']>;
  /** The current status of the good. */
  status?: Maybe<RgaGoodStatus>;
  /** Indicates whether or not this product is currently under warranty. */
  warrantied?: Maybe<Scalars['Boolean']>;
  /** Indicates the details of the associated products warranty. */
  warrantyDescription?: Maybe<Scalars['String']>;
  /** Indicates the number of months the associated product was warrantied for. */
  warrantyTerm?: Maybe<Scalars['Int']>;
  /** The symptom / reason this product is being returned. */
  symptomId?: Maybe<Scalars['String']>;
  /** The current description of the symptom. */
  symptomDescription?: Maybe<Scalars['String']>;
  /** Indicates whether or not the resolution for the symptom was a pre-approved repair. */
  preApproved?: Maybe<Scalars['Boolean']>;
  /** The fault code associated to the prescribed symptom. */
  faultCode?: Maybe<Scalars['String']>;
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>;
  /** A new serial number if the unit was replaced. */
  newSerial?: Maybe<Scalars['String']>;
  /** Indicates the product type for this good. */
  productType?: Maybe<ProductType>;
  /** Indicates the name of product family this good. */
  productName?: Maybe<Scalars['String']>;
  /** Indicates the product family this good. */
  productId?: Maybe<Scalars['String']>;
  /** The proposed resolution the issue affecting this good. */
  resolution?: Maybe<Scalars['String']>;
  /** The fee involved for resolving this issue. */
  resolutionFee?: Maybe<FeeStructureInput>;
  /** The synopsis of the associated symptom. */
  symptomSynopsis?: Maybe<Scalars['String']>;
  /** The solution for associated symptom. */
  symptomSolution?: Maybe<Scalars['String']>;
  /** The associated RMA from our distributor / partner's records. */
  rma?: Maybe<Scalars['String']>;
  /** The associated PO from our distributor / partner's records. */
  po?: Maybe<Scalars['String']>;
  /** Any additional notes about this good specifically.. */
  notes?: Maybe<Scalars['String']>;
  /** The id of the customer if the product has been registered to a user. */
  customerId?: Maybe<Scalars['String']>;
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: Maybe<Scalars['String']>;
  /** The email of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>;
  /** The phone number of the customer this good belongs to. */
  customerPhone?: Maybe<Scalars['String']>;
  /** The street address for the customer this good belongs to. */
  customerStreet?: Maybe<Scalars['String']>;
  /** The street address (line 2) for the customer this good belongs to. */
  customerStreet2?: Maybe<Scalars['String']>;
  /** The city of the address for the customer this good belongs to. */
  customerCity?: Maybe<Scalars['String']>;
  /** The state of the address for the customer this good belongs to. */
  customerState?: Maybe<Scalars['String']>;
  /** The zip of the address for the customer this good belongs to. */
  customerZip?: Maybe<Scalars['String']>;
  /** The country of the address for the customer this good belongs to. */
  customerCountry?: Maybe<Scalars['String']>;
  /** The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerSpecialty?: Maybe<Scalars['String']>;
  /** The preferred shipping speed assigned to return this good to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>;
  /** The original date of purchase if known. */
  datePurchased?: Maybe<Scalars['String']>;
  /** The disposition of the good after evaluation. */
  disposition?: Maybe<Scalars['String']>;
  /** Indicates whether or not an SSD is applicable to this good. */
  ssd?: Maybe<Scalars['Boolean']>;
  /** Any additional comments for the service letter. */
  additionalComments?: Maybe<Scalars['String']>;
};

/** The result of a mutation applied to a RGA. */
export type RgaGoodMutationOutput = {
  __typename?: 'RGAGoodMutationOutput';
  /** The id the resulting RGA Good belongs to if the operation was successful. */
  rgaId?: Maybe<Scalars['String']>;
  /** The resulting RGA Good if the operation was successful. */
  rgaGood?: Maybe<RgaGood>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The input to apply a shipping update make changes to an existing RGA Good. */
export type RgaGoodShippingInput = {
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID'];
  /** A list of email addresses to notify the shipping alert / tracking message. */
  recipients?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The shipping status for the good. */
  status: RgaShippingStatus;
  /** The message to email to all specified recipients */
  message?: Maybe<Scalars['String']>;
  /** The tracking number associated to the return shipment. */
  tracking?: Maybe<Scalars['String']>;
  /** The carrier used to transport the return shipment. */
  carrier?: Maybe<RgaShippingCarrier>;
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
  __typename?: 'RGAMutationOutput';
  /** The resulting RGA if the operation was successful. */
  rga?: Maybe<Rga>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a RGA or RGAs. */
export type RgaQueryOutput = {
  __typename?: 'RGAQueryOutput';
  /** The resulting RGA if the operation was successful. */
  rga?: Maybe<Rga>;
  /** The resulting RGAs if the operation was successful and multiple results were returned. */
  rgas?: Maybe<Array<Maybe<Rga>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
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
   */
  Issued = 'ISSUED',
  /**
   * The customer has confirmed the goods associated to the request and
   * RPMED is awaiting the delivery of the customer's package.
   */
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
   */
  Canceled = 'CANCELED',
  /**
   * Indicates the RGA may have partially shipped but still has some pending
   * items that have been delayed.
   */
  Delayed = 'DELAYED'
}

/** A list of totals for any given rga status. */
export type RgaStatusCountOutput = {
  __typename?: 'RGAStatusCountOutput';
  /** Count of all issued RGAs that may not have been shipped. */
  issued?: Maybe<Scalars['Int']>;
  /** Count of all RGAs that have delayed items. */
  delayed?: Maybe<Scalars['Int']>;
  /** Count of all RGAs awaiting arrival. */
  awaitingArrival?: Maybe<Scalars['Int']>;
  /** Count of all received RGAs that have not yet been assessed. */
  received?: Maybe<Scalars['Int']>;
  /** Count of all RGAs currently being assessed. */
  assessing?: Maybe<Scalars['Int']>;
  /** Count of all RGAs currently being repaired. */
  repairing?: Maybe<Scalars['Int']>;
  /** Count of all RGAs being shipped back to customers. */
  shipping?: Maybe<Scalars['Int']>;
  /** Count of all closed RGAs. */
  closed?: Maybe<Scalars['Int']>;
  /** Count of all canceled RGAs. */
  canceled?: Maybe<Scalars['Int']>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
};

/** A description of a status update for a given RGA. */
export type RgaStatusUpdate = {
  __typename?: 'RGAStatusUpdate';
  /** The new status the request was assigned. */
  status?: Maybe<RgaStatus>;
  /** Any notes describing what happened to the request during this update. */
  notes?: Maybe<Scalars['String']>;
  /** Details about who made this update. */
  updatedBy?: Maybe<UpdateProfile>;
  /** An ISO string representing when this update occurred. */
  updatedOn?: Maybe<Scalars['String']>;
};

export type UpdateProfile = {
  __typename?: 'UpdateProfile';
  /** The id of the user who made the update. */
  id?: Maybe<Scalars['String']>;
  /** The name of the user who made the update. */
  name?: Maybe<Scalars['String']>;
  /** The email address of the user who made the update. */
  email?: Maybe<Scalars['String']>;
};

/** A set of file keys to generate S3 endpoint URLS for. */
export type UploadInput = {
  keys: Array<Maybe<Scalars['String']>>;
};

/** The result of a mutation applied to a customer. */
export type UploadMutationOutput = {
  __typename?: 'UploadMutationOutput';
  /** The resulting customer if the operation was successful. */
  uploads?: Maybe<Array<Maybe<UploadUrl>>>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** Indicates whether or not an image is currently transferring, available, or even deleted. */
export enum UploadStatus {
  Pending = 'PENDING',
  Available = 'AVAILABLE',
  Deleted = 'DELETED'
}

export type UploadUrl = {
  __typename?: 'UploadURL';
  /** The unique file key to use on AWS S3. */
  id: Scalars['ID'];
  /** The endpoint to utilize for uploading the associated file key/id to AWS S3. */
  url: Scalars['String'];
};

/** A registered user object from API. Could be a customer, admin, or partner account. */
export type User = {
  __typename?: 'User';
  /** The unique identifier for this user */
  id: Scalars['ID'];
  /** The email address for this user. */
  email: Scalars['String'];
  /** The actual first name of the user. */
  firstName?: Maybe<Scalars['String']>;
  /** The actual last name of the user. */
  lastName?: Maybe<Scalars['String']>;
};

/** The result of a mutation applied to a user. */
export type UserMutationOutput = {
  __typename?: 'UserMutationOutput';
  /** The resulting user if the operation was successful. */
  user?: Maybe<User>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A validation error that provides details for an unsuccesful mutation or query. */
export type ValidationError = {
  __typename?: 'ValidationError';
  /** A path indicating the attribute that failed validation. */
  path: Scalars['String'];
  /** A brief description of why the specified attribute failed validation. */
  message: Scalars['String'];
};


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CustomerQueryOutput: ResolverTypeWrapper<CustomerQueryOutput>;
  Customer: ResolverTypeWrapper<Customer>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DistributorQueryOutput: ResolverTypeWrapper<DistributorQueryOutput>;
  Distributor: ResolverTypeWrapper<Distributor>;
  ProductQueryOutput: ResolverTypeWrapper<ProductQueryOutput>;
  Product: ResolverTypeWrapper<Product>;
  ModelNumber: ResolverTypeWrapper<ModelNumber>;
  Pricing: ResolverTypeWrapper<Pricing>;
  ProductType: ProductType;
  FeeStructure: ResolverTypeWrapper<FeeStructure>;
  ProductSymptom: ResolverTypeWrapper<ProductSymptom>;
  ModelNumberSymptomDetail: ResolverTypeWrapper<ModelNumberSymptomDetail>;
  AttachedImage: ResolverTypeWrapper<AttachedImage>;
  UploadStatus: UploadStatus;
  ModelNumberQueryOutput: ResolverTypeWrapper<ModelNumberQueryOutput>;
  ProductRegistrationQueryOutput: ResolverTypeWrapper<ProductRegistrationQueryOutput>;
  ProductRegistration: ResolverTypeWrapper<ProductRegistration>;
  ProductSymptomQueryOutput: ResolverTypeWrapper<ProductSymptomQueryOutput>;
  User: ResolverTypeWrapper<User>;
  RGAStatus: RgaStatus;
  RGAQueryOutput: ResolverTypeWrapper<RgaQueryOutput>;
  RGA: ResolverTypeWrapper<Rga>;
  RGAGood: ResolverTypeWrapper<RgaGood>;
  RGAGoodStatus: RgaGoodStatus;
  RGAShippingCarrier: RgaShippingCarrier;
  RGAStatusUpdate: ResolverTypeWrapper<RgaStatusUpdate>;
  UpdateProfile: ResolverTypeWrapper<UpdateProfile>;
  RGAStatusCountOutput: ResolverTypeWrapper<RgaStatusCountOutput>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCustomerInput: NewCustomerInput;
  CustomerMutationOutput: ResolverTypeWrapper<CustomerMutationOutput>;
  ExistingCustomerInput: ExistingCustomerInput;
  NewDistributorInput: NewDistributorInput;
  DistributorMutationOutput: ResolverTypeWrapper<DistributorMutationOutput>;
  ExistingDistributorInput: ExistingDistributorInput;
  ProductInput: ProductInput;
  ProductMutationOutput: ResolverTypeWrapper<ProductMutationOutput>;
  ModelNumberInput: ModelNumberInput;
  PricingInput: PricingInput;
  FeeStructureInput: FeeStructureInput;
  ModelNumberMutationOutput: ResolverTypeWrapper<ModelNumberMutationOutput>;
  NewProductRegistrationInput: NewProductRegistrationInput;
  ProductRegistrationMutationOutput: ResolverTypeWrapper<ProductRegistrationMutationOutput>;
  ExistingProductRegistrationInput: ExistingProductRegistrationInput;
  NewProductSymptomInput: NewProductSymptomInput;
  ProductSymptomMutationOutput: ResolverTypeWrapper<ProductSymptomMutationOutput>;
  ExistingProductSymptomInput: ExistingProductSymptomInput;
  AttachedImageInput: AttachedImageInput;
  NewUserInput: NewUserInput;
  UserMutationOutput: ResolverTypeWrapper<UserMutationOutput>;
  ExistingUserInput: ExistingUserInput;
  UploadInput: UploadInput;
  UploadMutationOutput: ResolverTypeWrapper<UploadMutationOutput>;
  UploadURL: ResolverTypeWrapper<UploadUrl>;
  NewRGAInput: NewRgaInput;
  RGAMutationOutput: ResolverTypeWrapper<RgaMutationOutput>;
  ExistingRGAInput: ExistingRgaInput;
  RGAGoodShippingInput: RgaGoodShippingInput;
  RGAShippingStatus: RgaShippingStatus;
  RGAGoodInput: RgaGoodInput;
  RGAGoodMutationOutput: ResolverTypeWrapper<RgaGoodMutationOutput>;
  ConnectionPayload: ConnectionPayload;
  PaginationEntry: ResolverTypeWrapper<PaginationEntry>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  CustomerQueryOutput: CustomerQueryOutput;
  Customer: Customer;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  ValidationError: ValidationError;
  Boolean: Scalars['Boolean'];
  DistributorQueryOutput: DistributorQueryOutput;
  Distributor: Distributor;
  ProductQueryOutput: ProductQueryOutput;
  Product: Product;
  ModelNumber: ModelNumber;
  Pricing: Pricing;
  FeeStructure: FeeStructure;
  ProductSymptom: ProductSymptom;
  ModelNumberSymptomDetail: ModelNumberSymptomDetail;
  AttachedImage: AttachedImage;
  ModelNumberQueryOutput: ModelNumberQueryOutput;
  ProductRegistrationQueryOutput: ProductRegistrationQueryOutput;
  ProductRegistration: ProductRegistration;
  ProductSymptomQueryOutput: ProductSymptomQueryOutput;
  User: User;
  RGAQueryOutput: RgaQueryOutput;
  RGA: Rga;
  RGAGood: RgaGood;
  RGAStatusUpdate: RgaStatusUpdate;
  UpdateProfile: UpdateProfile;
  RGAStatusCountOutput: RgaStatusCountOutput;
  Mutation: {};
  NewCustomerInput: NewCustomerInput;
  CustomerMutationOutput: CustomerMutationOutput;
  ExistingCustomerInput: ExistingCustomerInput;
  NewDistributorInput: NewDistributorInput;
  DistributorMutationOutput: DistributorMutationOutput;
  ExistingDistributorInput: ExistingDistributorInput;
  ProductInput: ProductInput;
  ProductMutationOutput: ProductMutationOutput;
  ModelNumberInput: ModelNumberInput;
  PricingInput: PricingInput;
  FeeStructureInput: FeeStructureInput;
  ModelNumberMutationOutput: ModelNumberMutationOutput;
  NewProductRegistrationInput: NewProductRegistrationInput;
  ProductRegistrationMutationOutput: ProductRegistrationMutationOutput;
  ExistingProductRegistrationInput: ExistingProductRegistrationInput;
  NewProductSymptomInput: NewProductSymptomInput;
  ProductSymptomMutationOutput: ProductSymptomMutationOutput;
  ExistingProductSymptomInput: ExistingProductSymptomInput;
  AttachedImageInput: AttachedImageInput;
  NewUserInput: NewUserInput;
  UserMutationOutput: UserMutationOutput;
  ExistingUserInput: ExistingUserInput;
  UploadInput: UploadInput;
  UploadMutationOutput: UploadMutationOutput;
  UploadURL: UploadUrl;
  NewRGAInput: NewRgaInput;
  RGAMutationOutput: RgaMutationOutput;
  ExistingRGAInput: ExistingRgaInput;
  RGAGoodShippingInput: RgaGoodShippingInput;
  RGAGoodInput: RgaGoodInput;
  RGAGoodMutationOutput: RgaGoodMutationOutput;
  ConnectionPayload: ConnectionPayload;
  PaginationEntry: PaginationEntry;
  PageInfo: PageInfo;
};

export type AttachedImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttachedImage'] = ResolversParentTypes['AttachedImage']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UploadStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  specialty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hospital?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerMutationOutput'] = ResolversParentTypes['CustomerMutationOutput']> = {
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerQueryOutput'] = ResolversParentTypes['CustomerQueryOutput']> = {
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  customers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Customer']>>>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Distributor'] = ResolversParentTypes['Distributor']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorMutationOutput'] = ResolversParentTypes['DistributorMutationOutput']> = {
  distributor?: Resolver<Maybe<ResolversTypes['Distributor']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorQueryOutput'] = ResolversParentTypes['DistributorQueryOutput']> = {
  distributor?: Resolver<Maybe<ResolversTypes['Distributor']>, ParentType, ContextType>;
  distributors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Distributor']>>>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeeStructureResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeeStructure'] = ResolversParentTypes['FeeStructure']> = {
  distributor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelNumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelNumber'] = ResolversParentTypes['ModelNumber']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pricing?: Resolver<Maybe<ResolversTypes['Pricing']>, ParentType, ContextType>;
  productIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  productType?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lotted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  warrantyTerm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  warrantyDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolutionWithWarranty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolutionWithoutWarranty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feeWithWarranty?: Resolver<Maybe<ResolversTypes['FeeStructure']>, ParentType, ContextType>;
  feeWithoutWarranty?: Resolver<Maybe<ResolversTypes['FeeStructure']>, ParentType, ContextType>;
  publicNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  privateNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publiclyViewable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  symptoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductSymptom']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelNumberMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelNumberMutationOutput'] = ResolversParentTypes['ModelNumberMutationOutput']> = {
  modelNumber?: Resolver<Maybe<ResolversTypes['ModelNumber']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelNumberQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelNumberQueryOutput'] = ResolversParentTypes['ModelNumberQueryOutput']> = {
  modelNumber?: Resolver<Maybe<ResolversTypes['ModelNumber']>, ParentType, ContextType>;
  modelNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['ModelNumber']>>>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelNumberSymptomDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelNumberSymptomDetail'] = ResolversParentTypes['ModelNumberSymptomDetail']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symptoms?: Resolver<Array<Maybe<ResolversTypes['ProductSymptom']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createCustomer?: Resolver<ResolversTypes['CustomerMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'customerInput'>>;
  updateCustomer?: Resolver<ResolversTypes['CustomerMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateCustomerArgs, 'customerInput'>>;
  destroyCustomer?: Resolver<ResolversTypes['CustomerMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyCustomerArgs, 'id'>>;
  createDistributor?: Resolver<ResolversTypes['DistributorMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateDistributorArgs, 'distributorInput'>>;
  updateDistributor?: Resolver<ResolversTypes['DistributorMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateDistributorArgs, 'distributorInput'>>;
  destroyDistributor?: Resolver<ResolversTypes['DistributorMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyDistributorArgs, 'id'>>;
  createProduct?: Resolver<ResolversTypes['ProductMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'productInput'>>;
  updateProduct?: Resolver<ResolversTypes['ProductMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'productInput'>>;
  destroyProduct?: Resolver<ResolversTypes['ProductMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyProductArgs, 'id'>>;
  createModelNumber?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateModelNumberArgs, 'modelNumberInput'>>;
  updateModelNumber?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateModelNumberArgs, 'modelNumberInput'>>;
  updateModelNumberLotted?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateModelNumberLottedArgs, 'id' | 'lotted'>>;
  updateModelNumberViewable?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateModelNumberViewableArgs, 'id' | 'publiclyViewable'>>;
  destroyModelNumber?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyModelNumberArgs, 'id'>>;
  createProductRegistration?: Resolver<ResolversTypes['ProductRegistrationMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateProductRegistrationArgs, 'productRegistrationInput'>>;
  updateProductRegistration?: Resolver<ResolversTypes['ProductRegistrationMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateProductRegistrationArgs, 'productRegistrationInput'>>;
  destroyProductRegistration?: Resolver<ResolversTypes['ProductRegistrationMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyProductRegistrationArgs, 'id'>>;
  createProductSymptom?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateProductSymptomArgs, 'productSymptomInput'>>;
  updateProductSymptom?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateProductSymptomArgs, 'productSymptomInput'>>;
  destroyProductSymptom?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyProductSymptomArgs, 'id'>>;
  linkSymptomToModel?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationLinkSymptomToModelArgs, 'modelNumber' | 'symptomId' | 'linked'>>;
  attachImagesToSymptom?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationAttachImagesToSymptomArgs, 'symptomId' | 'attachedImages'>>;
  createUser?: Resolver<ResolversTypes['UserMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  updateUser?: Resolver<ResolversTypes['UserMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'userInput'>>;
  destroyUser?: Resolver<ResolversTypes['UserMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyUserArgs, 'id'>>;
  resetPassword?: Resolver<ResolversTypes['UserMutationOutput'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password'>>;
  createUploads?: Resolver<ResolversTypes['UploadMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateUploadsArgs, 'uploadInput'>>;
  createRGA?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateRgaArgs, 'rgaInput'>>;
  updateRGA?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateRgaArgs, 'rgaInput'>>;
  updateRGAStatus?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateRgaStatusArgs, 'id' | 'status'>>;
  submitRGAForReview?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationSubmitRgaForReviewArgs, 'id'>>;
  updateRGAShippingStatus?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateRgaShippingStatusArgs, 'id'>>;
  createRGAGood?: Resolver<ResolversTypes['RGAGoodMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateRgaGoodArgs, 'rgaId' | 'rgaGoodInput'>>;
  updateRGAGood?: Resolver<ResolversTypes['RGAGoodMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateRgaGoodArgs, 'id' | 'rgaId' | 'rgaGoodInput'>>;
  destroyRGAGood?: Resolver<ResolversTypes['RGAGoodMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyRgaGoodArgs, 'id' | 'rgaId'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasNextPages?: Resolver<Array<Maybe<ResolversTypes['PaginationEntry']>>, ParentType, ContextType, RequireFields<PageInfoHasNextPagesArgs, 'amount'>>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPages?: Resolver<Array<Maybe<ResolversTypes['PaginationEntry']>>, ParentType, ContextType, RequireFields<PageInfoHasPreviousPagesArgs, 'amount'>>;
  startCursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  endCursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginationEntry'] = ResolversParentTypes['PaginationEntry']> = {
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PricingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pricing'] = ResolversParentTypes['Pricing']> = {
  cost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  retail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modelNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['ModelNumber']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMutationOutput'] = ResolversParentTypes['ProductMutationOutput']> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductQueryOutput'] = ResolversParentTypes['ProductQueryOutput']> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRegistrationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductRegistration'] = ResolversParentTypes['ProductRegistration']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  registeredOn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modelNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serial?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lotted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRegistrationMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductRegistrationMutationOutput'] = ResolversParentTypes['ProductRegistrationMutationOutput']> = {
  productRegistration?: Resolver<Maybe<ResolversTypes['ProductRegistration']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRegistrationQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductRegistrationQueryOutput'] = ResolversParentTypes['ProductRegistrationQueryOutput']> = {
  productRegistration?: Resolver<Maybe<ResolversTypes['ProductRegistration']>, ParentType, ContextType>;
  productRegistrations?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductRegistration']>>>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductSymptomResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSymptom'] = ResolversParentTypes['ProductSymptom']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  careTip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  synopsis?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  solution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  preApproved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  faultCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  associatedModelNumbers?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  modelNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['ModelNumberSymptomDetail']>>>, ParentType, ContextType>;
  attachedImages?: Resolver<Maybe<Array<Maybe<ResolversTypes['AttachedImage']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductSymptomMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSymptomMutationOutput'] = ResolversParentTypes['ProductSymptomMutationOutput']> = {
  productSymptom?: Resolver<Maybe<ResolversTypes['ProductSymptom']>, ParentType, ContextType>;
  modelNumber?: Resolver<Maybe<ResolversTypes['ModelNumberSymptomDetail']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductSymptomQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSymptomQueryOutput'] = ResolversParentTypes['ProductSymptomQueryOutput']> = {
  productSymptom?: Resolver<Maybe<ResolversTypes['ProductSymptom']>, ParentType, ContextType>;
  productSymptoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductSymptom']>>>, ParentType, ContextType, RequireFields<ProductSymptomQueryOutputProductSymptomsArgs, never>>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customers?: Resolver<ResolversTypes['CustomerQueryOutput'], ParentType, ContextType, RequireFields<QueryCustomersArgs, never>>;
  customer?: Resolver<ResolversTypes['CustomerQueryOutput'], ParentType, ContextType, RequireFields<QueryCustomerArgs, 'id'>>;
  distributors?: Resolver<ResolversTypes['DistributorQueryOutput'], ParentType, ContextType>;
  distributor?: Resolver<ResolversTypes['DistributorQueryOutput'], ParentType, ContextType, RequireFields<QueryDistributorArgs, 'id'>>;
  products?: Resolver<Maybe<ResolversTypes['ProductQueryOutput']>, ParentType, ContextType, RequireFields<QueryProductsArgs, never>>;
  modelNumbers?: Resolver<Maybe<ResolversTypes['ModelNumberQueryOutput']>, ParentType, ContextType, RequireFields<QueryModelNumbersArgs, never>>;
  product?: Resolver<Maybe<ResolversTypes['ProductQueryOutput']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  modelNumber?: Resolver<Maybe<ResolversTypes['ModelNumberQueryOutput']>, ParentType, ContextType, RequireFields<QueryModelNumberArgs, 'id'>>;
  productRegistrations?: Resolver<ResolversTypes['ProductRegistrationQueryOutput'], ParentType, ContextType>;
  productRegistration?: Resolver<ResolversTypes['ProductRegistrationQueryOutput'], ParentType, ContextType, RequireFields<QueryProductRegistrationArgs, 'id'>>;
  productSymptoms?: Resolver<ResolversTypes['ProductSymptomQueryOutput'], ParentType, ContextType, RequireFields<QueryProductSymptomsArgs, never>>;
  productSymptom?: Resolver<ResolversTypes['ProductSymptomQueryOutput'], ParentType, ContextType, RequireFields<QueryProductSymptomArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userWithEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserWithEmailArgs, 'email'>>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rgas?: Resolver<ResolversTypes['RGAQueryOutput'], ParentType, ContextType, RequireFields<QueryRgasArgs, never>>;
  rgaCount?: Resolver<ResolversTypes['RGAStatusCountOutput'], ParentType, ContextType>;
  rga?: Resolver<ResolversTypes['RGAQueryOutput'], ParentType, ContextType, RequireFields<QueryRgaArgs, 'id'>>;
};

export type RgaResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGA'] = ResolversParentTypes['RGA']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['RGAStatus'], ParentType, ContextType>;
  submittedOn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submittedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distributor?: Resolver<ResolversTypes['Distributor'], ParentType, ContextType>;
  goods?: Resolver<Array<Maybe<ResolversTypes['RGAGood']>>, ParentType, ContextType>;
  statusLog?: Resolver<Maybe<Array<Maybe<ResolversTypes['RGAStatusUpdate']>>>, ParentType, ContextType>;
  shippingSpeed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaGoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAGood'] = ResolversParentTypes['RGAGood']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rgaId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serviceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modelNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lotted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['RGAGoodStatus']>, ParentType, ContextType>;
  warrantied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  ssd?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  warrantyDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warrantyTerm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  symptomId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  faultCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serial?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newSerial?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productType?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  productName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomSynopsis?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomSolution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolutionFee?: Resolver<Maybe<ResolversTypes['FeeStructure']>, ParentType, ContextType>;
  rma?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  po?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerLetterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serviceFormUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerStreet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerStreet2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerZip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerSpecialty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingSpeed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tracking?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  carrier?: Resolver<Maybe<ResolversTypes['RGAShippingCarrier']>, ParentType, ContextType>;
  datePurchased?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disposition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  additionalComments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaGoodMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAGoodMutationOutput'] = ResolversParentTypes['RGAGoodMutationOutput']> = {
  rgaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rgaGood?: Resolver<Maybe<ResolversTypes['RGAGood']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAMutationOutput'] = ResolversParentTypes['RGAMutationOutput']> = {
  rga?: Resolver<Maybe<ResolversTypes['RGA']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAQueryOutput'] = ResolversParentTypes['RGAQueryOutput']> = {
  rga?: Resolver<Maybe<ResolversTypes['RGA']>, ParentType, ContextType>;
  rgas?: Resolver<Maybe<Array<Maybe<ResolversTypes['RGA']>>>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaStatusCountOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAStatusCountOutput'] = ResolversParentTypes['RGAStatusCountOutput']> = {
  issued?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  delayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  awaitingArrival?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  received?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  assessing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  repairing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shipping?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  closed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  canceled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaStatusUpdateResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAStatusUpdate'] = ResolversParentTypes['RGAStatusUpdate']> = {
  status?: Resolver<Maybe<ResolversTypes['RGAStatus']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['UpdateProfile']>, ParentType, ContextType>;
  updatedOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateProfile'] = ResolversParentTypes['UpdateProfile']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadMutationOutput'] = ResolversParentTypes['UploadMutationOutput']> = {
  uploads?: Resolver<Maybe<Array<Maybe<ResolversTypes['UploadURL']>>>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadURL'] = ResolversParentTypes['UploadURL']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMutationOutput'] = ResolversParentTypes['UserMutationOutput']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = {
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AttachedImage?: AttachedImageResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerMutationOutput?: CustomerMutationOutputResolvers<ContextType>;
  CustomerQueryOutput?: CustomerQueryOutputResolvers<ContextType>;
  Distributor?: DistributorResolvers<ContextType>;
  DistributorMutationOutput?: DistributorMutationOutputResolvers<ContextType>;
  DistributorQueryOutput?: DistributorQueryOutputResolvers<ContextType>;
  FeeStructure?: FeeStructureResolvers<ContextType>;
  ModelNumber?: ModelNumberResolvers<ContextType>;
  ModelNumberMutationOutput?: ModelNumberMutationOutputResolvers<ContextType>;
  ModelNumberQueryOutput?: ModelNumberQueryOutputResolvers<ContextType>;
  ModelNumberSymptomDetail?: ModelNumberSymptomDetailResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginationEntry?: PaginationEntryResolvers<ContextType>;
  Pricing?: PricingResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductMutationOutput?: ProductMutationOutputResolvers<ContextType>;
  ProductQueryOutput?: ProductQueryOutputResolvers<ContextType>;
  ProductRegistration?: ProductRegistrationResolvers<ContextType>;
  ProductRegistrationMutationOutput?: ProductRegistrationMutationOutputResolvers<ContextType>;
  ProductRegistrationQueryOutput?: ProductRegistrationQueryOutputResolvers<ContextType>;
  ProductSymptom?: ProductSymptomResolvers<ContextType>;
  ProductSymptomMutationOutput?: ProductSymptomMutationOutputResolvers<ContextType>;
  ProductSymptomQueryOutput?: ProductSymptomQueryOutputResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RGA?: RgaResolvers<ContextType>;
  RGAGood?: RgaGoodResolvers<ContextType>;
  RGAGoodMutationOutput?: RgaGoodMutationOutputResolvers<ContextType>;
  RGAMutationOutput?: RgaMutationOutputResolvers<ContextType>;
  RGAQueryOutput?: RgaQueryOutputResolvers<ContextType>;
  RGAStatusCountOutput?: RgaStatusCountOutputResolvers<ContextType>;
  RGAStatusUpdate?: RgaStatusUpdateResolvers<ContextType>;
  UpdateProfile?: UpdateProfileResolvers<ContextType>;
  UploadMutationOutput?: UploadMutationOutputResolvers<ContextType>;
  UploadURL?: UploadUrlResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserMutationOutput?: UserMutationOutputResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
