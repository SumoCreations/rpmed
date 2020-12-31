import { parseEmail } from './parseEmail'

test('should extract an email and password from the body', () => {
  const email = parseEmail(
    '{"email": "shout@test.com", "password":"example123456"}'
  )
  expect(email).toBe('shout@test.com')
})

test('should throw an error if an email is invalid', async () => {
  expect(() =>
    parseEmail('{"email": "shouttest.com", "password":"example123456"}')
  ).toThrowError('Email was not a valid email address.')
})
