import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './locales/pt-BR/translation.json';
import enUS from './locales/en-US/translation.json';
import esES from './locales/es-ES/translation.json';
import frFR from './locales/fr-FR/translation.json';

const normalize = <T extends Record<string, unknown>>(module: T | { default: T }) =>
  'default' in module ? module.default : module;

const baseTranslations = {
  'pt-BR': normalize(ptBR),
  'en-US': normalize(enUS),
  'es-ES': normalize(esES),
  'fr-FR': normalize(frFR),
} as const;

const languageAliases: Record<string, keyof typeof baseTranslations> = {
  pt: 'pt-BR',
  'pt-br': 'pt-BR',
  en: 'en-US',
  'en-us': 'en-US',
  es: 'es-ES',
  'es-es': 'es-ES',
  fr: 'fr-FR',
  'fr-fr': 'fr-FR',
};

const resources: Record<string, { translation: Record<string, unknown> }> = {};

Object.entries(baseTranslations).forEach(([language, translation]) => {
  resources[language] = { translation };
});

Object.entries(languageAliases).forEach(([alias, language]) => {
  resources[alias] = { translation: baseTranslations[language] };
});

export const supportedLanguages = Object.keys(baseTranslations);
const supportedLanguageKeys = Object.keys(resources);

export const resolveLanguage = (language?: string): string => {
  if (!language) {
    return 'en-US'; // Padrão inglês quando não detectado
  }

  const normalized = language.toLowerCase();
  const resolved = languageAliases[normalized];
  return resolved ?? language;
};

export const supportedLanguagesList = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español (España)', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français (France)', flag: '🇫🇷' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US', // Fallback para inglês
    debug: false,
    // Remover lng fixo para permitir detecção automática
    supportedLngs: supportedLanguageKeys,
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      // Detectar automaticamente do navegador
      convertDetectedLanguage: (lng: string) => {
        // Normalizar pt -> pt-BR, en -> en-US, etc
        const base = lng.split('-')[0].toLowerCase();
        return languageAliases[base] || lng;
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    keySeparator: '.',
    nsSeparator: ':',
  });

i18n.on('languageChanged', (language) => {
  const resolved = resolveLanguage(language);
  if (resolved !== language) {
    i18n.changeLanguage(resolved);
  }
});

export default i18n;
