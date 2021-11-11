interface IRefreshTokenResponse {
  errors?: object
  accessToken?: string
  refreshToken?: string
}

export const refreshCurrentAccessToken = (
  token: string
): Promise<IRefreshTokenResponse> =>
  fetch(`${process.env.REACT_APP_API_URL}/auth/token`, {
    body: JSON.stringify({ refreshToken: token, grantType: 'refresh' }),
    method: 'POST',
  })
    .then(response => {
      return response.json()
    })
    .then(({ data: { accessToken, refreshToken }, errors }) => {
      return {
        accessToken,
        errors,
        refreshToken,
      }
    })
