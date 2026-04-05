/**
 * Simple Telemetry System for Bârnova Village Portal
 * This is a client-side utility to track page views and interactions.
 */

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const payload = {
    event: eventName,
    properties,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };

  // In a real app, you would send this to an endpoint like /api/telemetry
  // For now, we'll log it to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Telemetry]:', payload);
  }
};

export const useTelemetry = () => {
  return { trackEvent };
};
