import * as Sentry from '@sentry/node';
/**
 * Flush all sentry requests or wait 2000ms before continuuing
 * with the program execution.
 */
export const flushSentry = async () => await Sentry.flush(2000);
//# sourceMappingURL=flushSentry.js.map