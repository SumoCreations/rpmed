/**
 * Processes an array of errors so that they can be returned by the GraphQL schema.
 * @param errors A standardized mutation error utilized in the GraphQL API.
 */
export const generateMutationError = (errors) => ({
    errors,
    success: false,
});
//# sourceMappingURL=generateMutationError.js.map