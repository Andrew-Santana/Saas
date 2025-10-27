import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslationSafe } from '../hooks/useTranslationSafe';
import SEO from './SEO';
import { useStructuredData } from '../hooks/useStructuredData';

export default function FAQ() {
  const { t, tArray } = useTranslationSafe();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { getFAQSchema } = useStructuredData();

  const faqs = tArray<{
    question: string;
    answer: string;
  }>('agendaPro.faq.questions');

  return (
    <section id="faq" className="py-20 bg-white">
      <SEO
        title="Perguntas Frequentes"
        description="Tire suas dúvidas sobre o AgendaPro. Encontre respostas para as perguntas mais comuns sobre nossa plataforma de agendamento."
        structuredData={getFAQSchema()}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {t('agendaPro.faq.title')}
          </h2>
          <p className="text-xl text-slate-600">
            {t('agendaPro.faq.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-emerald-200 transition"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition"
              >
                <span
                  className="font-semibold text-slate-900 text-lg pr-4"
                  itemProp="name"
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 text-emerald-600 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              {openIndex === index && (
                <div
                  className="px-6 py-5 bg-slate-50 border-t border-slate-200"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p className="text-slate-700 leading-relaxed" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
