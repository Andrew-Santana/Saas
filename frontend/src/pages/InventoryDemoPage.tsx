import { useState } from 'react';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

const page = DEMO_PAGES_CONFIG.inventory;

// Dados mockados de produtos
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Shampoo Hidratante 500ml',
    category: 'Cabelos',
    stock: 45,
    minStock: 20,
    price: 'R$ 89,90',
    supplier: 'BeautyPro',
    lastPurchase: '15/09/2025',
    status: 'ok',
  },
  {
    id: 2,
    name: 'Cera Modeladora Premium',
    category: 'Barba',
    stock: 8,
    minStock: 15,
    price: 'R$ 45,00',
    supplier: 'BarberShop Co.',
    lastPurchase: '10/09/2025',
    status: 'low',
  },
  {
    id: 3,
    name: 'Máscara Facial Argila',
    category: 'Estética',
    stock: 2,
    minStock: 10,
    price: 'R$ 125,00',
    supplier: 'SkinCare Brasil',
    lastPurchase: '01/09/2025',
    status: 'critical',
  },
  {
    id: 4,
    name: 'Óleo para Massagem 1L',
    category: 'Massagem',
    stock: 67,
    minStock: 25,
    price: 'R$ 78,50',
    supplier: 'Wellness Store',
    lastPurchase: '20/09/2025',
    status: 'ok',
  },
  {
    id: 5,
    name: 'Esmalte Gel UV - Vermelho',
    category: 'Unhas',
    stock: 12,
    minStock: 15,
    price: 'R$ 32,90',
    supplier: 'Nails Express',
    lastPurchase: '18/09/2025',
    status: 'low',
  },
  {
    id: 6,
    name: 'Pomada Cicatrizante Pet',
    category: 'Veterinária',
    stock: 89,
    minStock: 30,
    price: 'R$ 156,00',
    supplier: 'VetMed Pharma',
    lastPurchase: '22/09/2025',
    status: 'ok',
  },
];

const INVENTORY_STATS = [
  { label: 'Total de Produtos', value: '156', change: '+12 este mês' },
  { label: 'Valor do Estoque', value: 'R$ 28.450', change: '+8.2%' },
  { label: 'Itens em Falta', value: '8', change: '-3 resolvidos' },
  { label: 'Pedidos Pendentes', value: '5', change: '2 em trânsito' },
];

const InventoryDemoPage = () => {
  const [filter, setFilter] = useState<'all' | 'ok' | 'low' | 'critical'>('all');

  const filteredProducts = filter === 'all' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.status === filter);

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
    switch (status) {
      case 'ok':
        return 'Estoque OK';
      case 'low':
        return 'Estoque Baixo';
      case 'critical':
        return 'Crítico';
      default:
        return 'Desconhecido';
    }
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
              📦 Controle de Estoque
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Gerenciamento de Inventário
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              Controle completo do seu estoque com alertas inteligentes, reposição automática e análise de consumo.
            </p>
          </header>

          {/* Stats */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INVENTORY_STATS.map((stat) => (
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
              <h2 className="text-lg font-semibold text-slate-900">Produtos em Estoque</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter('ok')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === 'ok'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  OK
                </button>
                <button
                  onClick={() => setFilter('low')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === 'low'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Baixo
                </button>
                <button
                  onClick={() => setFilter('critical')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === 'critical'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Crítico
                </button>
              </div>
            </div>

            {/* Tabela Responsiva */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <th className="pb-3">Produto</th>
                    <th className="pb-3">Categoria</th>
                    <th className="pb-3">Estoque</th>
                    <th className="pb-3">Preço</th>
                    <th className="pb-3">Fornecedor</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Ações</th>
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
                            Última compra: {product.lastPurchase}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-slate-700">{product.category}</td>
                      <td className="py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{product.stock} un</p>
                          <p className="text-xs text-slate-500">Mín: {product.minStock}</p>
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
                          Repor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                Nenhum produto encontrado com este filtro.
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
                <h3 className="font-semibold text-slate-900">Estoque Crítico</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">3 itens</p>
              <p className="mt-1 text-sm text-slate-600">Necessitam reposição urgente</p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  ⚠️
                </div>
                <h3 className="font-semibold text-slate-900">Próximo ao Mínimo</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">5 itens</p>
              <p className="mt-1 text-sm text-slate-600">Atenção necessária em breve</p>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  ✅
                </div>
                <h3 className="font-semibold text-slate-900">Estoque Saudável</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">148 itens</p>
              <p className="mt-1 text-sm text-slate-600">Níveis adequados</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InventoryDemoPage;
