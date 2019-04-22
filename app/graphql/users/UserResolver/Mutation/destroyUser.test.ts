import { IUser, User } from "../../../../models"
import { resetTestTables } from "../../../../util"
import { destroyUser } from "./destroyUser"

afterAll(async () => await resetTestTables())

const sampleParams = { email: "destroy-user-test@example.com", firstName: "Jim", lastName: "Jeffers", password: "password" }

describe("destroyUser", () => {
  let user: IUser
  beforeEach(async () => {
    user = await User.create({ ...sampleParams })
  })

  afterEach(async () => {
    await User.destroyByEmail(sampleParams.email)
  })

  test("should destroy the user", async () => {
    expect.assertions(1)
    const output = await destroyUser(null, { id: user.partitionKey })
    expect(output.success).toBe(true)
  })

  test("should fail the user does not exist", async () => {
    expect.assertions(1)
    const output = await destroyUser(null, { id: "some-made-up-id-or-key" })
    expect(output.success).toBe(false)
  })

})
