import { useState } from 'react';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

const page = DEMO_PAGES_CONFIG.newsletter;

// Dados mockados de campanhas
const MOCK_CAMPAIGNS = [
  {
    id: 1,
    name: 'Promoção de Verão 2025',
    subject: '☀️ Descontos Especiais de Verão - Até 40% OFF',
    sent: 8450,
    opened: 4225,
    clicked: 1268,
    status: 'sent',
    date: '02/10/2025',
    openRate: 50,
    clickRate: 15,
  },
  {
    id: 2,
    name: 'Newsletter Mensal - Outubro',
    subject: '📰 Novidades do Mês: Produtos e Dicas',
    sent: 0,
    opened: 0,
    clicked: 0,
    status: 'draft',
    date: '07/10/2025',
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 3,
    name: 'Recuperação de Clientes Inativos',
    subject: '💝 Sentimos sua falta! Oferta Especial Inside',
    sent: 2340,
    opened: 1638,
    clicked: 702,
    status: 'sent',
    date: '25/09/2025',
    openRate: 70,
    clickRate: 30,
  },
  {
    id: 4,
    name: 'Black Friday Early Access',
    subject: '🔥 Acesso Antecipado Black Friday - Só para Você!',
    sent: 12890,
    opened: 9023,
    clicked: 3628,
    status: 'sent',
    date: '28/09/2025',
    openRate: 70,
    clickRate: 28,
  },
];

const NEWSLETTER_STATS = [
  { label: 'Total de Assinantes', value: '12.450', change: '+18.2%' },
  { label: 'Taxa de Abertura Média', value: '58.5%', change: '+5.2%' },
  { label: 'Taxa de Cliques', value: '22.3%', change: '+3.8%' },
  { label: 'Campanhas Ativas', value: '8', change: '2 agendadas' },
];

const AUDIENCE_SEGMENTS = [
  { name: 'Clientes VIP', count: 892, percentage: 7, color: 'violet' },
  { name: 'Compradores Recentes', count: 3245, percentage: 26, color: 'emerald' },
  { name: 'Inativos (90+ dias)', count: 2340, percentage: 19, color: 'amber' },
  { name: 'Novos Assinantes', count: 1567, percentage: 13, color: 'cyan' },
  { name: 'Lista Geral', count: 4406, percentage: 35, color: 'slate' },
];

const NewsletterDemoPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(MOCK_CAMPAIGNS[0]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-emerald-100 text-emerald-700';
      case 'draft':
        return 'bg-slate-100 text-slate-700';
      case 'scheduled':
        return 'bg-cyan-100 text-cyan-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Enviada';
      case 'draft':
        return 'Rascunho';
      case 'scheduled':
        return 'Agendada';
      default:
        return status;
    }
  };

  const getSegmentColor = (color: string) => {
    const colors: Record<string, string> = {
      violet: 'from-violet-500 to-fuchsia-500',
      emerald: 'from-emerald-500 to-teal-500',
      amber: 'from-amber-500 to-orange-500',
      cyan: 'from-cyan-500 to-blue-500',
      slate: 'from-slate-500 to-slate-600',
    };
    return colors[color] || colors.slate;
  };

  return (
    <>
      <SEO title={page.title} description={page.description} keywords={page.keywords} url={page.url} />
      <div className="relative min-h-screen bg-gradient-to-br from-violet-100 via-white to-fuchsia-50 py-16">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-fuchsia-300/25 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
              📧 Email Marketing
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Newsletter e Campanhas
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              Crie newsletters segmentadas, automações de email e campanhas de retenção para fidelizar seus clientes.
            </p>
          </header>

          {/* Stats */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {NEWSLETTER_STATS.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {stat.label}
                </span>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <span className="mt-3 inline-flex text-xs text-violet-600">{stat.change}</span>
              </div>
            ))}
          </section>

          {/* Campanhas e Detalhes */}
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            {/* Lista de Campanhas */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <h2 className="mb-6 text-lg font-semibold text-slate-900">Campanhas Recentes</h2>
              <div className="space-y-3">
                {MOCK_CAMPAIGNS.map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedCampaign.id === campaign.id
                        ? 'border-violet-300 bg-violet-50/50'
                        : 'border-slate-100 bg-white/50 hover:border-violet-200 hover:bg-violet-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{campaign.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{campaign.subject}</p>
                        <p className="mt-2 text-xs text-slate-600">{campaign.date}</p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                          campaign.status
                        )}`}
                      >
                        {getStatusText(campaign.status)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detalhes da Campanha */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <h2 className="mb-6 text-lg font-semibold text-slate-900">
                Desempenho da Campanha
              </h2>
              
              <div className="mb-6 rounded-2xl border border-violet-100 bg-violet-50/30 p-6">
                <h3 className="font-semibold text-slate-900">{selectedCampaign.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{selectedCampaign.subject}</p>
                <p className="mt-2 text-xs text-slate-500">Enviado em {selectedCampaign.date}</p>
              </div>

              {selectedCampaign.status === 'sent' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-slate-100 bg-white/50 p-4 text-center">
                      <p className="text-xs text-slate-600">Enviados</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {selectedCampaign.sent.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-violet-200 bg-violet-50/30 p-4 text-center">
                      <p className="text-xs text-violet-700">Abertos</p>
                      <p className="mt-2 text-2xl font-bold text-violet-900">
                        {selectedCampaign.opened.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4 text-center">
                      <p className="text-xs text-emerald-700">Cliques</p>
                      <p className="mt-2 text-2xl font-bold text-emerald-900">
                        {selectedCampaign.clicked.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-700">Taxa de Abertura</span>
                        <span className="font-semibold text-slate-900">
                          {selectedCampaign.openRate}%
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                          style={{ width: `${selectedCampaign.openRate}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-700">Taxa de Cliques</span>
                        <span className="font-semibold text-slate-900">
                          {selectedCampaign.clickRate}%
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                          style={{ width: `${selectedCampaign.clickRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 text-center">
                  <p className="text-sm text-slate-600">
                    Esta campanha ainda não foi enviada. Estatísticas estarão disponíveis após o envio.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Segmentação de Audiência */}
          <section className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">Segmentação de Audiência</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {AUDIENCE_SEGMENTS.map((segment) => (
                <div
                  key={segment.name}
                  className="rounded-2xl border border-white/60 bg-white/50 p-5 shadow transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${getSegmentColor(
                      segment.color
                    )} text-white shadow-lg`}
                  >
                    <span className="text-lg font-bold">{segment.percentage}%</span>
                  </div>
                  <h3 className="font-semibold text-slate-900">{segment.name}</h3>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {segment.count.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">assinantes</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default NewsletterDemoPage;
