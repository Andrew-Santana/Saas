import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Calendar,
  Clock,
  User,
  Star,
  MapPin,
  Phone,
  Mail,
  Heart,
  Scissors,
  Sparkles,
} from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

type DetailIconKey = 'address' | 'phone' | 'email' | 'hours';
type CategoryKey = 'all' | 'hair' | 'nails' | 'beauty';

type BeautySalonPageContent = {
  header: {
    title: string;
    subtitle: string;
    rating: string;
  };
  about: {
    title: string;
    description: string;
    details: Array<{ icon: DetailIconKey; text: string }>;
  };
  filters: {
    categories: Array<{ key: CategoryKey; label: string }>;
  };
  services: {
    title: string;
    durationLabel: string;
    items: Array<{ name: string; price: string; duration: string; categoryKey: CategoryKey }>;
  };
  professionals: {
    title: string;
    items: Array<{ name: string; specialty: string; rating: string; experience: string }>;
  };
  schedule: {
    title: string;
    dateLabel: string;
    serviceLabel: string;
    professionalLabel: string;
    availableTimesLabel: string;
    submitLabel: string;
    serviceOptions: string[];
    professionalOptions: string[];
    slots: string[];
  };
  stats: {
    title: string;
    items: Array<{ label: string; value: string }>;
  };
  promotion: {
    title: string;
    description: string;
    note: string;
  };
};

const DETAIL_ICON_MAP: Record<DetailIconKey, LucideIcon> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

const CATEGORY_ICON_MAP: Record<Exclude<CategoryKey, 'all'>, LucideIcon> = {
  hair: Scissors,
  nails: Heart,
  beauty: Sparkles,
};

const CATEGORY_ACCENT_CLASS: Record<Exclude<CategoryKey, 'all'>, string> = {
  hair: 'text-pink-500',
  nails: 'text-red-500',
  beauty: 'text-purple-500',
};

const SalaoBelezaPage = () => {
  const { t } = useI18n();
  const content = t('beautySalonPage', { returnObjects: true }) as BeautySalonPageContent;
  const categoryLabelMap = Object.fromEntries(
    content.filters.categories.map((category) => [category.key, category.label])
  ) as Record<CategoryKey, string>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <SEO 
        title={DEMO_PAGES_CONFIG.salao.title}
        description={DEMO_PAGES_CONFIG.salao.description}
        keywords={DEMO_PAGES_CONFIG.salao.keywords}
        ogImage={DEMO_PAGES_CONFIG.salao.ogImage}
        url={DEMO_PAGES_CONFIG.salao.url}
      />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{content.header.title}</h1>
                <p className="text-gray-600">{content.header.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{content.header.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Salão */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sobre */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{content.about.title}</h2>
              <p className="text-gray-600 mb-4">{content.about.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.about.details.map((detail) => {
                  const Icon = DETAIL_ICON_MAP[detail.icon] ?? MapPin;
                  return (
                    <div key={detail.text} className="flex items-center text-sm text-gray-600">
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{detail.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Serviços */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{content.services.title}</h2>

              {/* Filtros de Categoria */}
              <div className="flex flex-wrap gap-2 mb-4">
                {content.filters.categories.map((category) => (
                  <button
                    key={category.key}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      category.key === 'all'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-pink-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.services.items.map((service) => {
                  const Icon = service.categoryKey === 'all' ? Sparkles : CATEGORY_ICON_MAP[service.categoryKey as Exclude<CategoryKey, 'all'>];
                  const accent = CATEGORY_ACCENT_CLASS[service.categoryKey as Exclude<CategoryKey, 'all'>];

                  return (
                    <div key={service.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {service.categoryKey !== 'all' && Icon ? (
                            <Icon className={`w-4 h-4 ${accent}`} />
                          ) : (
                            <Sparkles className="w-4 h-4 text-purple-500" />
                          )}
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                        </div>
                        <span className="text-lg font-semibold text-pink-600">{service.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t('beautySalonPage.services.durationLabel', { duration: service.duration })}
                      </p>
                      <span className="inline-flex mt-3 items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
                        {categoryLabelMap[service.categoryKey]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Profissionais */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{content.professionals.title}</h2>
              <div className="space-y-4">
                {content.professionals.items.map((professional) => (
                  <div key={professional.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{professional.name}</h3>
                        <p className="text-sm text-gray-600">{professional.specialty}</p>
                        <p className="text-xs text-gray-500">{professional.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{professional.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agendamento */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{content.schedule.title}</h2>

              {/* Seleção de Data */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{content.schedule.dateLabel}</label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Seleção de Serviço */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{content.schedule.serviceLabel}</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
                  {content.schedule.serviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Seleção de Profissional */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{content.schedule.professionalLabel}</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
                  {content.schedule.professionalOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Horários Disponíveis */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">{content.schedule.availableTimesLabel}</label>
                <div className="grid grid-cols-4 gap-2">
                  {content.schedule.slots.map((slot) => (
                    <button
                      key={slot}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-pink-50 hover:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão de Agendamento */}
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all">
                {content.schedule.submitLabel}
              </button>
            </div>

            {/* Estatísticas */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{content.stats.title}</h3>
              <div className="space-y-3">
                {content.stats.items.map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promoções */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">{content.promotion.title}</h3>
              <p className="text-sm mb-3">{content.promotion.description}</p>
              <p className="text-xs opacity-90">{content.promotion.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaoBelezaPage;
