import i18n from '../i18n';

/**
 * Utilitário para validação e análise de traduções
 */
export class TranslationValidator {
  /**
   * Valida se todas as chaves necessárias existem em todos os idiomas
   */
  static validateAllLanguages(requiredKeys: string[]): {
    [language: string]: {
      missing: string[];
      present: string[];
      coverage: number;
    };
  } => {
    const results: any = {};
    const languages = i18n.languages;

    languages.forEach(language => {
      const result = this.validateLanguage(language, requiredKeys);
      results[language] = result;
    });

    return results;
  }

  /**
   * Valida traduções para um idioma específico
   */
  static validateLanguage(language: string, requiredKeys: string[]): {
    missing: string[];
    present: string[];
    coverage: number;
  } => {
    const missing: string[] = [];
    const present: string[] = [];

    requiredKeys.forEach(key => {
      try {
        const translation = i18n.getFixedT(language)(key);
        if (translation === key) {
          missing.push(key);
        } else {
          present.push(key);
        }
      } catch (error) {
        missing.push(key);
      }
    });

    const coverage = requiredKeys.length > 0 
      ? (present.length / requiredKeys.length) * 100 
      : 100;

    return { missing, present, coverage };
  }

  /**
   * Encontra chaves órfãs (traduções que existem mas não são usadas)
   */
  static findOrphanKeys(language: string, usedKeys: string[]): string[] {
    try {
      const resources = i18n.getResourceBundle(language, 'translation');
      const allKeys = this.getAllKeys(resources);
      
      return allKeys.filter(key => !usedKeys.includes(key));
    } catch (error) {
      console.error('Error finding orphan keys:', error);
      return [];
    }
  }

  /**
   * Obtém todas as chaves de um objeto de recursos recursivamente
   */
  private static getAllKeys(obj: any, prefix = ''): string[] {
    const keys: string[] = [];
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          keys.push(...this.getAllKeys(obj[key], fullKey));
        } else {
          keys.push(fullKey);
        }
      }
    }
    
    return keys;
  }

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
  } {
    const validation = this.validateAllLanguages(requiredKeys);
    const languages = Object.keys(validation);
    
    let totalCoverage = 0;
    const details: any = {};

    languages.forEach(language => {
      const result = validation[language];
      totalCoverage += result.coverage;
      
      details[language] = {
        coverage: result.coverage,
        missingCount: result.missing.length,
        presentCount: result.present.length,
        missingKeys: result.missing
      };
    });

    const averageCoverage = languages.length > 0 ? totalCoverage / languages.length : 0;

    return {
      summary: {
        totalKeys: requiredKeys.length,
        languages,
        averageCoverage
      },
      details
    };
  }

  /**
   * Sugere traduções baseadas em padrões similares
   */
  static suggestTranslations(missingKey: string, language: string): string[] {
    try {
      const resources = i18n.getResourceBundle(language, 'translation');
      const allKeys = this.getAllKeys(resources);
      
      // Encontrar chaves similares
      const similarKeys = allKeys.filter(key => {
        const keyParts = key.split('.');
        const missingParts = missingKey.split('.');
        
        // Verificar se há sobreposição significativa
        const overlap = keyParts.filter(part => missingParts.includes(part)).length;
        return overlap >= Math.min(keyParts.length, missingParts.length) * 0.5;
      });

      return similarKeys.slice(0, 5); // Retornar até 5 sugestões
    } catch (error) {
      console.error('Error suggesting translations:', error);
      return [];
    }
  }
}

/**
 * Chaves obrigatórias para as páginas de demonstração
 */
export const DEMO_PAGE_REQUIRED_KEYS = [
  // Barbearia
  'barbershopPage.header.title',
  'barbershopPage.header.subtitle',
  'barbershopPage.header.rating',
  'barbershopPage.about.title',
  'barbershopPage.about.description',
  'barbershopPage.services.title',
  'barbershopPage.professionals.title',
  'barbershopPage.schedule.title',
  'barbershopPage.stats.title',
  
  // Salão de Beleza
  'beautySalonPage.header.title',
  'beautySalonPage.header.subtitle',
  'beautySalonPage.header.rating',
  'beautySalonPage.about.title',
  'beautySalonPage.about.description',
  'beautySalonPage.services.title',
  'beautySalonPage.professionals.title',
  'beautySalonPage.schedule.title',
  'beautySalonPage.stats.title',
  'beautySalonPage.promotion.title',
  
  // Clínica Veterinária
  'vetClinicPage.header.title',
  'vetClinicPage.header.subtitle',
  'vetClinicPage.header.rating',
  'vetClinicPage.about.title',
  'vetClinicPage.about.description',
  'vetClinicPage.services.title',
  'vetClinicPage.veterinarians.title',
  'vetClinicPage.schedule.title',
  'vetClinicPage.stats.title',
  'vetClinicPage.promotion.title',
  'vetClinicPage.healthTips.title',
  
  // Modal de Demonstração
  'agendaPro.demoModal.title',
  'agendaPro.demoModal.subtitle',
  'agendaPro.demoModal.demos.salao.title',
  'agendaPro.demoModal.demos.barbearia.title',
  'agendaPro.demoModal.demos.veterinaria.title'
];

export default TranslationValidator;
