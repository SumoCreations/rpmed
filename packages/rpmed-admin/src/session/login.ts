/**
 * Performs a network request to authenticate the user and returns
 * credentials from the API if successful.
 * @param email The email address for the account to sign in with.
 * @param password The password associated to the account.
 */
export const login = async (
  email: string,
  password: string
): Promise<{ data: object; errors: any }> => {
  try {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/auth/token`, {
      body: JSON.stringify({ email, grantType: 'password', password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    return (await result.json()) as { data: object; errors: any }
  } catch (e) {
    return { data: {}, errors: { _: 'Could not connect to server.', e } }
  }
}
