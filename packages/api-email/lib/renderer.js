import { decamelize } from 'humps';
/**
 * Accepts an HTML template string and maps any supplied variables to the template. For example
 * if you had a passed variables such as {confirmationLink: 'http://www.myurl.com/confirm/'} the
 * renderer would attempt to replace the token '${CONFIRMATION_LINK}' with the supplied url.
 * All keys are converted to UPPER CASE and snake_case.
 *
 * @param templateString A string containing an HTML template.
 * @param variables A simple JS object which will have its keys and values mapped to the HTML string.
 */
export const renderer = (templateString, variables) => variables
    ? Object.keys(variables).reduce((str, key) => str.replace(new RegExp(`\\\$\\{${decamelize(key).toUpperCase()}\\}`, 'gi'), variables[key]), templateString)
    : templateString;
//# sourceMappingURL=renderer.js.map