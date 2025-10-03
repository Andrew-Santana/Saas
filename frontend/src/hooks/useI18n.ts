import { useTranslation } from 'react-i18next';
import { useTranslationWithFallback } from './useTranslationWithFallback';

export const useI18n = () => {
  const { t, i18n, hasTranslation, validateTranslations } = useTranslationWithFallback();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return { 
    t, 
    i18n, 
    hasTranslation, 
    validateTranslations,
    changeLanguage, 
    currentLanguage: i18n.language,
    languages: i18n.languages
  };
};