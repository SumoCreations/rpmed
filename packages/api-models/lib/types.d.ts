export declare type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
/**
 * Used as an argument on any query incorporating the relay connection spec
 * to orchestrate paginated results
 **/
export declare type ConnectionPayload = {
    /** The id of the item to fetch forward pagination. Use with first. */
    after?: Maybe<Scalars['ID']>;
    /** The id of the item to fetch backward pagination. Use with last. */
    before?: Maybe<Scalars['ID']>;
    /** A limit when performing forward pagination. */
    first?: Maybe<Scalars['Int']>;
    /** A limit when performing backward pagination. */
    last?: Maybe<Scalars['Int']>;
};
/** Provides essential pagination info for a connection (or paginated request) */
export declare type PageInfo = {
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
export declare type PageInfoHasNextPagesArgs = {
    amount: Scalars['Int'];
};
/** Provides essential pagination info for a connection (or paginated request) */
export declare type PageInfoHasPreviousPagesArgs = {
    amount: Scalars['Int'];
};
/** A description of a pagination destination to fetch additional paginated results. */
export declare type PaginationEntry = {
    __typename?: 'PaginationEntry';
    /** The id of the entry to use for the pagination request. */
    cursor: Scalars['ID'];
};
