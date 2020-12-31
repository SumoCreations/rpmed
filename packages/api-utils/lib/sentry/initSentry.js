import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';
/**
 * Initializes sentry for an API endpoint execution.
 * @param dsn The sentry DSN url for the project to report to.
 */
export const initSentry = (dsn) => Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
    integrations: [new Integrations.Express()],
});
//# sourceMappingURL=initSentry.js.map