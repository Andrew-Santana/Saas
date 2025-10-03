import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar apenas traduções críticas (português e inglês)
import ptBR from './locales/pt-BR/translation.json';
import enUS from './locales/en-US/translation.json';

// Recursos críticos (carregados imediatamente)
const criticalResources = {
  'pt-BR': { translation: ptBR },
  'en-US': { translation: enUS },
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

// Inicialização do i18n com lazy loading
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: criticalResources,
    fallbackLng: 'pt-BR',
    debug: process.env.NODE_ENV === 'development',
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

    // Configurações para lazy loading
    load: 'languageOnly',
    preload: ['pt-BR', 'en-US'], // Pré-carrega apenas idiomas críticos
  });

// Função para carregar traduções adicionais sob demanda
export const loadAdditionalTranslations = async (): Promise<void> => {
  try {
    // Carregar espanhol
    const esES = await import('./locales/es-ES/translation.json');
    i18n.addResourceBundle('es-ES', 'translation', esES.default, true, true);
    
    // Carregar francês
    const frFR = await import('./locales/fr-FR/translation.json');
    i18n.addResourceBundle('fr-FR', 'translation', frFR.default, true, true);
    
    console.log('✅ Traduções adicionais carregadas com sucesso');
  } catch (error) {
    console.error('❌ Erro ao carregar traduções adicionais:', error);
  }
};

// Função para carregar um idioma específico
export const loadLanguage = async (language: string): Promise<void> => {
  if (i18n.hasResourceBundle(language, 'translation')) {
    return; // Já carregado
  }

  try {
    let translationModule;
    
    switch (language) {
      case 'es-ES':
        translationModule = await import('./locales/es-ES/translation.json');
        break;
      case 'fr-FR':
        translationModule = await import('./locales/fr-FR/translation.json');
        break;
      default:
        throw new Error(`Idioma não suportado: ${language}`);
    }
    
    i18n.addResourceBundle(language, 'translation', translationModule.default, true, true);
    console.log(`✅ Idioma ${language} carregado com sucesso`);
  } catch (error) {
    console.error(`❌ Erro ao carregar idioma ${language}:`, error);
    throw error;
  }
};

// Função para verificar se um idioma está carregado
export const isLanguageLoaded = (language: string): boolean => {
  return i18n.hasResourceBundle(language, 'translation');
};

// Função para obter idiomas carregados
export const getLoadedLanguages = (): string[] => {
  return i18n.languages.filter(lang => isLanguageLoaded(lang));
};

console.log('i18n inicializado com lazy loading');
console.log('Idiomas críticos carregados:', Object.keys(criticalResources));
console.log('Idioma atual:', i18n.language);

export default i18n;
