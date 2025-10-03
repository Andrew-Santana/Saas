import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Importar traduções
import ptBR from './locales/pt-BR/translation.json';
import enUS from './locales/en-US/translation.json';
import esES from './locales/es-ES/translation.json';
import frFR from './locales/fr-FR/translation.json';
// Recursos de tradução
const resources = {
    'pt-BR': { translation: ptBR },
    'en-US': { translation: enUS },
    'es-ES': { translation: esES },
    'fr-FR': { translation: frFR },
};
// Idiomas suportados
const supportedLanguages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
// Configuração dos idiomas suportados para UI
export const supportedLanguagesList = [
    { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Español (España)', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français (France)', flag: '🇫🇷' },
];
// Inicialização do i18n
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    resources,
    fallbackLng: 'pt-BR',
    debug: true,
    lng: 'pt-BR',
    // Idiomas suportados
    supportedLngs: supportedLanguages,
    detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
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
console.log('i18n inicializado com idiomas:', supportedLanguages);
console.log('i18n recursos carregados:', Object.keys(resources));
console.log('i18n language atual:', i18n.language);
console.log('i18n isInitialized:', i18n.isInitialized);
export default i18n;
