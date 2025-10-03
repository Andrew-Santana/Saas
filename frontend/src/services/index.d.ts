export declare class ApiService {
    private baseURL;
    constructor(baseURL?: string);
    get<T>(endpoint: string): Promise<T>;
    post<T>(endpoint: string, data: any): Promise<T>;
    put<T>(endpoint: string, data: any): Promise<T>;
    delete<T>(endpoint: string): Promise<T>;
}
export declare class AnalyticsService {
    private gtag;
    constructor();
    trackEvent(eventName: string, parameters?: Record<string, any>): void;
    trackPageView(path: string, title: string): void;
    trackDemoClick(demoType: string): void;
    trackFreeTrialClick(source: string): void;
}
export declare class SEOService {
    static generateStructuredData(type: 'SoftwareApplication' | 'Organization' | 'FAQPage', data: any): any;
    static generateSoftwareApplicationSchema(appData: any): any;
    static generateOrganizationSchema(orgData: any): any;
    static generateFAQSchema(faqs: Array<{
        question: string;
        answer: string;
    }>): any;
}
export declare const apiService: ApiService;
export declare const analyticsService: AnalyticsService;
