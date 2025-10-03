import { useTranslation } from 'react-i18next';

/**
 * Hook personalizado que adiciona fallbacks robustos para traduções ausentes
 */
export const useTranslationWithFallback = (namespace?: string) => {
  const { t, i18n } = useTranslation(namespace);

  /**
   * Função de tradução com fallback inteligente
   * @param key - Chave da tradução
   * @param options - Opções de tradução
   * @param fallback - Texto de fallback personalizado
   */
  const tWithFallback = (
    key: string, 
    options?: any, 
    fallback?: string
  ): string => {
    try {
      // Tentar traduzir normalmente
      const translation = t(key, options);
      
      // Se a tradução retornou a própria chave, significa que não foi encontrada
      if (translation === key) {
        console.warn(`Translation missing for key: ${key} in language: ${i18n.language}`);
        
        // Tentar fallback para inglês se não estivermos já em inglês
        if (i18n.language !== 'en-US') {
          const englishTranslation = t(key, { ...options, lng: 'en-US' });
          if (englishTranslation !== key) {
            console.info(`Using English fallback for key: ${key}`);
            return englishTranslation;
          }
        }
        
        // Usar fallback personalizado ou gerar um baseado na chave
        return fallback || generateFallbackFromKey(key);
      }
      
      return translation;
    } catch (error) {
      console.error(`Translation error for key: ${key}:`, error);
      return fallback || generateFallbackFromKey(key);
    }
  };

  /**
   * Gera um texto de fallback baseado na chave
   */
  const generateFallbackFromKey = (key: string): string => {
    // Converter chaves como "agendaPro.hero.title" em texto legível
    const parts = key.split('.');
    const lastPart = parts[parts.length - 1];
    
    // Converter camelCase para texto legível
    const readableText = lastPart
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
    
    return `[${readableText}]`;
  };

  /**
   * Verifica se uma tradução existe
   */
  const hasTranslation = (key: string): boolean => {
    const translation = t(key);
    return translation !== key;
  };

  /**
   * Obtém todas as chaves de tradução disponíveis para um namespace
   */
  const getAvailableKeys = (namespace?: string): string[] => {
    try {
      const resources = i18n.getResourceBundle(i18n.language, namespace || 'translation');
      return Object.keys(resources);
    } catch (error) {
      console.error('Error getting available keys:', error);
      return [];
    }
  };

  /**
   * Valida se todas as chaves necessárias existem
   */
  const validateTranslations = (requiredKeys: string[]): {
    missing: string[];
    present: string[];
  } => {
    const missing: string[] = [];
    const present: string[] = [];

    requiredKeys.forEach(key => {
      if (hasTranslation(key)) {
        present.push(key);
      } else {
        missing.push(key);
      }
    });

    return { missing, present };
  };

  return {
    t: tWithFallback,
    i18n,
    hasTranslation,
    getAvailableKeys,
    validateTranslations,
    // Manter a função original t para casos especiais
    tOriginal: t
  };
};

export default useTranslationWithFallback;
