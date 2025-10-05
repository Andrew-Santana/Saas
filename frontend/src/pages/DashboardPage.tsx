import { useEffect, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { usePing } from '../hooks/usePing';
import { useI18n } from '../hooks/useI18n';

type DashboardMetric = {
  label: string;
  value: string;
  change: string;
};

export const DashboardPage = () => {
  const { t, i18n } = useI18n();
  const metrics = useMemo(
    () => t('dashboardPage.metrics', { returnObjects: true }) as DashboardMetric[],
    [i18n.language, t]
  );
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric>(
    metrics[0] ?? { label: '', value: '', change: '' }
  );

  useEffect(() => {
    if (!metrics.length) {
      return;
    }

    const firstMetric = metrics[0];
    setSelectedMetric((current) =>
      current.label === firstMetric.label &&
      current.value === firstMetric.value &&
      current.change === firstMetric.change
        ? current
        : firstMetric
    );
  }, [metrics]);

  const { data, isLoading, isError } = usePing();
  const locale = i18n.resolvedLanguage || i18n.language;
  const formattedTimestamp = (timestamp: string) => new Date(timestamp).toLocaleString(locale);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-16">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-emerald-300/40 via-transparent to-transparent blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            SaaS Insights
          </span>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{t('dashboardPage.title')}</h1>
          <p className="max-w-3xl text-base text-slate-600 sm:text-lg">{t('dashboardPage.subtitle')}</p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => {
            const isActive = selectedMetric.label === metric.label;
            return (
              <button
                key={metric.label}
                type="button"
                onClick={() => setSelectedMetric(metric)}
                className={`relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 text-left shadow-lg backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-50 ${
                  isActive ? 'ring-2 ring-emerald-500/60' : ''
                }`}
              >
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {metric.label}
                </span>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{metric.value}</p>
                <span
                  className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    metric.change.startsWith('+')
                      ? 'bg-emerald-100 text-emerald-700'
                      : metric.change.startsWith('-')
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {metric.change}
                </span>
              </button>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  {selectedMetric.label}
                </span>
                <p className="mt-2 text-4xl font-bold text-slate-900">{selectedMetric.value}</p>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  selectedMetric.change.startsWith('+')
                    ? 'bg-emerald-100 text-emerald-700'
                    : selectedMetric.change.startsWith('-')
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {selectedMetric.change}
              </span>
            </div>
            <p className="mt-6 text-sm text-slate-600">{t('dashboardPage.subtitle')}</p>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{t('dashboardPage.status.title')}</h2>
            </div>

            <div className="space-y-3 text-sm">
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500/60 border-t-transparent" />
                  <span>{t('dashboardPage.status.loading')}</span>
                </div>
              )}
              {isError && (
                <div className="flex items-center gap-2 text-rose-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('dashboardPage.status.error')}</span>
                </div>
              )}
              {data && (
                <div className="flex items-center gap-2 text-emerald-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    {t('dashboardPage.status.success', {
                      message: data.message,
                      time: formattedTimestamp(data.timestamp),
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-sm text-emerald-900">
              <Trans
                i18nKey="dashboardPage.integration.description"
                values={{ endpoint: '/api/metrics', library: 'react-query' }}
                components={{
                  strong: <strong className="font-semibold" />,
                  code: <code className="rounded bg-white/70 px-1 py-0.5 font-mono text-xs" />,
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
