import * as Sentry from "@sentry/node";

let monitoringEnabled = false;

export const initMonitoring = () => {
  const dsn = process.env.SENTRY_DSN;

  if (!dsn) {
    monitoringEnabled = false;
    return false;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1),
  });

  monitoringEnabled = true;
  return true;
};

export const captureException = (error, context = {}) => {
  if (!monitoringEnabled) {
    return;
  }

  Sentry.captureException(error, {
    extra: context,
  });
};

export const isMonitoringEnabled = () => monitoringEnabled;