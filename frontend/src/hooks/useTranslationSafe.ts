import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

/**
 * Hook seguro para traduções que garante que sempre retorna dados válidos
 */
export const useTranslationSafe = () => {
  const { t, i18n } = useTranslation();

  /**
   * Função para obter array de tradução de forma segura
   */
  const tArray = useMemo(() => {
    return <T>(key: string, options?: any): T[] => {
      try {
        const result = t(key, { ...options, returnObjects: true });
        
        // Se é um array válido, retorna
        if (Array.isArray(result)) {
          return result as T[];
        }
        
        // Se retornou a própria chave (tradução não encontrada)
        if (typeof result === 'string' && result === key) {
          console.warn(`Tradução não encontrada para chave: "${key}"`);
          return [];
        }
        
        // Se é null ou undefined
        if (result === null || result === undefined) {
          console.warn(`Tradução retornou null/undefined para chave: "${key}"`);
          return [];
        }
        
        // Se é um objeto mas não um array
        if (typeof result === 'object' && !Array.isArray(result)) {
          console.warn(`Tradução retornou objeto não-array para chave: "${key}"`, result);
          return [];
        }
        
        // Para qualquer outro caso
        console.warn(`Tipo inesperado para tradução "${key}":`, typeof result, result);
        return [];
        
      } catch (error) {
        console.error(`Erro ao traduzir chave "${key}":`, error);
        return [];
      }
    };
  }, [t]);

  /**
   * Função para obter string de tradução de forma segura
   */
  const tString = useMemo(() => {
    return (key: string, options?: any): string => {
      try {
        const result = t(key, options);
        
        // Se retornou a própria chave (tradução não encontrada)
        if (result === key) {
          console.warn(`❌ Tradução não encontrada para chave: "${key}"`);
          console.warn(`i18n inicializado:`, i18n.isInitialized);
          console.warn(`Idioma atual:`, i18n.language);
          console.warn(`Recursos disponíveis:`, Object.keys(i18n.store.data));
          return `[${key}]`;
        }
        
        // Se é null ou undefined
        if (result === null || result === undefined) {
          console.warn(`Tradução retornou null/undefined para chave: "${key}"`);
          return `[${key}]`;
        }
        
        // Retorna como string
        return String(result);
        
      } catch (error) {
        console.error(`Erro ao traduzir chave "${key}":`, error);
        return `[${key}]`;
      }
    };
  }, [t, i18n]);

  return {
    t: tString, // Função t padrão para strings
    tArray,     // Função específica para arrays
    tString,    // Função específica para strings
    i18n,
    // Manter a função original para casos especiais
    tOriginal: t
  };
};

export default useTranslationSafe;
