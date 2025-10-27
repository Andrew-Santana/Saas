import { Calendar, Users, BarChart3, Clock, Bell, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Benefits() {
  const { t } = useTranslation();
  
  const benefits = [
    {
      icon: Calendar,
      titleKey: 'agendaPro.benefits.onlineScheduling.title',
      descriptionKey: 'agendaPro.benefits.onlineScheduling.description',
    },
    {
      icon: Bell,
      titleKey: 'agendaPro.benefits.automaticReminders.title',
      descriptionKey: 'agendaPro.benefits.automaticReminders.description',
    },
    {
      icon: Users,
      titleKey: 'agendaPro.benefits.teamManagement.title',
      descriptionKey: 'agendaPro.benefits.teamManagement.description',
    },
    {
      icon: BarChart3,
      titleKey: 'agendaPro.benefits.realTimeReports.title',
      descriptionKey: 'agendaPro.benefits.realTimeReports.description',
    },
    {
      icon: CreditCard,
      titleKey: 'agendaPro.benefits.integratedPayments.title',
      descriptionKey: 'agendaPro.benefits.integratedPayments.description',
    },
    {
      icon: Clock,
      titleKey: 'agendaPro.benefits.saveTime.title',
      descriptionKey: 'agendaPro.benefits.saveTime.description',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {t('agendaPro.benefits.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('agendaPro.benefits.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-lg transition group"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition">
                <benefit.icon className="text-emerald-600 group-hover:text-white transition" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{t(benefit.titleKey)}</h3>
              <p className="text-slate-600 leading-relaxed">{t(benefit.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
