import * as Sentry from "@sentry/react";

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

export const initMonitoring = () => {
  if (!sentryDsn) {
    return false;
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: Number(
      import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || 0.1,
    ),
  });

  return true;
};

export { Sentry };