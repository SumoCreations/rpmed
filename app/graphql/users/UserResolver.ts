import { IUserInput, IUserOutput, User } from "../../models"

export const resolvers = {
  Mutation: {
    createUser: async (
      _: any,
      { email, password, firstName, lastName }: IUserInput
    ): Promise<IUserOutput> => {
      const user = await User.create({ email, password, firstName, lastName })
      return User.output(user)
    },
    destroyUser: async (
      _: any,
      { id }: { id: string }
    ): Promise<IUserOutput> => {
      const user = await User.find(id)
      User.destroy(id)
      return User.output(user)
    },
    updateUser: async (
      _: any,
      userInput: IUserInput
    ): Promise<IUserOutput> => {
      const user = await User.update(userInput)
      return User.output(user)
    },
  },
  Query: {
    user: async (_, args) => User.output(await User.find(args.id)),
    userWithEmail: async (_, args) =>
      User.output(await User.findByEmail(args.email)),
    users: async () => (await User.all()).map(User.output),
  },
}
