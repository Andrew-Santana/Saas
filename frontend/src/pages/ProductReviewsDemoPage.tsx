import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';
import { useI18n } from '../hooks/useI18n';
import { MOCK_PRODUCT_REVIEWS, MOCK_RATING_DISTRIBUTION } from '../data/mockData';

const page = DEMO_PAGES_CONFIG.productReviews;

type ReviewStat = {
  label: string;
  value: string;
  change: string;
};

const ProductReviewsDemoPage = () => {
  const { t } = useI18n();
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const stats = useMemo(
    () => t('productReviewsPage.stats', { returnObjects: true }) as ReviewStat[],
    [t]
  );

  const filteredReviews =
    filterRating === 'all'
      ? MOCK_PRODUCT_REVIEWS
      : MOCK_PRODUCT_REVIEWS.filter((r) => r.rating === filterRating);

  return (
    <>
      <SEO title={page.title} description={page.description} keywords={page.keywords} url={page.url} />
      <div className="relative min-h-screen bg-gradient-to-br from-amber-100 via-white to-orange-50 py-16">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-amber-300/30 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              {t('productReviewsPage.badge')}
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {t('productReviewsPage.title')}
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              {t('productReviewsPage.subtitle')}
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
                <span className="mt-3 inline-flex text-xs text-amber-600">{stat.change}</span>
              </div>
            ))}
          </section>

          {/* Distribuição de Avaliações e Lista */}
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            {/* Distribuição */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <h2 className="mb-6 text-lg font-semibold text-slate-900">{t('productReviewsPage.distribution.title')}</h2>
              <div className="space-y-4">
                {MOCK_RATING_DISTRIBUTION.map((rating) => (
                  <button
                    key={rating.stars}
                    onClick={() => setFilterRating(rating.stars)}
                    className={`w-full transition ${
                      filterRating === rating.stars ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{rating.stars}⭐</span>
                        <span className="text-slate-600">({rating.count.toLocaleString()})</span>
                      </div>
                      <span className="font-semibold text-slate-900">{rating.percentage}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setFilterRating('all')}
                className={`mt-6 w-full rounded-full py-3 text-sm font-medium transition ${
                  filterRating === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t('productReviewsPage.distribution.showAll')}
              </button>
            </div>

            {/* Lista de Avaliações */}
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">{t('productReviewsPage.list.title')}</h2>
                {filterRating !== 'all' && (
                  <span className="text-sm text-slate-600">
                    {filteredReviews.length} {t('productReviewsPage.list.resultsCount')}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-slate-100 bg-white/50 p-6 shadow transition hover:border-amber-200 hover:shadow-md"
                  >
                    {/* Cabeçalho da avaliação */}
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{review.customer}</span>
                          {review.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                              ✓ {t('productReviewsPage.list.verified')}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{review.product}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i}>{i < review.rating ? '⭐' : '☆'}</span>
                        ))}
                      </div>
                    </div>

                    {/* Comentário */}
                    <p className="text-sm text-slate-700">{review.comment}</p>

                    {/* Rodapé */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{review.date}</span>
                        {review.images > 0 && (
                          <span className="flex items-center gap-1">
                            📷 {review.images} {t('productReviewsPage.list.photos')}
                          </span>
                        )}
                      </div>
                      <button className="flex items-center gap-1 text-xs text-slate-600 hover:text-amber-600">
                        👍 {t('productReviewsPage.list.helpful')} ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredReviews.length === 0 && (
                <div className="py-12 text-center text-slate-500">
                  {t('productReviewsPage.list.noResults')}
                </div>
              )}
            </div>
          </section>

          {/* Insights */}
          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  🎯
                </div>
                <h3 className="font-semibold text-slate-900">{t('productReviewsPage.insights.topProducts.title')}</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">{t('productReviewsPage.insights.topProducts.value')}</p>
              <p className="mt-1 text-sm text-slate-600">{t('productReviewsPage.insights.topProducts.description')}</p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  💬
                </div>
                <h3 className="font-semibold text-slate-900">{t('productReviewsPage.insights.responseTime.title')}</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">{t('productReviewsPage.insights.responseTime.value')}</p>
              <p className="mt-1 text-sm text-slate-600">{t('productReviewsPage.insights.responseTime.description')}</p>
            </div>

            <div className="rounded-3xl border border-violet-200 bg-violet-50/50 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  📈
                </div>
                <h3 className="font-semibold text-slate-900">{t('productReviewsPage.insights.growth.title')}</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">{t('productReviewsPage.insights.growth.value')}</p>
              <p className="mt-1 text-sm text-slate-600">{t('productReviewsPage.insights.growth.description')}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductReviewsDemoPage;
