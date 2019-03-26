import { User } from "../models"
import { resetTable } from "../util"
import { verifyUser } from "./verify"

const email = "avaliduser@jimjeffers.com"
const password = "thisisjustatest"

afterAll(async () => {
  resetTable(process.env.DYNAMODB_USER_LOOKUP_TABLE, i => ({
    email: i.email,
  }))
  resetTable(process.env.DYNAMODB_ACCOUNTS_TABLE, i => ({
    id: i.id,
  }))
})

describe("verifyUser", () => {
  beforeAll(async () => {
    await User.create({
      email,
      password,
    })
  })

  test("should verify a user who truly exists", async () => {
    expect.assertions(1)

    const user = await verifyUser(email, password)
    expect(user.email).toBe(email)
  })

  test("should not return a user if the password is incorrect", async () => {
    expect.assertions(1)
    const user = await verifyUser(email, "invalid_password")
    expect(user).toBe(null)
  })
})
