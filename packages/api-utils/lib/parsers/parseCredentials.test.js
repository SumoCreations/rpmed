import { parseCredentials } from './parseCredentials';
test('should extract an email and password from the body', () => {
    const credentials = parseCredentials('{"email": "shout@test.com", "password":"example123456"}');
    expect(credentials.email).toBe('shout@test.com');
    expect(credentials.password).toBe('example123456');
});
test('should throw an error if an email is invalid', async () => {
    expect(() => parseCredentials('{"email": "shouttest.com", "password":"example123456"}')).toThrowError('Email was not a valid email address.');
});
test('should throw an error if a password is invalid', async () => {
    expect(() => parseCredentials('{"email": "shout@test.com", "password":"example"}')).toThrowError('Password must be between a minimum of 8 and maximum of 32 characters.');
});
//# sourceMappingURL=parseCredentials.test.js.map