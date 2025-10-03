import React from 'react';
import { Calendar, Clock, User, Star, MapPin, Phone, Mail } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

type DetailIconKey = 'address' | 'phone' | 'email' | 'hours';

type BarbershopPageContent = {
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
  services: {
    title: string;
    durationLabel: string;
    items: Array<{ name: string; price: string; duration: string }>;
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
};

const DETAIL_ICON_MAP: Record<DetailIconKey, typeof MapPin> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

const BarbeariaPage = () => {
  const { t } = useI18n();
  const content = t('barbershopPage', { returnObjects: true }) as BarbershopPageContent;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={DEMO_PAGES_CONFIG.barbearia.title}
        description={DEMO_PAGES_CONFIG.barbearia.description}
        keywords={DEMO_PAGES_CONFIG.barbearia.keywords}
        ogImage={DEMO_PAGES_CONFIG.barbearia.ogImage}
        url={DEMO_PAGES_CONFIG.barbearia.url}
      />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
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
          {/* Informações da Barbearia */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sobre */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{content.about.title}</h2>
              <p className="text-gray-600 mb-4">
                {content.about.description}
              </p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.services.items.map((service) => (
                  <div key={service.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <span className="text-lg font-semibold text-blue-600">{service.price}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('barbershopPage.services.durationLabel', { duration: service.duration })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profissionais */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{content.professionals.title}</h2>
              <div className="space-y-4">
                {content.professionals.items.map((professional) => (
                  <div key={professional.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
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
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Seleção de Serviço */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{content.schedule.serviceLabel}</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {content.schedule.serviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Seleção de Profissional */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{content.schedule.professionalLabel}</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão de Agendamento */}
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbeariaPage;
