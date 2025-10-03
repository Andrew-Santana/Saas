export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}
export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    features: string[];
    is_popular?: boolean;
}
export interface Subscription {
    id: string;
    user_id: string;
    plan_id: string;
    status: 'active' | 'inactive' | 'cancelled';
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}
export interface Payment {
    id: string;
    subscription_id: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed';
    payment_method: string;
    created_at: string;
    updated_at: string;
}
export interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    canonicalUrl?: string;
    structuredData?: Record<string, any>;
    url?: string;
}
export interface DemoPage {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    bgColor: string;
    borderColor: string;
    features: string[];
    url: string;
    keywords: string;
}
export interface TranslationKeys {
    agendaPro: {
        brand: string;
        hero: {
            title: string;
            subtitle: string;
            watchDemo: string;
            freeTrial: string;
            companies: string;
        };
        faq: {
            title: string;
            subtitle: string;
            questions: Array<{
                question: string;
                answer: string;
            }>;
        };
    };
}
export interface AnalyticsEvent {
    eventName: string;
    parameters: Record<string, any>;
}
export interface PageViewEvent {
    path: string;
    title: string;
}
