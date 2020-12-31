export interface ICredentials {
    email: string;
    password: string;
}
export declare const parseCredentials: (body: string) => ICredentials | never;
