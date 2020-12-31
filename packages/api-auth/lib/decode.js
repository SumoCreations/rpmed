import * as jwt from 'jsonwebtoken';
import { SUPPORTED_ALGORITHM } from './generate';
export const decode = ({ signature }) => (token) => jwt.verify(token, signature !== null && signature !== void 0 ? signature : process.env.OAUTH_SIGNATURE, {
    algorithms: [SUPPORTED_ALGORITHM],
});
//# sourceMappingURL=decode.js.map