import React from 'react';
import { ensureArray } from '../utils/ensureArray';

export type DemoPageContent = {
  hero?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    description?: string;
  };
  stats?: Array<{
    label?: string;
    value?: string;
    change?: string;
  }>;
  highlights?: {
    title?: string;
    items?: Array<{
      title?: string;
      description?: string;
    }>;
  };
  workflow?: {
    title?: string;
    steps?: string[];
  };
  cta?: {
    title?: string;
    description?: string;
    primary?: string;
    secondary?: string;
  };
};

export type DemoPageTemplateAccent = 'emerald' | 'violet' | 'cyan' | 'amber';

const accentConfigs: Record<DemoPageTemplateAccent, {
  gradient: string;
  overlay: string;
  badge: string;
  primaryButton: string;
  secondaryButton: string;
  highlightNumber: string;
  highlightNumberBg: string;
  positive: string;
  negative: string;
  neutral: string;
}> = {
  emerald: {
    gradient: 'from-emerald-100 via-white to-emerald-50',
    overlay: 'bg-gradient-to-b from-emerald-300/30 via-transparent to-transparent blur-3xl',
    badge: 'bg-emerald-100 text-emerald-700',
    primaryButton: 'bg-emerald-600 text-white hover:bg-emerald-700',
    secondaryButton: 'border border-emerald-200 text-emerald-700 hover:bg-emerald-50',
    highlightNumber: 'text-emerald-700',
    highlightNumberBg: 'bg-emerald-100',
    positive: 'bg-emerald-100 text-emerald-700',
    negative: 'bg-rose-100 text-rose-700',
    neutral: 'bg-amber-100 text-amber-700',
  },
  violet: {
    gradient: 'from-violet-100 via-white to-fuchsia-50',
    overlay: 'bg-gradient-to-b from-fuchsia-300/25 via-transparent to-transparent blur-3xl',
    badge: 'bg-violet-100 text-violet-700',
    primaryButton: 'bg-violet-600 text-white hover:bg-violet-700',
    secondaryButton: 'border border-violet-200 text-violet-700 hover:bg-violet-50',
    highlightNumber: 'text-violet-700',
    highlightNumberBg: 'bg-violet-100',
    positive: 'bg-violet-100 text-violet-700',
    negative: 'bg-rose-100 text-rose-700',
    neutral: 'bg-amber-100 text-amber-700',
  },
  cyan: {
    gradient: 'from-cyan-100 via-white to-sky-50',
    overlay: 'bg-gradient-to-b from-sky-300/25 via-transparent to-transparent blur-3xl',
    badge: 'bg-cyan-100 text-cyan-700',
    primaryButton: 'bg-cyan-600 text-white hover:bg-cyan-700',
    secondaryButton: 'border border-cyan-200 text-cyan-700 hover:bg-cyan-50',
    highlightNumber: 'text-cyan-700',
    highlightNumberBg: 'bg-cyan-100',
    positive: 'bg-cyan-100 text-cyan-700',
    negative: 'bg-rose-100 text-rose-700',
    neutral: 'bg-amber-100 text-amber-700',
  },
  amber: {
    gradient: 'from-amber-100 via-white to-amber-50',
    overlay: 'bg-gradient-to-b from-amber-300/25 via-transparent to-transparent blur-3xl',
    badge: 'bg-amber-100 text-amber-700',
    primaryButton: 'bg-amber-500 text-slate-900 hover:bg-amber-600',
    secondaryButton: 'border border-amber-200 text-amber-700 hover:bg-amber-50',
    highlightNumber: 'text-amber-700',
    highlightNumberBg: 'bg-amber-100',
    positive: 'bg-emerald-100 text-emerald-700',
    negative: 'bg-rose-100 text-rose-700',
    neutral: 'bg-amber-200 text-amber-800',
  },
};

interface DemoPageTemplateProps {
  content: DemoPageContent;
  accent?: DemoPageTemplateAccent;
}

const DemoPageTemplate: React.FC<DemoPageTemplateProps> = ({ content, accent = 'emerald' }) => {
  const styles = accentConfigs[accent];

  const hero = content.hero ?? {};
  const stats = ensureArray(content.stats).filter((item) => item && (item.label || item.value));
  const highlightItems = ensureArray(content.highlights?.items).filter((item) => item && (item.title || item.description));
  const workflowSteps = ensureArray(content.workflow?.steps).filter(Boolean);
  const cta = content.cta ?? {};

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${styles.gradient} py-16`}>
      <div className={`pointer-events-none absolute inset-x-0 -top-40 h-72 ${styles.overlay}`} />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <header className="space-y-4">
          {hero.badge && (
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}>
              {hero.badge}
            </span>
          )}
          {hero.title && (
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{hero.title}</h1>
          )}
          {hero.subtitle && <p className="max-w-3xl text-base text-slate-600 sm:text-lg">{hero.subtitle}</p>}
          {hero.description && <p className="max-w-3xl text-sm text-slate-500 sm:text-base">{hero.description}</p>}
        </header>

        {stats.length > 0 && (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((metric, index) => (
              <div
                key={`${metric.label}-${index}`}
                className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 text-left shadow-lg backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {metric.label}
                </span>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{metric.value}</p>
            {metric.change && (
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  metric.change.trim().startsWith('+')
                    ? styles.positive
                    : metric.change.trim().startsWith('-')
                    ? styles.negative
                    : styles.neutral
                }`}
              >
                {metric.change}
              </span>
            )}
              </div>
            ))}
          </section>
        )}

        {(highlightItems.length > 0 || workflowSteps.length > 0) && (
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            {highlightItems.length > 0 && (
              <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
                {content.highlights?.title && (
                  <h2 className="text-lg font-semibold text-slate-900">{content.highlights.title}</h2>
                )}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {highlightItems.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow"
                    >
                      <div className="mb-3 inline-flex items-center justify-center">
                        <span
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${styles.highlightNumberBg} ${styles.highlightNumber}`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      {item.title && <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>}
                      {item.description && <p className="mt-2 text-sm text-slate-600">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {workflowSteps.length > 0 && (
              <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
                {content.workflow?.title && (
                  <h2 className="text-lg font-semibold text-slate-900">{content.workflow.title}</h2>
                )}
                <ol className="mt-6 space-y-4">
                  {workflowSteps.map((step, index) => (
                    <li key={`${step}-${index}`} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${styles.highlightNumberBg} ${styles.highlightNumber}`}>
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        )}

        {(cta.title || cta.description) && (
          <section className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
            {cta.title && <h2 className="text-xl font-semibold text-slate-900">{cta.title}</h2>}
            {cta.description && <p className="mt-3 text-sm text-slate-600 sm:text-base">{cta.description}</p>}

            {(cta.primary || cta.secondary) && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {cta.primary && (
                  <button type="button" className={`rounded-full px-6 py-3 text-sm font-semibold transition ${styles.primaryButton}`}>
                    {cta.primary}
                  </button>
                )}
                {cta.secondary && (
                  <button type="button" className={`rounded-full px-6 py-3 text-sm font-semibold transition ${styles.secondaryButton}`}>
                    {cta.secondary}
                  </button>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default DemoPageTemplate;
