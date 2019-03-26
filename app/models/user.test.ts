import { isEmpty } from "validator"
import { resetTable } from "../util"
import { IUser, User } from "./user"

afterAll(async () => {
  resetTable(process.env.DYNAMODB_USER_LOOKUP_TABLE, i => ({
    email: i.email,
  }))
  resetTable(process.env.DYNAMODB_ACCOUNTS_TABLE, i => ({
    id: i.id,
  }))
})

const email = "shout@jimjeffers.com"
const password = "thisisjustatest"

describe("user", () => {
  let user: IUser
  beforeEach(async () => {
    user = await User.create({
      email,
      password,
    })
  })

  afterEach(async () => {
    await User.destroyByEmail(email)
  })

  describe("create", () => {
    test("should generate a new user model", () => {
      expect(isEmpty(user.id)).toBe(false)
    })

    test("should not generate a new user if the email address was already used", async () => {
      expect.assertions(1)
      try {
        await User.create({
          email: "email@exists.com",
          password,
        })
        await User.create({
          email: "email@exists.com",
          password,
        })
      } catch (e) {
        expect(isEmpty(e.message)).toBe(false)
      }
    })
  })

  describe("find", () => {
    test("should return a user if one exists", async () => {
      expect.assertions(1)
      const existingUser = await User.find(user.id)
      expect(existingUser).not.toBeNull()
    })

    test("should return null if a user does not exist", async () => {
      expect.assertions(1)
      const existingUser = await User.find("Some-Made-Up-Id")
      expect(existingUser).toBeNull()
    })
  })

  describe("findByEmail", () => {
    test("should return a user if one exists", async () => {
      expect.assertions(1)
      const existingUser = await User.findByEmail(user.email)
      expect(existingUser).not.toBeNull()
    })

    test("should return null if a user does not exist", async () => {
      expect.assertions(1)
      const existingUser = await User.findByEmail("someone@doesnotexist.com")
      expect(existingUser).toBeNull()
    })
  })

  describe("destroy", () => {
    test("should delete a user and return true if one exists", async () => {
      expect.assertions(2)
      expect(await User.destroy(user.id)).toBeTruthy()
      const existingUser = await User.find(user.id)
      expect(existingUser).toBeNull()
    })

    test("should return false if a user does not exist", async () => {
      expect.assertions(1)
      expect(await User.destroy("Some-Made-Up-Id")).toBeFalsy()
    })
  })

  describe("destroyByEmail", () => {
    test("should delete a user and return true if the user exists", async () => {
      expect.assertions(2)
      expect(await User.destroyByEmail(user.email)).toBeTruthy()
      const existingUser = await User.find(user.id)
      expect(existingUser).toBeNull()
    })

    test("should return false if the user does not exist", async () => {
      expect.assertions(1)
      expect(await User.destroyByEmail("somemadeup@email.com")).toBeFalsy()
    })
  })
})
