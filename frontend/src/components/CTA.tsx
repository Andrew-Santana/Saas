import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          {t('agendaPro.cta.title')}
        </h2>
        <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
          {t('agendaPro.cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center gap-2">
            {t('agendaPro.cta.button')}
            <ArrowRight size={20} />
          </button>
        </div>
        <p className="text-emerald-50 text-sm">
          {t('agendaPro.cta.disclaimer')}
        </p>
      </div>
    </section>
  );
}
