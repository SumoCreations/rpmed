/**
 * Represents a common HTTP status code.
 */
export var Status;
(function (Status) {
    Status[Status["OK"] = 200] = "OK";
    Status[Status["Created"] = 201] = "Created";
    Status[Status["BadRequest"] = 400] = "BadRequest";
    Status[Status["NotAuthorized"] = 401] = "NotAuthorized";
    Status[Status["Forbidden"] = 403] = "Forbidden";
    Status[Status["NotFound"] = 404] = "NotFound";
})(Status || (Status = {}));
/**
 * Generates a basic CORS response.
 * @param status The HTTP status code to return for a given request.
 * @param data Any associated data or body to return in the request.
 * @param errors Any errors returned by the request.
 */
export const response = (status, data, errors) => ({
    body: JSON.stringify({ data, errors: errors || {} }),
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
    },
    statusCode: status,
});
//# sourceMappingURL=response.js.map