import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';
import { useI18n } from '../hooks/useI18n';
import { MOCK_INVENTORY_PRODUCTS } from '../data/mockData';

const page = DEMO_PAGES_CONFIG.inventory;

type InventoryStat = {
  label: string;
  value: string;
  change: string;
};

const InventoryDemoPage = () => {
  const { t } = useI18n();
  const [filter, setFilter] = useState<'all' | 'ok' | 'low' | 'critical'>('all');

  const stats = useMemo(
    () => t('inventoryManagementPage.stats', { returnObjects: true }) as InventoryStat[],
    [t]
  );

  const filteredProducts = filter === 'all' 
    ? MOCK_INVENTORY_PRODUCTS 
    : MOCK_INVENTORY_PRODUCTS.filter(p => p.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return 'bg-emerald-100 text-emerald-700';
      case 'low':
        return 'bg-amber-100 text-amber-700';
      case 'critical':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    return t(`inventoryManagementPage.table.statuses.${status}`);
  };

  return (
    <>
      <SEO title={page.title} description={page.description} keywords={page.keywords} url={page.url} />
      <div className="relative min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-50 py-16">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-emerald-300/30 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {t('inventoryManagementPage.badge')}
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {t('inventoryManagementPage.title')}
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              {t('inventoryManagementPage.subtitle')}
            </p>
          </header>

          {/* Stats */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {stat.label}
                </span>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <span className="mt-3 inline-flex text-xs text-slate-600">{stat.change}</span>
              </div>
            ))}
          </section>

          {/* Filtros e Tabela */}
          <section className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
            {/* Filtros */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">{t('inventoryManagementPage.table.title')}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t('inventoryManagementPage.table.filters.all')}
                </button>
                <button
                  onClick={() => setFilter('ok')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === 'ok'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t('inventoryManagementPage.table.filters.ok')}
                </button>
                <button
                  onClick={() => setFilter('low')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === 'low'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t('inventoryManagementPage.table.filters.low')}
                </button>
                <button
                  onClick={() => setFilter('critical')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === 'critical'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t('inventoryManagementPage.table.filters.critical')}
                </button>
              </div>
            </div>

            {/* Tabela Responsiva */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <th className="pb-3">{t('inventoryManagementPage.table.columns.product')}</th>
                    <th className="pb-3">{t('inventoryManagementPage.table.columns.category')}</th>
                    <th className="pb-3">{t('inventoryManagementPage.table.columns.stock')}</th>
                    <th className="pb-3">{t('inventoryManagementPage.table.columns.price')}</th>
                    <th className="pb-3">{t('inventoryManagementPage.table.columns.supplier')}</th>
                    <th className="pb-3">{t('inventoryManagementPage.table.columns.status')}</th>
                    <th className="pb-3">{t('inventoryManagementPage.table.columns.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="text-sm transition hover:bg-emerald-50/30"
                    >
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500">
                            {t('inventoryManagementPage.table.lastPurchase')}: {product.lastPurchase}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-slate-700">{product.category}</td>
                      <td className="py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{product.stock} {t('inventoryManagementPage.table.units')}</p>
                          <p className="text-xs text-slate-500">{t('inventoryManagementPage.table.minStock')}: {product.minStock}</p>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-slate-900">{product.price}</td>
                      <td className="py-4 text-slate-700">{product.supplier}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                            product.status
                          )}`}
                        >
                          {getStatusText(product.status)}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition">
                          {t('inventoryManagementPage.table.actions.reorder')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                {t('inventoryManagementPage.table.noResults')}
              </div>
            )}
          </section>

          {/* Alertas */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  🚨
                </div>
                <h3 className="font-semibold text-slate-900">{t('inventoryManagementPage.alerts.critical.title')}</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">{t('inventoryManagementPage.alerts.critical.value')}</p>
              <p className="mt-1 text-sm text-slate-600">{t('inventoryManagementPage.alerts.critical.description')}</p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  ⚠️
                </div>
                <h3 className="font-semibold text-slate-900">{t('inventoryManagementPage.alerts.low.title')}</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">{t('inventoryManagementPage.alerts.low.value')}</p>
              <p className="mt-1 text-sm text-slate-600">{t('inventoryManagementPage.alerts.low.description')}</p>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  ✅
                </div>
                <h3 className="font-semibold text-slate-900">{t('inventoryManagementPage.alerts.healthy.title')}</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">{t('inventoryManagementPage.alerts.healthy.value')}</p>
              <p className="mt-1 text-sm text-slate-600">{t('inventoryManagementPage.alerts.healthy.description')}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InventoryDemoPage;
