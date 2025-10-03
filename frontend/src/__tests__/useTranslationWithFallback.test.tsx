import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { useTranslationWithFallback } from '../hooks/useTranslationWithFallback';

// Mock do console para evitar logs durante os testes
const originalConsoleWarn = console.warn;
const originalConsoleInfo = console.info;
const originalConsoleError = console.error;

beforeAll(() => {
  console.warn = jest.fn();
  console.info = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.warn = originalConsoleWarn;
  console.info = originalConsoleInfo;
  console.error = originalConsoleError;
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>
);

describe('useTranslationWithFallback', () => {
  beforeEach(async () => {
    await i18n.init();
  });

  test('should return translation for existing key', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    const translation = result.current.t('agendaPro.brand');
    expect(translation).toBe('AgendaPro');
  });

  test('should return fallback for missing key', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    const translation = result.current.t('nonexistent.key');
    expect(translation).toBe('[Nonexistent Key]');
  });

  test('should return custom fallback when provided', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    const translation = result.current.t('nonexistent.key', {}, 'Custom Fallback');
    expect(translation).toBe('Custom Fallback');
  });

  test('should fallback to English when Portuguese translation is missing', async () => {
    // Mudar para português
    await act(async () => {
      await i18n.changeLanguage('pt-BR');
    });

    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    // Usar uma chave que existe em inglês mas não em português
    const translation = result.current.t('agendaPro.brand');
    expect(translation).toBe('AgendaPro');
  });

  test('should detect if translation exists', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    expect(result.current.hasTranslation('agendaPro.brand')).toBe(true);
    expect(result.current.hasTranslation('nonexistent.key')).toBe(false);
  });

  test('should validate translations', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    const requiredKeys = ['agendaPro.brand', 'nonexistent.key'];
    const validation = result.current.validateTranslations(requiredKeys);
    
    expect(validation.present).toContain('agendaPro.brand');
    expect(validation.missing).toContain('nonexistent.key');
  });

  test('should generate readable fallback from camelCase key', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    const translation = result.current.t('someCamelCaseKey');
    expect(translation).toBe('[Some Camel Case Key]');
  });

  test('should handle nested keys in fallback generation', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    const translation = result.current.t('agendaPro.hero.title');
    expect(translation).toBe('[Title]');
  });

  test('should handle translation errors gracefully', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    // Simular um erro de tradução
    const originalT = result.current.tOriginal;
    jest.spyOn(result.current, 'tOriginal').mockImplementation(() => {
      throw new Error('Translation error');
    });
    
    const translation = result.current.t('some.key');
    expect(translation).toBe('[Key]');
    
    // Restaurar implementação original
    result.current.tOriginal = originalT;
  });

  test('should work with interpolation', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    const translation = result.current.t('barbershopPage.services.durationLabel', { duration: '30 min' });
    expect(translation).toContain('30 min');
  });

  test('should work with returnObjects option', () => {
    const { result } = renderHook(() => useTranslationWithFallback(), { wrapper });
    
    const translation = result.current.t('barbershopPage.services.items', { returnObjects: true });
    expect(Array.isArray(translation)).toBe(true);
    expect(translation.length).toBeGreaterThan(0);
  });
});
