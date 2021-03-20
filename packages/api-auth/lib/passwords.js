import * as bcrypt from 'bcryptjs';
/**
 * Creates a bcrypt hash for a supplied plain text string.
 * @param plaintextPassword A plain text password to encrypt.
 */
export const hashPassword = (params) => async (plaintextPassword) => {
    var _a;
    return await bcrypt.hash(plaintextPassword, (_a = params === null || params === void 0 ? void 0 : params.saltRounds) !== null && _a !== void 0 ? _a : parseInt(process.env.SALT_ROUNDS, 0));
};
/**
 * Utilizes bcrypt to verify a plain text password against an encrypted hash string.
 * @param hashedPassword An existing hash to compare.
 * @param plaintextPassword A plain text password to verify against the supplied hash.
 */
export const comparePassword = async (hashedPassword, plaintextPassword) => await bcrypt.compare(plaintextPassword, hashedPassword);
//# sourceMappingURL=passwords.js.map