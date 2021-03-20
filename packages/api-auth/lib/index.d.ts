import { AuthConfig } from './types';
export * from './types';
export * from './passwords';
declare const makeAuth: (config: AuthConfig) => {
    decode: (token: string) => string | object;
    generate: (input: import("./types").TokenInput) => import("./types").TokenOutput;
    verifyAndDecode: (token: string) => import("./types").RefreshToken;
    generateTokenFromPassword: (email: string, password: string) => Promise<import("./types").TokenOutput>;
    generateTokenFromRefreshToken: (refreshToken: string) => Promise<import("./types").TokenOutput>;
    hashPassword: (plaintextPassword: string) => Promise<string>;
    comparePassword: (hashedPassword: string, plaintextPassword: string) => Promise<boolean>;
};
export default makeAuth;
