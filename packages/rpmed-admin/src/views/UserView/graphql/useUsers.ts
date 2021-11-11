import { User, useUsersQuery } from '../../../schema'

export const useUsers = () => {
  const { data, loading, error } = useUsersQuery()
  const users = ((data && data.users) || []) as User[]
  return { data, loading, error, users }
}
