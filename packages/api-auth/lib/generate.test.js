import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { generate, generateTokenFromPassword, generateTokenFromRefreshToken, SUPPORTED_ALGORITHM, } from './generate';
const userId = uuid();
const accessLevel = 'user';
const emailAddress = 'generate-user-test@example.com';
const password = 'thisisjustatest';
const REFRESH_TOKEN_LIFESPAN = 60;
const SIGNATURE = 'signature';
/**
 * We will simulate a black list via the dynamo db lookup
 * table here. The expected behavior is that tokens are
 * stored in a dedicated look up table and dynamo will
 * throw an error if the token already exists.
 */
const mockClient = () => {
    var blackList = [];
    return {
        put: (request) => {
            if (blackList.includes(request.Item.id)) {
                throw Error('Token has been blacklisted.');
            }
            blackList.push(request.Item.id);
            return {
                promise() {
                    return {};
                },
            };
        },
    };
};
const verifyPassword = ({ email, password: pwd, }) => {
    if (email === emailAddress && pwd === password) {
        return { userId, accessLevel };
    }
    return;
};
const verifyUser = ({ userId: id }) => {
    if (userId === id) {
        return { userId, accessLevel };
    }
    return;
};
const AUTH_CONFIG = {
    signature: SIGNATURE,
    tokenLookupTable: 'TestLookUpTable',
    onVerifyPassword: verifyPassword,
    onVerifyUserId: verifyUser,
    dynamoClient: mockClient(),
};
describe('generate', () => {
    test("should generate an access token with the associated user's ID", () => {
        const { token } = generate(AUTH_CONFIG)({ accessLevel, userId });
        const decoded = jwt.decode(token);
        expect(decoded.userId).toBe(userId);
    });
    test("should generate a refresh token with the associated user's ID", () => {
        const { refresh } = generate(AUTH_CONFIG)({ accessLevel, userId });
        const decoded = jwt.decode(refresh);
        expect(decoded.userId).toBe(userId);
    });
    test('should generate a refresh attribute', () => {
        const { refresh } = generate(AUTH_CONFIG)({ accessLevel, userId });
        const decoded = jwt.decode(refresh);
        expect(decoded.refresh).toBe(true);
    });
});
describe('generate from credentials', () => {
    describe('generateTokenFromPassword', () => {
        test('should generate tokens given valid credentials', async () => {
            expect.assertions(3);
            const tokens = await generateTokenFromPassword(AUTH_CONFIG)(emailAddress, password);
            expect(tokens).not.toBeNull();
            expect(tokens.token).toBeDefined();
            expect(tokens.refresh).toBeDefined();
        });
        test('should not generate tokens if given invalid emailAddress', async () => {
            expect.assertions(1);
            const tokens = await generateTokenFromPassword(AUTH_CONFIG)('emailAddress@doesnotexist.com', password);
            expect(tokens).toBeNull();
        });
        test('should not generate tokens if given invalid credentials', async () => {
            expect.assertions(1);
            const tokens = await generateTokenFromPassword(AUTH_CONFIG)(emailAddress, 'att3mpt3dh4x0rs');
            expect(tokens).toBeNull();
        });
    });
    describe('generateTokenFromRefreshToken', () => {
        const generateValidRefreshToken = async () => {
            const token = jwt.sign({
                refresh: true,
                userId,
            }, SIGNATURE, {
                algorithm: SUPPORTED_ALGORITHM,
                expiresIn: REFRESH_TOKEN_LIFESPAN,
            });
            return token;
        };
        test('should generate new credentials from a valid refresh token', async () => {
            expect.assertions(3);
            const tokens = await generateTokenFromRefreshToken(AUTH_CONFIG)(await generateValidRefreshToken());
            expect(tokens).not.toBeNull();
            expect(tokens.token).not.toBeNull();
            expect(tokens.refresh).not.toBeNull();
        });
        test('should prevent replay attacks', async () => {
            expect.assertions(1);
            await generateTokenFromRefreshToken(AUTH_CONFIG)(await generateValidRefreshToken()); // First request
            expect(await generateTokenFromRefreshToken(AUTH_CONFIG)(await generateValidRefreshToken()) // Replay
            ).toBeNull();
        });
        test('should not generate new credentials for a non existent user', async () => {
            expect.assertions(1);
            const refresh = jwt.sign({
                refresh: true,
                userId: '1234-NOT-REAL',
            }, SIGNATURE, {
                algorithm: SUPPORTED_ALGORITHM,
                expiresIn: REFRESH_TOKEN_LIFESPAN !== null && REFRESH_TOKEN_LIFESPAN !== void 0 ? REFRESH_TOKEN_LIFESPAN : 60,
            });
            const tokens = await generateTokenFromRefreshToken(AUTH_CONFIG)(refresh);
            expect(tokens).toBeNull();
        });
        test('should not generate new credentials for a standard access token', async () => {
            expect.assertions(1);
            const refresh = jwt.sign({
                userId,
            }, SIGNATURE, {
                algorithm: SUPPORTED_ALGORITHM,
                expiresIn: REFRESH_TOKEN_LIFESPAN,
            });
            const tokens = await generateTokenFromRefreshToken(AUTH_CONFIG)(refresh);
            expect(tokens).toBeNull();
        });
        test('should not generate new credentials if the token is not signed with the supported algorithm', async () => {
            expect.assertions(1);
            const refresh = jwt.sign({
                refresh: true,
                userId,
            }, SIGNATURE, {
                algorithm: 'HS256',
                expiresIn: REFRESH_TOKEN_LIFESPAN,
            });
            const tokens = await generateTokenFromRefreshToken(AUTH_CONFIG)(refresh);
            expect(tokens).toBeNull();
        });
    });
});
//# sourceMappingURL=generate.test.js.map