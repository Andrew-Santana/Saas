import { useState } from 'react';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

const page = DEMO_PAGES_CONFIG.productShowcase;

// Dados mockados de produtos
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Kit Completo de Hidratação Capilar',
    category: 'Cabelos',
    price: 'R$ 189,90',
    originalPrice: 'R$ 249,90',
    image: '💆‍♀️',
    stock: 45,
    rating: 4.8,
    reviews: 234,
    featured: true,
    discount: 24,
  },
  {
    id: 2,
    name: 'Óleo de Barba Premium 50ml',
    category: 'Barba',
    price: 'R$ 79,90',
    originalPrice: null,
    image: '🧔',
    stock: 128,
    rating: 4.9,
    reviews: 567,
    featured: true,
    discount: 0,
  },
  {
    id: 3,
    name: 'Máscara Facial Vitamina C',
    category: 'Estética',
    price: 'R$ 145,00',
    originalPrice: 'R$ 190,00',
    image: '✨',
    stock: 34,
    rating: 4.7,
    reviews: 189,
    featured: false,
    discount: 24,
  },
  {
    id: 4,
    name: 'Esmalte em Gel UV - Coleção 2025',
    category: 'Unhas',
    price: 'R$ 42,90',
    originalPrice: null,
    image: '💅',
    stock: 210,
    rating: 4.6,
    reviews: 445,
    featured: false,
    discount: 0,
  },
  {
    id: 5,
    name: 'Shampoo Pet Hipoalergênico 500ml',
    category: 'Pet',
    price: 'R$ 68,90',
    originalPrice: 'R$ 89,90',
    image: '🐕',
    stock: 67,
    rating: 4.9,
    reviews: 892,
    featured: true,
    discount: 23,
  },
  {
    id: 6,
    name: 'Cera Modeladora Efeito Matte',
    category: 'Barba',
    price: 'R$ 52,90',
    originalPrice: null,
    image: '💇‍♂️',
    stock: 156,
    rating: 4.8,
    reviews: 323,
    featured: false,
    discount: 0,
  },
];

const SHOWCASE_STATS = [
  { label: 'Produtos Ativos', value: '248', change: '+18 novos' },
  { label: 'Vendas Este Mês', value: 'R$ 52.340', change: '+32.5%' },
  { label: 'Visualizações', value: '12.450', change: '+18.2%' },
  { label: 'Taxa de Conversão', value: '4.2%', change: '+0.8%' },
];

const ProductShowcaseDemoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'all'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <>
      <SEO title={page.title} description={page.description} keywords={page.keywords} url={page.url} />
      <div className="relative min-h-screen bg-gradient-to-br from-cyan-100 via-white to-sky-50 py-16">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-sky-300/25 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
              🛍️ Vitrine Digital
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Vitrine de Produtos
            </h1>
            <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
              Apresente seus produtos com vitrines digitais integradas, destaque lançamentos e aumente suas vendas online.
            </p>
          </header>

          {/* Stats */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SHOWCASE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {stat.label}
                </span>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <span className="mt-3 inline-flex text-xs text-cyan-600">{stat.change}</span>
              </div>
            ))}
          </section>

          {/* Produtos Destaque */}
          <section className="rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-8 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Produtos em Destaque</h2>
                <p className="text-sm text-slate-600">Mais vendidos e com melhores avaliações</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {MOCK_PRODUCTS.filter(p => p.featured).map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-cyan-200 bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
                >
                  {product.discount > 0 && (
                    <div className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 text-6xl">
                    {product.image}
                  </div>
                  <h3 className="font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-1 text-xs text-slate-600">{product.category}</p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span className="text-sm font-semibold text-slate-900">{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500">({product.reviews} avaliações)</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-xs text-slate-500 line-through">{product.originalPrice}</p>
                      )}
                    </div>
                    <button className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
                      Comprar
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-slate-600">
                    {product.stock} unidades em estoque
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Catálogo Completo */}
          <section className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">Catálogo Completo</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'Todos' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-cyan-300 hover:shadow-lg"
                >
                  {product.discount > 0 && (
                    <div className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-slate-50 text-5xl">
                    {product.image}
                  </div>
                  <h3 className="font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-1 text-xs text-slate-600">{product.category}</p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-sm">★</span>
                      <span className="text-sm font-semibold text-slate-900">{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500">({product.reviews})</span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <p className="text-xl font-bold text-slate-900">{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-xs text-slate-500 line-through">{product.originalPrice}</p>
                    )}
                  </div>

                  <button className="mt-4 w-full rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
                    Ver Detalhes
                  </button>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                Nenhum produto encontrado nesta categoria.
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductShowcaseDemoPage;
