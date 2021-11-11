import { User, useUserQuery } from '../../../schema'

export const useUser = (userId: string) => {
  const { loading, error, data } = useUserQuery({
    variables: { userId },
  })
  const user = ((data && data.user) || {}) as User
  return { loading, error, data, user }
}
