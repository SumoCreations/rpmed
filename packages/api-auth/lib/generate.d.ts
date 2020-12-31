import { TokenInput, TokenOutput, AuthConfig, RefreshToken } from './types';
export declare const SUPPORTED_ALGORITHM = "HS512";
/**
 * Generates a JWT access and JWT refresh token.
 * @param input An object used to assign credentials for the token's payload.
 */
export declare const generate: ({ signature }: AuthConfig) => (input: TokenInput) => TokenOutput;
/**
 * Validates and returns the content of a JWT signed by this
 * app.
 * @param token A JWT token to verify and decode.
 */
export declare const verifyAndDecode: ({ signature }: AuthConfig) => (token: string) => RefreshToken | null;
/**
 * Generates a fresh access and refresh token based on password credentials.
 * @param email The email address used to identify the user.
 * @param password The password associated to that user account.
 */
export declare const generateTokenFromPassword: (config: AuthConfig) => (email: string, password: string) => Promise<TokenOutput | null>;
/**
 * Generates a fresh access and refresh token based on refresh token.
 * @param refreshToken A JWT refresh token.
 */
export declare const generateTokenFromRefreshToken: (config: AuthConfig) => (refreshToken: string) => Promise<TokenOutput | null>;
