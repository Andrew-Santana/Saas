import { API_ENDPOINTS, ANALYTICS_EVENTS } from '../constants';

// Serviço de API
export class ApiService {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

// Serviço de Analytics
export class AnalyticsService {
  private gtag: ((...args: any[]) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.gtag) {
      this.gtag = window.gtag;
    }
  }

  trackEvent(eventName: string, parameters: Record<string, any> = {}) {
    if (this.gtag) {
      this.gtag('event', eventName, parameters);
    } else {
      console.log(`Analytics Event: ${eventName}`, parameters);
    }
  }

  trackPageView(path: string, title: string) {
    if (this.gtag) {
      this.gtag('config', 'YOUR_GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: title,
      });
    } else {
      console.log(`Analytics Page View: ${title} (${path})`);
    }
  }

  trackDemoClick(demoType: string) {
    this.trackEvent(ANALYTICS_EVENTS.DEMO_SELECTION_CLICK, {
      event_category: 'engagement',
      event_label: demoType,
      demo_type: demoType,
    });
  }

  trackFreeTrialClick(source: string) {
    this.trackEvent(ANALYTICS_EVENTS.FREE_TRIAL_CLICK, {
      event_category: 'engagement',
      event_label: source,
    });
  }
}

// Serviço de SEO
export class SEOService {
  static generateStructuredData(type: 'SoftwareApplication' | 'Organization' | 'FAQPage', data: any) {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    return { ...baseSchema, ...data };
  }

  static generateSoftwareApplicationSchema(appData: any) {
    return this.generateStructuredData('SoftwareApplication', {
      name: appData.name || 'AgendaPro',
      description: appData.description || 'Plataforma de agendamento e gestão completa para negócios',
      url: appData.url || 'https://agendapro.com.br',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: appData.price || '29.90',
        priceCurrency: 'BRL',
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '5000',
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Organization',
        name: 'AgendaPro',
        url: 'https://agendapro.com.br',
      },
    });
  }

  static generateOrganizationSchema(orgData: any) {
    return this.generateStructuredData('Organization', {
      name: orgData.name || 'AgendaPro',
      url: orgData.url || 'https://agendapro.com.br',
      logo: 'https://agendapro.com.br/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+55-11-99999-9999',
        contactType: 'customer service',
      },
      sameAs: [
        'https://facebook.com/agendapro',
        'https://twitter.com/agendapro',
        'https://linkedin.com/company/agendapro',
      ],
    });
  }

  static generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return this.generateStructuredData('FAQPage', {
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }
}

// Instâncias dos serviços
export const apiService = new ApiService();
export const analyticsService = new AnalyticsService();
