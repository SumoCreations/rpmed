import * as Sentry from '@sentry/node';
import { flushSentry } from './flushSentry';
/**
 * Logs a detailed error to sentry. You need to initialize sentry somewhere in the
 * execution of your project prior to using this function.
 * @param args A set of arguments to aid in identifying or reviewing the error.
 */
export const logSentryError = async (args) => {
    Sentry.configureScope((scope) => {
        scope.setExtra('resolver', args.operationName);
        scope.setExtra('variables', args.variables);
        scope.setExtra('context', args.ctx);
    });
    Sentry.captureException(args.error);
    if (args.console) {
        console.log('Logging the following error to sentry:');
        console.log(JSON.stringify(args));
    }
    if (args.skipFlush) {
        return;
    }
    await flushSentry();
};
//# sourceMappingURL=logSentryError.js.map