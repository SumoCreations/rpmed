import { AuthConfig } from './types';
export declare const decode: ({ signature }: AuthConfig) => (token: string) => string | object;
