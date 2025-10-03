import { useTranslation } from 'react-i18next';
import { SEOService } from '../services';
export const useStructuredData = () => {
    const { t } = useTranslation();
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
        const faqs = t('agendaPro.faq.questions', { returnObjects: true });
        return SEOService.generateFAQSchema(faqs);
    };
    return { getSoftwareApplicationSchema, getOrganizationSchema, getFAQSchema };
};
