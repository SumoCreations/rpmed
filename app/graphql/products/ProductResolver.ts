import {
  IModelNumberInput,
  IModelNumberOutput,
  IProductInput,
  IProductOutput,
  ModelNumber,
  Product,
} from "../../models"

interface IResolvers {
  Mutation: {
    createProduct: (
      context: any,
      productInput: IProductInput
    ) => Promise<IProductOutput>
    createModelNumber: (
      context: any,
      productInput: IModelNumberInput
    ) => Promise<IModelNumberOutput>
  }
  Query: {
    product: (context: any, args: any) => Promise<IProductOutput>
    products: (context: any, args: any) => Promise<IProductOutput[]>
    modelNumbers: (context: any, args: any) => Promise<IModelNumberOutput[]>
  }
}

export const resolvers: IResolvers = {
  Mutation: {
    createModelNumber: async (_, modelNumberInput) => {
      const modelNumber = await ModelNumber.create(modelNumberInput)
      return ModelNumber.output(modelNumber)
    },
    createProduct: async (_, productInput) => {
      const product = await Product.create(productInput)
      return Product.output(product)
    },
  },
  Query: {
    modelNumbers: async () => (await ModelNumber.all()).map(ModelNumber.output),
    product: async (_, args) => Product.output(await Product.find(args.id)),
    products: async () => (await Product.all()).map(Product.output),
  },
}
