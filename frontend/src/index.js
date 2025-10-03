// Barrel exports para facilitar imports
export * from './types';
export * from './constants';
export * from './services';
// Re-exports de hooks
export { useAnalytics, trackEvent, trackPageView } from './hooks/useAnalytics';
export { useStructuredData } from './hooks/useStructuredData';
export { useI18n } from './hooks/useI18n';
export { useTheme } from './hooks/useTheme';
export { usePing } from './hooks/usePing';
// Re-exports de componentes principais
export { default as SEO } from './components/SEO';
export { default as OptimizedImage } from './components/OptimizedImage';
