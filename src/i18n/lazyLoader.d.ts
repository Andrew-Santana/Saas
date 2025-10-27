/**
 * Sistema de lazy loading para traduções
 */
export declare class TranslationLazyLoader {
    private static loadedLanguages;
    private static loadingPromises;
    /**
     * Carrega um idioma de forma assíncrona
     */
    static loadLanguage(language: string): Promise<void>;
    /**
     * Carrega o recurso de tradução para um idioma específico
     */
    private static loadLanguageResource;
    /**
     * Carrega múltiplos idiomas em paralelo
     */
    static loadLanguages(languages: string[]): Promise<void>;
    /**
     * Pré-carrega idiomas críticos
     */
    static preloadCriticalLanguages(): Promise<void>;
    /**
     * Carrega idiomas baseado na preferência do usuário
     */
    static loadUserPreferredLanguages(): Promise<void>;
    /**
     * Obtém idiomas preferidos do usuário
     */
    static getUserPreferredLanguages(): string[];
    /**
     * Verifica se um idioma está carregado
     */
    static isLanguageLoaded(language: string): boolean;
    /**
     * Obtém lista de idiomas carregados
     */
    static getLoadedLanguages(): string[];
    /**
     * Limpa cache de idiomas carregados
     */
    static clearCache(): void;
}
/**
 * Hook para lazy loading de traduções
 */
export declare const useLazyTranslation: (language: string) => {
    isLoading: any;
    isLoaded: any;
    error: any;
};
export default TranslationLazyLoader;
