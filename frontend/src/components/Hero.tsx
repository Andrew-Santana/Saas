import { useState } from 'react';
import {
  Calendar,
  PlayCircle,
  Smartphone,
  Monitor,
  X,
  Scissors,
  PawPrint,
  ChevronRight,
  LayoutDashboard,
  Boxes,
  Mail,
  ShoppingBag,
  Star
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../hooks/useAnalytics';
import { ROUTES, ANALYTICS_EVENTS } from '../constants';
import type { DemoPage } from '../types';

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const demos: DemoPage[] = [
    {
      id: 'salao',
      title: t('agendaPro.demoModal.demos.salao.title'),
      description: t('agendaPro.demoModal.demos.salao.description'),
      icon: Scissors,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      features: t('agendaPro.demoModal.demos.salao.features', { returnObjects: true }) || [],
      url: ROUTES.DEMO_SALAO,
      keywords: 'agendamento salão beleza, software salão, gestão salão de beleza'
    },
    {
      id: 'barbearia',
      title: t('agendaPro.demoModal.demos.barbearia.title'),
      description: t('agendaPro.demoModal.demos.barbearia.description'),
      icon: Monitor,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: t('agendaPro.demoModal.demos.barbearia.features', { returnObjects: true }) || [],
      url: ROUTES.DEMO_BARBEARIA,
      keywords: 'agendamento barbearia, software barbearia, gestão barbearia'
    },
    {
      id: 'veterinaria',
      title: t('agendaPro.demoModal.demos.veterinaria.title'),
      description: t('agendaPro.demoModal.demos.veterinaria.description'),
      icon: PawPrint,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      features: t('agendaPro.demoModal.demos.veterinaria.features', { returnObjects: true }) || [],
      url: ROUTES.DEMO_VETERINARIA,
      keywords: 'agendamento veterinária, software veterinária, gestão clínica veterinária'
    },
    {
      id: 'dashboard',
      title: t('agendaPro.demoModal.demos.dashboard.title'),
      description: t('agendaPro.demoModal.demos.dashboard.description'),
      icon: LayoutDashboard,
      color: 'from-slate-600 to-slate-900',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      features: t('agendaPro.demoModal.demos.dashboard.features', { returnObjects: true }) || [],
      url: ROUTES.DEMO_DASHBOARD,
      keywords: 'dashboard salão de beleza, kpis estética, relatórios agenda pro, analytics spa'
    },
    {
      id: 'inventory',
      title: t('agendaPro.demoModal.demos.inventory.title'),
      description: t('agendaPro.demoModal.demos.inventory.description'),
      icon: Boxes,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      features: t('agendaPro.demoModal.demos.inventory.features', { returnObjects: true }) || [],
      url: ROUTES.DEMO_INVENTORY,
      keywords: 'controle estoque salão, inventário spa, gestão produtos estética, agenda pro estoque'
    },
    {
      id: 'newsletter',
      title: t('agendaPro.demoModal.demos.newsletter.title'),
      description: t('agendaPro.demoModal.demos.newsletter.description'),
      icon: Mail,
      color: 'from-purple-500 to-fuchsia-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      features: t('agendaPro.demoModal.demos.newsletter.features', { returnObjects: true }) || [],
      url: ROUTES.DEMO_NEWSLETTER,
      keywords: 'newsletter salão, automação email estética, campanhas agenda pro, marketing spa'
    },
    {
      id: 'productShowcase',
      title: t('agendaPro.demoModal.demos.productShowcase.title'),
      description: t('agendaPro.demoModal.demos.productShowcase.description'),
      icon: ShoppingBag,
      color: 'from-cyan-500 to-sky-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      features: t('agendaPro.demoModal.demos.productShowcase.features', { returnObjects: true }) || [],
      url: ROUTES.DEMO_PRODUCT_SHOWCASE,
      keywords: 'vitrine digital salão, catálogo produtos agenda pro, venda cruzada spa, ecommerce estética'
    },
    {
      id: 'productReviews',
      title: t('agendaPro.demoModal.demos.productReviews.title'),
      description: t('agendaPro.demoModal.demos.productReviews.description'),
      icon: Star,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      features: t('agendaPro.demoModal.demos.productReviews.features', { returnObjects: true }) || [],
      url: ROUTES.DEMO_PRODUCT_REVIEWS,
      keywords: 'avaliações clientes agenda pro, reputação online salão, reviews estética, prova social spa'
    }
  ];

  const handleWatchDemoClick = () => {
    trackEvent(ANALYTICS_EVENTS.WATCH_DEMO_CLICK, {
      event_category: 'engagement',
      event_label: 'hero_demo',
    });
    setIsDemoModalOpen(true);
  };

  const handleDemoSelection = (demo: DemoPage) => {
    trackEvent(ANALYTICS_EVENTS.DEMO_SELECTION_CLICK, {
      event_category: 'engagement',
      event_label: demo.id,
      demo_type: demo.title
    });
    setIsDemoModalOpen(false);
    navigate(demo.url);
  };

  const handleCloseModal = () => {
    setIsDemoModalOpen(false);
  };

  const handleFreeTrialClick = () => {
    trackEvent(ANALYTICS_EVENTS.FREE_TRIAL_CLICK, {
      event_category: 'engagement',
      event_label: 'hero_cta',
    });
  };

  return (
    <section id="hero" className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              {t('agendaPro.hero.title')}
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {t('agendaPro.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={handleFreeTrialClick}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Iniciar teste grátis de 14 dias"
              >
                {t('agendaPro.hero.freeTrial')}
              </button>
              <button
                onClick={handleWatchDemoClick}
                className="bg-white text-slate-700 px-8 py-4 rounded-lg hover:bg-slate-50 transition font-semibold text-lg border-2 border-slate-200 flex items-center justify-center gap-2"
                aria-label="Assistir demonstração do produto"
              >
                <PlayCircle size={24} aria-hidden="true" />
                {t('agendaPro.hero.watchDemo')}
              </button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="text-emerald-600" size={20} aria-hidden="true" />
                <span><strong className="text-slate-900">5.000+</strong> {t('agendaPro.hero.companies')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg" aria-label="Avaliação 4.9 de 5 estrelas">★★★★★</span>
                <span><strong className="text-slate-900">4.9</strong> {t('agendaPro.hero.rating')}</span>
              </div>
            </div>
          </div>

          <div className="relative" role="img" aria-label="Demonstração visual da plataforma AgendaPro">
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 aspect-square flex items-center justify-center">
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 transform rotate-3">
                <Smartphone size={48} className="text-emerald-600" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 transform -rotate-3">
                <Monitor size={48} className="text-teal-600" aria-hidden="true" />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4" aria-hidden="true"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2" aria-hidden="true"></div>
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="h-12 bg-emerald-100 rounded" aria-hidden="true"></div>
                    ))}
                  </div>
                  <div className="h-12 bg-emerald-600 rounded mt-4" aria-hidden="true"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDemoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{t('agendaPro.demoModal.title')}</h2>
                <p className="text-slate-600 mt-1">{t('agendaPro.demoModal.subtitle')}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={t('agendaPro.demoModal.closeButton')}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {demos.map((demo) => {
                  const IconComponent = demo.icon;
                  return (
                    <div
                      key={demo.id}
                      className={`group bg-white border-2 ${demo.borderColor} rounded-xl hover:border-emerald-300 transition-all duration-300 hover:shadow-lg`}
                    >
                      <div className={`bg-gradient-to-br ${demo.color} p-6 rounded-t-xl text-center`}>
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                          <IconComponent className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{demo.title}</h3>
                        <p className="text-white/90 text-sm">{demo.description}</p>
                      </div>

                      <div className="p-6">
                        <ul className="space-y-2 mb-6">
                          {demo.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-slate-700 text-sm">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => handleDemoSelection(demo)}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r ${demo.color} text-white hover:shadow-md flex items-center justify-center gap-2`}
                        >
                          <span>{t(`agendaPro.demoModal.demos.${demo.id}.button`)}</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-slate-600 mb-4">
                  {t('agendaPro.demoModal.footer.text')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium">
                    {t('agendaPro.demoModal.footer.expertButton')}
                  </button>
                  <button className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-200 transition font-medium">
                    {t('agendaPro.demoModal.footer.trialButton')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
