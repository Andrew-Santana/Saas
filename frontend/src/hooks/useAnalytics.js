import { analyticsService } from '../services';
// Hook para analytics - agora usa o serviço centralizado
export const useAnalytics = () => {
    return {
        trackEvent: analyticsService.trackEvent.bind(analyticsService),
        trackPageView: analyticsService.trackPageView.bind(analyticsService),
        trackDemoClick: analyticsService.trackDemoClick.bind(analyticsService),
        trackFreeTrialClick: analyticsService.trackFreeTrialClick.bind(analyticsService),
    };
};
// Funções de conveniência para compatibilidade
export const trackEvent = analyticsService.trackEvent.bind(analyticsService);
export const trackPageView = analyticsService.trackPageView.bind(analyticsService);
