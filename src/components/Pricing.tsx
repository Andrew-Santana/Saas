import { Check } from 'lucide-react';
import { useTranslationSafe } from '../hooks/useTranslationSafe';

export default function Pricing() {
  const { t, tArray } = useTranslationSafe();

  const plans = [
    {
      nameKey: 'agendaPro.pricing.plans.starter.name',
      priceKey: 'agendaPro.pricing.plans.starter.price',
      descriptionKey: 'agendaPro.pricing.plans.starter.description',
      featuresKey: 'agendaPro.pricing.plans.starter.features',
      ctaKey: 'agendaPro.pricing.plans.starter.cta',
      highlighted: false,
    },
    {
      nameKey: 'agendaPro.pricing.plans.pro.name',
      priceKey: 'agendaPro.pricing.plans.pro.price',
      descriptionKey: 'agendaPro.pricing.plans.pro.description',
      featuresKey: 'agendaPro.pricing.plans.pro.features',
      ctaKey: 'agendaPro.pricing.plans.pro.cta',
      popularKey: 'agendaPro.pricing.plans.pro.popular',
      highlighted: true,
    },
    {
      nameKey: 'agendaPro.pricing.plans.advanced.name',
      priceKey: 'agendaPro.pricing.plans.advanced.price',
      descriptionKey: 'agendaPro.pricing.plans.advanced.description',
      featuresKey: 'agendaPro.pricing.plans.advanced.features',
      ctaKey: 'agendaPro.pricing.plans.advanced.cta',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {t('agendaPro.pricing.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-2">
            {t('agendaPro.pricing.subtitle')}
          </p>
          <p className="text-emerald-600 font-medium">
            {t('agendaPro.pricing.freeTrial')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl transform scale-105 relative'
                  : 'bg-white border-2 border-slate-200 shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                  {t(plan.popularKey!)}
                </div>
              )}
              <div className="text-center mb-8">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.highlighted ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t(plan.nameKey)}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    plan.highlighted ? 'text-emerald-50' : 'text-slate-600'
                  }`}
                >
                  {t(plan.descriptionKey)}
                </p>
                <div className="mb-2">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {t(plan.priceKey)}
                  </span>
                  <span className={`text-lg ${plan.highlighted ? 'text-emerald-50' : 'text-slate-600'}`}>
                    /mês
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tArray<string>(plan.featuresKey).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`flex-shrink-0 ${
                        plan.highlighted ? 'text-white' : 'text-emerald-600'
                      }`}
                      size={20}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted ? 'text-white' : 'text-slate-700'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {t(plan.ctaKey)}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-600 mt-12 max-w-2xl mx-auto">
          {t('agendaPro.pricing.footer')}
        </p>
      </div>
    </section>
  );
}
