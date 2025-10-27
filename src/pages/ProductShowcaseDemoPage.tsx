import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';
import { useI18n } from '../hooks/useI18n';
import { MOCK_SHOWCASE_PRODUCTS } from '../data/mockData';

const page = DEMO_PAGES_CONFIG.productShowcase;

type ShowcaseStat = {
  label: string;
  value: string;
  change: string;
};

const ProductShowcaseDemoPage = () => {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const stats = useMemo(
    () => t('productShowcasePage.stats', { returnObjects: true }) as ShowcaseStat[],
    [t]
  );

  const categories = ['all', ...Array.from(new Set(MOCK_SHOWCASE_PRODUCTS.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'all'
      ? MOCK_SHOWCASE_PRODUCTS
      : MOCK_SHOWCASE_PRODUCTS.filter((p) => p.category === selectedCategory);

  const featuredProducts = MOCK_SHOWCASE_PRODUCTS.filter((p) => p.featured);

  return (
    <>
      <SEO title={page.title} description={page.description} keywords={page.keywords} url={page.url} />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-50 py-16">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-blue-300/30 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {t('productShowcasePage.badge')}
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {t('productShowcasePage.title')}
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              {t('productShowcasePage.subtitle')}
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
                <span className="mt-3 inline-flex text-xs text-blue-600">{stat.change}</span>
              </div>
            ))}
          </section>

          {/* Produtos em Destaque */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{t('productShowcasePage.featured.title')}</h2>
              <span className="text-xs text-slate-500">
                {featuredProducts.length} {t('productShowcasePage.featured.productsCount')}
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  {product.discount > 0 && (
                    <div className="absolute right-4 top-4 z-10 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="mb-4 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-50 text-6xl">
                    {product.image}
                  </div>
                  <h3 className="font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{product.category}</p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      <span>⭐</span>
                      <span className="text-sm font-medium text-slate-900">{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500">({product.reviews} {t('productShowcasePage.card.reviews')})</span>
                  </div>

                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-slate-600">
                    {t('productShowcasePage.card.inStock')}: {product.stock} {t('productShowcasePage.card.units')}
                  </p>

                  <button className="mt-4 w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-sm font-medium text-white transition hover:shadow-lg">
                    {t('productShowcasePage.card.viewDetails')}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Catálogo Completo */}
          <section className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">{t('productShowcasePage.catalog.title')}</h2>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category === 'all'
                      ? t('productShowcasePage.catalog.categories.all')
                      : category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white/50 p-5 shadow transition hover:border-blue-200 hover:shadow-lg"
                >
                  {product.discount > 0 && (
                    <div className="absolute right-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="mb-3 flex h-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-4xl">
                    {product.image}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-1 text-xs text-slate-600">{product.category}</p>

                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <span className="text-amber-500">⭐</span>
                    <span className="font-medium text-slate-900">{product.rating}</span>
                    <span className="text-slate-400">({product.reviews})</span>
                  </div>

                  <div className="mt-3 flex items-end gap-1.5">
                    <span className="text-lg font-bold text-blue-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>

                  <button className="mt-3 w-full rounded-full bg-blue-600 py-2 text-xs font-medium text-white transition hover:bg-blue-700">
                    {t('productShowcasePage.card.viewDetails')}
                  </button>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                {t('productShowcasePage.catalog.noResults')}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductShowcaseDemoPage;
