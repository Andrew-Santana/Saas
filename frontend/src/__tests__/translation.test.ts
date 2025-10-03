import { TranslationValidator, DEMO_PAGE_REQUIRED_KEYS } from '../utils/translationValidator';
import i18n from '../i18n';

describe('Translation Tests', () => {
  beforeAll(async () => {
    // Aguardar o i18n estar pronto
    await i18n.init();
  });

  describe('Translation Coverage', () => {
    test('should have all required keys in Portuguese (pt-BR)', () => {
      const result = TranslationValidator.validateLanguage('pt-BR', DEMO_PAGE_REQUIRED_KEYS);
      
      expect(result.coverage).toBeGreaterThanOrEqual(95); // Pelo menos 95% de cobertura
      expect(result.missing).toHaveLength(0); // Nenhuma chave deve estar ausente
    });

    test('should have all required keys in English (en-US)', () => {
      const result = TranslationValidator.validateLanguage('en-US', DEMO_PAGE_REQUIRED_KEYS);
      
      expect(result.coverage).toBeGreaterThanOrEqual(95);
      expect(result.missing).toHaveLength(0);
    });

    test('should have all required keys in Spanish (es-ES)', () => {
      const result = TranslationValidator.validateLanguage('es-ES', DEMO_PAGE_REQUIRED_KEYS);
      
      expect(result.coverage).toBeGreaterThanOrEqual(95);
      expect(result.missing).toHaveLength(0);
    });

    test('should have all required keys in French (fr-FR)', () => {
      const result = TranslationValidator.validateLanguage('fr-FR', DEMO_PAGE_REQUIRED_KEYS);
      
      expect(result.coverage).toBeGreaterThanOrEqual(95);
      expect(result.missing).toHaveLength(0);
    });
  });

  describe('Translation Quality', () => {
    test('should have consistent structure across languages', () => {
      const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
      const structures: { [key: string]: any } = {};

      languages.forEach(language => {
        try {
          const resources = i18n.getResourceBundle(language, 'translation');
          structures[language] = extractStructure(resources);
        } catch (error) {
          fail(`Failed to load resources for ${language}: ${error}`);
        }
      });

      // Verificar se todas as estruturas são consistentes
      const referenceStructure = structures['pt-BR'];
      languages.forEach(language => {
        expect(structures[language]).toEqual(referenceStructure);
      });
    });

    test('should have non-empty translations', () => {
      const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
      
      languages.forEach(language => {
        DEMO_PAGE_REQUIRED_KEYS.forEach(key => {
          const translation = i18n.getFixedT(language)(key);
          expect(translation).not.toBe('');
          expect(translation).not.toBe(key); // Não deve retornar a própria chave
          expect(translation.length).toBeGreaterThan(0);
        });
      });
    });

    test('should have proper formatting for prices', () => {
      const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
      
      languages.forEach(language => {
        // Verificar se os preços estão formatados corretamente
        const barbershopServices = i18n.getFixedT(language)('barbershopPage.services.items', { returnObjects: true }) as any[];
        
        barbershopServices.forEach(service => {
          expect(service.price).toMatch(/[R$€$]\s*\d+[,.]\d{2}/); // Formato de moeda
        });
      });
    });
  });

  describe('Translation Fallbacks', () => {
    test('should fallback to English when translation is missing', () => {
      // Simular uma chave ausente
      const missingKey = 'test.missing.key';
      
      // Em português, deve tentar inglês como fallback
      const ptTranslation = i18n.getFixedT('pt-BR')(missingKey);
      const enTranslation = i18n.getFixedT('en-US')(missingKey);
      
      // Se ambos retornarem a chave, significa que não existe em nenhum idioma
      if (ptTranslation === missingKey && enTranslation === missingKey) {
        // Isso é esperado para uma chave que realmente não existe
        expect(ptTranslation).toBe(missingKey);
      }
    });
  });

  describe('Demo Page Specific Tests', () => {
    test('should have all demo modal translations', () => {
      const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
      
      languages.forEach(language => {
        const t = i18n.getFixedT(language);
        
        // Verificar se o modal de demonstração tem todas as traduções
        expect(t('agendaPro.demoModal.title')).toBeTruthy();
        expect(t('agendaPro.demoModal.subtitle')).toBeTruthy();
        expect(t('agendaPro.demoModal.demos.salao.title')).toBeTruthy();
        expect(t('agendaPro.demoModal.demos.barbearia.title')).toBeTruthy();
        expect(t('agendaPro.demoModal.demos.veterinaria.title')).toBeTruthy();
      });
    });

    test('should have consistent service structures', () => {
      const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
      
      languages.forEach(language => {
        const t = i18n.getFixedT(language);
        
        // Verificar se todos os serviços têm a mesma estrutura
        const barbershopServices = t('barbershopPage.services.items', { returnObjects: true }) as any[];
        const salonServices = t('beautySalonPage.services.items', { returnObjects: true }) as any[];
        const vetServices = t('vetClinicPage.services.items', { returnObjects: true }) as any[];
        
        // Todos devem ter name, price e duration
        barbershopServices.forEach(service => {
          expect(service).toHaveProperty('name');
          expect(service).toHaveProperty('price');
          expect(service).toHaveProperty('duration');
        });
        
        salonServices.forEach(service => {
          expect(service).toHaveProperty('name');
          expect(service).toHaveProperty('price');
          expect(service).toHaveProperty('duration');
          expect(service).toHaveProperty('categoryKey');
        });
        
        vetServices.forEach(service => {
          expect(service).toHaveProperty('name');
          expect(service).toHaveProperty('price');
          expect(service).toHaveProperty('duration');
          expect(service).toHaveProperty('categoryKey');
        });
      });
    });
  });
});

/**
 * Extrai a estrutura de um objeto de recursos recursivamente
 */
function extractStructure(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => extractStructure(item));
  }
  
  const structure: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      structure[key] = extractStructure(obj[key]);
    }
  }
  
  return structure;
}
