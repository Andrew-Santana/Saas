import { UserPlus, Palette, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();
  
  const steps = t('agendaPro.howItWorks.steps', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const icons = [UserPlus, Palette, Share2];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {t('agendaPro.howItWorks.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('agendaPro.howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => {
            const IconComponent = icons[index];
            return (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <IconComponent className="text-white" size={36} />
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-emerald-200 -z-10 hidden md:block last:hidden"></div>
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
                    <div className="text-emerald-600 font-bold text-lg mb-2">{t('agendaPro.howItWorks.stepLabel')} {index + 1}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
