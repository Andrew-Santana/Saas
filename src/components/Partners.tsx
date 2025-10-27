import { Award, CheckCircle, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Partners() {
  const { t } = useTranslation();
  
  const partners = [
    { icon: Award, name: 'Award' },
    { icon: CheckCircle, name: 'Check' },
    { icon: Shield, name: 'Shield' },
    { icon: Zap, name: 'Zap' },
    { icon: Award, name: 'Award2' },
    { icon: CheckCircle, name: 'Check2' },
    { icon: Shield, name: 'Shield2' },
    { icon: Zap, name: 'Zap2' },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-600 mb-8 font-medium">
          {t('agendaPro.partners.title')}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
          {partners.map((Partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <Partner.icon size={40} className="text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
