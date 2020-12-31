/**
 * Creates a bcrypt hash for a supplied plain text string.
 * @param plaintextPassword A plain text password to encrypt.
 */
export declare const hashPassword: (params?: {
    saltRounds: number;
}) => (plaintextPassword: string) => Promise<string>;
/**
 * Utilizes bcrypt to verify a plain text password against an encrypted hash string.
 * @param hashedPassword An existing hash to compare.
 * @param plaintextPassword A plain text password to verify against the supplied hash.
 */
export declare const comparePassword: (hashedPassword: string, plaintextPassword: string) => Promise<boolean>;
