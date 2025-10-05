/**
 * Utilitário para validação e análise de traduções
 */
export declare class TranslationValidator {
    /**
     * Valida se todas as chaves necessárias existem em todos os idiomas
     */
    static validateAllLanguages(requiredKeys: string[]): {
        [language: string]: {
            missing: string[];
            present: string[];
            coverage: number;
        };
    };
    /**
     * Valida traduções para um idioma específico
     */
    static validateLanguage(language: string, requiredKeys: string[]): {
        missing: string[];
        present: string[];
        coverage: number;
    };
    /**
     * Encontra chaves órfãs (traduções que existem mas não são usadas)
     */
    static findOrphanKeys(language: string, usedKeys: string[]): string[];
    /**
     * Obtém todas as chaves de um objeto de recursos recursivamente
     */
    private static getAllKeys;
    /**
     * Gera relatório de cobertura de traduções
     */
    static generateCoverageReport(requiredKeys: string[]): {
        summary: {
            totalKeys: number;
            languages: string[];
            averageCoverage: number;
        };
        details: {
            [language: string]: {
                coverage: number;
                missingCount: number;
                presentCount: number;
                missingKeys: string[];
            };
        };
    };
    /**
     * Sugere traduções baseadas em padrões similares
     */
    static suggestTranslations(missingKey: string, language: string): string[];
}
/**
 * Chaves obrigatórias para as páginas de demonstração
 */
export declare const DEMO_PAGE_REQUIRED_KEYS: {};
export default TranslationValidator;
