import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  MessageCircle,
  X,
  Sparkles,
  Loader2,
  Send,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import { useLocation } from 'react-router-dom';
import { apiService, analyticsService } from '../../services';
import { DEMO_PAGES_CONFIG, ROUTES, ANALYTICS_EVENTS, API_ENDPOINTS } from '../../constants';

type ProductKey =
  | 'salao'
  | 'barbearia'
  | 'veterinaria'
  | 'timeBank'
  | 'inventory'
  | 'newsletter';

type ChatbotOption = {
  title: string;
  description: string;
  benefits: string[];
};

type ChatbotContent = {
  launcher: {
    label: string;
    active: string;
  };
  header: {
    title: string;
    subtitle: string;
  };
  intro: {
    title: string;
    subtitle: string;
    prompt: string;
  };
  options: Record<ProductKey, ChatbotOption>;
  actions: {
    choose: string;
    back: string;
    viewDemo: string;
    startOver: string;
    close: string;
  };
  form: {
    title: string;
    description: string;
    fields: {
      name: string;
      email: string;
      company: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      company: string;
      message: string;
    };
    submit: string;
  };
  validation: {
    name: string;
    email: string;
  };
  success: {
    title: string;
    description: string;
    contact: string;
    viewDemo: string;
    newChat: string;
  };
  errors: {
    submit: string;
  };
};

const PRODUCT_ROUTE_MAP: Record<ProductKey, string> = {
  salao: ROUTES.DEMO_SALAO,
  barbearia: ROUTES.DEMO_BARBEARIA,
  veterinaria: ROUTES.DEMO_VETERINARIA,
  timeBank: ROUTES.DEMO_TIME_BANK,
  inventory: ROUTES.DEMO_INVENTORY,
  newsletter: ROUTES.DEMO_NEWSLETTER,
};

const PRODUCT_DEMO_MAP: Partial<Record<ProductKey, typeof DEMO_PAGES_CONFIG[keyof typeof DEMO_PAGES_CONFIG]>> = {
  salao: DEMO_PAGES_CONFIG.salao,
  barbearia: DEMO_PAGES_CONFIG.barbearia,
  veterinaria: DEMO_PAGES_CONFIG.veterinaria,
  timeBank: DEMO_PAGES_CONFIG.timeBank,
  inventory: DEMO_PAGES_CONFIG.inventory,
  newsletter: DEMO_PAGES_CONFIG.newsletter,
};

type Step = 'intro' | 'form' | 'success';

