import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TranslationLazyLoader } from '../i18n/lazyLoader';

interface SmartTranslationOptions {
  preload?: boolean;
  fallbackLanguage?: string;
  timeout?: number;
}

/**
 * Hook inteligente que combina lazy loading com tradução
 */
export const useSmartTranslation = (options: SmartTranslationOptions = {}) => {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState<string[]>([]);

  const {
    preload = true,
    fallbackLanguage = 'en-US',
    timeout = 5000
  } = options;

  useEffect(() => {
    const initializeTranslations = async () => {
      try {
        // Se preload está habilitado, carrega idiomas críticos
        if (preload) {
          setLoadingLanguages(['pt-BR', 'en-US']);
          await TranslationLazyLoader.preloadCriticalLanguages();
        }

        // Carrega idiomas preferidos do usuário
        const userLanguages = TranslationLazyLoader.getUserPreferredLanguages();
        if (userLanguages.length > 0) {
          setLoadingLanguages(userLanguages);
          await TranslationLazyLoader.loadUserPreferredLanguages();
        }

        setIsReady(true);
        setLoadingLanguages([]);
      } catch (error) {
        console.error('Erro ao inicializar traduções:', error);
        setIsReady(true); // Continua mesmo com erro
        setLoadingLanguages([]);
      }
    };

    // Timeout para evitar loading infinito
    const timeoutId = setTimeout(() => {
      setIsReady(true);
      setLoadingLanguages([]);
    }, timeout);

    initializeTranslations().finally(() => {
      clearTimeout(timeoutId);
    });
  }, [preload, timeout]);

  /**
   * Função de tradução inteligente com fallbacks
   */
  const smartT = (key: string, options?: any): string => {
    // Se ainda não está pronto, retorna fallback
    if (!isReady) {
      return options?.fallback || `[${key}]`;
    }

    try {
      const translation = t(key, options);
      
      // Se a tradução não foi encontrada, tenta fallback
      if (translation === key && fallbackLanguage !== i18n.language) {
        const fallbackTranslation = t(key, { ...options, lng: fallbackLanguage });
        if (fallbackTranslation !== key) {
          return fallbackTranslation;
        }
      }
      
      return translation;
    } catch (error) {
      console.error(`Erro na tradução da chave ${key}:`, error);
      return options?.fallback || `[${key}]`;
    }
  };

  /**
   * Carrega um idioma específico sob demanda
   */
  const loadLanguage = async (language: string): Promise<void> => {
    if (TranslationLazyLoader.isLanguageLoaded(language)) {
      return;
    }

    setLoadingLanguages(prev => [...prev, language]);
    
    try {
      await TranslationLazyLoader.loadLanguage(language);
    } finally {
      setLoadingLanguages(prev => prev.filter(lang => lang !== language));
    }
  };

  /**
   * Muda o idioma com lazy loading
   */
  const changeLanguage = async (language: string): Promise<void> => {
    await loadLanguage(language);
    i18n.changeLanguage(language);
  };

  /**
   * Verifica se um idioma está carregado
   */
  const isLanguageLoaded = (language: string): boolean => {
    return TranslationLazyLoader.isLanguageLoaded(language);
  };

  /**
   * Obtém idiomas disponíveis
   */
  const getAvailableLanguages = (): string[] => {
    return TranslationLazyLoader.getLoadedLanguages();
  };

  return {
    t: smartT,
    i18n,
    isReady,
    loadingLanguages,
    loadLanguage,
    changeLanguage,
    isLanguageLoaded,
    getAvailableLanguages,
    // Função original para casos especiais
    tOriginal: t
  };
};

export default useSmartTranslation;
