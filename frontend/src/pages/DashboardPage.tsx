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
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric>(metrics[0] ?? { label: '', value: '', change: '' });

  useEffect(() => {
    if (metrics.length) {
      setSelectedMetric(metrics[0]);
    }
  }, [metrics]);

  const { data, isLoading, isError } = usePing();
  const locale = i18n.resolvedLanguage || i18n.language;
  const formattedTimestamp = (timestamp: string) =>
    new Date(timestamp).toLocaleString(locale);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">{t('dashboardPage.title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('dashboardPage.subtitle')}
        </p>
      </header>
      
      <section className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <button
            key={metric.label}
            onClick={() => setSelectedMetric(metric)}
            className={`card-premium hover-lift ${
              selectedMetric.label === metric.label 
                ? 'border-gold/40 bg-gradient-to-br from-gold/5 to-transparent shadow-large' 
                : 'border-border'
            }`}
          >
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{metric.label}</span>
            <p className="mt-2 text-2xl font-semibold text-foreground">{metric.value}</p>
            <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
              metric.change.startsWith('+') 
                ? 'bg-success/10 text-success' 
                : metric.change.startsWith('-')
                ? 'bg-destructive/10 text-destructive'
                : 'bg-gold/10 text-gold'
            }`}>
              {metric.change}
            </span>
          </button>
        ))}
      </section>
      
      <section className="card-premium">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-medium text-foreground">{t('dashboardPage.status.title')}</p>
        </div>
        
        <div className="mt-3 text-sm">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
              <span>{t('dashboardPage.status.loading')}</span>
            </div>
          )}
          {isError && (
            <div className="flex items-center gap-2 text-destructive">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('dashboardPage.status.error')}</span>
            </div>
          )}
          {data && (
            <div className="flex items-center gap-2 text-success">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">
                {t('dashboardPage.status.success', {
                  message: data.message,
                  time: formattedTimestamp(data.timestamp),
                })}
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <Trans
              i18nKey="dashboardPage.integration.description"
              values={{ endpoint: '/api/metrics', library: 'react-query' }}
              components={{
                strong: <strong className="font-semibold text-foreground" />,
                code: <code className="bg-background px-1 py-0.5 rounded text-gold" />,
              }}
            />
          </p>
        </div>
      </section>
    </div>
  );
};
