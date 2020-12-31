import { decode } from './decode';
import * as generate from './generate';
import * as passwords from './passwords';
export * from './types';
export * from './passwords';
const makeAuth = (config) => ({
    decode: decode(config),
    generate: generate.generate(config),
    verifyAndDecode: generate.verifyAndDecode(config),
    generateTokenFromPassword: generate.generateTokenFromPassword(config),
    generateTokenFromRefreshToken: generate.generateTokenFromRefreshToken(config),
    hashPassword: passwords.hashPassword({ saltRounds: config.saltRounds }),
    comparePassword: passwords.comparePassword,
});
export default makeAuth;
//# sourceMappingURL=index.js.map