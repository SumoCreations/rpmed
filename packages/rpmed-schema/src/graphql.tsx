import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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

/** A document on the customer service portal. */
export type Document = {
  __typename?: 'Document';
  /** The unique identifier for this document */
  id: Scalars['ID'];
  /** The title of the document. */
  title?: Maybe<Scalars['String']>;
  /** The slug of the document. */
  slug?: Maybe<Scalars['String']>;
  /** The seo keywords of the document. */
  keywords?: Maybe<Scalars['String']>;
  /** The url to download this document. */
  url?: Maybe<Scalars['String']>;
  /** The file key as stored on AWS. */
  fileKey?: Maybe<Scalars['String']>;
  /** The description of the document. */
  description?: Maybe<Scalars['String']>;
};

/** A set of fields used to create or update a document. */
export type DocumentInput = {
  /** The id of the customer associated to the document. */
  id?: Maybe<Scalars['ID']>;
  /** The id of the customer associated to the document. */
  title: Scalars['String'];
  /** The slug of the document. */
  slug: Scalars['String'];
  /** The meta keywords of the document for SEO purposes. */
  keywords?: Maybe<Scalars['String']>;
  /** The S3 file key to generate the download url for the file. */
  fileKey?: Maybe<Scalars['String']>;
  /** The document description for SEO purposes. */
  description?: Maybe<Scalars['String']>;
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
  /** The resulting documents if the operation was successful and multiple results were returned. */
  documents?: Maybe<Array<Maybe<Document>>>;
  /** The size of the paginated results. */
  documentSize?: Maybe<Scalars['Int']>;
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
  /** Creates a new page. */
  makePage: PageMutationOutput;
  /** Removes an existing page. */
  destroyPage: PageMutationOutput;
  /** Creates a new document. */
  makeDocument: DocumentMutationOutput;
  /** Removes an existing document. */
  destroyDocument: DocumentMutationOutput;
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


/** The root mutation for the schema. */
export type MutationMakePageArgs = {
  pageInput: PageInput;
};


/** The root mutation for the schema. */
export type MutationDestroyPageArgs = {
  id: Scalars['String'];
};


/** The root mutation for the schema. */
export type MutationMakeDocumentArgs = {
  documentInput: DocumentInput;
};


/** The root mutation for the schema. */
export type MutationDestroyDocumentArgs = {
  id: Scalars['String'];
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

/** A page on the customer service portal. */
export type Page = {
  __typename?: 'Page';
  /** The unique identifier for this page */
  id: Scalars['ID'];
  /** The title of the page. */
  title?: Maybe<Scalars['String']>;
  /** The slug of the page. */
  slug?: Maybe<Scalars['String']>;
  /** The seo keywords of the page. */
  keywords?: Maybe<Scalars['String']>;
  /** The description of the page. */
  description?: Maybe<Scalars['String']>;
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

/** A set of fields used to create or update a page. */
export type PageInput = {
  /** The id of the customer associated to the page. */
  id?: Maybe<Scalars['ID']>;
  /** The id of the customer associated to the page. */
  title: Scalars['String'];
  /** The slug of the page. */
  slug: Scalars['String'];
  /** The meta keywords of the page for SEO purposes. */
  keywords?: Maybe<Scalars['String']>;
  /** The page description for SEO purposes. */
  description?: Maybe<Scalars['String']>;
};

/** The result of a mutation applied to a page. */
export type PageMutationOutput = {
  __typename?: 'PageMutationOutput';
  /** The resulting page if the operation was successful. */
  page?: Maybe<Page>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
  /** A simple boolean indicating whether or not the operation was successful. */
  success: Scalars['Boolean'];
};

/** The result of a query for a page or pages. */
export type PageQueryOutput = {
  __typename?: 'PageQueryOutput';
  /** The resulting page if the operation was successful. */
  page?: Maybe<Page>;
  /** The resulting pages if the operation was successful and multiple results were returned. */
  pages?: Maybe<Array<Maybe<Page>>>;
  /** The size of the paginated results. */
  pageSize?: Maybe<Scalars['Int']>;
  /** This key can be used to continue querying paginated results. */
  lastEvaluatedKey?: Maybe<Scalars['String']>;
  /** Any validation errors encountered while running the mutation. */
  errors?: Maybe<Array<Maybe<ValidationError>>>;
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
  /** All pages in the system */
  pages: PageQueryOutput;
  /** A specific page in the system via ID. */
  page: PageQueryOutput;
  /** All documents in the system */
  documents: DocumentQueryOutput;
  /** A specific document in the system via ID. */
  document: DocumentQueryOutput;
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


/** The root query for the schema. */
export type QueryPageArgs = {
  id: Scalars['ID'];
};


/** The root query for the schema. */
export type QueryDocumentArgs = {
  id: Scalars['ID'];
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

export type AttachImagesToSymptomMutationVariables = Exact<{
  symptomId: Scalars['String'];
  attachedImages: Array<Maybe<AttachedImageInput>> | Maybe<AttachedImageInput>;
}>;


export type AttachImagesToSymptomMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & Pick<ProductSymptomMutationOutput, 'success'>
    & { productSymptom?: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id'>
      & { attachedImages?: Maybe<Array<Maybe<(
        { __typename?: 'AttachedImage' }
        & Pick<AttachedImage, 'position' | 'status' | 'id' | 'url'>
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateCustomerMutationVariables = Exact<{
  customerInput: NewCustomerInput;
}>;


export type CreateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'CustomerMutationOutput' }
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateDistributorMutationVariables = Exact<{
  distributorInput: NewDistributorInput;
}>;


export type CreateDistributorMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'DistributorMutationOutput' }
    & Pick<DistributorMutationOutput, 'success'>
    & { distributor?: Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateModelNumberMutationVariables = Exact<{
  modelNumberInput: ModelNumberInput;
}>;


export type CreateModelNumberMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & Pick<ModelNumberMutationOutput, 'success'>
    & { modelNumber?: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'description' | 'productIds' | 'productType' | 'lotted' | 'warrantyTerm' | 'warrantyDescription' | 'resolutionWithWarranty' | 'resolutionWithoutWarranty' | 'publicNotes' | 'privateNotes'>
      & { products?: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      )>>>, feeWithWarranty?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, feeWithoutWarranty?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, pricing?: Maybe<(
        { __typename?: 'Pricing' }
        & Pick<Pricing, 'cost' | 'retail'>
      )> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateProductMutationVariables = Exact<{
  productInput: ProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductMutationOutput' }
    & Pick<ProductMutationOutput, 'success'>
    & { product?: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateProductRegistrationMutationVariables = Exact<{
  productRegistrationInput: NewProductRegistrationInput;
}>;


export type CreateProductRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductRegistrationMutationOutput' }
    & Pick<ProductRegistrationMutationOutput, 'success'>
    & { productRegistration?: Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id' | 'modelNumber' | 'productId' | 'customerId' | 'serial'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'email' | 'name'>
      ) }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type CreateProductSymptomMutationVariables = Exact<{
  productSymptomInput: NewProductSymptomInput;
}>;


export type CreateProductSymptomMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & { productSymptom?: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'fee' | 'faultCode' | 'synopsis' | 'solution' | 'careTip'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateRgaGoodMutationVariables = Exact<{
  rgaId: Scalars['String'];
  rgaGoodInput: RgaGoodInput;
}>;


export type CreateRgaGoodMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAGoodMutationOutput' }
    & Pick<RgaGoodMutationOutput, 'rgaId' | 'success'>
    & { rgaGood?: Maybe<(
      { __typename?: 'RGAGood' }
      & Pick<RgaGood, 'id' | 'rgaId' | 'serviceId' | 'customerId' | 'customerEmail' | 'customerName' | 'customerPhone' | 'customerStreet' | 'customerStreet2' | 'customerZip' | 'customerCity' | 'customerState' | 'customerCountry' | 'customerSpecialty' | 'faultCode' | 'serial' | 'newSerial' | 'lotted' | 'preApproved' | 'productId' | 'productName' | 'productType' | 'symptomId' | 'symptomDescription' | 'symptomSolution' | 'symptomSynopsis' | 'modelNumber' | 'po' | 'rma' | 'warrantied' | 'warrantyTerm' | 'warrantyDescription' | 'notes' | 'serviceFormUrl' | 'customerLetterUrl' | 'additionalComments' | 'datePurchased' | 'disposition'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateRgaMutationVariables = Exact<{
  rgaInput: NewRgaInput;
}>;


export type CreateRgaMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAMutationOutput' }
    & Pick<RgaMutationOutput, 'success'>
    & { rga?: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'shippingSpeed' | 'status' | 'submittedBy' | 'submittedOn'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateUploadsMutationVariables = Exact<{
  uploadInput: UploadInput;
}>;


export type CreateUploadsMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UploadMutationOutput' }
    & Pick<UploadMutationOutput, 'success'>
    & { uploads?: Maybe<Array<Maybe<(
      { __typename?: 'UploadURL' }
      & Pick<UploadUrl, 'id' | 'url'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  userInput: NewUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UserMutationOutput' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CustomerQueryVariables = Exact<{
  customerId: Scalars['String'];
}>;


export type CustomerQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'CustomerQueryOutput' }
    & Pick<CustomerQueryOutput, 'success'>
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type CustomersQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
}>;


export type CustomersQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'CustomerQueryOutput' }
    & Pick<CustomerQueryOutput, 'success'>
    & { customers?: Maybe<Array<Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyDistributorMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyDistributorMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'DistributorMutationOutput' }
    & { distributor?: Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyCustomerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyCustomerMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'CustomerMutationOutput' }
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyDocumentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyDocumentMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'DocumentMutationOutput' }
    & Pick<DocumentMutationOutput, 'success'>
    & { document?: Maybe<(
      { __typename?: 'Document' }
      & Pick<Document, 'id' | 'title' | 'keywords' | 'description' | 'slug'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type DestroyModelNumberMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DestroyModelNumberMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & { modelNumber?: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyPageMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyPageMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'PageMutationOutput' }
    & Pick<PageMutationOutput, 'success'>
    & { page?: Maybe<(
      { __typename?: 'Page' }
      & Pick<Page, 'id' | 'title' | 'keywords' | 'description' | 'slug'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type DestroyProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DestroyProductMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductMutationOutput' }
    & { product?: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyProductRegistrationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyProductRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductRegistrationMutationOutput' }
    & { productRegistration?: Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyProductSymptomMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyProductSymptomMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & { productSymptom?: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'faultCode' | 'fee'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyRgaGoodMutationVariables = Exact<{
  id: Scalars['ID'];
  rgaId: Scalars['String'];
}>;


export type DestroyRgaGoodMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAGoodMutationOutput' }
    & Pick<RgaGoodMutationOutput, 'rgaId' | 'success'>
    & { rgaGood?: Maybe<(
      { __typename?: 'RGAGood' }
      & Pick<RgaGood, 'modelNumber' | 'serial' | 'id' | 'warrantied' | 'faultCode' | 'status' | 'symptomId' | 'symptomDescription' | 'customerId' | 'customerEmail' | 'customerName' | 'customerPhone' | 'customerStreet' | 'customerStreet2' | 'customerZip' | 'customerCity' | 'customerState' | 'customerCountry' | 'customerSpecialty' | 'notes' | 'rma' | 'po' | 'additionalComments' | 'datePurchased' | 'disposition'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DestroyUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyUserMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UserMutationOutput' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DistributorQueryVariables = Exact<{
  distributorId: Scalars['String'];
}>;


export type DistributorQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'DistributorQueryOutput' }
    & Pick<DistributorQueryOutput, 'success'>
    & { distributor?: Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DistributorsQueryVariables = Exact<{ [key: string]: never; }>;


export type DistributorsQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'DistributorQueryOutput' }
    & Pick<DistributorQueryOutput, 'success'>
    & { distributors?: Maybe<Array<Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type DocumentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DocumentQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'DocumentQueryOutput' }
    & Pick<DocumentQueryOutput, 'success'>
    & { document?: Maybe<(
      { __typename?: 'Document' }
      & Pick<Document, 'id' | 'title' | 'keywords' | 'description' | 'slug' | 'fileKey' | 'url'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type DocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentsQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'DocumentQueryOutput' }
    & Pick<DocumentQueryOutput, 'success'>
    & { documents?: Maybe<Array<Maybe<(
      { __typename?: 'Document' }
      & Pick<Document, 'id' | 'title' | 'keywords' | 'description' | 'slug'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type LinkSymptomToModelNumberMutationVariables = Exact<{
  modelNumber: Scalars['String'];
  symptomId: Scalars['String'];
  linked: Scalars['Boolean'];
}>;


export type LinkSymptomToModelNumberMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & Pick<ProductSymptomMutationOutput, 'success'>
    & { productSymptom?: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'associatedModelNumbers'>
    )>, modelNumber?: Maybe<(
      { __typename?: 'ModelNumberSymptomDetail' }
      & Pick<ModelNumberSymptomDetail, 'id'>
      & { symptoms: Array<Maybe<(
        { __typename?: 'ProductSymptom' }
        & Pick<ProductSymptom, 'id' | 'faultCode' | 'name'>
      )>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type MakeDocumentMutationVariables = Exact<{
  documentInput: DocumentInput;
}>;


export type MakeDocumentMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'DocumentMutationOutput' }
    & Pick<DocumentMutationOutput, 'success'>
    & { document?: Maybe<(
      { __typename?: 'Document' }
      & Pick<Document, 'id' | 'title' | 'keywords' | 'description' | 'slug' | 'fileKey' | 'url'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type MakePageMutationVariables = Exact<{
  pageInput: PageInput;
}>;


export type MakePageMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'PageMutationOutput' }
    & Pick<PageMutationOutput, 'success'>
    & { page?: Maybe<(
      { __typename?: 'Page' }
      & Pick<Page, 'id' | 'title' | 'keywords' | 'description' | 'slug'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type ModelNumberQueryVariables = Exact<{
  modelNumberId: Scalars['String'];
}>;


export type ModelNumberQuery = (
  { __typename?: 'Query' }
  & { response?: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'success'>
    & { modelNumber?: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'description' | 'productIds' | 'productType' | 'lotted' | 'warrantyTerm' | 'warrantyDescription' | 'resolutionWithWarranty' | 'resolutionWithoutWarranty' | 'publicNotes' | 'privateNotes'>
      & { products?: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      )>>>, symptoms?: Maybe<Array<Maybe<(
        { __typename?: 'ProductSymptom' }
        & Pick<ProductSymptom, 'id' | 'name' | 'faultCode'>
      )>>>, feeWithWarranty?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, feeWithoutWarranty?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, pricing?: Maybe<(
        { __typename?: 'Pricing' }
        & Pick<Pricing, 'cost' | 'retail'>
      )> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ModelNumbersLottedQueryVariables = Exact<{ [key: string]: never; }>;


export type ModelNumbersLottedQuery = (
  { __typename?: 'Query' }
  & { response?: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'pageSize' | 'success'>
    & { modelNumbers?: Maybe<Array<Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'lotted'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ModelNumbersQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productType?: Maybe<ProductType>;
}>;


export type ModelNumbersQuery = (
  { __typename?: 'Query' }
  & { response?: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'pageSize' | 'success'>
    & { modelNumbers?: Maybe<Array<Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'lotted' | 'warrantyTerm' | 'warrantyDescription' | 'productType' | 'description'>
      & { feeWithWarranty?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, products?: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      )>>>, feeWithoutWarranty?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )> }
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ModelNumbersSimpleQueryVariables = Exact<{ [key: string]: never; }>;


export type ModelNumbersSimpleQuery = (
  { __typename?: 'Query' }
  & { response?: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'pageSize' | 'success'>
    & { modelNumbers?: Maybe<Array<Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ModelNumbersViewableQueryVariables = Exact<{ [key: string]: never; }>;


export type ModelNumbersViewableQuery = (
  { __typename?: 'Query' }
  & { response?: Maybe<(
    { __typename?: 'ModelNumberQueryOutput' }
    & Pick<ModelNumberQueryOutput, 'pageSize' | 'success'>
    & { modelNumbers?: Maybe<Array<Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'publiclyViewable'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type PageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PageQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'PageQueryOutput' }
    & Pick<PageQueryOutput, 'success'>
    & { page?: Maybe<(
      { __typename?: 'Page' }
      & Pick<Page, 'id' | 'title' | 'keywords' | 'description' | 'slug'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type PagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PagesQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'PageQueryOutput' }
    & Pick<PageQueryOutput, 'success'>
    & { pages?: Maybe<Array<Maybe<(
      { __typename?: 'Page' }
      & Pick<Page, 'id' | 'title' | 'keywords' | 'description' | 'slug'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type ProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { response?: Maybe<(
    { __typename?: 'ProductQueryOutput' }
    & Pick<ProductQueryOutput, 'success'>
    & { product?: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
      & { modelNumbers?: Maybe<Array<Maybe<(
        { __typename?: 'ModelNumber' }
        & Pick<ModelNumber, 'id' | 'description' | 'lotted' | 'warrantyTerm'>
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  )> }
);

export type ProductRegistrationQueryVariables = Exact<{
  productRegistrationId: Scalars['String'];
}>;


export type ProductRegistrationQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'ProductRegistrationQueryOutput' }
    & Pick<ProductRegistrationQueryOutput, 'success'>
    & { productRegistration?: Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id' | 'productId' | 'customerId' | 'lotted' | 'serial' | 'modelNumber' | 'registeredOn'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'name' | 'email'>
      ) }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ProductRegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductRegistrationsQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'ProductRegistrationQueryOutput' }
    & Pick<ProductRegistrationQueryOutput, 'success'>
    & { productRegistrations?: Maybe<Array<Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id' | 'productId' | 'customerId' | 'serial' | 'modelNumber'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'name' | 'email'>
      ) }
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ProductSymptomQueryVariables = Exact<{
  productSymptomId: Scalars['String'];
}>;


export type ProductSymptomQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'ProductSymptomQueryOutput' }
    & Pick<ProductSymptomQueryOutput, 'success'>
    & { productSymptom?: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'faultCode' | 'fee' | 'preApproved' | 'synopsis' | 'solution' | 'careTip' | 'associatedModelNumbers'>
      & { attachedImages?: Maybe<Array<Maybe<(
        { __typename?: 'AttachedImage' }
        & Pick<AttachedImage, 'id' | 'position' | 'status' | 'url'>
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ProductSymptomsQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
  modelNumber?: Maybe<Scalars['String']>;
}>;


export type ProductSymptomsQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'ProductSymptomQueryOutput' }
    & Pick<ProductSymptomQueryOutput, 'pageSize' | 'success'>
    & { productSymptoms?: Maybe<Array<Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'faultCode' | 'fee' | 'preApproved' | 'careTip' | 'solution' | 'synopsis' | 'associatedModelNumbers'>
      & { attachedImages?: Maybe<Array<Maybe<(
        { __typename?: 'AttachedImage' }
        & Pick<AttachedImage, 'id' | 'position' | 'status' | 'url'>
      )>>> }
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type ProductsQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { response?: Maybe<(
    { __typename?: 'ProductQueryOutput' }
    & Pick<ProductQueryOutput, 'pageSize' | 'success'>
    & { products?: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UserMutationOutput' }
    & Pick<UserMutationOutput, 'success'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type RgaCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type RgaCountsQuery = (
  { __typename?: 'Query' }
  & { rgaCount: (
    { __typename?: 'RGAStatusCountOutput' }
    & Pick<RgaStatusCountOutput, 'issued' | 'delayed' | 'awaitingArrival' | 'received' | 'assessing' | 'repairing' | 'shipping' | 'closed' | 'canceled' | 'success'>
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type RgaQueryVariables = Exact<{
  rgaId: Scalars['String'];
}>;


export type RgaQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'RGAQueryOutput' }
    & Pick<RgaQueryOutput, 'success'>
    & { rga?: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'shippingSpeed' | 'submittedOn' | 'submittedBy' | 'status'>
      & { statusLog?: Maybe<Array<Maybe<(
        { __typename?: 'RGAStatusUpdate' }
        & Pick<RgaStatusUpdate, 'status' | 'updatedOn' | 'notes'>
        & { updatedBy?: Maybe<(
          { __typename?: 'UpdateProfile' }
          & Pick<UpdateProfile, 'id' | 'name' | 'email'>
        )> }
      )>>>, goods: Array<Maybe<(
        { __typename?: 'RGAGood' }
        & Pick<RgaGood, 'id' | 'serviceId' | 'customerEmail' | 'customerId' | 'customerName' | 'customerLetterUrl' | 'customerSpecialty' | 'faultCode' | 'serial' | 'newSerial' | 'lotted' | 'preApproved' | 'productId' | 'productName' | 'productType' | 'symptomId' | 'symptomDescription' | 'symptomSolution' | 'symptomSynopsis' | 'modelNumber' | 'po' | 'rma' | 'rgaId' | 'warrantied' | 'warrantyTerm' | 'warrantyDescription' | 'notes' | 'serviceFormUrl' | 'shippingSpeed' | 'ssd' | 'additionalComments' | 'datePurchased' | 'disposition'>
        & { resolutionFee?: Maybe<(
          { __typename?: 'FeeStructure' }
          & Pick<FeeStructure, 'distributor' | 'endUser'>
        )> }
      )>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type RgasQueryVariables = Exact<{
  status?: Maybe<RgaStatus>;
}>;


export type RgasQuery = (
  { __typename?: 'Query' }
  & { response: (
    { __typename?: 'RGAQueryOutput' }
    & Pick<RgaQueryOutput, 'success'>
    & { rgas?: Maybe<Array<Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'submittedOn' | 'submittedBy' | 'status'>
      & { goods: Array<Maybe<(
        { __typename?: 'RGAGood' }
        & Pick<RgaGood, 'id'>
      )>> }
    )>>>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateCustomerMutationVariables = Exact<{
  customerInput: ExistingCustomerInput;
}>;


export type UpdateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'CustomerMutationOutput' }
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name' | 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateDistributorMutationVariables = Exact<{
  distributorInput: ExistingDistributorInput;
}>;


export type UpdateDistributorMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'DistributorMutationOutput' }
    & { distributor?: Maybe<(
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id' | 'name' | 'domain'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateModelNumberLottedMutationVariables = Exact<{
  id: Scalars['ID'];
  lotted: Scalars['Boolean'];
}>;


export type UpdateModelNumberLottedMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & { modelNumber?: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'lotted'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateModelNumberMutationVariables = Exact<{
  modelNumberInput: ModelNumberInput;
}>;


export type UpdateModelNumberMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & { modelNumber?: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'description' | 'productIds' | 'productType' | 'lotted' | 'warrantyTerm' | 'warrantyDescription' | 'resolutionWithWarranty' | 'resolutionWithoutWarranty' | 'publicNotes' | 'privateNotes'>
      & { products?: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name'>
      )>>>, pricing?: Maybe<(
        { __typename?: 'Pricing' }
        & Pick<Pricing, 'cost' | 'retail'>
      )>, feeWithWarranty?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )>, feeWithoutWarranty?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateModelNumberViewableMutationVariables = Exact<{
  id: Scalars['ID'];
  publiclyViewable: Scalars['Boolean'];
}>;


export type UpdateModelNumberViewableMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ModelNumberMutationOutput' }
    & { modelNumber?: Maybe<(
      { __typename?: 'ModelNumber' }
      & Pick<ModelNumber, 'id' | 'publiclyViewable'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateProductMutationVariables = Exact<{
  productInput: ProductInput;
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductMutationOutput' }
    & { product?: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateProductRegistrationMutationVariables = Exact<{
  productRegistrationInput: ExistingProductRegistrationInput;
}>;


export type UpdateProductRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductRegistrationMutationOutput' }
    & Pick<ProductRegistrationMutationOutput, 'success'>
    & { productRegistration?: Maybe<(
      { __typename?: 'ProductRegistration' }
      & Pick<ProductRegistration, 'id' | 'modelNumber' | 'productId' | 'customerId' | 'serial'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'email' | 'name'>
      ) }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'path' | 'message'>
    )>>> }
  ) }
);

export type UpdateProductSymptomMutationVariables = Exact<{
  productSymptomInput: ExistingProductSymptomInput;
}>;


export type UpdateProductSymptomMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'ProductSymptomMutationOutput' }
    & { productSymptom?: Maybe<(
      { __typename?: 'ProductSymptom' }
      & Pick<ProductSymptom, 'id' | 'name' | 'fee' | 'faultCode' | 'synopsis' | 'solution' | 'careTip'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateRgaGoodMutationVariables = Exact<{
  id: Scalars['ID'];
  rgaId: Scalars['String'];
  rgaGoodInput: RgaGoodInput;
}>;


export type UpdateRgaGoodMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAGoodMutationOutput' }
    & Pick<RgaGoodMutationOutput, 'success' | 'rgaId'>
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>>, rgaGood?: Maybe<(
      { __typename?: 'RGAGood' }
      & Pick<RgaGood, 'id' | 'serviceId' | 'customerId' | 'customerEmail' | 'customerName' | 'customerPhone' | 'customerStreet' | 'customerStreet2' | 'customerZip' | 'customerCity' | 'customerState' | 'customerCountry' | 'customerSpecialty' | 'faultCode' | 'serial' | 'newSerial' | 'lotted' | 'preApproved' | 'productId' | 'productName' | 'productType' | 'symptomId' | 'symptomDescription' | 'symptomSolution' | 'symptomSynopsis' | 'modelNumber' | 'po' | 'rma' | 'warrantied' | 'warrantyTerm' | 'warrantyDescription' | 'notes' | 'serviceFormUrl' | 'customerLetterUrl' | 'ssd' | 'additionalComments' | 'datePurchased' | 'disposition'>
      & { resolutionFee?: Maybe<(
        { __typename?: 'FeeStructure' }
        & Pick<FeeStructure, 'distributor' | 'endUser'>
      )> }
    )> }
  ) }
);

export type UpdateRgaMutationVariables = Exact<{
  rgaInput: ExistingRgaInput;
}>;


export type UpdateRgaMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAMutationOutput' }
    & Pick<RgaMutationOutput, 'success'>
    & { rga?: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'shippingSpeed' | 'status' | 'submittedBy' | 'submittedOn'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateRgaShippingStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  shippingUpdates?: Maybe<Array<Maybe<RgaGoodShippingInput>> | Maybe<RgaGoodShippingInput>>;
  notes?: Maybe<Scalars['String']>;
}>;


export type UpdateRgaShippingStatusMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAMutationOutput' }
    & Pick<RgaMutationOutput, 'success'>
    & { rga?: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'status' | 'submittedBy' | 'submittedOn' | 'shippingSpeed'>
      & { statusLog?: Maybe<Array<Maybe<(
        { __typename?: 'RGAStatusUpdate' }
        & Pick<RgaStatusUpdate, 'status' | 'notes' | 'updatedOn'>
        & { updatedBy?: Maybe<(
          { __typename?: 'UpdateProfile' }
          & Pick<UpdateProfile, 'name' | 'id' | 'email'>
        )> }
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateRgaStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  status: RgaStatus;
  notes?: Maybe<Scalars['String']>;
}>;


export type UpdateRgaStatusMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'RGAMutationOutput' }
    & Pick<RgaMutationOutput, 'success'>
    & { rga?: Maybe<(
      { __typename?: 'RGA' }
      & Pick<Rga, 'id' | 'status' | 'submittedBy' | 'submittedOn' | 'shippingSpeed'>
      & { statusLog?: Maybe<Array<Maybe<(
        { __typename?: 'RGAStatusUpdate' }
        & Pick<RgaStatusUpdate, 'status' | 'notes' | 'updatedOn'>
        & { updatedBy?: Maybe<(
          { __typename?: 'UpdateProfile' }
          & Pick<UpdateProfile, 'name' | 'id' | 'email'>
        )> }
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  userInput: ExistingUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { response: (
    { __typename?: 'UserMutationOutput' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'message' | 'path'>
    )>>> }
  ) }
);

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )>>> }
);


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
    


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

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
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
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
  PageQueryOutput: ResolverTypeWrapper<PageQueryOutput>;
  Page: ResolverTypeWrapper<Page>;
  DocumentQueryOutput: ResolverTypeWrapper<DocumentQueryOutput>;
  Document: ResolverTypeWrapper<Document>;
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
  PageInput: PageInput;
  PageMutationOutput: ResolverTypeWrapper<PageMutationOutput>;
  DocumentInput: DocumentInput;
  DocumentMutationOutput: ResolverTypeWrapper<DocumentMutationOutput>;
  ConnectionPayload: ConnectionPayload;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginationEntry: ResolverTypeWrapper<PaginationEntry>;
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
  PageQueryOutput: PageQueryOutput;
  Page: Page;
  DocumentQueryOutput: DocumentQueryOutput;
  Document: Document;
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
  PageInput: PageInput;
  PageMutationOutput: PageMutationOutput;
  DocumentInput: DocumentInput;
  DocumentMutationOutput: DocumentMutationOutput;
  ConnectionPayload: ConnectionPayload;
  PageInfo: PageInfo;
  PaginationEntry: PaginationEntry;
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

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  documents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Document']>>>, ParentType, ContextType>;
  documentSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  makePage?: Resolver<ResolversTypes['PageMutationOutput'], ParentType, ContextType, RequireFields<MutationMakePageArgs, 'pageInput'>>;
  destroyPage?: Resolver<ResolversTypes['PageMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyPageArgs, 'id'>>;
  makeDocument?: Resolver<ResolversTypes['DocumentMutationOutput'], ParentType, ContextType, RequireFields<MutationMakeDocumentArgs, 'documentInput'>>;
  destroyDocument?: Resolver<ResolversTypes['DocumentMutationOutput'], ParentType, ContextType, RequireFields<MutationDestroyDocumentArgs, 'id'>>;
};

export type PageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type PageMutationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageMutationOutput'] = ResolversParentTypes['PageMutationOutput']> = {
  page?: Resolver<Maybe<ResolversTypes['Page']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageQueryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageQueryOutput'] = ResolversParentTypes['PageQueryOutput']> = {
  page?: Resolver<Maybe<ResolversTypes['Page']>, ParentType, ContextType>;
  pages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Page']>>>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvaluatedKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ValidationError']>>>, ParentType, ContextType>;
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
  pages?: Resolver<ResolversTypes['PageQueryOutput'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['PageQueryOutput'], ParentType, ContextType, RequireFields<QueryPageArgs, 'id'>>;
  documents?: Resolver<ResolversTypes['DocumentQueryOutput'], ParentType, ContextType>;
  document?: Resolver<ResolversTypes['DocumentQueryOutput'], ParentType, ContextType, RequireFields<QueryDocumentArgs, 'id'>>;
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