type LeadPayload = {
  name: string;
  email: string;
  company?: string;
  message?: string;
  product_key: ProductKey;
  language: string;
  origin_path: string;
  details: Record<string, unknown>;
};

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const ChatbotWidget = () => {
  const { t, i18n } = useI18n();
  const location = useLocation();
  const { navigateLocalized, currentLanguage } = useLocalizedPath();

  const content = t('chatbot', { returnObjects: true }) as ChatbotContent;
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('intro');
  const [selectedProduct, setSelectedProduct] = useState<ProductKey | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translatedOptions = content.options;

  const sortedProductKeys = useMemo(() => {
    return (Object.keys(translatedOptions) as ProductKey[]).filter(
      (key) => PRODUCT_ROUTE_MAP[key]
    );
  }, [translatedOptions]);

  const selectedOption = selectedProduct ? translatedOptions[selectedProduct] : null;
  const selectedDemo = selectedProduct ? PRODUCT_DEMO_MAP[selectedProduct] : null;

  useEffect(() => {
    if (isOpen) {
      analyticsService.trackEvent(ANALYTICS_EVENTS.CHAT_OPEN, {
        language: i18n.language,
        path: location.pathname,
      });
    }
  }, [isOpen, i18n.language, location.pathname]);

  const resetState = () => {
    setStep('intro');
    setSelectedProduct(null);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setError(null);
    setIsSubmitting(false);
  };

  const handleToggle = () => {
    if (isOpen) {
      resetState();
    }
    setIsOpen((previous) => !previous);
  };

  const handleSelectProduct = (product: ProductKey) => {
    setSelectedProduct(product);
    setStep('form');
    analyticsService.trackEvent(ANALYTICS_EVENTS.CHAT_PRODUCT_SELECTED, {
      product_key: product,
      language: i18n.language,
    });
  };

  const handleBack = () => {
    setStep('intro');
    setSelectedProduct(null);
    setError(null);
  };

  const handleNavigateToDemo = () => {
    if (!selectedProduct) return;
    const target = PRODUCT_ROUTE_MAP[selectedProduct];
    analyticsService.trackEvent(ANALYTICS_EVENTS.DEMO_SELECTION_CLICK, {
      event_category: 'chatbot',
      event_label: selectedProduct,
    });
    navigateLocalized(target);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProduct) return;

    if (!name.trim()) {
      setError(content.validation.name);
      return;
    }
    if (!email.trim() || !validateEmail(email.trim())) {
      setError(content.validation.email);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const payload: LeadPayload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
      message: message.trim() || undefined,
      product_key: selectedProduct,
      language: currentLanguage,
      origin_path: location.pathname,
      details: {
        company,
        message,
        selected_product: selectedProduct,
        language: currentLanguage,
      },
    };

    try {
      await apiService.post(API_ENDPOINTS.CHAT_LEADS, payload);
      analyticsService.trackEvent(ANALYTICS_EVENTS.CHAT_LEAD_SUBMITTED, {
        product_key: selectedProduct,
        language: currentLanguage,
      });
      setStep('success');
      setIsSubmitting(false);
    } catch (submitError) {
      console.error('Error submitting chatbot lead', submitError);
      setError(content.errors.submit);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-start justify-between gap-3 rounded-t-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide">{content.header.title}</p>
              <p className="text-xs text-emerald-50">{content.header.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="rounded-full bg-emerald-600/70 p-1 transition hover:bg-emerald-600"
              aria-label={content.actions.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 px-4 py-5">
            {step === 'intro' && (
              <>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">{content.intro.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{content.intro.subtitle}</p>
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {content.intro.prompt}
                </p>
                <div className="space-y-3">
                  {sortedProductKeys.map((product) => {
                    const option = translatedOptions[product];
                    return (
                      <button
                        key={product}
                        type="button"
                        onClick={() => handleSelectProduct(product)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:shadow-lg"
                      >
                        <div className="mb-2 flex items-center gap-2 text-emerald-600">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-sm font-semibold uppercase tracking-wide">
                            {option.title}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{option.description}</p>
                        <ul className="mt-3 space-y-1">
                          {option.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2 text-xs text-slate-500">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                          {content.actions.choose}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 'form' && selectedOption && selectedProduct && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    {selectedOption.title}
                  </p>
                  <p className="mt-1 text-sm text-emerald-800">{selectedOption.description}</p>
                  {selectedOption.benefits.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {selectedOption.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-xs text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">{content.form.title}</p>
                  <p className="text-xs text-slate-500">{content.form.description}</p>
                </div>

                <label className="block space-y-1">
                  <span className="text-xs font-medium text-slate-600">{content.form.fields.name}</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={content.form.placeholders.name}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-xs font-medium text-slate-600">{content.form.fields.email}</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={content.form.placeholders.email}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-xs font-medium text-slate-600">
                    {content.form.fields.company}
                  </span>
                  <input
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder={content.form.placeholders.company}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-xs font-medium text-slate-600">
                    {content.form.fields.message}
                  </span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={content.form.placeholders.message}
                    className="h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                {error && <p className="text-xs font-medium text-rose-500">{error}</p>}

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {content.actions.back}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{content.form.submit}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>{content.form.submit}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {step === 'success' && selectedProduct && selectedDemo && (
              <div className="space-y-4">
                <div className="rounded-xl bg-emerald-50 p-4 text-emerald-800">
                  <p className="text-sm font-semibold">{content.success.title}</p>
                  <p className="mt-1 text-sm">{content.success.description}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-emerald-600">
                    {content.success.contact}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {selectedDemo.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{selectedDemo.description}</p>
                  <button
                    type="button"
                    onClick={handleNavigateToDemo}
                    className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    {content.success.viewDemo}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => resetState()}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
                >
                  {content.success.newChat}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
      >
        <MessageCircle className="h-5 w-5" />
        <span>{isOpen ? content.launcher.active : content.launcher.label}</span>
      </button>
    </div>
  );
};

export default ChatbotWidget;
