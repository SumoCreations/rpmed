import { isEmail, isLength } from 'validator';
export const parseCredentials = (body) => {
    const { email, password } = JSON.parse(body);
    if (!isEmail(email || '')) {
        throw Error('Email was not a valid email address.');
    }
    if (!isLength(password || '', { min: 8, max: 32 })) {
        throw Error('Password must be between a minimum of 8 and maximum of 32 characters.');
    }
    return { email, password };
};
//# sourceMappingURL=parseCredentials.js.map