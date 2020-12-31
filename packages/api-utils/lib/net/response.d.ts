/**
 * Defines our standardized HTTP response to return for API Gateway events.
 */
export interface IResponse {
    statusCode: number;
    body: string;
    headers: {
        [header: string]: string | number | boolean;
    };
}
/**
 * Represents a common HTTP status code.
 */
export declare enum Status {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    NotAuthorized = 401,
    Forbidden = 403,
    NotFound = 404
}
/**
 * Generates a basic CORS response.
 * @param status The HTTP status code to return for a given request.
 * @param data Any associated data or body to return in the request.
 * @param errors Any errors returned by the request.
 */
export declare const response: (status: Status, data: object, errors?: object | undefined) => IResponse;
