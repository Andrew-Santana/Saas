import { useTranslationSafe } from './useTranslationSafe';
import { SEOService } from '../services';

export const useStructuredData = () => {
  const { t, tArray } = useTranslationSafe();

  const getSoftwareApplicationSchema = () => {
    return SEOService.generateSoftwareApplicationSchema({
      name: t('agendaPro.brand'),
      description: t('agendaPro.hero.subtitle'),
      url: 'https://agendapro.com.br',
    });
  };

  const getOrganizationSchema = () => {
    return SEOService.generateOrganizationSchema({
      name: t('agendaPro.brand'),
      url: 'https://agendapro.com.br',
    });
  };

  const getFAQSchema = () => {
    const faqs = tArray<{
      question: string;
      answer: string;
    }>('agendaPro.faq.questions');

    return SEOService.generateFAQSchema(faqs);
  };

  return { getSoftwareApplicationSchema, getOrganizationSchema, getFAQSchema };
};
