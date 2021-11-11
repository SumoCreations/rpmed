import {
  useDestroyUserMutation,
  User,
  UsersDocument,
  UsersQuery,
} from '../../../schema'

export const useDestroyUser = () => {
  const [destroyUser] = useDestroyUserMutation({
    update: (cache, result) => {
      const { users } = cache.readQuery({
        query: UsersDocument,
      }) as UsersQuery
      if (!users) {
        return
      }
      const user = ((result.data &&
        result.data.response &&
        result.data.response.user) ||
        {}) as User
      if (user) {
        cache.writeQuery({
          data: { users: users.filter(u => u && u.id !== user.id) },
          query: UsersDocument,
        })
      }
    },
  })
  return destroyUser
}
