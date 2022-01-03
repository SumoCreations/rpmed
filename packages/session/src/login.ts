interface Error {
  message: string
  path: string
}

interface ILoginResponse {
  errors?: Error[]
  accessToken?: string
  refreshToken?: string
}

export const login = (
  apiUrl: string | undefined | null,
  values: {
    email: string
    password: string
  }
): Promise<ILoginResponse> =>
  fetch(`${apiUrl ?? ''}/auth/token`, {
    body: JSON.stringify({ ...values, grantType: 'password' }),
    method: 'POST',
  })
    .then((response) => {
      return response.json()
    })
    .then(({ data: { accessToken, refreshToken }, errors }) => {
      return {
        accessToken,
        errors,
        refreshToken,
      }
    })
