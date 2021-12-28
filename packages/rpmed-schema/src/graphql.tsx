import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
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
  /** The user defined sort priority for the attached image. */
  position: Scalars['Int'];
  /** The current upload status of the image regarding its availability on S3. */
  status: UploadStatus;
  /** A pre-signed url to fetch this image from S3. */
  url?: Maybe<Scalars['String']>;
};

export type AttachedImageInput = {
  id: Scalars['ID'];
  position: Scalars['Int'];
  status?: InputMaybe<UploadStatus>;
};

/**
 * Used as an argument on any query incorporating the relay connection spec
 * to orchestrate paginated results
 */
export type ConnectionPayload = {
  /** The id of the item to fetch forward pagination. Use with first. */
  after?: InputMaybe<Scalars['ID']>;
  /** The id of the item to fetch backward pagination. Use with last. */
  before?: InputMaybe<Scalars['ID']>;
  /** A limit when performing forward pagination. */
  first?: InputMaybe<Scalars['Int']>;
  /** A limit when performing backward pagination. */
  last?: InputMaybe<Scalars['Int']>;
};

/** A customer of Riverpoint Medical. */
export type Customer = {
  __typename?: 'Customer';
  /** The city of the address for the customer. */
  city?: Maybe<Scalars['String']>;
  /** The country of the address for the customer. */
  country?: Maybe<Scalars['String']>;
  /** The email of the customer. */
  email?: Maybe<Scalars['String']>;
  /** The hospital of the customer. */
  hospital?: Maybe<Scalars['String']>;
  /** The unique identifier for this customer */
  id: Scalars['ID'];
  /** The name of the customer. */
  name?: Maybe<Scalars['String']>;
  /** The phone number of the customer. */
  phone?: Maybe<Scalars['String']>;
  /** The specialty of the customer. */
  specialty?: Maybe<Scalars['String']>;
  /** The state of the address for the customer. */
  state?: Maybe<Scalars['String']>;
  /** The street address for the customer. */
  street?: Maybe<Scalars['String']>;
  /** The street address (line 2) for the customer. */
  street2?: Maybe<Scalars['String']>;
  /** The zip of the address for the customer. */
  zip?: Maybe<Scalars['String']>;
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
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A distributor of Riverpoint Medical. */
export type Distributor = {
  __typename?: 'Distributor';
  /** The domain to match email addresses to via this distributor. */
  domain: Scalars['String'];
  /** The unique identifier for this distributor */
  id: Scalars['ID'];
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
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A document on the customer service portal. */
export type Document = {
  __typename?: 'Document';
  /** The description of the document. */
  description?: Maybe<Scalars['String']>;
  /** The file key as stored on AWS. */
  fileKey?: Maybe<Scalars['String']>;
  /** The unique identifier for this document */
  id: Scalars['ID'];
  /** The seo keywords of the document. */
  keywords?: Maybe<Scalars['String']>;
  /** The slug of the document. */
  slug?: Maybe<Scalars['String']>;
  /** The title of the document. */
  title?: Maybe<Scalars['String']>;
  /** The url to download this document. */
  url?: Maybe<Scalars['String']>;
};

/** A set of fields used to create or update a document. */
export type DocumentInput = {
  /** The document description for SEO purposes. */
  description?: InputMaybe<Scalars['String']>;
  /** The S3 file key to generate the download url for the file. */
  fileKey?: InputMaybe<Scalars['String']>;
  /** The id of the customer associated to the document. */
  id?: InputMaybe<Scalars['ID']>;
  /** The meta keywords of the document for SEO purposes. */
  keywords?: InputMaybe<Scalars['String']>;
  /** The slug of the document. */
  slug: Scalars['String'];
  /** The id of the customer associated to the document. */
  title: Scalars['String'];
};

/** The result of a mutation applied to a document. */
export type DocumentMutationOutput = {
  __typename?: 'DocumentMutationOutput';
  /** The resulting document if the operation was successful. */
  document?: Maybe<Document>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a document or documents. */
export type DocumentQueryOutput = {
  __typename?: 'DocumentQueryOutput';
  /** The resulting document if the operation was successful. */
  document?: Maybe<Document>;
  /** The size of the paginated results. */
  documentSize?: Maybe<Scalars['Int']>;
  /** The resulting documents if the operation was successful and multiple results were returned. */
  documents?: Maybe<Array<Maybe<Document>>>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A set of fields used to create or update a customer. */
export type ExistingCustomerInput = {
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

/** A set of fields used to create or update a distributor. */
export type ExistingDistributorInput = {
  domain: Scalars['String'];
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

/** A set of fields used to create or update a registration. */
export type ExistingProductRegistrationInput = {
  /** The id of the customer associated to the registration. */
  customerId: Scalars['String'];
  id: Scalars['ID'];
  /** The model number for representing the specific product configuration being registered. */
  modelNumber: Scalars['String'];
  /** The date the product was registered. */
  registeredOn: Scalars['String'];
  /** The serial number associate to the product if it is lotted. */
  serial?: InputMaybe<Scalars['String']>;
};

/** A set of fields used to create or update a symptom. */
export type ExistingProductSymptomInput = {
  careTip?: InputMaybe<Scalars['String']>;
  faultCode?: InputMaybe<Scalars['String']>;
  fee?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  preApproved?: InputMaybe<Scalars['Boolean']>;
  solution?: InputMaybe<Scalars['String']>;
  synopsis?: InputMaybe<Scalars['String']>;
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
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
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
  distributor?: InputMaybe<Scalars['String']>;
  /** Public pricing for end users. */
  endUser?: InputMaybe<Scalars['String']>;
};

export type ModelNumber = {
  __typename?: 'ModelNumber';
  /** A brief description of this product variant. */
  description?: Maybe<Scalars['String']>;
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty?: Maybe<FeeStructure>;
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty?: Maybe<FeeStructure>;
  /** The model number identifying a product variant. */
  id: Scalars['ID'];
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted?: Maybe<Scalars['Boolean']>;
  /** Pricing for this specific model. */
  pricing?: Maybe<Pricing>;
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: Maybe<Scalars['String']>;
  /** The ids of the product(s) this variant can be associated with. */
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The high level category for this model number. */
  productType?: Maybe<ProductType>;
  /** The product(s) this variant can be associated with. */
  products?: Maybe<Array<Maybe<Product>>>;
  /** Any public notes related to servicing this model variation. */
  publicNotes?: Maybe<Scalars['String']>;
  /** If a product model is not publicly viewableit will not show up on forms for a customer. */
  publiclyViewable?: Maybe<Scalars['Boolean']>;
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: Maybe<Scalars['String']>;
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: Maybe<Scalars['String']>;
  /** A list of all associated symptoms related to this model number. */
  symptoms?: Maybe<Array<Maybe<ProductSymptom>>>;
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: Maybe<Scalars['String']>;
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm?: Maybe<Scalars['Int']>;
};

/** Describes a model number to be created or updated. */
export type ModelNumberInput = {
  /** A brief description of this product variant. */
  description?: InputMaybe<Scalars['String']>;
  /** How much will it cost to service this item if it is covered by a warranty. */
  feeWithWarranty?: InputMaybe<FeeStructureInput>;
  /** How much will it cost to service this item if it is not covered by a warranty. */
  feeWithoutWarranty?: InputMaybe<FeeStructureInput>;
  /** The model number identifying a product variant. */
  id: Scalars['ID'];
  /** If a product is lotted it has a class of serial numbers associated to it. */
  lotted?: InputMaybe<Scalars['Boolean']>;
  /** Pricing for this specific model. */
  pricing?: InputMaybe<PricingInput>;
  /** Any internal notes for employess when servicing this model variation. */
  privateNotes?: InputMaybe<Scalars['String']>;
  /** The ids of the products this variant belongs to. */
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The high level category type this product belongs to. */
  productType?: InputMaybe<ProductType>;
  /** Any public notes related to servicing this model variation. */
  publicNotes?: InputMaybe<Scalars['String']>;
  /** If a product model is not publicly viewable it will not show up on forms for a customer. */
  publiclyViewable?: InputMaybe<Scalars['Boolean']>;
  /** How issues will be resolved if this item is covered by a warranty. */
  resolutionWithWarranty?: InputMaybe<Scalars['String']>;
  /** How issues will be resolved if this item is not covered by a warranty. */
  resolutionWithoutWarranty?: InputMaybe<Scalars['String']>;
  /** A description of the warranty that applies to this model. */
  warrantyDescription?: InputMaybe<Scalars['String']>;
  /** The length of the warranty that applies to this model in months. */
  warrantyTerm?: InputMaybe<Scalars['Int']>;
};

/** The result of a mutation applied to a ModelNumber. */
export type ModelNumberMutationOutput = {
  __typename?: 'ModelNumberMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** The resulting model if the operation was successful. */
  modelNumber?: Maybe<ModelNumber>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a modelNumber or modelNumbers. */
export type ModelNumberQueryOutput = {
  __typename?: 'ModelNumberQueryOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** The resulting model number if the operation was successful. */
  modelNumber?: Maybe<ModelNumber>;
  /** The resulting model numbers if the operation was successful and multiple results were returned. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumber>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
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
  /** Attaches / removes a images to a product symptom. */
  attachImagesToSymptom: ProductSymptomMutationOutput;
  /** Creates a new customer. */
  createCustomer: CustomerMutationOutput;
  /** Creates a new distributor. */
  createDistributor: DistributorMutationOutput;
  /** Adds a new product variant. */
  createModelNumber: ModelNumberMutationOutput;
  /** Adds a new product. */
  createProduct: ProductMutationOutput;
  /** Creates a new registration. */
  createProductRegistration: ProductRegistrationMutationOutput;
  /** Creates a new symptom. */
  createProductSymptom: ProductSymptomMutationOutput;
  /** Creates a new RGA. */
  createRGA: RgaMutationOutput;
  /** Creates a new good for an existing RGA. */
  createRGAGood: RgaGoodMutationOutput;
  /** Returns a set of upload endpoints from AWS S3. */
  createUploads: UploadMutationOutput;
  /** Creates a new authenticatable user. */
  createUser: UserMutationOutput;
  /** Removes an existing customer. */
  destroyCustomer: CustomerMutationOutput;
  /** Removes an existing distributor. */
  destroyDistributor: DistributorMutationOutput;
  /** Removes an existing document. */
  destroyDocument: DocumentMutationOutput;
  /** Removes an existing product variant. */
  destroyModelNumber: ModelNumberMutationOutput;
  /** Removes an existing page. */
  destroyPage: PageMutationOutput;
  /** Removes an existing product. */
  destroyProduct: ProductMutationOutput;
  /** Removes an existing registration. */
  destroyProductRegistration: ProductRegistrationMutationOutput;
  /** Removes an existing symptom. */
  destroyProductSymptom: ProductSymptomMutationOutput;
  /** Removes an existing RGA good. */
  destroyRGAGood: RgaGoodMutationOutput;
  /** Removes an existing user. */
  destroyUser: UserMutationOutput;
  /** Links an existing model number to an existing symptom. */
  linkSymptomToModel: ProductSymptomMutationOutput;
  /** Creates a new document. */
  makeDocument: DocumentMutationOutput;
  /** Creates a new page. */
  makePage: PageMutationOutput;
  /** Resets the password for the current user dependent on a temporary access token. */
  resetPassword: UserMutationOutput;
  /** Allows an end user to submit an RGA Good for review by the RPMed Internal Team. */
  submitRGAForReview: RgaMutationOutput;
  /** Updates an existing customer. */
  updateCustomer: CustomerMutationOutput;
  /** Updates an existing distributor. */
  updateDistributor: DistributorMutationOutput;
  /** Updates an existing product variant. */
  updateModelNumber: ModelNumberMutationOutput;
  /** Updates an existing product variant's lotted status. */
  updateModelNumberLotted: ModelNumberMutationOutput;
  /** Updates an existing product variant's lotted status. */
  updateModelNumberViewable: ModelNumberMutationOutput;
  /** Updates an existing product. */
  updateProduct: ProductMutationOutput;
  /** Updates an existing registration. */
  updateProductRegistration: ProductRegistrationMutationOutput;
  /** Updates an existing symptom. */
  updateProductSymptom: ProductSymptomMutationOutput;
  /** Updates an existing RGA. */
  updateRGA: RgaMutationOutput;
  /** Updates an existing good for an existing RGA. */
  updateRGAGood: RgaGoodMutationOutput;
  /** Updates the shipping status of a specific RGA. */
  updateRGAShippingStatus: RgaMutationOutput;
  /** Updates the status of a specific RGA. */
  updateRGAStatus: RgaMutationOutput;
  /** Updates an existing user. */
  updateUser: UserMutationOutput;
  version: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationAttachImagesToSymptomArgs = {
  attachedImages: Array<InputMaybe<AttachedImageInput>>;
  symptomId: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationCreateCustomerArgs = {
  customerInput: NewCustomerInput;
};


/** The root mutation for the schema. */
export type MutationCreateDistributorArgs = {
  distributorInput: NewDistributorInput;
};


/** The root mutation for the schema. */
export type MutationCreateModelNumberArgs = {
  modelNumberInput: ModelNumberInput;
};


/** The root mutation for the schema. */
export type MutationCreateProductArgs = {
  productInput: ProductInput;
};


/** The root mutation for the schema. */
export type MutationCreateProductRegistrationArgs = {
  productRegistrationInput: NewProductRegistrationInput;
};


/** The root mutation for the schema. */
export type MutationCreateProductSymptomArgs = {
  productSymptomInput: NewProductSymptomInput;
};


/** The root mutation for the schema. */
export type MutationCreateRgaArgs = {
  rgaInput: NewRgaInput;
};


/** The root mutation for the schema. */
export type MutationCreateRgaGoodArgs = {
  rgaGoodInput: RgaGoodInput;
  rgaId: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationCreateUploadsArgs = {
  uploadInput: UploadInput;
};


/** The root mutation for the schema. */
export type MutationCreateUserArgs = {
  userInput: NewUserInput;
};


/** The root mutation for the schema. */
export type MutationDestroyCustomerArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationDestroyDistributorArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationDestroyDocumentArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationDestroyModelNumberArgs = {
  id: Scalars['ID'];
};


/** The root mutation for the schema. */
export type MutationDestroyPageArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationDestroyProductArgs = {
  id: Scalars['ID'];
};


/** The root mutation for the schema. */
export type MutationDestroyProductRegistrationArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationDestroyProductSymptomArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationDestroyRgaGoodArgs = {
  id: Scalars['ID'];
  rgaId: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationDestroyUserArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationLinkSymptomToModelArgs = {
  linked: Scalars['Boolean'];
  modelNumber: Scalars['String'];
  symptomId: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationMakeDocumentArgs = {
  documentInput: DocumentInput;
};


/** The root mutation for the schema. */
export type MutationMakePageArgs = {
  pageInput: PageInput;
};


/** The root mutation for the schema. */
export type MutationResetPasswordArgs = {
  password: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationSubmitRgaForReviewArgs = {
  id: Scalars['ID'];
  notes?: InputMaybe<Scalars['String']>;
};


/** The root mutation for the schema. */
export type MutationUpdateCustomerArgs = {
  customerInput: ExistingCustomerInput;
};


/** The root mutation for the schema. */
export type MutationUpdateDistributorArgs = {
  distributorInput: ExistingDistributorInput;
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
export type MutationUpdateProductArgs = {
  productInput: ProductInput;
};


/** The root mutation for the schema. */
export type MutationUpdateProductRegistrationArgs = {
  productRegistrationInput: ExistingProductRegistrationInput;
};


/** The root mutation for the schema. */
export type MutationUpdateProductSymptomArgs = {
  productSymptomInput: ExistingProductSymptomInput;
};


/** The root mutation for the schema. */
export type MutationUpdateRgaArgs = {
  rgaInput: ExistingRgaInput;
};


/** The root mutation for the schema. */
export type MutationUpdateRgaGoodArgs = {
  id: Scalars['ID'];
  rgaGoodInput: RgaGoodInput;
  rgaId: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationUpdateRgaShippingStatusArgs = {
  id: Scalars['ID'];
  notes?: InputMaybe<Scalars['String']>;
  shippingUpdates?: InputMaybe<Array<InputMaybe<RgaGoodShippingInput>>>;
};


/** The root mutation for the schema. */
export type MutationUpdateRgaStatusArgs = {
  id: Scalars['ID'];
  notes?: InputMaybe<Scalars['String']>;
  status: RgaStatus;
};


/** The root mutation for the schema. */
export type MutationUpdateUserArgs = {
  userInput: ExistingUserInput;
};

/** A set of fields used to create or update a customer. */
export type NewCustomerInput = {
  /** The city of the address for the customer. */
  city?: InputMaybe<Scalars['String']>;
  /** The country of the address for the customer. */
  country?: InputMaybe<Scalars['String']>;
  /** The email of the customer. */
  email: Scalars['String'];
  /** The name of the customer. */
  name?: InputMaybe<Scalars['String']>;
  /** The phone number of the customer. */
  phone?: InputMaybe<Scalars['String']>;
  /** The specialty of the customer. */
  specialty?: InputMaybe<Scalars['String']>;
  /** The state of the address for the customer. */
  state?: InputMaybe<Scalars['String']>;
  /** The street address for the customer. */
  street?: InputMaybe<Scalars['String']>;
  /** The street address (line 2) for the customer. */
  street2?: InputMaybe<Scalars['String']>;
  /** The zip of the address for the customer. */
  zip?: InputMaybe<Scalars['String']>;
};

/** A set of fields used to create or update a distributor. */
export type NewDistributorInput = {
  domain: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

/** A set of fields used to create or update a registration. */
export type NewProductRegistrationInput = {
  /** The id of the customer associated to the registration. */
  customerId: Scalars['String'];
  /** The model number for representing the specific product configuration being registered. */
  modelNumber: Scalars['String'];
  /** The date the product was registered. */
  registeredOn: Scalars['String'];
  /** The serial number associate to the product if it is lotted. */
  serial?: InputMaybe<Scalars['String']>;
};

/** A set of fields used to create or update a symptom. */
export type NewProductSymptomInput = {
  careTip?: InputMaybe<Scalars['String']>;
  faultCode?: InputMaybe<Scalars['String']>;
  fee?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  preApproved?: InputMaybe<Scalars['Boolean']>;
  solution?: InputMaybe<Scalars['String']>;
  synopsis?: InputMaybe<Scalars['String']>;
};

/** A set of fields used to create an RGA. */
export type NewRgaInput = {
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed?: InputMaybe<Scalars['String']>;
  /** The email address of the contact who created the RGA. */
  submittedBy: Scalars['String'];
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String'];
};

/** A set of fields used to create or update a user. */
export type NewUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

/** A page on the customer service portal. */
export type Page = {
  __typename?: 'Page';
  /** The description of the page. */
  description?: Maybe<Scalars['String']>;
  /** The unique identifier for this page */
  id: Scalars['ID'];
  /** The seo keywords of the page. */
  keywords?: Maybe<Scalars['String']>;
  /** The sections of content on the page. */
  sections?: Maybe<Array<Maybe<Section>>>;
  /** The slug of the page. */
  slug?: Maybe<Scalars['String']>;
  /** The title of the page. */
  title?: Maybe<Scalars['String']>;
};

/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor representing the id of the last item in the connection result. */
  endCursor: Scalars['ID'];
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
};


/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfoHasNextPagesArgs = {
  amount: Scalars['Int'];
};


/** Provides essential pagination info for a connection (or paginated request) */
export type PageInfoHasPreviousPagesArgs = {
  amount: Scalars['Int'];
};

/** A set of fields used to create or update a page. */
export type PageInput = {
  /** The page description for SEO purposes. */
  description?: InputMaybe<Scalars['String']>;
  /** The id of the customer associated to the page. */
  id?: InputMaybe<Scalars['ID']>;
  /** The meta keywords of the page for SEO purposes. */
  keywords?: InputMaybe<Scalars['String']>;
  /** The sections of content on the page. */
  sections?: InputMaybe<Array<InputMaybe<SectionInput>>>;
  /** The slug of the page. */
  slug: Scalars['String'];
  /** The id of the customer associated to the page. */
  title: Scalars['String'];
};

/** The result of a mutation applied to a page. */
export type PageMutationOutput = {
  __typename?: 'PageMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** The resulting page if the operation was successful. */
  page?: Maybe<Page>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a page or pages. */
export type PageQueryOutput = {
  __typename?: 'PageQueryOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** The resulting page if the operation was successful. */
  page?: Maybe<Page>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** The resulting pages if the operation was successful and multiple results were returned. */
  pages?: Maybe<Array<Maybe<Page>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
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
  cost?: InputMaybe<Scalars['String']>;
  /** Public pricing for end users. */
  retail?: InputMaybe<Scalars['String']>;
};

/** A registered user object from API. Could be a customer, admin, or partner account. */
export type Product = {
  __typename?: 'Product';
  /** A brief description of this product. */
  description: Scalars['String'];
  /** The unique identifier for this product */
  id: Scalars['ID'];
  /** All available variations or configurations of this product. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumber>>>;
  /** The name of this product. */
  name: Scalars['String'];
};

/** Describes a product to be created or updated. */
export type ProductInput = {
  /** A brief description of this product. */
  description: Scalars['String'];
  /** The unique identifier for this product */
  id?: InputMaybe<Scalars['ID']>;
  /** The name of this product. */
  name: Scalars['String'];
};

/** The result of a mutation applied to a Product. */
export type ProductMutationOutput = {
  __typename?: 'ProductMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** The resulting model if the operation was successful. */
  product?: Maybe<Product>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a product or products. */
export type ProductQueryOutput = {
  __typename?: 'ProductQueryOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** The resulting product if the operation was successful. */
  product?: Maybe<Product>;
  /** The resulting products if the operation was successful and multiple results were returned. */
  products?: Maybe<Array<Maybe<Product>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A troubleshooting registration for a product. */
export type ProductRegistration = {
  __typename?: 'ProductRegistration';
  /** The customer profile associated to the registration. */
  customer: Customer;
  /** The id of the customer the product has been registered. */
  customerId: Scalars['String'];
  /** The unique identifier for this registration */
  id: Scalars['ID'];
  /** Indicates whether or not the registration belongs to a lotted model number. */
  lotted?: Maybe<Scalars['Boolean']>;
  /** The the model number of the product that has been registered. */
  modelNumber: Scalars['String'];
  /** The id of the product that has been registered. */
  productId: Scalars['String'];
  /** The date the product was registered. */
  registeredOn: Scalars['String'];
  /** The serial number associated to the product if applicable. */
  serial?: Maybe<Scalars['String']>;
};

/** The result of a mutation applied to a registration. */
export type ProductRegistrationMutationOutput = {
  __typename?: 'ProductRegistrationMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** The resulting registration if the operation was successful. */
  productRegistration?: Maybe<ProductRegistration>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a registration or registrations. */
export type ProductRegistrationQueryOutput = {
  __typename?: 'ProductRegistrationQueryOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** The resulting registration if the operation was successful. */
  productRegistration?: Maybe<ProductRegistration>;
  /** The resulting registrations if the operation was successful and multiple results were returned. */
  productRegistrations?: Maybe<Array<Maybe<ProductRegistration>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A troubleshooting symptom for a product. */
export type ProductSymptom = {
  __typename?: 'ProductSymptom';
  /** A list of all associated model numbers related to this symptom. */
  associatedModelNumbers: Array<Maybe<Scalars['String']>>;
  /** An array of attached images hosted via AWS S3. */
  attachedImages?: Maybe<Array<Maybe<AttachedImage>>>;
  /** A hint or maintenance tip to prevent the symptom. */
  careTip?: Maybe<Scalars['String']>;
  /** An official code used to identify this symptom. */
  faultCode?: Maybe<Scalars['String']>;
  /** Indicates if there is an associated fee for servicing this issue. */
  fee: Scalars['Boolean'];
  /** The unique identifier for this symptom */
  id: Scalars['ID'];
  /** The resulting symptoms if the operation was successful and multiple results were returned. */
  modelNumbers?: Maybe<Array<Maybe<ModelNumberSymptomDetail>>>;
  /** The actual name of the symptom. */
  name: Scalars['String'];
  /** Indicates whether or not this is a pre-approved repair regardless of warranty. */
  preApproved: Scalars['Boolean'];
  /** A solution to resolve the symptom. */
  solution?: Maybe<Scalars['String']>;
  /** A description of the symptom and/or it's cause in detail. */
  synopsis?: Maybe<Scalars['String']>;
};

/** The result of a mutation applied to a symptom. */
export type ProductSymptomMutationOutput = {
  __typename?: 'ProductSymptomMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** The resulting details for the associated model number if am association operation was successful. */
  modelNumber?: Maybe<ModelNumberSymptomDetail>;
  /** The resulting symptom if the operation was successful. */
  productSymptom?: Maybe<ProductSymptom>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a symptom or symptoms. */
export type ProductSymptomQueryOutput = {
  __typename?: 'ProductSymptomQueryOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** The resulting symptom if the operation was successful. */
  productSymptom?: Maybe<ProductSymptom>;
  /** The resulting symptoms if the operation was successful and multiple results were returned. */
  productSymptoms?: Maybe<Array<Maybe<ProductSymptom>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};


/** The result of a query for a symptom or symptoms. */
export type ProductSymptomQueryOutputProductSymptomsArgs = {
  modelNumber?: InputMaybe<Scalars['String']>;
};

/** Denotes the high level category for this product. */
export enum ProductType {
  /** An accessory to a headlight. */
  Accessory = 'ACCESSORY',
  /** A dedicated family of headlight. */
  Headlight = 'HEADLIGHT'
}

/** The root query for the schema. */
export type Query = {
  __typename?: 'Query';
  /** A specific customer in the system via ID. */
  customer: CustomerQueryOutput;
  /** All customers in the system */
  customers: CustomerQueryOutput;
  /** A specific distributor in the system via ID. */
  distributor: DistributorQueryOutput;
  /** All distributors in the system */
  distributors: DistributorQueryOutput;
  /** A specific document in the system via ID. */
  document: DocumentQueryOutput;
  /** All documents in the system */
  documents: DocumentQueryOutput;
  info?: Maybe<Scalars['String']>;
  /** A specific model number in the system via ID. */
  modelNumber?: Maybe<ModelNumberQueryOutput>;
  /** All product variants in the system. */
  modelNumbers?: Maybe<ModelNumberQueryOutput>;
  /** A specific page in the system via ID. */
  page: PageQueryOutput;
  /** All pages in the system */
  pages: PageQueryOutput;
  /** A specific product in the system via ID. */
  product?: Maybe<ProductQueryOutput>;
  /** A specific registration in the system via ID. */
  productRegistration: ProductRegistrationQueryOutput;
  /** All registrations in the system */
  productRegistrations: ProductRegistrationQueryOutput;
  /** A specific symptom in the system via ID. */
  productSymptom: ProductSymptomQueryOutput;
  /** All symptoms in the system */
  productSymptoms: ProductSymptomQueryOutput;
  /** All products in the system. */
  products?: Maybe<ProductQueryOutput>;
  /** A specific RGA in the system via ID. */
  rga: RgaQueryOutput;
  /** Query the total for any filtered output. */
  rgaCount: RgaStatusCountOutput;
  /** All RGAs in the system */
  rgas: RgaQueryOutput;
  /** A specific user in the system via ID. */
  user?: Maybe<User>;
  /** A specific user in the system via email address. */
  userWithEmail?: Maybe<User>;
  /** All users in the system */
  users?: Maybe<Array<Maybe<User>>>;
  version: Scalars['String'];
};


/** The root query for the schema. */
export type QueryCustomerArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryCustomersArgs = {
  search?: InputMaybe<Scalars['String']>;
};


/** The root query for the schema. */
export type QueryDistributorArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryDocumentArgs = {
  id: Scalars['ID'];
};


/** The root query for the schema. */
export type QueryModelNumberArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryModelNumbersArgs = {
  productId?: InputMaybe<Scalars['String']>;
  productType?: InputMaybe<ProductType>;
  public?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  symptom?: InputMaybe<Scalars['String']>;
};


/** The root query for the schema. */
export type QueryPageArgs = {
  id: Scalars['ID'];
};


/** The root query for the schema. */
export type QueryProductArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryProductRegistrationArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryProductSymptomArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryProductSymptomsArgs = {
  modelNumber?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};


/** The root query for the schema. */
export type QueryProductsArgs = {
  search?: InputMaybe<Scalars['String']>;
};


/** The root query for the schema. */
export type QueryRgaArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryRgasArgs = {
  status?: InputMaybe<RgaStatus>;
};


/** The root query for the schema. */
export type QueryUserArgs = {
  id: Scalars['String'];
};


/** The root query for the schema. */
export type QueryUserWithEmailArgs = {
  email: Scalars['String'];
};

/** A Request Goods Authorization. */
export type Rga = {
  __typename?: 'RGA';
  /** The distributor associated to the the RGA. */
  distributor: Distributor;
  /** The goods associated to the the RGA. */
  goods: Array<Maybe<RgaGood>>;
  /** The unique identifier for this RGA. */
  id: Scalars['ID'];
  /** The preferred shipping speed assigned to return this request to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>;
  /** The current state of the request. */
  status: RgaStatus;
  /** A log of all updates to this RGAs status. */
  statusLog?: Maybe<Array<Maybe<RgaStatusUpdate>>>;
  /** The email address of the user whom submitted the RGA. */
  submittedBy: Scalars['String'];
  /** The date the RGA was submitted. */
  submittedOn: Scalars['String'];
};

/** A good associated to a particular RGA. */
export type RgaGood = {
  __typename?: 'RGAGood';
  /** Any additional comments for the service letter. */
  additionalComments?: Maybe<Scalars['String']>;
  /** The carrier used to transport the return shipment. */
  carrier?: Maybe<RgaShippingCarrier>;
  /** The city of the address for the customer this good belongs to. */
  customerCity?: Maybe<Scalars['String']>;
  /** The country of the address for the customer this good belongs to. */
  customerCountry?: Maybe<Scalars['String']>;
  /** The email of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: Maybe<Scalars['String']>;
  /** The id of the customer if the product has been registered to a user. */
  customerId?: Maybe<Scalars['String']>;
  /** A URL to download a generated PDF of the associated customerletter. */
  customerLetterUrl?: Maybe<Scalars['String']>;
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: Maybe<Scalars['String']>;
  /** The phone number of the customer this good belongs to. */
  customerPhone?: Maybe<Scalars['String']>;
  /** The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerSpecialty?: Maybe<Scalars['String']>;
  /** The state of the address for the customer this good belongs to. */
  customerState?: Maybe<Scalars['String']>;
  /** The street address for the customer this good belongs to. */
  customerStreet?: Maybe<Scalars['String']>;
  /** The street address (line 2) for the customer this good belongs to. */
  customerStreet2?: Maybe<Scalars['String']>;
  /** The zip of the address for the customer this good belongs to. */
  customerZip?: Maybe<Scalars['String']>;
  /** The original date of purchase if known. */
  datePurchased?: Maybe<Scalars['String']>;
  /** The disposition of the good after evaluation. */
  disposition?: Maybe<Scalars['String']>;
  /** The fault code associated to the prescribed symptom. */
  faultCode?: Maybe<Scalars['String']>;
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID'];
  /** Indicates whether or not the model was considered to be lotted. */
  lotted?: Maybe<Scalars['Boolean']>;
  /** The model number for representing the specific product configuration for this good. */
  modelNumber?: Maybe<Scalars['String']>;
  /** A new serial number if the unit was replaced. */
  newSerial?: Maybe<Scalars['String']>;
  /** Any additional notes about this good specifically.. */
  notes?: Maybe<Scalars['String']>;
  /** The associated PO from our distributor / partner's records. */
  po?: Maybe<Scalars['String']>;
  /** Indicates whether or not the resolution for the symptom was a pre-approved repair. */
  preApproved?: Maybe<Scalars['Boolean']>;
  /** Indicates the product family this good. */
  productId?: Maybe<Scalars['String']>;
  /** Indicates the name of product family this good. */
  productName?: Maybe<Scalars['String']>;
  /** Indicates the product type for this good. */
  productType?: Maybe<ProductType>;
  /** The proposed resolution the issue affecting this good. */
  resolution?: Maybe<Scalars['String']>;
  /** The fee involved for resolving this issue. */
  resolutionFee?: Maybe<FeeStructure>;
  /** The RGA this good is assigned to. */
  rgaId: Scalars['String'];
  /** The associated RMA from our distributor / partner's records. */
  rma?: Maybe<Scalars['String']>;
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: Maybe<Scalars['String']>;
  /** A URL to download a generated PDF of the associated service form. */
  serviceFormUrl?: Maybe<Scalars['String']>;
  /** The unique service id for this good. */
  serviceId?: Maybe<Scalars['String']>;
  /** The preferred shipping speed assigned to return this good to the customer. */
  shippingSpeed?: Maybe<Scalars['String']>;
  /** Indicates whether or not an SSD is applicable to this good. */
  ssd?: Maybe<Scalars['Boolean']>;
  /** The current status of the good. */
  status?: Maybe<RgaGoodStatus>;
  /** The current description of the symptom. */
  symptomDescription?: Maybe<Scalars['String']>;
  /** The symptom / reason this product is being returned. */
  symptomId?: Maybe<Scalars['String']>;
  /** The solution for associated symptom. */
  symptomSolution?: Maybe<Scalars['String']>;
  /** The synopsis of the associated symptom. */
  symptomSynopsis?: Maybe<Scalars['String']>;
  /** The tracking number associated to the return shipment. */
  tracking?: Maybe<Scalars['String']>;
  /** Indicates whether or not this product is currently under warranty. */
  warrantied?: Maybe<Scalars['Boolean']>;
  /** Indicates the details of the associated products warranty. */
  warrantyDescription?: Maybe<Scalars['String']>;
  /** Indicates the number of months the associated product was warrantied for. */
  warrantyTerm?: Maybe<Scalars['Int']>;
};

/** The input to make changes to an existing RGA Good. */
export type RgaGoodInput = {
  /** Any additional comments for the service letter. */
  additionalComments?: InputMaybe<Scalars['String']>;
  /** The city of the address for the customer this good belongs to. */
  customerCity?: InputMaybe<Scalars['String']>;
  /** The country of the address for the customer this good belongs to. */
  customerCountry?: InputMaybe<Scalars['String']>;
  /** The email of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerEmail?: InputMaybe<Scalars['String']>;
  /** The id of the customer if the product has been registered to a user. */
  customerId?: InputMaybe<Scalars['String']>;
  /** The name of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerName?: InputMaybe<Scalars['String']>;
  /** The phone number of the customer this good belongs to. */
  customerPhone?: InputMaybe<Scalars['String']>;
  /** The specialty of the customer this good belongs to - it will be automatically registered if it hasn't already been. */
  customerSpecialty?: InputMaybe<Scalars['String']>;
  /** The state of the address for the customer this good belongs to. */
  customerState?: InputMaybe<Scalars['String']>;
  /** The street address for the customer this good belongs to. */
  customerStreet?: InputMaybe<Scalars['String']>;
  /** The street address (line 2) for the customer this good belongs to. */
  customerStreet2?: InputMaybe<Scalars['String']>;
  /** The zip of the address for the customer this good belongs to. */
  customerZip?: InputMaybe<Scalars['String']>;
  /** The original date of purchase if known. */
  datePurchased?: InputMaybe<Scalars['String']>;
  /** The disposition of the good after evaluation. */
  disposition?: InputMaybe<Scalars['String']>;
  /** The fault code associated to the prescribed symptom. */
  faultCode?: InputMaybe<Scalars['String']>;
  /** Indicates whether or not the model was considered to be lotted. */
  lotted?: InputMaybe<Scalars['Boolean']>;
  /** The model number for representing the specific product configuration for this good. */
  modelNumber?: InputMaybe<Scalars['String']>;
  /** A new serial number if the unit was replaced. */
  newSerial?: InputMaybe<Scalars['String']>;
  /** Any additional notes about this good specifically.. */
  notes?: InputMaybe<Scalars['String']>;
  /** The associated PO from our distributor / partner's records. */
  po?: InputMaybe<Scalars['String']>;
  /** Indicates whether or not the resolution for the symptom was a pre-approved repair. */
  preApproved?: InputMaybe<Scalars['Boolean']>;
  /** Indicates the product family this good. */
  productId?: InputMaybe<Scalars['String']>;
  /** Indicates the name of product family this good. */
  productName?: InputMaybe<Scalars['String']>;
  /** Indicates the product type for this good. */
  productType?: InputMaybe<ProductType>;
  /** The proposed resolution the issue affecting this good. */
  resolution?: InputMaybe<Scalars['String']>;
  /** The fee involved for resolving this issue. */
  resolutionFee?: InputMaybe<FeeStructureInput>;
  /** The associated RMA from our distributor / partner's records. */
  rma?: InputMaybe<Scalars['String']>;
  /** The serial number unique to this good if lotted. If left blank and not lotted a uuid will be generated. */
  serial?: InputMaybe<Scalars['String']>;
  /** The preferred shipping speed assigned to return this good to the customer. */
  shippingSpeed?: InputMaybe<Scalars['String']>;
  /** Indicates whether or not an SSD is applicable to this good. */
  ssd?: InputMaybe<Scalars['Boolean']>;
  /** The current status of the good. */
  status?: InputMaybe<RgaGoodStatus>;
  /** The current description of the symptom. */
  symptomDescription?: InputMaybe<Scalars['String']>;
  /** The symptom / reason this product is being returned. */
  symptomId?: InputMaybe<Scalars['String']>;
  /** The solution for associated symptom. */
  symptomSolution?: InputMaybe<Scalars['String']>;
  /** The synopsis of the associated symptom. */
  symptomSynopsis?: InputMaybe<Scalars['String']>;
  /** Indicates whether or not this product is currently under warranty. */
  warrantied?: InputMaybe<Scalars['Boolean']>;
  /** Indicates the details of the associated products warranty. */
  warrantyDescription?: InputMaybe<Scalars['String']>;
  /** Indicates the number of months the associated product was warrantied for. */
  warrantyTerm?: InputMaybe<Scalars['Int']>;
};

/** The result of a mutation applied to a RGA. */
export type RgaGoodMutationOutput = {
  __typename?: 'RGAGoodMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** The resulting RGA Good if the operation was successful. */
  rgaGood?: Maybe<RgaGood>;
  /** The id the resulting RGA Good belongs to if the operation was successful. */
  rgaId?: Maybe<Scalars['String']>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The input to apply a shipping update make changes to an existing RGA Good. */
export type RgaGoodShippingInput = {
  /** The carrier used to transport the return shipment. */
  carrier?: InputMaybe<RgaShippingCarrier>;
  /** The unique serial number or uuid associated to the good. */
  id: Scalars['ID'];
  /** The message to email to all specified recipients */
  message?: InputMaybe<Scalars['String']>;
  /** A list of email addresses to notify the shipping alert / tracking message. */
  recipients?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The shipping status for the good. */
  status: RgaShippingStatus;
  /** The tracking number associated to the return shipment. */
  tracking?: InputMaybe<Scalars['String']>;
};

/** The current status of a given good belonging to an RGA. */
export enum RgaGoodStatus {
  /** The good was removed from the request at some point. */
  Archived = 'ARCHIVED',
  /** Indicates a good has been delayed from shipping. */
  Delayed = 'DELAYED',
  /** The good is considered valid and part of the request. */
  Valid = 'VALID'
}

/** The result of a mutation applied to a RGA. */
export type RgaMutationOutput = {
  __typename?: 'RGAMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** The resulting RGA if the operation was successful. */
  rga?: Maybe<Rga>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a RGA or RGAs. */
export type RgaQueryOutput = {
  __typename?: 'RGAQueryOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** The resulting RGA if the operation was successful. */
  rga?: Maybe<Rga>;
  /** The resulting RGAs if the operation was successful and multiple results were returned. */
  rgas?: Maybe<Array<Maybe<Rga>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** Indicates the shipping carrier used to transport a good associated to an RGA. */
export enum RgaShippingCarrier {
  /** DHL as a shipping carrier. */
  Dhl = 'DHL',
  /** FedEx as a shipping carrier. */
  Fedex = 'FEDEX',
  /** Another shipping carrier not fully supported by the system. */
  Other = 'OTHER',
  /** UPS as a shipping carrier. */
  Ups = 'UPS'
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
  /** RPMED team is assessing the contents of the package. */
  Assessing = 'ASSESSING',
  /**
   * The customer has confirmed the goods associated to the request and
   * RPMED is awaiting the delivery of the customer's package.
   */
  AwaitingArrival = 'AWAITING_ARRIVAL',
  /**
   * The request was canceled at any point during the process. Notes may
   * may be added for further explanation.
   */
  Canceled = 'CANCELED',
  /** The request is complete and no further notes / changes can be made. */
  Closed = 'CLOSED',
  /**
   * Indicates the RGA may have partially shipped but still has some pending
   * items that have been delayed.
   */
  Delayed = 'DELAYED',
  /**
   * An RGA number has been issued to the distributor but the customer
   * has not completed or shipped the package.
   */
  Issued = 'ISSUED',
  /** RPMED team is making any necessary repairs. */
  Repairing = 'REPAIRING',
  /** RPMED team has shipped the package back to the customer. */
  Shipping = 'SHIPPING'
}

/** A list of totals for any given rga status. */
export type RgaStatusCountOutput = {
  __typename?: 'RGAStatusCountOutput';
  /** Count of all RGAs currently being assessed. */
  assessing?: Maybe<Scalars['Int']>;
  /** Count of all RGAs awaiting arrival. */
  awaitingArrival?: Maybe<Scalars['Int']>;
  /** Count of all canceled RGAs. */
  canceled?: Maybe<Scalars['Int']>;
  /** Count of all closed RGAs. */
  closed?: Maybe<Scalars['Int']>;
  /** Count of all RGAs that have delayed items. */
  delayed?: Maybe<Scalars['Int']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** Count of all issued RGAs that may not have been shipped. */
  issued?: Maybe<Scalars['Int']>;
  /** Count of all received RGAs that have not yet been assessed. */
  received?: Maybe<Scalars['Int']>;
  /** Count of all RGAs currently being repaired. */
  repairing?: Maybe<Scalars['Int']>;
  /** Count of all RGAs being shipped back to customers. */
  shipping?: Maybe<Scalars['Int']>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** A description of a status update for a given RGA. */
export type RgaStatusUpdate = {
  __typename?: 'RGAStatusUpdate';
  /** Any notes describing what happened to the request during this update. */
  notes?: Maybe<Scalars['String']>;
  /** The new status the request was assigned. */
  status?: Maybe<RgaStatus>;
  /** Details about who made this update. */
  updatedBy?: Maybe<UpdateProfile>;
  /** An ISO string representing when this update occurred. */
  updatedOn?: Maybe<Scalars['String']>;
};

/** A section of content that can appear on a page. */
export type Section = {
  __typename?: 'Section';
  /** The unique identifier for this page */
  id: Scalars['ID'];
  /** The items in this section. */
  items?: Maybe<Array<Maybe<SectionItem>>>;
  /** The name/title of the section. */
  name?: Maybe<Scalars['String']>;
  /** The order this section should appear. */
  position?: Maybe<Scalars['Int']>;
};

/** A section of content that can appear on a page. */
export type SectionInput = {
  /** The unique identifier for this page */
  id: Scalars['ID'];
  /** The items in this section. */
  items?: InputMaybe<Array<InputMaybe<SectionItemInput>>>;
  /** The name/title of the section. */
  name?: InputMaybe<Scalars['String']>;
  /** The order this section should appear. */
  position?: InputMaybe<Scalars['Int']>;
};

/** A content item that can appear within a section on a page. */
export type SectionItem = {
  __typename?: 'SectionItem';
  /** The description of this item. */
  description?: Maybe<Scalars['String']>;
  /** The icon of the item. */
  icon?: Maybe<Scalars['String']>;
  /** The unique identifier for this page */
  id: Scalars['ID'];
  /** The name/title of the item. */
  name?: Maybe<Scalars['String']>;
  /** The order this item should appear. */
  position?: Maybe<Scalars['Int']>;
  /** The target url or content ID of this item. */
  target?: Maybe<Scalars['String']>;
  /** The type of content this item points to. */
  type?: Maybe<Scalars['String']>;
  /** The resulting URL this item will point to.. */
  url?: Maybe<Scalars['String']>;
};

/** A content item that can appear within a section on a page. */
export type SectionItemInput = {
  /** The description of this item. */
  description?: InputMaybe<Scalars['String']>;
  /** The icon of the item. */
  icon?: InputMaybe<Scalars['String']>;
  /** The unique identifier for this page */
  id: Scalars['ID'];
  /** The name/title of the item. */
  name?: InputMaybe<Scalars['String']>;
  /** The order this item should appear. */
  position?: InputMaybe<Scalars['Int']>;
  /** The target url or content ID of this item. */
  target?: InputMaybe<Scalars['String']>;
  /** The type of content this item points to. */
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateProfile = {
  __typename?: 'UpdateProfile';
  /** The email address of the user who made the update. */
  email?: Maybe<Scalars['String']>;
  /** The id of the user who made the update. */
  id?: Maybe<Scalars['String']>;
  /** The name of the user who made the update. */
  name?: Maybe<Scalars['String']>;
};

/** A set of file keys to generate S3 endpoint URLS for. */
export type UploadInput = {
  keys: Array<InputMaybe<Scalars['String']>>;
};

/** The result of a mutation applied to a customer. */
export type UploadMutationOutput = {
  __typename?: 'UploadMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
  /** The resulting customer if the operation was successful. */
  uploads?: Maybe<Array<Maybe<UploadUrl>>>;
};

/** Indicates whether or not an image is currently transferring, available, or even deleted. */
export enum UploadStatus {
  Available = 'AVAILABLE',
  Deleted = 'DELETED',
  Pending = 'PENDING'
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
  /** The email address for this user. */
  email: Scalars['String'];
  /** The actual first name of the user. */
  firstName?: Maybe<Scalars['String']>;
  /** The unique identifier for this user */
  id: Scalars['ID'];
  /** The actual last name of the user. */
  lastName?: Maybe<Scalars['String']>;
};

/** The result of a mutation applied to a user. */
export type UserMutationOutput = {
  __typename?: 'UserMutationOutput';
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
  /** The resulting user if the operation was successful. */
  user?: Maybe<User>;
};

/** A validation error that provides details for an unsuccesful mutation or query. */
export type ValidationError = {
  __typename?: 'ValidationError';
  /** A brief description of why the specified attribute failed validation. */
  message: Scalars['String'];
  /** A path indicating the attribute that failed validation. */
  path: Scalars['String'];
};

export type AttachImagesToSymptomMutationVariables = Exact<{
  symptomId: Scalars['String'];
  attachedImages: Array<InputMaybe<AttachedImageInput>> | InputMaybe<AttachedImageInput>;
}>;


export type AttachImagesToSymptomMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductSymptomMutationOutput', success: boolean, productSymptom?: { __typename?: 'ProductSymptom', id: string, attachedImages?: Array<{ __typename?: 'AttachedImage', position: number, status: UploadStatus, id: string, url?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateCustomerMutationVariables = Exact<{
  customerInput: NewCustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', response: { __typename?: 'CustomerMutationOutput', customer?: { __typename?: 'Customer', id: string, name?: string | null | undefined, email?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateDistributorMutationVariables = Exact<{
  distributorInput: NewDistributorInput;
}>;


export type CreateDistributorMutation = { __typename?: 'Mutation', response: { __typename?: 'DistributorMutationOutput', success: boolean, distributor?: { __typename?: 'Distributor', id: string, name?: string | null | undefined, domain: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateModelNumberMutationVariables = Exact<{
  modelNumberInput: ModelNumberInput;
}>;


export type CreateModelNumberMutation = { __typename?: 'Mutation', response: { __typename?: 'ModelNumberMutationOutput', success: boolean, modelNumber?: { __typename?: 'ModelNumber', id: string, description?: string | null | undefined, productIds?: Array<string | null | undefined> | null | undefined, productType?: ProductType | null | undefined, lotted?: boolean | null | undefined, warrantyTerm?: number | null | undefined, warrantyDescription?: string | null | undefined, resolutionWithWarranty?: string | null | undefined, resolutionWithoutWarranty?: string | null | undefined, publicNotes?: string | null | undefined, privateNotes?: string | null | undefined, products?: Array<{ __typename?: 'Product', id: string, name: string } | null | undefined> | null | undefined, feeWithWarranty?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined, feeWithoutWarranty?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined, pricing?: { __typename?: 'Pricing', cost?: string | null | undefined, retail?: string | null | undefined } | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateProductMutationVariables = Exact<{
  productInput: ProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductMutationOutput', success: boolean, product?: { __typename?: 'Product', id: string, name: string, description: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateProductRegistrationMutationVariables = Exact<{
  productRegistrationInput: NewProductRegistrationInput;
}>;


export type CreateProductRegistrationMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductRegistrationMutationOutput', success: boolean, productRegistration?: { __typename?: 'ProductRegistration', id: string, modelNumber: string, productId: string, customerId: string, serial?: string | null | undefined, customer: { __typename?: 'Customer', id: string, email?: string | null | undefined, name?: string | null | undefined } } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type CreateProductSymptomMutationVariables = Exact<{
  productSymptomInput: NewProductSymptomInput;
}>;


export type CreateProductSymptomMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductSymptomMutationOutput', productSymptom?: { __typename?: 'ProductSymptom', id: string, name: string, fee: boolean, faultCode?: string | null | undefined, synopsis?: string | null | undefined, solution?: string | null | undefined, careTip?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateRgaGoodMutationVariables = Exact<{
  rgaId: Scalars['String'];
  rgaGoodInput: RgaGoodInput;
}>;


export type CreateRgaGoodMutation = { __typename?: 'Mutation', response: { __typename?: 'RGAGoodMutationOutput', rgaId?: string | null | undefined, success: boolean, rgaGood?: { __typename?: 'RGAGood', id: string, rgaId: string, serviceId?: string | null | undefined, customerId?: string | null | undefined, customerEmail?: string | null | undefined, customerName?: string | null | undefined, customerPhone?: string | null | undefined, customerStreet?: string | null | undefined, customerStreet2?: string | null | undefined, customerZip?: string | null | undefined, customerCity?: string | null | undefined, customerState?: string | null | undefined, customerCountry?: string | null | undefined, customerSpecialty?: string | null | undefined, faultCode?: string | null | undefined, serial?: string | null | undefined, newSerial?: string | null | undefined, lotted?: boolean | null | undefined, preApproved?: boolean | null | undefined, productId?: string | null | undefined, productName?: string | null | undefined, productType?: ProductType | null | undefined, symptomId?: string | null | undefined, symptomDescription?: string | null | undefined, symptomSolution?: string | null | undefined, symptomSynopsis?: string | null | undefined, modelNumber?: string | null | undefined, po?: string | null | undefined, rma?: string | null | undefined, warrantied?: boolean | null | undefined, warrantyTerm?: number | null | undefined, warrantyDescription?: string | null | undefined, notes?: string | null | undefined, serviceFormUrl?: string | null | undefined, customerLetterUrl?: string | null | undefined, additionalComments?: string | null | undefined, datePurchased?: string | null | undefined, disposition?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateRgaMutationVariables = Exact<{
  rgaInput: NewRgaInput;
}>;


export type CreateRgaMutation = { __typename?: 'Mutation', response: { __typename?: 'RGAMutationOutput', success: boolean, rga?: { __typename?: 'RGA', id: string, shippingSpeed?: string | null | undefined, status: RgaStatus, submittedBy: string, submittedOn: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateUploadsMutationVariables = Exact<{
  uploadInput: UploadInput;
}>;


export type CreateUploadsMutation = { __typename?: 'Mutation', response: { __typename?: 'UploadMutationOutput', success: boolean, uploads?: Array<{ __typename?: 'UploadURL', id: string, url: string } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CreateUserMutationVariables = Exact<{
  userInput: NewUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', response: { __typename?: 'UserMutationOutput', user?: { __typename?: 'User', id: string, firstName?: string | null | undefined, lastName?: string | null | undefined, email: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CustomerQueryVariables = Exact<{
  customerId: Scalars['String'];
}>;


export type CustomerQuery = { __typename?: 'Query', response: { __typename?: 'CustomerQueryOutput', success: boolean, customer?: { __typename?: 'Customer', id: string, name?: string | null | undefined, email?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type CustomersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
}>;


export type CustomersQuery = { __typename?: 'Query', response: { __typename?: 'CustomerQueryOutput', success: boolean, customers?: Array<{ __typename?: 'Customer', id: string, name?: string | null | undefined, email?: string | null | undefined } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DestroyDistributorMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyDistributorMutation = { __typename?: 'Mutation', response: { __typename?: 'DistributorMutationOutput', distributor?: { __typename?: 'Distributor', id: string, name?: string | null | undefined, domain: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DestroyCustomerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyCustomerMutation = { __typename?: 'Mutation', response: { __typename?: 'CustomerMutationOutput', customer?: { __typename?: 'Customer', id: string, name?: string | null | undefined, email?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DestroyDocumentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyDocumentMutation = { __typename?: 'Mutation', response: { __typename?: 'DocumentMutationOutput', success: boolean, document?: { __typename?: 'Document', id: string, title?: string | null | undefined, keywords?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type DestroyModelNumberMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DestroyModelNumberMutation = { __typename?: 'Mutation', response: { __typename?: 'ModelNumberMutationOutput', modelNumber?: { __typename?: 'ModelNumber', id: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DestroyPageMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyPageMutation = { __typename?: 'Mutation', response: { __typename?: 'PageMutationOutput', success: boolean, page?: { __typename?: 'Page', id: string, title?: string | null | undefined, keywords?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type DestroyProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DestroyProductMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductMutationOutput', product?: { __typename?: 'Product', id: string, name: string, description: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DestroyProductRegistrationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyProductRegistrationMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductRegistrationMutationOutput', productRegistration?: { __typename?: 'ProductRegistration', id: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DestroyProductSymptomMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyProductSymptomMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductSymptomMutationOutput', productSymptom?: { __typename?: 'ProductSymptom', id: string, name: string, faultCode?: string | null | undefined, fee: boolean } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DestroyRgaGoodMutationVariables = Exact<{
  id: Scalars['ID'];
  rgaId: Scalars['String'];
}>;


export type DestroyRgaGoodMutation = { __typename?: 'Mutation', response: { __typename?: 'RGAGoodMutationOutput', rgaId?: string | null | undefined, success: boolean, rgaGood?: { __typename?: 'RGAGood', modelNumber?: string | null | undefined, serial?: string | null | undefined, id: string, warrantied?: boolean | null | undefined, faultCode?: string | null | undefined, status?: RgaGoodStatus | null | undefined, symptomId?: string | null | undefined, symptomDescription?: string | null | undefined, customerId?: string | null | undefined, customerEmail?: string | null | undefined, customerName?: string | null | undefined, customerPhone?: string | null | undefined, customerStreet?: string | null | undefined, customerStreet2?: string | null | undefined, customerZip?: string | null | undefined, customerCity?: string | null | undefined, customerState?: string | null | undefined, customerCountry?: string | null | undefined, customerSpecialty?: string | null | undefined, notes?: string | null | undefined, rma?: string | null | undefined, po?: string | null | undefined, additionalComments?: string | null | undefined, datePurchased?: string | null | undefined, disposition?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DestroyUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyUserMutation = { __typename?: 'Mutation', response: { __typename?: 'UserMutationOutput', user?: { __typename?: 'User', id: string, firstName?: string | null | undefined, lastName?: string | null | undefined, email: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DistributorQueryVariables = Exact<{
  distributorId: Scalars['String'];
}>;


export type DistributorQuery = { __typename?: 'Query', response: { __typename?: 'DistributorQueryOutput', success: boolean, distributor?: { __typename?: 'Distributor', id: string, name?: string | null | undefined, domain: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DistributorsQueryVariables = Exact<{ [key: string]: never; }>;


export type DistributorsQuery = { __typename?: 'Query', response: { __typename?: 'DistributorQueryOutput', success: boolean, distributors?: Array<{ __typename?: 'Distributor', id: string, name?: string | null | undefined, domain: string } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type DocumentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DocumentQuery = { __typename?: 'Query', response: { __typename?: 'DocumentQueryOutput', success: boolean, document?: { __typename?: 'Document', id: string, title?: string | null | undefined, keywords?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined, fileKey?: string | null | undefined, url?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type DocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentsQuery = { __typename?: 'Query', response: { __typename?: 'DocumentQueryOutput', success: boolean, documents?: Array<{ __typename?: 'Document', id: string, title?: string | null | undefined, keywords?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type LinkSymptomToModelNumberMutationVariables = Exact<{
  modelNumber: Scalars['String'];
  symptomId: Scalars['String'];
  linked: Scalars['Boolean'];
}>;


export type LinkSymptomToModelNumberMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductSymptomMutationOutput', success: boolean, productSymptom?: { __typename?: 'ProductSymptom', id: string, name: string, associatedModelNumbers: Array<string | null | undefined> } | null | undefined, modelNumber?: { __typename?: 'ModelNumberSymptomDetail', id: string, symptoms: Array<{ __typename?: 'ProductSymptom', id: string, faultCode?: string | null | undefined, name: string } | null | undefined> } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type MakeDocumentMutationVariables = Exact<{
  documentInput: DocumentInput;
}>;


export type MakeDocumentMutation = { __typename?: 'Mutation', response: { __typename?: 'DocumentMutationOutput', success: boolean, document?: { __typename?: 'Document', id: string, title?: string | null | undefined, keywords?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined, fileKey?: string | null | undefined, url?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type MakePageMutationVariables = Exact<{
  pageInput: PageInput;
}>;


export type MakePageMutation = { __typename?: 'Mutation', response: { __typename?: 'PageMutationOutput', success: boolean, page?: { __typename?: 'Page', id: string, title?: string | null | undefined, keywords?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined, sections?: Array<{ __typename?: 'Section', id: string, name?: string | null | undefined, position?: number | null | undefined, items?: Array<{ __typename?: 'SectionItem', id: string, name?: string | null | undefined, position?: number | null | undefined, icon?: string | null | undefined, url?: string | null | undefined, target?: string | null | undefined, type?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type ModelNumberQueryVariables = Exact<{
  modelNumberId: Scalars['String'];
}>;


export type ModelNumberQuery = { __typename?: 'Query', response?: { __typename?: 'ModelNumberQueryOutput', success: boolean, modelNumber?: { __typename?: 'ModelNumber', id: string, description?: string | null | undefined, productIds?: Array<string | null | undefined> | null | undefined, productType?: ProductType | null | undefined, lotted?: boolean | null | undefined, warrantyTerm?: number | null | undefined, warrantyDescription?: string | null | undefined, resolutionWithWarranty?: string | null | undefined, resolutionWithoutWarranty?: string | null | undefined, publicNotes?: string | null | undefined, privateNotes?: string | null | undefined, products?: Array<{ __typename?: 'Product', id: string, name: string } | null | undefined> | null | undefined, symptoms?: Array<{ __typename?: 'ProductSymptom', id: string, name: string, faultCode?: string | null | undefined } | null | undefined> | null | undefined, feeWithWarranty?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined, feeWithoutWarranty?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined, pricing?: { __typename?: 'Pricing', cost?: string | null | undefined, retail?: string | null | undefined } | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } | null | undefined };

export type ModelNumbersLottedQueryVariables = Exact<{ [key: string]: never; }>;


export type ModelNumbersLottedQuery = { __typename?: 'Query', response?: { __typename?: 'ModelNumberQueryOutput', pageSize?: number | null | undefined, success: boolean, modelNumbers?: Array<{ __typename?: 'ModelNumber', id: string, lotted?: boolean | null | undefined } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } | null | undefined };

export type ModelNumbersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  productType?: InputMaybe<ProductType>;
}>;


export type ModelNumbersQuery = { __typename?: 'Query', response?: { __typename?: 'ModelNumberQueryOutput', pageSize?: number | null | undefined, success: boolean, modelNumbers?: Array<{ __typename?: 'ModelNumber', id: string, lotted?: boolean | null | undefined, warrantyTerm?: number | null | undefined, warrantyDescription?: string | null | undefined, productType?: ProductType | null | undefined, description?: string | null | undefined, feeWithWarranty?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined, products?: Array<{ __typename?: 'Product', id: string, name: string } | null | undefined> | null | undefined, feeWithoutWarranty?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } | null | undefined };

export type ModelNumbersSimpleQueryVariables = Exact<{ [key: string]: never; }>;


export type ModelNumbersSimpleQuery = { __typename?: 'Query', response?: { __typename?: 'ModelNumberQueryOutput', pageSize?: number | null | undefined, success: boolean, modelNumbers?: Array<{ __typename?: 'ModelNumber', id: string } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } | null | undefined };

export type ModelNumbersViewableQueryVariables = Exact<{ [key: string]: never; }>;


export type ModelNumbersViewableQuery = { __typename?: 'Query', response?: { __typename?: 'ModelNumberQueryOutput', pageSize?: number | null | undefined, success: boolean, modelNumbers?: Array<{ __typename?: 'ModelNumber', id: string, publiclyViewable?: boolean | null | undefined } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } | null | undefined };

export type PageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PageQuery = { __typename?: 'Query', response: { __typename?: 'PageQueryOutput', success: boolean, page?: { __typename?: 'Page', id: string, title?: string | null | undefined, keywords?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined, sections?: Array<{ __typename?: 'Section', id: string, name?: string | null | undefined, position?: number | null | undefined, items?: Array<{ __typename?: 'SectionItem', id: string, name?: string | null | undefined, description?: string | null | undefined, position?: number | null | undefined, icon?: string | null | undefined, url?: string | null | undefined, target?: string | null | undefined, type?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type PagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PagesQuery = { __typename?: 'Query', response: { __typename?: 'PageQueryOutput', success: boolean, pages?: Array<{ __typename?: 'Page', id: string, title?: string | null | undefined, keywords?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type ProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type ProductQuery = { __typename?: 'Query', response?: { __typename?: 'ProductQueryOutput', success: boolean, product?: { __typename?: 'Product', id: string, name: string, description: string, modelNumbers?: Array<{ __typename?: 'ModelNumber', id: string, description?: string | null | undefined, lotted?: boolean | null | undefined, warrantyTerm?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } | null | undefined };

export type ProductRegistrationQueryVariables = Exact<{
  productRegistrationId: Scalars['String'];
}>;


export type ProductRegistrationQuery = { __typename?: 'Query', response: { __typename?: 'ProductRegistrationQueryOutput', success: boolean, productRegistration?: { __typename?: 'ProductRegistration', id: string, productId: string, customerId: string, lotted?: boolean | null | undefined, serial?: string | null | undefined, modelNumber: string, registeredOn: string, customer: { __typename?: 'Customer', id: string, name?: string | null | undefined, email?: string | null | undefined } } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type ProductRegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductRegistrationsQuery = { __typename?: 'Query', response: { __typename?: 'ProductRegistrationQueryOutput', success: boolean, productRegistrations?: Array<{ __typename?: 'ProductRegistration', id: string, productId: string, customerId: string, serial?: string | null | undefined, modelNumber: string, customer: { __typename?: 'Customer', id: string, name?: string | null | undefined, email?: string | null | undefined } } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type ProductSymptomQueryVariables = Exact<{
  productSymptomId: Scalars['String'];
}>;


export type ProductSymptomQuery = { __typename?: 'Query', response: { __typename?: 'ProductSymptomQueryOutput', success: boolean, productSymptom?: { __typename?: 'ProductSymptom', id: string, name: string, faultCode?: string | null | undefined, fee: boolean, preApproved: boolean, synopsis?: string | null | undefined, solution?: string | null | undefined, careTip?: string | null | undefined, associatedModelNumbers: Array<string | null | undefined>, attachedImages?: Array<{ __typename?: 'AttachedImage', id: string, position: number, status: UploadStatus, url?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type ProductSymptomsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  modelNumber?: InputMaybe<Scalars['String']>;
}>;


export type ProductSymptomsQuery = { __typename?: 'Query', response: { __typename?: 'ProductSymptomQueryOutput', pageSize?: number | null | undefined, success: boolean, productSymptoms?: Array<{ __typename?: 'ProductSymptom', id: string, name: string, faultCode?: string | null | undefined, fee: boolean, preApproved: boolean, careTip?: string | null | undefined, solution?: string | null | undefined, synopsis?: string | null | undefined, associatedModelNumbers: Array<string | null | undefined>, attachedImages?: Array<{ __typename?: 'AttachedImage', id: string, position: number, status: UploadStatus, url?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type ProductsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
}>;


export type ProductsQuery = { __typename?: 'Query', response?: { __typename?: 'ProductQueryOutput', pageSize?: number | null | undefined, success: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string, description: string } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } | null | undefined };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', response: { __typename?: 'UserMutationOutput', success: boolean, user?: { __typename?: 'User', email: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type RgaCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type RgaCountsQuery = { __typename?: 'Query', rgaCount: { __typename?: 'RGAStatusCountOutput', issued?: number | null | undefined, delayed?: number | null | undefined, awaitingArrival?: number | null | undefined, received?: number | null | undefined, assessing?: number | null | undefined, repairing?: number | null | undefined, shipping?: number | null | undefined, closed?: number | null | undefined, canceled?: number | null | undefined, success: boolean, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type RgaQueryVariables = Exact<{
  rgaId: Scalars['String'];
}>;


export type RgaQuery = { __typename?: 'Query', response: { __typename?: 'RGAQueryOutput', success: boolean, rga?: { __typename?: 'RGA', id: string, shippingSpeed?: string | null | undefined, submittedOn: string, submittedBy: string, status: RgaStatus, statusLog?: Array<{ __typename?: 'RGAStatusUpdate', status?: RgaStatus | null | undefined, updatedOn?: string | null | undefined, notes?: string | null | undefined, updatedBy?: { __typename?: 'UpdateProfile', id?: string | null | undefined, name?: string | null | undefined, email?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, goods: Array<{ __typename?: 'RGAGood', id: string, serviceId?: string | null | undefined, customerEmail?: string | null | undefined, customerId?: string | null | undefined, customerName?: string | null | undefined, customerLetterUrl?: string | null | undefined, customerSpecialty?: string | null | undefined, faultCode?: string | null | undefined, serial?: string | null | undefined, newSerial?: string | null | undefined, lotted?: boolean | null | undefined, preApproved?: boolean | null | undefined, productId?: string | null | undefined, productName?: string | null | undefined, productType?: ProductType | null | undefined, symptomId?: string | null | undefined, symptomDescription?: string | null | undefined, symptomSolution?: string | null | undefined, symptomSynopsis?: string | null | undefined, modelNumber?: string | null | undefined, po?: string | null | undefined, rma?: string | null | undefined, rgaId: string, warrantied?: boolean | null | undefined, warrantyTerm?: number | null | undefined, warrantyDescription?: string | null | undefined, notes?: string | null | undefined, serviceFormUrl?: string | null | undefined, shippingSpeed?: string | null | undefined, ssd?: boolean | null | undefined, additionalComments?: string | null | undefined, datePurchased?: string | null | undefined, disposition?: string | null | undefined, resolutionFee?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined } | null | undefined> } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type RgasQueryVariables = Exact<{
  status?: InputMaybe<RgaStatus>;
}>;


export type RgasQuery = { __typename?: 'Query', response: { __typename?: 'RGAQueryOutput', success: boolean, rgas?: Array<{ __typename?: 'RGA', id: string, submittedOn: string, submittedBy: string, status: RgaStatus, goods: Array<{ __typename?: 'RGAGood', id: string } | null | undefined> } | null | undefined> | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateCustomerMutationVariables = Exact<{
  customerInput: ExistingCustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', response: { __typename?: 'CustomerMutationOutput', customer?: { __typename?: 'Customer', id: string, name?: string | null | undefined, email?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateDistributorMutationVariables = Exact<{
  distributorInput: ExistingDistributorInput;
}>;


export type UpdateDistributorMutation = { __typename?: 'Mutation', response: { __typename?: 'DistributorMutationOutput', distributor?: { __typename?: 'Distributor', id: string, name?: string | null | undefined, domain: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateModelNumberLottedMutationVariables = Exact<{
  id: Scalars['ID'];
  lotted: Scalars['Boolean'];
}>;


export type UpdateModelNumberLottedMutation = { __typename?: 'Mutation', response: { __typename?: 'ModelNumberMutationOutput', modelNumber?: { __typename?: 'ModelNumber', id: string, lotted?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateModelNumberMutationVariables = Exact<{
  modelNumberInput: ModelNumberInput;
}>;


export type UpdateModelNumberMutation = { __typename?: 'Mutation', response: { __typename?: 'ModelNumberMutationOutput', modelNumber?: { __typename?: 'ModelNumber', id: string, description?: string | null | undefined, productIds?: Array<string | null | undefined> | null | undefined, productType?: ProductType | null | undefined, lotted?: boolean | null | undefined, warrantyTerm?: number | null | undefined, warrantyDescription?: string | null | undefined, resolutionWithWarranty?: string | null | undefined, resolutionWithoutWarranty?: string | null | undefined, publicNotes?: string | null | undefined, privateNotes?: string | null | undefined, products?: Array<{ __typename?: 'Product', id: string, name: string } | null | undefined> | null | undefined, pricing?: { __typename?: 'Pricing', cost?: string | null | undefined, retail?: string | null | undefined } | null | undefined, feeWithWarranty?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined, feeWithoutWarranty?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateModelNumberViewableMutationVariables = Exact<{
  id: Scalars['ID'];
  publiclyViewable: Scalars['Boolean'];
}>;


export type UpdateModelNumberViewableMutation = { __typename?: 'Mutation', response: { __typename?: 'ModelNumberMutationOutput', modelNumber?: { __typename?: 'ModelNumber', id: string, publiclyViewable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateProductMutationVariables = Exact<{
  productInput: ProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductMutationOutput', product?: { __typename?: 'Product', id: string, name: string, description: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateProductRegistrationMutationVariables = Exact<{
  productRegistrationInput: ExistingProductRegistrationInput;
}>;


export type UpdateProductRegistrationMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductRegistrationMutationOutput', success: boolean, productRegistration?: { __typename?: 'ProductRegistration', id: string, modelNumber: string, productId: string, customerId: string, serial?: string | null | undefined, customer: { __typename?: 'Customer', id: string, email?: string | null | undefined, name?: string | null | undefined } } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', path: string, message: string } | null | undefined> | null | undefined } };

export type UpdateProductSymptomMutationVariables = Exact<{
  productSymptomInput: ExistingProductSymptomInput;
}>;


export type UpdateProductSymptomMutation = { __typename?: 'Mutation', response: { __typename?: 'ProductSymptomMutationOutput', productSymptom?: { __typename?: 'ProductSymptom', id: string, name: string, fee: boolean, faultCode?: string | null | undefined, synopsis?: string | null | undefined, solution?: string | null | undefined, careTip?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateRgaGoodMutationVariables = Exact<{
  id: Scalars['ID'];
  rgaId: Scalars['String'];
  rgaGoodInput: RgaGoodInput;
}>;


export type UpdateRgaGoodMutation = { __typename?: 'Mutation', response: { __typename?: 'RGAGoodMutationOutput', success: boolean, rgaId?: string | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined, rgaGood?: { __typename?: 'RGAGood', id: string, serviceId?: string | null | undefined, customerId?: string | null | undefined, customerEmail?: string | null | undefined, customerName?: string | null | undefined, customerPhone?: string | null | undefined, customerStreet?: string | null | undefined, customerStreet2?: string | null | undefined, customerZip?: string | null | undefined, customerCity?: string | null | undefined, customerState?: string | null | undefined, customerCountry?: string | null | undefined, customerSpecialty?: string | null | undefined, faultCode?: string | null | undefined, serial?: string | null | undefined, newSerial?: string | null | undefined, lotted?: boolean | null | undefined, preApproved?: boolean | null | undefined, productId?: string | null | undefined, productName?: string | null | undefined, productType?: ProductType | null | undefined, symptomId?: string | null | undefined, symptomDescription?: string | null | undefined, symptomSolution?: string | null | undefined, symptomSynopsis?: string | null | undefined, modelNumber?: string | null | undefined, po?: string | null | undefined, rma?: string | null | undefined, warrantied?: boolean | null | undefined, warrantyTerm?: number | null | undefined, warrantyDescription?: string | null | undefined, notes?: string | null | undefined, serviceFormUrl?: string | null | undefined, customerLetterUrl?: string | null | undefined, ssd?: boolean | null | undefined, additionalComments?: string | null | undefined, datePurchased?: string | null | undefined, disposition?: string | null | undefined, resolutionFee?: { __typename?: 'FeeStructure', distributor?: string | null | undefined, endUser?: string | null | undefined } | null | undefined } | null | undefined } };

export type UpdateRgaMutationVariables = Exact<{
  rgaInput: ExistingRgaInput;
}>;


export type UpdateRgaMutation = { __typename?: 'Mutation', response: { __typename?: 'RGAMutationOutput', success: boolean, rga?: { __typename?: 'RGA', id: string, shippingSpeed?: string | null | undefined, status: RgaStatus, submittedBy: string, submittedOn: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateRgaShippingStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  shippingUpdates?: InputMaybe<Array<InputMaybe<RgaGoodShippingInput>> | InputMaybe<RgaGoodShippingInput>>;
  notes?: InputMaybe<Scalars['String']>;
}>;


export type UpdateRgaShippingStatusMutation = { __typename?: 'Mutation', response: { __typename?: 'RGAMutationOutput', success: boolean, rga?: { __typename?: 'RGA', id: string, status: RgaStatus, submittedBy: string, submittedOn: string, shippingSpeed?: string | null | undefined, statusLog?: Array<{ __typename?: 'RGAStatusUpdate', status?: RgaStatus | null | undefined, notes?: string | null | undefined, updatedOn?: string | null | undefined, updatedBy?: { __typename?: 'UpdateProfile', name?: string | null | undefined, id?: string | null | undefined, email?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateRgaStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  status: RgaStatus;
  notes?: InputMaybe<Scalars['String']>;
}>;


export type UpdateRgaStatusMutation = { __typename?: 'Mutation', response: { __typename?: 'RGAMutationOutput', success: boolean, rga?: { __typename?: 'RGA', id: string, status: RgaStatus, submittedBy: string, submittedOn: string, shippingSpeed?: string | null | undefined, statusLog?: Array<{ __typename?: 'RGAStatusUpdate', status?: RgaStatus | null | undefined, notes?: string | null | undefined, updatedOn?: string | null | undefined, updatedBy?: { __typename?: 'UpdateProfile', name?: string | null | undefined, id?: string | null | undefined, email?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UpdateUserMutationVariables = Exact<{
  userInput: ExistingUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', response: { __typename?: 'UserMutationOutput', user?: { __typename?: 'User', id: string, firstName?: string | null | undefined, lastName?: string | null | undefined, email: string } | null | undefined, errors?: Array<{ __typename?: 'ValidationError', message: string, path: string } | null | undefined> | null | undefined } };

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, firstName?: string | null | undefined, lastName?: string | null | undefined } | null | undefined };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, firstName?: string | null | undefined, lastName?: string | null | undefined, email: string } | null | undefined> | null | undefined };


export const AttachImagesToSymptomDocument = gql`
    mutation AttachImagesToSymptom($symptomId: String!, $attachedImages: [AttachedImageInput]!) {
  response: attachImagesToSymptom(
    symptomId: $symptomId
    attachedImages: $attachedImages
  ) {
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
export type AttachImagesToSymptomMutationFn = Apollo.MutationFunction<AttachImagesToSymptomMutation, AttachImagesToSymptomMutationVariables>;

/**
 * __useAttachImagesToSymptomMutation__
 *
 * To run a mutation, you first call `useAttachImagesToSymptomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachImagesToSymptomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachImagesToSymptomMutation, { data, loading, error }] = useAttachImagesToSymptomMutation({
 *   variables: {
 *      symptomId: // value for 'symptomId'
 *      attachedImages: // value for 'attachedImages'
 *   },
 * });
 */
export function useAttachImagesToSymptomMutation(baseOptions?: Apollo.MutationHookOptions<AttachImagesToSymptomMutation, AttachImagesToSymptomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttachImagesToSymptomMutation, AttachImagesToSymptomMutationVariables>(AttachImagesToSymptomDocument, options);
      }
export type AttachImagesToSymptomMutationHookResult = ReturnType<typeof useAttachImagesToSymptomMutation>;
export type AttachImagesToSymptomMutationResult = Apollo.MutationResult<AttachImagesToSymptomMutation>;
export type AttachImagesToSymptomMutationOptions = Apollo.BaseMutationOptions<AttachImagesToSymptomMutation, AttachImagesToSymptomMutationVariables>;
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
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      customerInput: // value for 'customerInput'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
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
export type CreateDistributorMutationFn = Apollo.MutationFunction<CreateDistributorMutation, CreateDistributorMutationVariables>;

/**
 * __useCreateDistributorMutation__
 *
 * To run a mutation, you first call `useCreateDistributorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDistributorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDistributorMutation, { data, loading, error }] = useCreateDistributorMutation({
 *   variables: {
 *      distributorInput: // value for 'distributorInput'
 *   },
 * });
 */
export function useCreateDistributorMutation(baseOptions?: Apollo.MutationHookOptions<CreateDistributorMutation, CreateDistributorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDistributorMutation, CreateDistributorMutationVariables>(CreateDistributorDocument, options);
      }
export type CreateDistributorMutationHookResult = ReturnType<typeof useCreateDistributorMutation>;
export type CreateDistributorMutationResult = Apollo.MutationResult<CreateDistributorMutation>;
export type CreateDistributorMutationOptions = Apollo.BaseMutationOptions<CreateDistributorMutation, CreateDistributorMutationVariables>;
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
export type CreateModelNumberMutationFn = Apollo.MutationFunction<CreateModelNumberMutation, CreateModelNumberMutationVariables>;

/**
 * __useCreateModelNumberMutation__
 *
 * To run a mutation, you first call `useCreateModelNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModelNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModelNumberMutation, { data, loading, error }] = useCreateModelNumberMutation({
 *   variables: {
 *      modelNumberInput: // value for 'modelNumberInput'
 *   },
 * });
 */
export function useCreateModelNumberMutation(baseOptions?: Apollo.MutationHookOptions<CreateModelNumberMutation, CreateModelNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateModelNumberMutation, CreateModelNumberMutationVariables>(CreateModelNumberDocument, options);
      }
export type CreateModelNumberMutationHookResult = ReturnType<typeof useCreateModelNumberMutation>;
export type CreateModelNumberMutationResult = Apollo.MutationResult<CreateModelNumberMutation>;
export type CreateModelNumberMutationOptions = Apollo.BaseMutationOptions<CreateModelNumberMutation, CreateModelNumberMutationVariables>;
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
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      productInput: // value for 'productInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateProductRegistrationDocument = gql`
    mutation CreateProductRegistration($productRegistrationInput: NewProductRegistrationInput!) {
  response: createProductRegistration(
    productRegistrationInput: $productRegistrationInput
  ) {
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
export type CreateProductRegistrationMutationFn = Apollo.MutationFunction<CreateProductRegistrationMutation, CreateProductRegistrationMutationVariables>;

/**
 * __useCreateProductRegistrationMutation__
 *
 * To run a mutation, you first call `useCreateProductRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductRegistrationMutation, { data, loading, error }] = useCreateProductRegistrationMutation({
 *   variables: {
 *      productRegistrationInput: // value for 'productRegistrationInput'
 *   },
 * });
 */
export function useCreateProductRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductRegistrationMutation, CreateProductRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductRegistrationMutation, CreateProductRegistrationMutationVariables>(CreateProductRegistrationDocument, options);
      }
export type CreateProductRegistrationMutationHookResult = ReturnType<typeof useCreateProductRegistrationMutation>;
export type CreateProductRegistrationMutationResult = Apollo.MutationResult<CreateProductRegistrationMutation>;
export type CreateProductRegistrationMutationOptions = Apollo.BaseMutationOptions<CreateProductRegistrationMutation, CreateProductRegistrationMutationVariables>;
export const CreateProductSymptomDocument = gql`
    mutation CreateProductSymptom($productSymptomInput: NewProductSymptomInput!) {
  response: createProductSymptom(productSymptomInput: $productSymptomInput) {
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
export type CreateProductSymptomMutationFn = Apollo.MutationFunction<CreateProductSymptomMutation, CreateProductSymptomMutationVariables>;

/**
 * __useCreateProductSymptomMutation__
 *
 * To run a mutation, you first call `useCreateProductSymptomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductSymptomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductSymptomMutation, { data, loading, error }] = useCreateProductSymptomMutation({
 *   variables: {
 *      productSymptomInput: // value for 'productSymptomInput'
 *   },
 * });
 */
export function useCreateProductSymptomMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductSymptomMutation, CreateProductSymptomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductSymptomMutation, CreateProductSymptomMutationVariables>(CreateProductSymptomDocument, options);
      }
export type CreateProductSymptomMutationHookResult = ReturnType<typeof useCreateProductSymptomMutation>;
export type CreateProductSymptomMutationResult = Apollo.MutationResult<CreateProductSymptomMutation>;
export type CreateProductSymptomMutationOptions = Apollo.BaseMutationOptions<CreateProductSymptomMutation, CreateProductSymptomMutationVariables>;
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
export type CreateRgaGoodMutationFn = Apollo.MutationFunction<CreateRgaGoodMutation, CreateRgaGoodMutationVariables>;

/**
 * __useCreateRgaGoodMutation__
 *
 * To run a mutation, you first call `useCreateRgaGoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRgaGoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRgaGoodMutation, { data, loading, error }] = useCreateRgaGoodMutation({
 *   variables: {
 *      rgaId: // value for 'rgaId'
 *      rgaGoodInput: // value for 'rgaGoodInput'
 *   },
 * });
 */
export function useCreateRgaGoodMutation(baseOptions?: Apollo.MutationHookOptions<CreateRgaGoodMutation, CreateRgaGoodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRgaGoodMutation, CreateRgaGoodMutationVariables>(CreateRgaGoodDocument, options);
      }
export type CreateRgaGoodMutationHookResult = ReturnType<typeof useCreateRgaGoodMutation>;
export type CreateRgaGoodMutationResult = Apollo.MutationResult<CreateRgaGoodMutation>;
export type CreateRgaGoodMutationOptions = Apollo.BaseMutationOptions<CreateRgaGoodMutation, CreateRgaGoodMutationVariables>;
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
export type CreateRgaMutationFn = Apollo.MutationFunction<CreateRgaMutation, CreateRgaMutationVariables>;

/**
 * __useCreateRgaMutation__
 *
 * To run a mutation, you first call `useCreateRgaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRgaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRgaMutation, { data, loading, error }] = useCreateRgaMutation({
 *   variables: {
 *      rgaInput: // value for 'rgaInput'
 *   },
 * });
 */
export function useCreateRgaMutation(baseOptions?: Apollo.MutationHookOptions<CreateRgaMutation, CreateRgaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRgaMutation, CreateRgaMutationVariables>(CreateRgaDocument, options);
      }
export type CreateRgaMutationHookResult = ReturnType<typeof useCreateRgaMutation>;
export type CreateRgaMutationResult = Apollo.MutationResult<CreateRgaMutation>;
export type CreateRgaMutationOptions = Apollo.BaseMutationOptions<CreateRgaMutation, CreateRgaMutationVariables>;
export const CreateUploadsDocument = gql`
    mutation CreateUploads($uploadInput: UploadInput!) {
  response: createUploads(uploadInput: $uploadInput) {
    uploads {
      id
      url
    }
    success
    errors {
      message
      path
    }
  }
}
    `;
export type CreateUploadsMutationFn = Apollo.MutationFunction<CreateUploadsMutation, CreateUploadsMutationVariables>;

/**
 * __useCreateUploadsMutation__
 *
 * To run a mutation, you first call `useCreateUploadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadsMutation, { data, loading, error }] = useCreateUploadsMutation({
 *   variables: {
 *      uploadInput: // value for 'uploadInput'
 *   },
 * });
 */
export function useCreateUploadsMutation(baseOptions?: Apollo.MutationHookOptions<CreateUploadsMutation, CreateUploadsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUploadsMutation, CreateUploadsMutationVariables>(CreateUploadsDocument, options);
      }
export type CreateUploadsMutationHookResult = ReturnType<typeof useCreateUploadsMutation>;
export type CreateUploadsMutationResult = Apollo.MutationResult<CreateUploadsMutation>;
export type CreateUploadsMutationOptions = Apollo.BaseMutationOptions<CreateUploadsMutation, CreateUploadsMutationVariables>;
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
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

/**
 * __useCustomerQuery__
 *
 * To run a query within a React component, call `useCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useCustomerQuery(baseOptions: Apollo.QueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, options);
      }
export function useCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, options);
        }
export type CustomerQueryHookResult = ReturnType<typeof useCustomerQuery>;
export type CustomerLazyQueryHookResult = ReturnType<typeof useCustomerLazyQuery>;
export type CustomerQueryResult = Apollo.QueryResult<CustomerQuery, CustomerQueryVariables>;
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

/**
 * __useCustomersQuery__
 *
 * To run a query within a React component, call `useCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useCustomersQuery(baseOptions?: Apollo.QueryHookOptions<CustomersQuery, CustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomersQuery, CustomersQueryVariables>(CustomersDocument, options);
      }
export function useCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomersQuery, CustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomersQuery, CustomersQueryVariables>(CustomersDocument, options);
        }
export type CustomersQueryHookResult = ReturnType<typeof useCustomersQuery>;
export type CustomersLazyQueryHookResult = ReturnType<typeof useCustomersLazyQuery>;
export type CustomersQueryResult = Apollo.QueryResult<CustomersQuery, CustomersQueryVariables>;
export const DestroyDistributorDocument = gql`
    mutation DestroyDistributor($id: String!) {
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
export type DestroyDistributorMutationFn = Apollo.MutationFunction<DestroyDistributorMutation, DestroyDistributorMutationVariables>;

/**
 * __useDestroyDistributorMutation__
 *
 * To run a mutation, you first call `useDestroyDistributorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyDistributorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyDistributorMutation, { data, loading, error }] = useDestroyDistributorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyDistributorMutation(baseOptions?: Apollo.MutationHookOptions<DestroyDistributorMutation, DestroyDistributorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyDistributorMutation, DestroyDistributorMutationVariables>(DestroyDistributorDocument, options);
      }
export type DestroyDistributorMutationHookResult = ReturnType<typeof useDestroyDistributorMutation>;
export type DestroyDistributorMutationResult = Apollo.MutationResult<DestroyDistributorMutation>;
export type DestroyDistributorMutationOptions = Apollo.BaseMutationOptions<DestroyDistributorMutation, DestroyDistributorMutationVariables>;
export const DestroyCustomerDocument = gql`
    mutation DestroyCustomer($id: String!) {
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
export type DestroyCustomerMutationFn = Apollo.MutationFunction<DestroyCustomerMutation, DestroyCustomerMutationVariables>;

/**
 * __useDestroyCustomerMutation__
 *
 * To run a mutation, you first call `useDestroyCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyCustomerMutation, { data, loading, error }] = useDestroyCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyCustomerMutation(baseOptions?: Apollo.MutationHookOptions<DestroyCustomerMutation, DestroyCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyCustomerMutation, DestroyCustomerMutationVariables>(DestroyCustomerDocument, options);
      }
export type DestroyCustomerMutationHookResult = ReturnType<typeof useDestroyCustomerMutation>;
export type DestroyCustomerMutationResult = Apollo.MutationResult<DestroyCustomerMutation>;
export type DestroyCustomerMutationOptions = Apollo.BaseMutationOptions<DestroyCustomerMutation, DestroyCustomerMutationVariables>;
export const DestroyDocumentDocument = gql`
    mutation DestroyDocument($id: String!) {
  response: destroyDocument(id: $id) {
    document {
      id
      title
      keywords
      description
      slug
    }
    success
    errors {
      path
      message
    }
  }
}
    `;
export type DestroyDocumentMutationFn = Apollo.MutationFunction<DestroyDocumentMutation, DestroyDocumentMutationVariables>;

/**
 * __useDestroyDocumentMutation__
 *
 * To run a mutation, you first call `useDestroyDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyDocumentMutation, { data, loading, error }] = useDestroyDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyDocumentMutation(baseOptions?: Apollo.MutationHookOptions<DestroyDocumentMutation, DestroyDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyDocumentMutation, DestroyDocumentMutationVariables>(DestroyDocumentDocument, options);
      }
export type DestroyDocumentMutationHookResult = ReturnType<typeof useDestroyDocumentMutation>;
export type DestroyDocumentMutationResult = Apollo.MutationResult<DestroyDocumentMutation>;
export type DestroyDocumentMutationOptions = Apollo.BaseMutationOptions<DestroyDocumentMutation, DestroyDocumentMutationVariables>;
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
export type DestroyModelNumberMutationFn = Apollo.MutationFunction<DestroyModelNumberMutation, DestroyModelNumberMutationVariables>;

/**
 * __useDestroyModelNumberMutation__
 *
 * To run a mutation, you first call `useDestroyModelNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyModelNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyModelNumberMutation, { data, loading, error }] = useDestroyModelNumberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyModelNumberMutation(baseOptions?: Apollo.MutationHookOptions<DestroyModelNumberMutation, DestroyModelNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyModelNumberMutation, DestroyModelNumberMutationVariables>(DestroyModelNumberDocument, options);
      }
export type DestroyModelNumberMutationHookResult = ReturnType<typeof useDestroyModelNumberMutation>;
export type DestroyModelNumberMutationResult = Apollo.MutationResult<DestroyModelNumberMutation>;
export type DestroyModelNumberMutationOptions = Apollo.BaseMutationOptions<DestroyModelNumberMutation, DestroyModelNumberMutationVariables>;
export const DestroyPageDocument = gql`
    mutation DestroyPage($id: String!) {
  response: destroyPage(id: $id) {
    page {
      id
      title
      keywords
      description
      slug
    }
    success
    errors {
      path
      message
    }
  }
}
    `;
export type DestroyPageMutationFn = Apollo.MutationFunction<DestroyPageMutation, DestroyPageMutationVariables>;

/**
 * __useDestroyPageMutation__
 *
 * To run a mutation, you first call `useDestroyPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyPageMutation, { data, loading, error }] = useDestroyPageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyPageMutation(baseOptions?: Apollo.MutationHookOptions<DestroyPageMutation, DestroyPageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyPageMutation, DestroyPageMutationVariables>(DestroyPageDocument, options);
      }
export type DestroyPageMutationHookResult = ReturnType<typeof useDestroyPageMutation>;
export type DestroyPageMutationResult = Apollo.MutationResult<DestroyPageMutation>;
export type DestroyPageMutationOptions = Apollo.BaseMutationOptions<DestroyPageMutation, DestroyPageMutationVariables>;
export const DestroyProductDocument = gql`
    mutation DestroyProduct($id: ID!) {
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
export type DestroyProductMutationFn = Apollo.MutationFunction<DestroyProductMutation, DestroyProductMutationVariables>;

/**
 * __useDestroyProductMutation__
 *
 * To run a mutation, you first call `useDestroyProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyProductMutation, { data, loading, error }] = useDestroyProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyProductMutation(baseOptions?: Apollo.MutationHookOptions<DestroyProductMutation, DestroyProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyProductMutation, DestroyProductMutationVariables>(DestroyProductDocument, options);
      }
export type DestroyProductMutationHookResult = ReturnType<typeof useDestroyProductMutation>;
export type DestroyProductMutationResult = Apollo.MutationResult<DestroyProductMutation>;
export type DestroyProductMutationOptions = Apollo.BaseMutationOptions<DestroyProductMutation, DestroyProductMutationVariables>;
export const DestroyProductRegistrationDocument = gql`
    mutation DestroyProductRegistration($id: String!) {
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
export type DestroyProductRegistrationMutationFn = Apollo.MutationFunction<DestroyProductRegistrationMutation, DestroyProductRegistrationMutationVariables>;

/**
 * __useDestroyProductRegistrationMutation__
 *
 * To run a mutation, you first call `useDestroyProductRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyProductRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyProductRegistrationMutation, { data, loading, error }] = useDestroyProductRegistrationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyProductRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<DestroyProductRegistrationMutation, DestroyProductRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyProductRegistrationMutation, DestroyProductRegistrationMutationVariables>(DestroyProductRegistrationDocument, options);
      }
export type DestroyProductRegistrationMutationHookResult = ReturnType<typeof useDestroyProductRegistrationMutation>;
export type DestroyProductRegistrationMutationResult = Apollo.MutationResult<DestroyProductRegistrationMutation>;
export type DestroyProductRegistrationMutationOptions = Apollo.BaseMutationOptions<DestroyProductRegistrationMutation, DestroyProductRegistrationMutationVariables>;
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
export type DestroyProductSymptomMutationFn = Apollo.MutationFunction<DestroyProductSymptomMutation, DestroyProductSymptomMutationVariables>;

/**
 * __useDestroyProductSymptomMutation__
 *
 * To run a mutation, you first call `useDestroyProductSymptomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyProductSymptomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyProductSymptomMutation, { data, loading, error }] = useDestroyProductSymptomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyProductSymptomMutation(baseOptions?: Apollo.MutationHookOptions<DestroyProductSymptomMutation, DestroyProductSymptomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyProductSymptomMutation, DestroyProductSymptomMutationVariables>(DestroyProductSymptomDocument, options);
      }
export type DestroyProductSymptomMutationHookResult = ReturnType<typeof useDestroyProductSymptomMutation>;
export type DestroyProductSymptomMutationResult = Apollo.MutationResult<DestroyProductSymptomMutation>;
export type DestroyProductSymptomMutationOptions = Apollo.BaseMutationOptions<DestroyProductSymptomMutation, DestroyProductSymptomMutationVariables>;
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
export type DestroyRgaGoodMutationFn = Apollo.MutationFunction<DestroyRgaGoodMutation, DestroyRgaGoodMutationVariables>;

/**
 * __useDestroyRgaGoodMutation__
 *
 * To run a mutation, you first call `useDestroyRgaGoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyRgaGoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyRgaGoodMutation, { data, loading, error }] = useDestroyRgaGoodMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rgaId: // value for 'rgaId'
 *   },
 * });
 */
export function useDestroyRgaGoodMutation(baseOptions?: Apollo.MutationHookOptions<DestroyRgaGoodMutation, DestroyRgaGoodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyRgaGoodMutation, DestroyRgaGoodMutationVariables>(DestroyRgaGoodDocument, options);
      }
export type DestroyRgaGoodMutationHookResult = ReturnType<typeof useDestroyRgaGoodMutation>;
export type DestroyRgaGoodMutationResult = Apollo.MutationResult<DestroyRgaGoodMutation>;
export type DestroyRgaGoodMutationOptions = Apollo.BaseMutationOptions<DestroyRgaGoodMutation, DestroyRgaGoodMutationVariables>;
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
export type DestroyUserMutationFn = Apollo.MutationFunction<DestroyUserMutation, DestroyUserMutationVariables>;

/**
 * __useDestroyUserMutation__
 *
 * To run a mutation, you first call `useDestroyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyUserMutation, { data, loading, error }] = useDestroyUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyUserMutation(baseOptions?: Apollo.MutationHookOptions<DestroyUserMutation, DestroyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyUserMutation, DestroyUserMutationVariables>(DestroyUserDocument, options);
      }
export type DestroyUserMutationHookResult = ReturnType<typeof useDestroyUserMutation>;
export type DestroyUserMutationResult = Apollo.MutationResult<DestroyUserMutation>;
export type DestroyUserMutationOptions = Apollo.BaseMutationOptions<DestroyUserMutation, DestroyUserMutationVariables>;
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

/**
 * __useDistributorQuery__
 *
 * To run a query within a React component, call `useDistributorQuery` and pass it any options that fit your needs.
 * When your component renders, `useDistributorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDistributorQuery({
 *   variables: {
 *      distributorId: // value for 'distributorId'
 *   },
 * });
 */
export function useDistributorQuery(baseOptions: Apollo.QueryHookOptions<DistributorQuery, DistributorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DistributorQuery, DistributorQueryVariables>(DistributorDocument, options);
      }
export function useDistributorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DistributorQuery, DistributorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DistributorQuery, DistributorQueryVariables>(DistributorDocument, options);
        }
export type DistributorQueryHookResult = ReturnType<typeof useDistributorQuery>;
export type DistributorLazyQueryHookResult = ReturnType<typeof useDistributorLazyQuery>;
export type DistributorQueryResult = Apollo.QueryResult<DistributorQuery, DistributorQueryVariables>;
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

/**
 * __useDistributorsQuery__
 *
 * To run a query within a React component, call `useDistributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDistributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDistributorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDistributorsQuery(baseOptions?: Apollo.QueryHookOptions<DistributorsQuery, DistributorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DistributorsQuery, DistributorsQueryVariables>(DistributorsDocument, options);
      }
export function useDistributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DistributorsQuery, DistributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DistributorsQuery, DistributorsQueryVariables>(DistributorsDocument, options);
        }
export type DistributorsQueryHookResult = ReturnType<typeof useDistributorsQuery>;
export type DistributorsLazyQueryHookResult = ReturnType<typeof useDistributorsLazyQuery>;
export type DistributorsQueryResult = Apollo.QueryResult<DistributorsQuery, DistributorsQueryVariables>;
export const DocumentDocument = gql`
    query Document($id: ID!) {
  response: document(id: $id) {
    document {
      id
      title
      keywords
      description
      slug
      fileKey
      url
    }
    success
    errors {
      path
      message
    }
  }
}
    `;

/**
 * __useDocumentQuery__
 *
 * To run a query within a React component, call `useDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDocumentQuery(baseOptions: Apollo.QueryHookOptions<DocumentQuery, DocumentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
      }
export function useDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentQuery, DocumentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
        }
export type DocumentQueryHookResult = ReturnType<typeof useDocumentQuery>;
export type DocumentLazyQueryHookResult = ReturnType<typeof useDocumentLazyQuery>;
export type DocumentQueryResult = Apollo.QueryResult<DocumentQuery, DocumentQueryVariables>;
export const DocumentsDocument = gql`
    query Documents {
  response: documents {
    documents {
      id
      title
      keywords
      description
      slug
    }
    success
    errors {
      path
      message
    }
  }
}
    `;

/**
 * __useDocumentsQuery__
 *
 * To run a query within a React component, call `useDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<DocumentsQuery, DocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, options);
      }
export function useDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentsQuery, DocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, options);
        }
export type DocumentsQueryHookResult = ReturnType<typeof useDocumentsQuery>;
export type DocumentsLazyQueryHookResult = ReturnType<typeof useDocumentsLazyQuery>;
export type DocumentsQueryResult = Apollo.QueryResult<DocumentsQuery, DocumentsQueryVariables>;
export const LinkSymptomToModelNumberDocument = gql`
    mutation LinkSymptomToModelNumber($modelNumber: String!, $symptomId: String!, $linked: Boolean!) {
  response: linkSymptomToModel(
    modelNumber: $modelNumber
    symptomId: $symptomId
    linked: $linked
  ) {
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
export type LinkSymptomToModelNumberMutationFn = Apollo.MutationFunction<LinkSymptomToModelNumberMutation, LinkSymptomToModelNumberMutationVariables>;

/**
 * __useLinkSymptomToModelNumberMutation__
 *
 * To run a mutation, you first call `useLinkSymptomToModelNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkSymptomToModelNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkSymptomToModelNumberMutation, { data, loading, error }] = useLinkSymptomToModelNumberMutation({
 *   variables: {
 *      modelNumber: // value for 'modelNumber'
 *      symptomId: // value for 'symptomId'
 *      linked: // value for 'linked'
 *   },
 * });
 */
export function useLinkSymptomToModelNumberMutation(baseOptions?: Apollo.MutationHookOptions<LinkSymptomToModelNumberMutation, LinkSymptomToModelNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkSymptomToModelNumberMutation, LinkSymptomToModelNumberMutationVariables>(LinkSymptomToModelNumberDocument, options);
      }
export type LinkSymptomToModelNumberMutationHookResult = ReturnType<typeof useLinkSymptomToModelNumberMutation>;
export type LinkSymptomToModelNumberMutationResult = Apollo.MutationResult<LinkSymptomToModelNumberMutation>;
export type LinkSymptomToModelNumberMutationOptions = Apollo.BaseMutationOptions<LinkSymptomToModelNumberMutation, LinkSymptomToModelNumberMutationVariables>;
export const MakeDocumentDocument = gql`
    mutation MakeDocument($documentInput: DocumentInput!) {
  response: makeDocument(documentInput: $documentInput) {
    document {
      id
      title
      keywords
      description
      slug
      fileKey
      url
    }
    success
    errors {
      path
      message
    }
  }
}
    `;
export type MakeDocumentMutationFn = Apollo.MutationFunction<MakeDocumentMutation, MakeDocumentMutationVariables>;

/**
 * __useMakeDocumentMutation__
 *
 * To run a mutation, you first call `useMakeDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeDocumentMutation, { data, loading, error }] = useMakeDocumentMutation({
 *   variables: {
 *      documentInput: // value for 'documentInput'
 *   },
 * });
 */
export function useMakeDocumentMutation(baseOptions?: Apollo.MutationHookOptions<MakeDocumentMutation, MakeDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeDocumentMutation, MakeDocumentMutationVariables>(MakeDocumentDocument, options);
      }
export type MakeDocumentMutationHookResult = ReturnType<typeof useMakeDocumentMutation>;
export type MakeDocumentMutationResult = Apollo.MutationResult<MakeDocumentMutation>;
export type MakeDocumentMutationOptions = Apollo.BaseMutationOptions<MakeDocumentMutation, MakeDocumentMutationVariables>;
export const MakePageDocument = gql`
    mutation MakePage($pageInput: PageInput!) {
  response: makePage(pageInput: $pageInput) {
    page {
      id
      title
      keywords
      description
      slug
      sections {
        id
        name
        position
        items {
          id
          name
          position
          icon
          url
          target
          type
        }
      }
    }
    success
    errors {
      path
      message
    }
  }
}
    `;
export type MakePageMutationFn = Apollo.MutationFunction<MakePageMutation, MakePageMutationVariables>;

/**
 * __useMakePageMutation__
 *
 * To run a mutation, you first call `useMakePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makePageMutation, { data, loading, error }] = useMakePageMutation({
 *   variables: {
 *      pageInput: // value for 'pageInput'
 *   },
 * });
 */
export function useMakePageMutation(baseOptions?: Apollo.MutationHookOptions<MakePageMutation, MakePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakePageMutation, MakePageMutationVariables>(MakePageDocument, options);
      }
export type MakePageMutationHookResult = ReturnType<typeof useMakePageMutation>;
export type MakePageMutationResult = Apollo.MutationResult<MakePageMutation>;
export type MakePageMutationOptions = Apollo.BaseMutationOptions<MakePageMutation, MakePageMutationVariables>;
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

/**
 * __useModelNumberQuery__
 *
 * To run a query within a React component, call `useModelNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useModelNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModelNumberQuery({
 *   variables: {
 *      modelNumberId: // value for 'modelNumberId'
 *   },
 * });
 */
export function useModelNumberQuery(baseOptions: Apollo.QueryHookOptions<ModelNumberQuery, ModelNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModelNumberQuery, ModelNumberQueryVariables>(ModelNumberDocument, options);
      }
export function useModelNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModelNumberQuery, ModelNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModelNumberQuery, ModelNumberQueryVariables>(ModelNumberDocument, options);
        }
export type ModelNumberQueryHookResult = ReturnType<typeof useModelNumberQuery>;
export type ModelNumberLazyQueryHookResult = ReturnType<typeof useModelNumberLazyQuery>;
export type ModelNumberQueryResult = Apollo.QueryResult<ModelNumberQuery, ModelNumberQueryVariables>;
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

/**
 * __useModelNumbersLottedQuery__
 *
 * To run a query within a React component, call `useModelNumbersLottedQuery` and pass it any options that fit your needs.
 * When your component renders, `useModelNumbersLottedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModelNumbersLottedQuery({
 *   variables: {
 *   },
 * });
 */
export function useModelNumbersLottedQuery(baseOptions?: Apollo.QueryHookOptions<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>(ModelNumbersLottedDocument, options);
      }
export function useModelNumbersLottedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>(ModelNumbersLottedDocument, options);
        }
export type ModelNumbersLottedQueryHookResult = ReturnType<typeof useModelNumbersLottedQuery>;
export type ModelNumbersLottedLazyQueryHookResult = ReturnType<typeof useModelNumbersLottedLazyQuery>;
export type ModelNumbersLottedQueryResult = Apollo.QueryResult<ModelNumbersLottedQuery, ModelNumbersLottedQueryVariables>;
export const ModelNumbersDocument = gql`
    query ModelNumbers($search: String, $productId: String, $productType: ProductType) {
  response: modelNumbers(
    search: $search
    productId: $productId
    productType: $productType
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
    `;

/**
 * __useModelNumbersQuery__
 *
 * To run a query within a React component, call `useModelNumbersQuery` and pass it any options that fit your needs.
 * When your component renders, `useModelNumbersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModelNumbersQuery({
 *   variables: {
 *      search: // value for 'search'
 *      productId: // value for 'productId'
 *      productType: // value for 'productType'
 *   },
 * });
 */
export function useModelNumbersQuery(baseOptions?: Apollo.QueryHookOptions<ModelNumbersQuery, ModelNumbersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModelNumbersQuery, ModelNumbersQueryVariables>(ModelNumbersDocument, options);
      }
export function useModelNumbersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModelNumbersQuery, ModelNumbersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModelNumbersQuery, ModelNumbersQueryVariables>(ModelNumbersDocument, options);
        }
export type ModelNumbersQueryHookResult = ReturnType<typeof useModelNumbersQuery>;
export type ModelNumbersLazyQueryHookResult = ReturnType<typeof useModelNumbersLazyQuery>;
export type ModelNumbersQueryResult = Apollo.QueryResult<ModelNumbersQuery, ModelNumbersQueryVariables>;
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

/**
 * __useModelNumbersSimpleQuery__
 *
 * To run a query within a React component, call `useModelNumbersSimpleQuery` and pass it any options that fit your needs.
 * When your component renders, `useModelNumbersSimpleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModelNumbersSimpleQuery({
 *   variables: {
 *   },
 * });
 */
export function useModelNumbersSimpleQuery(baseOptions?: Apollo.QueryHookOptions<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>(ModelNumbersSimpleDocument, options);
      }
export function useModelNumbersSimpleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>(ModelNumbersSimpleDocument, options);
        }
export type ModelNumbersSimpleQueryHookResult = ReturnType<typeof useModelNumbersSimpleQuery>;
export type ModelNumbersSimpleLazyQueryHookResult = ReturnType<typeof useModelNumbersSimpleLazyQuery>;
export type ModelNumbersSimpleQueryResult = Apollo.QueryResult<ModelNumbersSimpleQuery, ModelNumbersSimpleQueryVariables>;
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

/**
 * __useModelNumbersViewableQuery__
 *
 * To run a query within a React component, call `useModelNumbersViewableQuery` and pass it any options that fit your needs.
 * When your component renders, `useModelNumbersViewableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModelNumbersViewableQuery({
 *   variables: {
 *   },
 * });
 */
export function useModelNumbersViewableQuery(baseOptions?: Apollo.QueryHookOptions<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>(ModelNumbersViewableDocument, options);
      }
export function useModelNumbersViewableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>(ModelNumbersViewableDocument, options);
        }
export type ModelNumbersViewableQueryHookResult = ReturnType<typeof useModelNumbersViewableQuery>;
export type ModelNumbersViewableLazyQueryHookResult = ReturnType<typeof useModelNumbersViewableLazyQuery>;
export type ModelNumbersViewableQueryResult = Apollo.QueryResult<ModelNumbersViewableQuery, ModelNumbersViewableQueryVariables>;
export const PageDocument = gql`
    query Page($id: ID!) {
  response: page(id: $id) {
    page {
      id
      title
      keywords
      description
      slug
      sections {
        id
        name
        position
        items {
          id
          name
          description
          position
          icon
          url
          target
          type
        }
      }
    }
    success
    errors {
      path
      message
    }
  }
}
    `;

/**
 * __usePageQuery__
 *
 * To run a query within a React component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePageQuery(baseOptions: Apollo.QueryHookOptions<PageQuery, PageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageQuery, PageQueryVariables>(PageDocument, options);
      }
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageQuery, PageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageQuery, PageQueryVariables>(PageDocument, options);
        }
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageQueryResult = Apollo.QueryResult<PageQuery, PageQueryVariables>;
export const PagesDocument = gql`
    query Pages {
  response: pages {
    pages {
      id
      title
      keywords
      description
      slug
    }
    success
    errors {
      path
      message
    }
  }
}
    `;

/**
 * __usePagesQuery__
 *
 * To run a query within a React component, call `usePagesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePagesQuery(baseOptions?: Apollo.QueryHookOptions<PagesQuery, PagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PagesQuery, PagesQueryVariables>(PagesDocument, options);
      }
export function usePagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PagesQuery, PagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PagesQuery, PagesQueryVariables>(PagesDocument, options);
        }
export type PagesQueryHookResult = ReturnType<typeof usePagesQuery>;
export type PagesLazyQueryHookResult = ReturnType<typeof usePagesLazyQuery>;
export type PagesQueryResult = Apollo.QueryResult<PagesQuery, PagesQueryVariables>;
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

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
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

/**
 * __useProductRegistrationQuery__
 *
 * To run a query within a React component, call `useProductRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductRegistrationQuery({
 *   variables: {
 *      productRegistrationId: // value for 'productRegistrationId'
 *   },
 * });
 */
export function useProductRegistrationQuery(baseOptions: Apollo.QueryHookOptions<ProductRegistrationQuery, ProductRegistrationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductRegistrationQuery, ProductRegistrationQueryVariables>(ProductRegistrationDocument, options);
      }
export function useProductRegistrationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductRegistrationQuery, ProductRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductRegistrationQuery, ProductRegistrationQueryVariables>(ProductRegistrationDocument, options);
        }
export type ProductRegistrationQueryHookResult = ReturnType<typeof useProductRegistrationQuery>;
export type ProductRegistrationLazyQueryHookResult = ReturnType<typeof useProductRegistrationLazyQuery>;
export type ProductRegistrationQueryResult = Apollo.QueryResult<ProductRegistrationQuery, ProductRegistrationQueryVariables>;
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

/**
 * __useProductRegistrationsQuery__
 *
 * To run a query within a React component, call `useProductRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductRegistrationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductRegistrationsQuery(baseOptions?: Apollo.QueryHookOptions<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>(ProductRegistrationsDocument, options);
      }
export function useProductRegistrationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>(ProductRegistrationsDocument, options);
        }
export type ProductRegistrationsQueryHookResult = ReturnType<typeof useProductRegistrationsQuery>;
export type ProductRegistrationsLazyQueryHookResult = ReturnType<typeof useProductRegistrationsLazyQuery>;
export type ProductRegistrationsQueryResult = Apollo.QueryResult<ProductRegistrationsQuery, ProductRegistrationsQueryVariables>;
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

/**
 * __useProductSymptomQuery__
 *
 * To run a query within a React component, call `useProductSymptomQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductSymptomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductSymptomQuery({
 *   variables: {
 *      productSymptomId: // value for 'productSymptomId'
 *   },
 * });
 */
export function useProductSymptomQuery(baseOptions: Apollo.QueryHookOptions<ProductSymptomQuery, ProductSymptomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductSymptomQuery, ProductSymptomQueryVariables>(ProductSymptomDocument, options);
      }
export function useProductSymptomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductSymptomQuery, ProductSymptomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductSymptomQuery, ProductSymptomQueryVariables>(ProductSymptomDocument, options);
        }
export type ProductSymptomQueryHookResult = ReturnType<typeof useProductSymptomQuery>;
export type ProductSymptomLazyQueryHookResult = ReturnType<typeof useProductSymptomLazyQuery>;
export type ProductSymptomQueryResult = Apollo.QueryResult<ProductSymptomQuery, ProductSymptomQueryVariables>;
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

/**
 * __useProductSymptomsQuery__
 *
 * To run a query within a React component, call `useProductSymptomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductSymptomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductSymptomsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      modelNumber: // value for 'modelNumber'
 *   },
 * });
 */
export function useProductSymptomsQuery(baseOptions?: Apollo.QueryHookOptions<ProductSymptomsQuery, ProductSymptomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductSymptomsQuery, ProductSymptomsQueryVariables>(ProductSymptomsDocument, options);
      }
export function useProductSymptomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductSymptomsQuery, ProductSymptomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductSymptomsQuery, ProductSymptomsQueryVariables>(ProductSymptomsDocument, options);
        }
export type ProductSymptomsQueryHookResult = ReturnType<typeof useProductSymptomsQuery>;
export type ProductSymptomsLazyQueryHookResult = ReturnType<typeof useProductSymptomsLazyQuery>;
export type ProductSymptomsQueryResult = Apollo.QueryResult<ProductSymptomsQuery, ProductSymptomsQueryVariables>;
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

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
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
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
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

/**
 * __useRgaCountsQuery__
 *
 * To run a query within a React component, call `useRgaCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRgaCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRgaCountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRgaCountsQuery(baseOptions?: Apollo.QueryHookOptions<RgaCountsQuery, RgaCountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RgaCountsQuery, RgaCountsQueryVariables>(RgaCountsDocument, options);
      }
export function useRgaCountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RgaCountsQuery, RgaCountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RgaCountsQuery, RgaCountsQueryVariables>(RgaCountsDocument, options);
        }
export type RgaCountsQueryHookResult = ReturnType<typeof useRgaCountsQuery>;
export type RgaCountsLazyQueryHookResult = ReturnType<typeof useRgaCountsLazyQuery>;
export type RgaCountsQueryResult = Apollo.QueryResult<RgaCountsQuery, RgaCountsQueryVariables>;
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

/**
 * __useRgaQuery__
 *
 * To run a query within a React component, call `useRgaQuery` and pass it any options that fit your needs.
 * When your component renders, `useRgaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRgaQuery({
 *   variables: {
 *      rgaId: // value for 'rgaId'
 *   },
 * });
 */
export function useRgaQuery(baseOptions: Apollo.QueryHookOptions<RgaQuery, RgaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RgaQuery, RgaQueryVariables>(RgaDocument, options);
      }
export function useRgaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RgaQuery, RgaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RgaQuery, RgaQueryVariables>(RgaDocument, options);
        }
export type RgaQueryHookResult = ReturnType<typeof useRgaQuery>;
export type RgaLazyQueryHookResult = ReturnType<typeof useRgaLazyQuery>;
export type RgaQueryResult = Apollo.QueryResult<RgaQuery, RgaQueryVariables>;
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

/**
 * __useRgasQuery__
 *
 * To run a query within a React component, call `useRgasQuery` and pass it any options that fit your needs.
 * When your component renders, `useRgasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRgasQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useRgasQuery(baseOptions?: Apollo.QueryHookOptions<RgasQuery, RgasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RgasQuery, RgasQueryVariables>(RgasDocument, options);
      }
export function useRgasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RgasQuery, RgasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RgasQuery, RgasQueryVariables>(RgasDocument, options);
        }
export type RgasQueryHookResult = ReturnType<typeof useRgasQuery>;
export type RgasLazyQueryHookResult = ReturnType<typeof useRgasLazyQuery>;
export type RgasQueryResult = Apollo.QueryResult<RgasQuery, RgasQueryVariables>;
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
export type UpdateCustomerMutationFn = Apollo.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      customerInput: // value for 'customerInput'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
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
export type UpdateDistributorMutationFn = Apollo.MutationFunction<UpdateDistributorMutation, UpdateDistributorMutationVariables>;

/**
 * __useUpdateDistributorMutation__
 *
 * To run a mutation, you first call `useUpdateDistributorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDistributorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDistributorMutation, { data, loading, error }] = useUpdateDistributorMutation({
 *   variables: {
 *      distributorInput: // value for 'distributorInput'
 *   },
 * });
 */
export function useUpdateDistributorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDistributorMutation, UpdateDistributorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDistributorMutation, UpdateDistributorMutationVariables>(UpdateDistributorDocument, options);
      }
export type UpdateDistributorMutationHookResult = ReturnType<typeof useUpdateDistributorMutation>;
export type UpdateDistributorMutationResult = Apollo.MutationResult<UpdateDistributorMutation>;
export type UpdateDistributorMutationOptions = Apollo.BaseMutationOptions<UpdateDistributorMutation, UpdateDistributorMutationVariables>;
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
export type UpdateModelNumberLottedMutationFn = Apollo.MutationFunction<UpdateModelNumberLottedMutation, UpdateModelNumberLottedMutationVariables>;

/**
 * __useUpdateModelNumberLottedMutation__
 *
 * To run a mutation, you first call `useUpdateModelNumberLottedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModelNumberLottedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModelNumberLottedMutation, { data, loading, error }] = useUpdateModelNumberLottedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      lotted: // value for 'lotted'
 *   },
 * });
 */
export function useUpdateModelNumberLottedMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModelNumberLottedMutation, UpdateModelNumberLottedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModelNumberLottedMutation, UpdateModelNumberLottedMutationVariables>(UpdateModelNumberLottedDocument, options);
      }
export type UpdateModelNumberLottedMutationHookResult = ReturnType<typeof useUpdateModelNumberLottedMutation>;
export type UpdateModelNumberLottedMutationResult = Apollo.MutationResult<UpdateModelNumberLottedMutation>;
export type UpdateModelNumberLottedMutationOptions = Apollo.BaseMutationOptions<UpdateModelNumberLottedMutation, UpdateModelNumberLottedMutationVariables>;
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
export type UpdateModelNumberMutationFn = Apollo.MutationFunction<UpdateModelNumberMutation, UpdateModelNumberMutationVariables>;

/**
 * __useUpdateModelNumberMutation__
 *
 * To run a mutation, you first call `useUpdateModelNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModelNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModelNumberMutation, { data, loading, error }] = useUpdateModelNumberMutation({
 *   variables: {
 *      modelNumberInput: // value for 'modelNumberInput'
 *   },
 * });
 */
export function useUpdateModelNumberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModelNumberMutation, UpdateModelNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModelNumberMutation, UpdateModelNumberMutationVariables>(UpdateModelNumberDocument, options);
      }
export type UpdateModelNumberMutationHookResult = ReturnType<typeof useUpdateModelNumberMutation>;
export type UpdateModelNumberMutationResult = Apollo.MutationResult<UpdateModelNumberMutation>;
export type UpdateModelNumberMutationOptions = Apollo.BaseMutationOptions<UpdateModelNumberMutation, UpdateModelNumberMutationVariables>;
export const UpdateModelNumberViewableDocument = gql`
    mutation UpdateModelNumberViewable($id: ID!, $publiclyViewable: Boolean!) {
  response: updateModelNumberViewable(
    id: $id
    publiclyViewable: $publiclyViewable
  ) {
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
export type UpdateModelNumberViewableMutationFn = Apollo.MutationFunction<UpdateModelNumberViewableMutation, UpdateModelNumberViewableMutationVariables>;

/**
 * __useUpdateModelNumberViewableMutation__
 *
 * To run a mutation, you first call `useUpdateModelNumberViewableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModelNumberViewableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModelNumberViewableMutation, { data, loading, error }] = useUpdateModelNumberViewableMutation({
 *   variables: {
 *      id: // value for 'id'
 *      publiclyViewable: // value for 'publiclyViewable'
 *   },
 * });
 */
export function useUpdateModelNumberViewableMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModelNumberViewableMutation, UpdateModelNumberViewableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModelNumberViewableMutation, UpdateModelNumberViewableMutationVariables>(UpdateModelNumberViewableDocument, options);
      }
export type UpdateModelNumberViewableMutationHookResult = ReturnType<typeof useUpdateModelNumberViewableMutation>;
export type UpdateModelNumberViewableMutationResult = Apollo.MutationResult<UpdateModelNumberViewableMutation>;
export type UpdateModelNumberViewableMutationOptions = Apollo.BaseMutationOptions<UpdateModelNumberViewableMutation, UpdateModelNumberViewableMutationVariables>;
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
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      productInput: // value for 'productInput'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateProductRegistrationDocument = gql`
    mutation UpdateProductRegistration($productRegistrationInput: ExistingProductRegistrationInput!) {
  response: updateProductRegistration(
    productRegistrationInput: $productRegistrationInput
  ) {
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
export type UpdateProductRegistrationMutationFn = Apollo.MutationFunction<UpdateProductRegistrationMutation, UpdateProductRegistrationMutationVariables>;

/**
 * __useUpdateProductRegistrationMutation__
 *
 * To run a mutation, you first call `useUpdateProductRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductRegistrationMutation, { data, loading, error }] = useUpdateProductRegistrationMutation({
 *   variables: {
 *      productRegistrationInput: // value for 'productRegistrationInput'
 *   },
 * });
 */
export function useUpdateProductRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductRegistrationMutation, UpdateProductRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductRegistrationMutation, UpdateProductRegistrationMutationVariables>(UpdateProductRegistrationDocument, options);
      }
export type UpdateProductRegistrationMutationHookResult = ReturnType<typeof useUpdateProductRegistrationMutation>;
export type UpdateProductRegistrationMutationResult = Apollo.MutationResult<UpdateProductRegistrationMutation>;
export type UpdateProductRegistrationMutationOptions = Apollo.BaseMutationOptions<UpdateProductRegistrationMutation, UpdateProductRegistrationMutationVariables>;
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
export type UpdateProductSymptomMutationFn = Apollo.MutationFunction<UpdateProductSymptomMutation, UpdateProductSymptomMutationVariables>;

/**
 * __useUpdateProductSymptomMutation__
 *
 * To run a mutation, you first call `useUpdateProductSymptomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductSymptomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductSymptomMutation, { data, loading, error }] = useUpdateProductSymptomMutation({
 *   variables: {
 *      productSymptomInput: // value for 'productSymptomInput'
 *   },
 * });
 */
export function useUpdateProductSymptomMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductSymptomMutation, UpdateProductSymptomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductSymptomMutation, UpdateProductSymptomMutationVariables>(UpdateProductSymptomDocument, options);
      }
export type UpdateProductSymptomMutationHookResult = ReturnType<typeof useUpdateProductSymptomMutation>;
export type UpdateProductSymptomMutationResult = Apollo.MutationResult<UpdateProductSymptomMutation>;
export type UpdateProductSymptomMutationOptions = Apollo.BaseMutationOptions<UpdateProductSymptomMutation, UpdateProductSymptomMutationVariables>;
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
export type UpdateRgaGoodMutationFn = Apollo.MutationFunction<UpdateRgaGoodMutation, UpdateRgaGoodMutationVariables>;

/**
 * __useUpdateRgaGoodMutation__
 *
 * To run a mutation, you first call `useUpdateRgaGoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRgaGoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRgaGoodMutation, { data, loading, error }] = useUpdateRgaGoodMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rgaId: // value for 'rgaId'
 *      rgaGoodInput: // value for 'rgaGoodInput'
 *   },
 * });
 */
export function useUpdateRgaGoodMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRgaGoodMutation, UpdateRgaGoodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRgaGoodMutation, UpdateRgaGoodMutationVariables>(UpdateRgaGoodDocument, options);
      }
export type UpdateRgaGoodMutationHookResult = ReturnType<typeof useUpdateRgaGoodMutation>;
export type UpdateRgaGoodMutationResult = Apollo.MutationResult<UpdateRgaGoodMutation>;
export type UpdateRgaGoodMutationOptions = Apollo.BaseMutationOptions<UpdateRgaGoodMutation, UpdateRgaGoodMutationVariables>;
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
export type UpdateRgaMutationFn = Apollo.MutationFunction<UpdateRgaMutation, UpdateRgaMutationVariables>;

/**
 * __useUpdateRgaMutation__
 *
 * To run a mutation, you first call `useUpdateRgaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRgaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRgaMutation, { data, loading, error }] = useUpdateRgaMutation({
 *   variables: {
 *      rgaInput: // value for 'rgaInput'
 *   },
 * });
 */
export function useUpdateRgaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRgaMutation, UpdateRgaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRgaMutation, UpdateRgaMutationVariables>(UpdateRgaDocument, options);
      }
export type UpdateRgaMutationHookResult = ReturnType<typeof useUpdateRgaMutation>;
export type UpdateRgaMutationResult = Apollo.MutationResult<UpdateRgaMutation>;
export type UpdateRgaMutationOptions = Apollo.BaseMutationOptions<UpdateRgaMutation, UpdateRgaMutationVariables>;
export const UpdateRgaShippingStatusDocument = gql`
    mutation UpdateRGAShippingStatus($id: ID!, $shippingUpdates: [RGAGoodShippingInput], $notes: String) {
  response: updateRGAShippingStatus(
    id: $id
    shippingUpdates: $shippingUpdates
    notes: $notes
  ) {
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
export type UpdateRgaShippingStatusMutationFn = Apollo.MutationFunction<UpdateRgaShippingStatusMutation, UpdateRgaShippingStatusMutationVariables>;

/**
 * __useUpdateRgaShippingStatusMutation__
 *
 * To run a mutation, you first call `useUpdateRgaShippingStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRgaShippingStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRgaShippingStatusMutation, { data, loading, error }] = useUpdateRgaShippingStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      shippingUpdates: // value for 'shippingUpdates'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useUpdateRgaShippingStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRgaShippingStatusMutation, UpdateRgaShippingStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRgaShippingStatusMutation, UpdateRgaShippingStatusMutationVariables>(UpdateRgaShippingStatusDocument, options);
      }
export type UpdateRgaShippingStatusMutationHookResult = ReturnType<typeof useUpdateRgaShippingStatusMutation>;
export type UpdateRgaShippingStatusMutationResult = Apollo.MutationResult<UpdateRgaShippingStatusMutation>;
export type UpdateRgaShippingStatusMutationOptions = Apollo.BaseMutationOptions<UpdateRgaShippingStatusMutation, UpdateRgaShippingStatusMutationVariables>;
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
export type UpdateRgaStatusMutationFn = Apollo.MutationFunction<UpdateRgaStatusMutation, UpdateRgaStatusMutationVariables>;

/**
 * __useUpdateRgaStatusMutation__
 *
 * To run a mutation, you first call `useUpdateRgaStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRgaStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRgaStatusMutation, { data, loading, error }] = useUpdateRgaStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useUpdateRgaStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRgaStatusMutation, UpdateRgaStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRgaStatusMutation, UpdateRgaStatusMutationVariables>(UpdateRgaStatusDocument, options);
      }
export type UpdateRgaStatusMutationHookResult = ReturnType<typeof useUpdateRgaStatusMutation>;
export type UpdateRgaStatusMutationResult = Apollo.MutationResult<UpdateRgaStatusMutation>;
export type UpdateRgaStatusMutationOptions = Apollo.BaseMutationOptions<UpdateRgaStatusMutation, UpdateRgaStatusMutationVariables>;
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
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
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

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
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

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;

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


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  AttachedImage: ResolverTypeWrapper<AttachedImage>;
  AttachedImageInput: AttachedImageInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ConnectionPayload: ConnectionPayload;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerMutationOutput: ResolverTypeWrapper<CustomerMutationOutput>;
  CustomerQueryOutput: ResolverTypeWrapper<CustomerQueryOutput>;
  Distributor: ResolverTypeWrapper<Distributor>;
  DistributorMutationOutput: ResolverTypeWrapper<DistributorMutationOutput>;
  DistributorQueryOutput: ResolverTypeWrapper<DistributorQueryOutput>;
  Document: ResolverTypeWrapper<Document>;
  DocumentInput: DocumentInput;
  DocumentMutationOutput: ResolverTypeWrapper<DocumentMutationOutput>;
  DocumentQueryOutput: ResolverTypeWrapper<DocumentQueryOutput>;
  ExistingCustomerInput: ExistingCustomerInput;
  ExistingDistributorInput: ExistingDistributorInput;
  ExistingProductRegistrationInput: ExistingProductRegistrationInput;
  ExistingProductSymptomInput: ExistingProductSymptomInput;
  ExistingRGAInput: ExistingRgaInput;
  ExistingUserInput: ExistingUserInput;
  FeeStructure: ResolverTypeWrapper<FeeStructure>;
  FeeStructureInput: FeeStructureInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ModelNumber: ResolverTypeWrapper<ModelNumber>;
  ModelNumberInput: ModelNumberInput;
  ModelNumberMutationOutput: ResolverTypeWrapper<ModelNumberMutationOutput>;
  ModelNumberQueryOutput: ResolverTypeWrapper<ModelNumberQueryOutput>;
  ModelNumberSymptomDetail: ResolverTypeWrapper<ModelNumberSymptomDetail>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCustomerInput: NewCustomerInput;
  NewDistributorInput: NewDistributorInput;
  NewProductRegistrationInput: NewProductRegistrationInput;
  NewProductSymptomInput: NewProductSymptomInput;
  NewRGAInput: NewRgaInput;
  NewUserInput: NewUserInput;
  Page: ResolverTypeWrapper<Page>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PageInput: PageInput;
  PageMutationOutput: ResolverTypeWrapper<PageMutationOutput>;
  PageQueryOutput: ResolverTypeWrapper<PageQueryOutput>;
  PaginationEntry: ResolverTypeWrapper<PaginationEntry>;
  Pricing: ResolverTypeWrapper<Pricing>;
  PricingInput: PricingInput;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  ProductMutationOutput: ResolverTypeWrapper<ProductMutationOutput>;
  ProductQueryOutput: ResolverTypeWrapper<ProductQueryOutput>;
  ProductRegistration: ResolverTypeWrapper<ProductRegistration>;
  ProductRegistrationMutationOutput: ResolverTypeWrapper<ProductRegistrationMutationOutput>;
  ProductRegistrationQueryOutput: ResolverTypeWrapper<ProductRegistrationQueryOutput>;
  ProductSymptom: ResolverTypeWrapper<ProductSymptom>;
  ProductSymptomMutationOutput: ResolverTypeWrapper<ProductSymptomMutationOutput>;
  ProductSymptomQueryOutput: ResolverTypeWrapper<ProductSymptomQueryOutput>;
  ProductType: ProductType;
  Query: ResolverTypeWrapper<{}>;
  RGA: ResolverTypeWrapper<Rga>;
  RGAGood: ResolverTypeWrapper<RgaGood>;
  RGAGoodInput: RgaGoodInput;
  RGAGoodMutationOutput: ResolverTypeWrapper<RgaGoodMutationOutput>;
  RGAGoodShippingInput: RgaGoodShippingInput;
  RGAGoodStatus: RgaGoodStatus;
  RGAMutationOutput: ResolverTypeWrapper<RgaMutationOutput>;
  RGAQueryOutput: ResolverTypeWrapper<RgaQueryOutput>;
  RGAShippingCarrier: RgaShippingCarrier;
  RGAShippingStatus: RgaShippingStatus;
  RGAStatus: RgaStatus;
  RGAStatusCountOutput: ResolverTypeWrapper<RgaStatusCountOutput>;
  RGAStatusUpdate: ResolverTypeWrapper<RgaStatusUpdate>;
  Section: ResolverTypeWrapper<Section>;
  SectionInput: SectionInput;
  SectionItem: ResolverTypeWrapper<SectionItem>;
  SectionItemInput: SectionItemInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateProfile: ResolverTypeWrapper<UpdateProfile>;
  UploadInput: UploadInput;
  UploadMutationOutput: ResolverTypeWrapper<UploadMutationOutput>;
  UploadStatus: UploadStatus;
  UploadURL: ResolverTypeWrapper<UploadUrl>;
  User: ResolverTypeWrapper<User>;
  UserMutationOutput: ResolverTypeWrapper<UserMutationOutput>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AttachedImage: AttachedImage;
  AttachedImageInput: AttachedImageInput;
  Boolean: Scalars['Boolean'];
  ConnectionPayload: ConnectionPayload;
  Customer: Customer;
  CustomerMutationOutput: CustomerMutationOutput;
  CustomerQueryOutput: CustomerQueryOutput;
  Distributor: Distributor;
  DistributorMutationOutput: DistributorMutationOutput;
  DistributorQueryOutput: DistributorQueryOutput;
  Document: Document;
  DocumentInput: DocumentInput;
  DocumentMutationOutput: DocumentMutationOutput;
  DocumentQueryOutput: DocumentQueryOutput;
  ExistingCustomerInput: ExistingCustomerInput;
  ExistingDistributorInput: ExistingDistributorInput;
  ExistingProductRegistrationInput: ExistingProductRegistrationInput;
  ExistingProductSymptomInput: ExistingProductSymptomInput;
  ExistingRGAInput: ExistingRgaInput;
  ExistingUserInput: ExistingUserInput;
  FeeStructure: FeeStructure;
  FeeStructureInput: FeeStructureInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  ModelNumber: ModelNumber;
  ModelNumberInput: ModelNumberInput;
  ModelNumberMutationOutput: ModelNumberMutationOutput;
  ModelNumberQueryOutput: ModelNumberQueryOutput;
  ModelNumberSymptomDetail: ModelNumberSymptomDetail;
  Mutation: {};
  NewCustomerInput: NewCustomerInput;
  NewDistributorInput: NewDistributorInput;
  NewProductRegistrationInput: NewProductRegistrationInput;
  NewProductSymptomInput: NewProductSymptomInput;
  NewRGAInput: NewRgaInput;
  NewUserInput: NewUserInput;
  Page: Page;
  PageInfo: PageInfo;
  PageInput: PageInput;
  PageMutationOutput: PageMutationOutput;
  PageQueryOutput: PageQueryOutput;
  PaginationEntry: PaginationEntry;
  Pricing: Pricing;
  PricingInput: PricingInput;
  Product: Product;
  ProductInput: ProductInput;
  ProductMutationOutput: ProductMutationOutput;
  ProductQueryOutput: ProductQueryOutput;
  ProductRegistration: ProductRegistration;
  ProductRegistrationMutationOutput: ProductRegistrationMutationOutput;
  ProductRegistrationQueryOutput: ProductRegistrationQueryOutput;
  ProductSymptom: ProductSymptom;
  ProductSymptomMutationOutput: ProductSymptomMutationOutput;
  ProductSymptomQueryOutput: ProductSymptomQueryOutput;
  Query: {};
  RGA: Rga;
  RGAGood: RgaGood;
  RGAGoodInput: RgaGoodInput;
  RGAGoodMutationOutput: RgaGoodMutationOutput;
  RGAGoodShippingInput: RgaGoodShippingInput;
  RGAMutationOutput: RgaMutationOutput;
  RGAQueryOutput: RgaQueryOutput;
  RGAStatusCountOutput: RgaStatusCountOutput;
  RGAStatusUpdate: RgaStatusUpdate;
  Section: Section;
  SectionInput: SectionInput;
  SectionItem: SectionItem;
  SectionItemInput: SectionItemInput;
  String: Scalars['String'];
  UpdateProfile: UpdateProfile;
  UploadInput: UploadInput;
  UploadMutationOutput: UploadMutationOutput;
  UploadURL: UploadUrl;
  User: User;
  UserMutationOutput: UserMutationOutput;
  ValidationError: ValidationError;
};

export type AttachedImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttachedImage'] = ResolversParentTypes['AttachedImage']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UploadStatus'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hospital?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  specialty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Distributor'] = ResolversParentTypes['Distributor']> = {
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  keywords?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentMutationOutput'] = ResolversParentTypes['DocumentMutationOutput']> = {
  document?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentQueryOutput'] = ResolversParentTypes['DocumentQueryOutput']> = {
  document?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType>;
  documentSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  documents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Document']>>>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeeStructureResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeeStructure'] = ResolversParentTypes['FeeStructure']> = {
  distributor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelNumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelNumber'] = ResolversParentTypes['ModelNumber']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feeWithWarranty?: Resolver<Maybe<ResolversTypes['FeeStructure']>, ParentType, ContextType>;
  feeWithoutWarranty?: Resolver<Maybe<ResolversTypes['FeeStructure']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lotted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pricing?: Resolver<Maybe<ResolversTypes['Pricing']>, ParentType, ContextType>;
  privateNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  productType?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  publicNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publiclyViewable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  resolutionWithWarranty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolutionWithoutWarranty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductSymptom']>>>, ParentType, ContextType>;
  warrantyDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warrantyTerm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelNumberMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelNumberMutationOutput'] = ResolversParentTypes['ModelNumberMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  modelNumber?: Resolver<Maybe<ResolversTypes['ModelNumber']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelNumberQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelNumberQueryOutput'] = ResolversParentTypes['ModelNumberQueryOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modelNumber?: Resolver<Maybe<ResolversTypes['ModelNumber']>, ParentType, ContextType>;
  modelNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['ModelNumber']>>>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  attachImagesToSymptom?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationAttachImagesToSymptomArgs, 'attachedImages' | 'symptomId'>>;
  createCustomer?: Resolver<ResolversTypes['CustomerMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'customerInput'>>;
  createDistributor?: Resolver<ResolversTypes['DistributorMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateDistributorArgs, 'distributorInput'>>;
  createModelNumber?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateModelNumberArgs, 'modelNumberInput'>>;
  createProduct?: Resolver<ResolversTypes['ProductMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'productInput'>>;
  createProductRegistration?: Resolver<ResolversTypes['ProductRegistrationMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateProductRegistrationArgs, 'productRegistrationInput'>>;
  createProductSymptom?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateProductSymptomArgs, 'productSymptomInput'>>;
  createRGA?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateRgaArgs, 'rgaInput'>>;
  createRGAGood?: Resolver<ResolversTypes['RGAGoodMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateRgaGoodArgs, 'rgaGoodInput' | 'rgaId'>>;
  createUploads?: Resolver<ResolversTypes['UploadMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateUploadsArgs, 'uploadInput'>>;
  createUser?: Resolver<ResolversTypes['UserMutationOutput'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  destroyCustomer?: Resolver<ResolversTypes['CustomerMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyCustomerArgs, 'id'>>;
  destroyDistributor?: Resolver<ResolversTypes['DistributorMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyDistributorArgs, 'id'>>;
  destroyDocument?: Resolver<ResolversTypes['DocumentMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyDocumentArgs, 'id'>>;
  destroyModelNumber?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyModelNumberArgs, 'id'>>;
  destroyPage?: Resolver<ResolversTypes['PageMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyPageArgs, 'id'>>;
  destroyProduct?: Resolver<ResolversTypes['ProductMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyProductArgs, 'id'>>;
  destroyProductRegistration?: Resolver<ResolversTypes['ProductRegistrationMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyProductRegistrationArgs, 'id'>>;
  destroyProductSymptom?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyProductSymptomArgs, 'id'>>;
  destroyRGAGood?: Resolver<ResolversTypes['RGAGoodMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyRgaGoodArgs, 'id' | 'rgaId'>>;
  destroyUser?: Resolver<ResolversTypes['UserMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyUserArgs, 'id'>>;
  linkSymptomToModel?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationLinkSymptomToModelArgs, 'linked' | 'modelNumber' | 'symptomId'>>;
  makeDocument?: Resolver<ResolversTypes['DocumentMutationOutput'], ParentType, ContextType, RequireFields<MutationMakeDocumentArgs, 'documentInput'>>;
  makePage?: Resolver<ResolversTypes['PageMutationOutput'], ParentType, ContextType, RequireFields<MutationMakePageArgs, 'pageInput'>>;
  resetPassword?: Resolver<ResolversTypes['UserMutationOutput'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password'>>;
  submitRGAForReview?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationSubmitRgaForReviewArgs, 'id'>>;
  updateCustomer?: Resolver<ResolversTypes['CustomerMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateCustomerArgs, 'customerInput'>>;
  updateDistributor?: Resolver<ResolversTypes['DistributorMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateDistributorArgs, 'distributorInput'>>;
  updateModelNumber?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateModelNumberArgs, 'modelNumberInput'>>;
  updateModelNumberLotted?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateModelNumberLottedArgs, 'id' | 'lotted'>>;
  updateModelNumberViewable?: Resolver<ResolversTypes['ModelNumberMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateModelNumberViewableArgs, 'id' | 'publiclyViewable'>>;
  updateProduct?: Resolver<ResolversTypes['ProductMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'productInput'>>;
  updateProductRegistration?: Resolver<ResolversTypes['ProductRegistrationMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateProductRegistrationArgs, 'productRegistrationInput'>>;
  updateProductSymptom?: Resolver<ResolversTypes['ProductSymptomMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateProductSymptomArgs, 'productSymptomInput'>>;
  updateRGA?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateRgaArgs, 'rgaInput'>>;
  updateRGAGood?: Resolver<ResolversTypes['RGAGoodMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateRgaGoodArgs, 'id' | 'rgaGoodInput' | 'rgaId'>>;
  updateRGAShippingStatus?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateRgaShippingStatusArgs, 'id'>>;
  updateRGAStatus?: Resolver<ResolversTypes['RGAMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateRgaStatusArgs, 'id' | 'status'>>;
  updateUser?: Resolver<ResolversTypes['UserMutationOutput'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'userInput'>>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  keywords?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Section']>>>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasNextPages?: Resolver<Array<Maybe<ResolversTypes['PaginationEntry']>>, ParentType, ContextType, RequireFields<PageInfoHasNextPagesArgs, 'amount'>>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPages?: Resolver<Array<Maybe<ResolversTypes['PaginationEntry']>>, ParentType, ContextType, RequireFields<PageInfoHasPreviousPagesArgs, 'amount'>>;
  startCursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageMutationOutput'] = ResolversParentTypes['PageMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Page']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageQueryOutput'] = ResolversParentTypes['PageQueryOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Page']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Page']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modelNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['ModelNumber']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMutationOutput'] = ResolversParentTypes['ProductMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductQueryOutput'] = ResolversParentTypes['ProductQueryOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRegistrationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductRegistration'] = ResolversParentTypes['ProductRegistration']> = {
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lotted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  modelNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registeredOn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serial?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRegistrationMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductRegistrationMutationOutput'] = ResolversParentTypes['ProductRegistrationMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  productRegistration?: Resolver<Maybe<ResolversTypes['ProductRegistration']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRegistrationQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductRegistrationQueryOutput'] = ResolversParentTypes['ProductRegistrationQueryOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  productRegistration?: Resolver<Maybe<ResolversTypes['ProductRegistration']>, ParentType, ContextType>;
  productRegistrations?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductRegistration']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductSymptomResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSymptom'] = ResolversParentTypes['ProductSymptom']> = {
  associatedModelNumbers?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  attachedImages?: Resolver<Maybe<Array<Maybe<ResolversTypes['AttachedImage']>>>, ParentType, ContextType>;
  careTip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  faultCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modelNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['ModelNumberSymptomDetail']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preApproved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  solution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  synopsis?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductSymptomMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSymptomMutationOutput'] = ResolversParentTypes['ProductSymptomMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  modelNumber?: Resolver<Maybe<ResolversTypes['ModelNumberSymptomDetail']>, ParentType, ContextType>;
  productSymptom?: Resolver<Maybe<ResolversTypes['ProductSymptom']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductSymptomQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSymptomQueryOutput'] = ResolversParentTypes['ProductSymptomQueryOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  productSymptom?: Resolver<Maybe<ResolversTypes['ProductSymptom']>, ParentType, ContextType>;
  productSymptoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductSymptom']>>>, ParentType, ContextType, RequireFields<ProductSymptomQueryOutputProductSymptomsArgs, never>>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  customer?: Resolver<ResolversTypes['CustomerQueryOutput'], ParentType, ContextType, RequireFields<QueryCustomerArgs, 'id'>>;
  customers?: Resolver<ResolversTypes['CustomerQueryOutput'], ParentType, ContextType, RequireFields<QueryCustomersArgs, never>>;
  distributor?: Resolver<ResolversTypes['DistributorQueryOutput'], ParentType, ContextType, RequireFields<QueryDistributorArgs, 'id'>>;
  distributors?: Resolver<ResolversTypes['DistributorQueryOutput'], ParentType, ContextType>;
  document?: Resolver<ResolversTypes['DocumentQueryOutput'], ParentType, ContextType, RequireFields<QueryDocumentArgs, 'id'>>;
  documents?: Resolver<ResolversTypes['DocumentQueryOutput'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modelNumber?: Resolver<Maybe<ResolversTypes['ModelNumberQueryOutput']>, ParentType, ContextType, RequireFields<QueryModelNumberArgs, 'id'>>;
  modelNumbers?: Resolver<Maybe<ResolversTypes['ModelNumberQueryOutput']>, ParentType, ContextType, RequireFields<QueryModelNumbersArgs, never>>;
  page?: Resolver<ResolversTypes['PageQueryOutput'], ParentType, ContextType, RequireFields<QueryPageArgs, 'id'>>;
  pages?: Resolver<ResolversTypes['PageQueryOutput'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['ProductQueryOutput']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  productRegistration?: Resolver<ResolversTypes['ProductRegistrationQueryOutput'], ParentType, ContextType, RequireFields<QueryProductRegistrationArgs, 'id'>>;
  productRegistrations?: Resolver<ResolversTypes['ProductRegistrationQueryOutput'], ParentType, ContextType>;
  productSymptom?: Resolver<ResolversTypes['ProductSymptomQueryOutput'], ParentType, ContextType, RequireFields<QueryProductSymptomArgs, 'id'>>;
  productSymptoms?: Resolver<ResolversTypes['ProductSymptomQueryOutput'], ParentType, ContextType, RequireFields<QueryProductSymptomsArgs, never>>;
  products?: Resolver<Maybe<ResolversTypes['ProductQueryOutput']>, ParentType, ContextType, RequireFields<QueryProductsArgs, never>>;
  rga?: Resolver<ResolversTypes['RGAQueryOutput'], ParentType, ContextType, RequireFields<QueryRgaArgs, 'id'>>;
  rgaCount?: Resolver<ResolversTypes['RGAStatusCountOutput'], ParentType, ContextType>;
  rgas?: Resolver<ResolversTypes['RGAQueryOutput'], ParentType, ContextType, RequireFields<QueryRgasArgs, never>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userWithEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserWithEmailArgs, 'email'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type RgaResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGA'] = ResolversParentTypes['RGA']> = {
  distributor?: Resolver<ResolversTypes['Distributor'], ParentType, ContextType>;
  goods?: Resolver<Array<Maybe<ResolversTypes['RGAGood']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shippingSpeed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['RGAStatus'], ParentType, ContextType>;
  statusLog?: Resolver<Maybe<Array<Maybe<ResolversTypes['RGAStatusUpdate']>>>, ParentType, ContextType>;
  submittedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submittedOn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaGoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAGood'] = ResolversParentTypes['RGAGood']> = {
  additionalComments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  carrier?: Resolver<Maybe<ResolversTypes['RGAShippingCarrier']>, ParentType, ContextType>;
  customerCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerLetterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerSpecialty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerStreet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerStreet2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerZip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  datePurchased?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disposition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  faultCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lotted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  modelNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newSerial?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  po?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  productId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productType?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  resolution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolutionFee?: Resolver<Maybe<ResolversTypes['FeeStructure']>, ParentType, ContextType>;
  rgaId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rma?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serial?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serviceFormUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serviceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingSpeed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ssd?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['RGAGoodStatus']>, ParentType, ContextType>;
  symptomDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomSolution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomSynopsis?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tracking?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warrantied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  warrantyDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warrantyTerm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaGoodMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAGoodMutationOutput'] = ResolversParentTypes['RGAGoodMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  rgaGood?: Resolver<Maybe<ResolversTypes['RGAGood']>, ParentType, ContextType>;
  rgaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAMutationOutput'] = ResolversParentTypes['RGAMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  rga?: Resolver<Maybe<ResolversTypes['RGA']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAQueryOutput'] = ResolversParentTypes['RGAQueryOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rga?: Resolver<Maybe<ResolversTypes['RGA']>, ParentType, ContextType>;
  rgas?: Resolver<Maybe<Array<Maybe<ResolversTypes['RGA']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaStatusCountOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAStatusCountOutput'] = ResolversParentTypes['RGAStatusCountOutput']> = {
  assessing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  awaitingArrival?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  canceled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  closed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  delayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  issued?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  received?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  repairing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shipping?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RgaStatusUpdateResolvers<ContextType = any, ParentType extends ResolversParentTypes['RGAStatusUpdate'] = ResolversParentTypes['RGAStatusUpdate']> = {
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['RGAStatus']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['UpdateProfile']>, ParentType, ContextType>;
  updatedOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['SectionItem']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionItem'] = ResolversParentTypes['SectionItem']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateProfile'] = ResolversParentTypes['UpdateProfile']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadMutationOutput'] = ResolversParentTypes['UploadMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  uploads?: Resolver<Maybe<Array<Maybe<ResolversTypes['UploadURL']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadURL'] = ResolversParentTypes['UploadURL']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMutationOutput'] = ResolversParentTypes['UserMutationOutput']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  Document?: DocumentResolvers<ContextType>;
  DocumentMutationOutput?: DocumentMutationOutputResolvers<ContextType>;
  DocumentQueryOutput?: DocumentQueryOutputResolvers<ContextType>;
  FeeStructure?: FeeStructureResolvers<ContextType>;
  ModelNumber?: ModelNumberResolvers<ContextType>;
  ModelNumberMutationOutput?: ModelNumberMutationOutputResolvers<ContextType>;
  ModelNumberQueryOutput?: ModelNumberQueryOutputResolvers<ContextType>;
  ModelNumberSymptomDetail?: ModelNumberSymptomDetailResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PageMutationOutput?: PageMutationOutputResolvers<ContextType>;
  PageQueryOutput?: PageQueryOutputResolvers<ContextType>;
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
  Section?: SectionResolvers<ContextType>;
  SectionItem?: SectionItemResolvers<ContextType>;
  UpdateProfile?: UpdateProfileResolvers<ContextType>;
  UploadMutationOutput?: UploadMutationOutputResolvers<ContextType>;
  UploadURL?: UploadUrlResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserMutationOutput?: UserMutationOutputResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
};

