/**
 * A simple way to detect if the current process is running
 * via SLS Offline.
 */
export const isOffline = () => process.env.IS_OFFLINE === "true"
