import * as bcrypt from 'bcryptjs'

/**
 * Creates a bcrypt hash for a supplied plain text string.
 * @param plaintextPassword A plain text password to encrypt.
 */
export const hashPassword = (params?: { saltRounds: number }) => async (
  plaintextPassword: string
): Promise<string> =>
  await bcrypt.hash(
    plaintextPassword,
    params?.saltRounds ?? parseInt(process.env.SALT_ROUNDS, 0)
  )

/**
 * Utilizes bcrypt to verify a plain text password against an encrypted hash string.
 * @param hashedPassword An existing hash to compare.
 * @param plaintextPassword A plain text password to verify against the supplied hash.
 */
export const comparePassword = async (
  hashedPassword: string,
  plaintextPassword: string
): Promise<boolean> => await bcrypt.compare(plaintextPassword, hashedPassword)
