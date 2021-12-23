interface IRefreshTokenResponse {
  errors?: object
  accessToken?: string
  refreshToken?: string
}

export const refreshCurrentAccessToken = (
  apiUrl: string,
  token: string
): Promise<IRefreshTokenResponse> =>
  fetch(`${apiUrl}/auth/token`, {
    body: JSON.stringify({ refreshToken: token, grantType: 'refresh' }),
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
