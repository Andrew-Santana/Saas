import { useEffect, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { usePing } from '../hooks/usePing';
import { useI18n } from '../hooks/useI18n';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

type DashboardMetric = {
  label: string;
  value: string;
  change: string;
};

// Dados mockados realistas
const MOCK_METRICS: DashboardMetric[] = [
  { label: 'Receita Mensal', value: 'R$ 45.280', change: '+18.2%' },
  { label: 'Novos Clientes', value: '1.245', change: '+24.5%' },
  { label: 'Taxa de Conversão', value: '3.84%', change: '+0.8%' },
  { label: 'Ticket Médio', value: 'R$ 156', change: '+5.2%' },
  { label: 'Assinaturas Ativas', value: '892', change: '+12.1%' },
  { label: 'Churn Rate', value: '2.1%', change: '-0.4%' },
];

const MOCK_RECENT_SALES = [
  { id: 1, client: 'Maria Silva', plan: 'Premium', value: 'R$ 299', date: '2 min atrás', status: 'Concluído' },
  { id: 2, client: 'João Santos', plan: 'Básico', value: 'R$ 99', date: '15 min atrás', status: 'Concluído' },
  { id: 3, client: 'Ana Costa', plan: 'Pro', value: 'R$ 199', date: '32 min atrás', status: 'Processando' },
  { id: 4, client: 'Pedro Lima', plan: 'Premium', value: 'R$ 299', date: '1h atrás', status: 'Concluído' },
  { id: 5, client: 'Carla Dias', plan: 'Básico', value: 'R$ 99', date: '2h atrás', status: 'Concluído' },
];

const MOCK_TOP_PLANS = [
  { name: 'Premium', subscriptions: 425, revenue: 'R$ 127.075', growth: '+23%' },
  { name: 'Pro', subscriptions: 312, revenue: 'R$ 62.088', growth: '+18%' },
  { name: 'Básico', subscriptions: 155, revenue: 'R$ 15.345', growth: '+12%' },
];

const MOCK_CHART_DATA = [
  { month: 'Jan', value: 32 },
  { month: 'Fev', value: 38 },
  { month: 'Mar', value: 35 },
  { month: 'Abr', value: 42 },
  { month: 'Mai', value: 48 },
  { month: 'Jun', value: 45 },
];

export const DashboardPage = () => {
  const { t, i18n } = useI18n();
  const metrics = useMemo(() => MOCK_METRICS, []);
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric>(metrics[0]);

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

  const page = DEMO_PAGES_CONFIG.dashboard;

  const maxChartValue = Math.max(...MOCK_CHART_DATA.map(d => d.value));

  return (
    <>
      <SEO title={page.title} description={page.description} keywords={page.keywords} url={page.url} />
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-16">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-emerald-300/40 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <header className="space-y-3">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              📊 Dashboard Analytics
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Dashboard Inteligente</h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              Acompanhe métricas em tempo real, analise tendências e tome decisões baseadas em dados concretos.
            </p>
          </header>

          {/* Métricas Principais */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => {
              const isActive = selectedMetric.label === metric.label;
              const isNegative = metric.change.startsWith('-');
              const isPositive = metric.change.startsWith('+');
              
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
                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        isPositive
                          ? 'bg-emerald-100 text-emerald-700'
                          : isNegative
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {isPositive && '↑'}
                      {isNegative && '↓'}
                      {metric.change}
                    </span>
                  </div>
                </button>
              );
            })}
          </section>

          {/* Gráfico e Status */}
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            {/* Gráfico de Crescimento */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Crescimento Mensal</h2>
                  <p className="mt-1 text-sm text-slate-600">Receita dos últimos 6 meses</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  +18.2%
                </span>
              </div>
              
              {/* Gráfico de Barras Simples */}
              <div className="flex items-end justify-between gap-3" style={{ height: '200px' }}>
                {MOCK_CHART_DATA.map((item) => {
                  const heightPercent = (item.value / maxChartValue) * 100;
                  return (
                    <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                      <div className="relative w-full">
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all duration-500 hover:from-emerald-600 hover:to-emerald-500"
                          style={{ height: `${heightPercent * 2}px` }}
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-700">
                            {item.value}k
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-600">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status da API */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Status da API</h2>
              </div>

              <div className="space-y-3 text-sm">
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500/60 border-t-transparent" />
                    <span>Verificando conexão...</span>
                  </div>
                )}
                {isError && (
                  <div className="flex items-center gap-2 text-rose-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Erro na conexão</span>
                  </div>
                )}
                {data && (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>API Online - {formattedTimestamp(data.timestamp)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Uptime</span>
                  <span className="font-semibold text-slate-900">99.9%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Latência Média</span>
                  <span className="font-semibold text-slate-900">45ms</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Requests/min</span>
                  <span className="font-semibold text-slate-900">1.2k</span>
                </div>
              </div>
            </div>
          </section>

          {/* Vendas Recentes e Top Planos */}
          <section className="grid gap-6 lg:grid-cols-2">
            {/* Vendas Recentes */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <h2 className="mb-6 text-lg font-semibold text-slate-900">Vendas Recentes</h2>
              <div className="space-y-4">
                {MOCK_RECENT_SALES.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                        {sale.client.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{sale.client}</p>
                        <p className="text-xs text-slate-500">
                          {sale.plan} • {sale.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{sale.value}</p>
                      <span
                        className={`text-xs ${
                          sale.status === 'Concluído' ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {sale.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Planos */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <h2 className="mb-6 text-lg font-semibold text-slate-900">Planos Mais Vendidos</h2>
              <div className="space-y-5">
                {MOCK_TOP_PLANS.map((plan, index) => (
                  <div key={plan.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900">{plan.name}</p>
                          <p className="text-xs text-slate-500">{plan.subscriptions} assinaturas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{plan.revenue}</p>
                        <span className="text-xs text-emerald-600">{plan.growth}</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                        style={{ width: `${(plan.subscriptions / 425) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
