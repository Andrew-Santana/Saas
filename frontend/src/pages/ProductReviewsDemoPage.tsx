import { useState } from 'react';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

const page = DEMO_PAGES_CONFIG.productReviews;

// Dados mockados de avaliações
const MOCK_REVIEWS = [
  {
    id: 1,
    customer: 'Maria Silva',
    product: 'Kit Hidratação Capilar',
    rating: 5,
    date: '05/10/2025',
    verified: true,
    comment: 'Produto excelente! Meus cabelos ficaram muito mais macios e brilhantes. Super recomendo!',
    helpful: 45,
    images: 2,
  },
  {
    id: 2,
    customer: 'João Santos',
    product: 'Óleo de Barba Premium',
    rating: 5,
    date: '04/10/2025',
    verified: true,
    comment: 'Melhor óleo que já usei! Deixa a barba macia e com cheiro agradável o dia todo.',
    helpful: 32,
    images: 1,
  },
  {
    id: 3,
    customer: 'Ana Costa',
    product: 'Máscara Facial Vitamina C',
    rating: 4,
    date: '03/10/2025',
    verified: true,
    comment: 'Muito bom! Percebi diferença na pele após 2 semanas de uso. Só achei o preço um pouco alto.',
    helpful: 28,
    images: 0,
  },
  {
    id: 4,
    customer: 'Pedro Lima',
    product: 'Esmalte Gel UV',
    rating: 5,
    date: '02/10/2025',
    verified: false,
    comment: 'Duração incrível! Já faz 15 dias e continua perfeito.',
    helpful: 19,
    images: 3,
  },
  {
    id: 5,
    customer: 'Carla Dias',
    product: 'Shampoo Pet Hipoalergênico',
    rating: 5,
    date: '01/10/2025',
    verified: true,
    comment: 'Meu cachorro tem pele sensível e esse shampoo não causou nenhuma irritação. Amei!',
    helpful: 52,
    images: 2,
  },
  {
    id: 6,
    customer: 'Roberto Alves',
    product: 'Cera Modeladora',
    rating: 4,
    date: '30/09/2025',
    verified: true,
    comment: 'Boa fixação e efeito matte como prometido. Poderia ter mais produto no pote.',
    helpful: 15,
    images: 0,
  },
];

const REVIEWS_STATS = [
  { label: 'Avaliações Totais', value: '2.847', change: '+156 este mês' },
  { label: 'Nota Média', value: '4.8/5', change: '+0.2 pontos' },
  { label: 'Taxa de Resposta', value: '94%', change: '+5% este mês' },
  { label: 'Recomendariam', value: '96%', change: '+3%' },
];

const RATING_DISTRIBUTION = [
  { stars: 5, count: 2145, percentage: 75 },
  { stars: 4, count: 512, percentage: 18 },
  { stars: 3, count: 142, percentage: 5 },
  { stars: 2, count: 34, percentage: 1 },
  { stars: 1, count: 14, percentage: 1 },
];

const ProductReviewsDemoPage = () => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filteredReviews = filterRating === 'all'
    ? MOCK_REVIEWS
    : MOCK_REVIEWS.filter(r => r.rating === filterRating);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-amber-400' : 'text-slate-300'}>
        ★
      </span>
    ));
  };

  return (
    <>
      <SEO title={page.title} description={page.description} keywords={page.keywords} url={page.url} />
      <div className="relative min-h-screen bg-gradient-to-br from-amber-100 via-white to-amber-50 py-16">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-amber-300/25 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              ⭐ Avaliações de Clientes
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Sistema de Avaliações
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              Colete, gerencie e destaque avaliações dos clientes para fortalecer a reputação do seu negócio e aumentar conversões.
            </p>
          </header>

          {/* Stats */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS_STATS.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {stat.label}
                </span>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <span className="mt-3 inline-flex text-xs text-amber-600">{stat.change}</span>
              </div>
            ))}
          </section>

          {/* Distribuição de Notas e Avaliações */}
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            {/* Distribuição de Notas */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <h2 className="mb-6 text-lg font-semibold text-slate-900">Distribuição de Notas</h2>
              
              <div className="mb-8 text-center">
                <div className="mb-2 text-5xl font-bold text-slate-900">4.8</div>
                <div className="mb-2 flex justify-center text-2xl">
                  {renderStars(5)}
                </div>
                <p className="text-sm text-slate-600">Baseado em 2.847 avaliações</p>
              </div>

              <div className="space-y-3">
                {RATING_DISTRIBUTION.map((item) => (
                  <button
                    key={item.stars}
                    onClick={() => setFilterRating(item.stars)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${
                      filterRating === item.stars
                        ? 'border-amber-300 bg-amber-50/50'
                        : 'border-slate-200 bg-white/50 hover:border-amber-200 hover:bg-amber-50/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5 text-sm">
                        {renderStars(item.stars)}
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{item.count}</span>
                    </div>
                  </button>
                ))}
              </div>

              {filterRating !== 'all' && (
                <button
                  onClick={() => setFilterRating('all')}
                  className="mt-4 w-full rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  Mostrar Todas
                </button>
              )}
            </div>

            {/* Lista de Avaliações */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <h2 className="mb-6 text-lg font-semibold text-slate-900">
                Avaliações Recentes {filterRating !== 'all' && `(${filterRating} estrelas)`}
              </h2>
              
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-slate-100 bg-white/50 p-6 transition hover:border-amber-200 hover:bg-amber-50/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-semibold text-amber-700">
                          {review.customer.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-900">{review.customer}</p>
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                ✓ Verificado
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                    </div>

                    <p className="mt-3 font-medium text-slate-700">{review.product}</p>
                    <p className="mt-2 text-sm text-slate-600">{review.comment}</p>

                    <div className="mt-4 flex items-center gap-4">
                      {review.images > 0 && (
                        <span className="text-xs text-slate-500">
                          📷 {review.images} {review.images === 1 ? 'foto' : 'fotos'}
                        </span>
                      )}
                      <button className="text-xs text-slate-600 hover:text-amber-700">
                        👍 Útil ({review.helpful})
                      </button>
                      <button className="text-xs text-slate-600 hover:text-amber-700">
                        Responder
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredReviews.length === 0 && (
                <div className="py-12 text-center text-slate-500">
                  Nenhuma avaliação encontrada com este filtro.
                </div>
              )}
            </div>
          </section>

          {/* Insights */}
          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  💚
                </div>
                <h3 className="font-semibold text-slate-900">Pontos Fortes</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Qualidade do produto (89%)</li>
                <li>• Atendimento ao cliente (92%)</li>
                <li>• Entrega rápida (87%)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  💡
                </div>
                <h3 className="font-semibold text-slate-900">Oportunidades</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Melhorar embalagem (12%)</li>
                <li>• Mais opções de cores (8%)</li>
                <li>• Preço competitivo (15%)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                  📊
                </div>
                <h3 className="font-semibold text-slate-900">Tendências</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• ↑ Avaliações com foto +45%</li>
                <li>• ↑ Nota média +0.2 pontos</li>
                <li>• ↑ Taxa de recompra +12%</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductReviewsDemoPage;
