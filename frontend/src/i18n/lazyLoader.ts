import React from 'react';
import i18n, { resolveLanguage, supportedLanguages } from './index';

/**
 * Sistema de lazy loading para traduções
 */
export class TranslationLazyLoader {
  private static loadedLanguages = new Set<string>();
  private static loadingPromises = new Map<string, Promise<void>>();

  /**
   * Carrega um idioma de forma assíncrona
   */
  static async loadLanguage(language: string): Promise<void> {
    const resolvedLanguage = resolveLanguage(language);

    // Se já está carregado, retorna imediatamente
    if (this.loadedLanguages.has(resolvedLanguage)) {
      return Promise.resolve();
    }

    // Se já está carregando, retorna a promise existente
    if (this.loadingPromises.has(resolvedLanguage)) {
      return this.loadingPromises.get(resolvedLanguage)!;
    }

    // Inicia o carregamento
    const loadingPromise = this.loadLanguageResource(resolvedLanguage);
    this.loadingPromises.set(resolvedLanguage, loadingPromise);

    try {
      await loadingPromise;
      this.loadedLanguages.add(resolvedLanguage);
      this.loadingPromises.delete(resolvedLanguage);
    } catch (error) {
      this.loadingPromises.delete(resolvedLanguage);
      throw error;
    }
  }

  /**
   * Carrega o recurso de tradução para um idioma específico
   */
  private static async loadLanguageResource(language: string): Promise<void> {
    try {
      // Importação dinâmica do arquivo de tradução
      const translationModule = await import(`./locales/${language}/translation.json`);
      const translationData = 'default' in translationModule ? translationModule.default : translationModule;

      // Adiciona o recurso ao i18n
      i18n.addResourceBundle(language, 'translation', translationData, true, true);
      
      console.log(`✅ Idioma ${language} carregado com sucesso`);
    } catch (error) {
      console.error(`❌ Erro ao carregar idioma ${language}:`, error);
      throw error;
    }
  }

  /**
   * Carrega múltiplos idiomas em paralelo
   */
  static async loadLanguages(languages: string[]): Promise<void> {
    const promises = languages.map(language => this.loadLanguage(language));
    await Promise.allSettled(promises);
  }

  /**
   * Pré-carrega idiomas críticos
   */
  static async preloadCriticalLanguages(): Promise<void> {
    const criticalLanguages = ['pt-BR', 'en-US'];
    await this.loadLanguages(criticalLanguages);
  }

  /**
   * Carrega idiomas baseado na preferência do usuário
   */
  static async loadUserPreferredLanguages(): Promise<void> {
    const userLanguages = this.getUserPreferredLanguages();
    await this.loadLanguages(userLanguages);
  }

  /**
   * Obtém idiomas preferidos do usuário
   */
  static getUserPreferredLanguages(): string[] {
    const languages: string[] = [];

    // Idioma atual do i18n
    if (i18n.language) {
      languages.push(resolveLanguage(i18n.language));
    }

    // Idiomas do navegador
    if (navigator.languages) {
      languages.push(...navigator.languages.map(resolveLanguage));
    }

    // Idioma do navegador
    if (navigator.language) {
      languages.push(resolveLanguage(navigator.language));
    }

    // Remover duplicatas e manter apenas idiomas suportados
    return [...new Set(languages)]
      .filter(lang => supportedLanguages.includes(lang))
      .slice(0, 3); // Máximo 3 idiomas
  }

  /**
   * Verifica se um idioma está carregado
   */
  static isLanguageLoaded(language: string): boolean {
    return this.loadedLanguages.has(language);
  }

  /**
   * Obtém lista de idiomas carregados
   */
  static getLoadedLanguages(): string[] {
    return Array.from(this.loadedLanguages);
  }

  /**
   * Limpa cache de idiomas carregados
   */
  static clearCache(): void {
    this.loadedLanguages.clear();
    this.loadingPromises.clear();
  }
}

/**
 * Hook para lazy loading de traduções
 */
export const useLazyTranslation = (language: string) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const loadTranslation = async () => {
      if (TranslationLazyLoader.isLanguageLoaded(language)) {
        setIsLoaded(true);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        await TranslationLazyLoader.loadLanguage(language);
        setIsLoaded(true);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslation();
  }, [language]);

  return { isLoading, isLoaded, error };
};

export default TranslationLazyLoader;
