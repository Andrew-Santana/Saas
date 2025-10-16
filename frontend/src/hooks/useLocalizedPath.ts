import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguageContext } from '../contexts/LanguageContext';

const languageRouteMapping: Record<string, string> = {
  'pt-BR': '',
  'en-US': '/en',
  'es-ES': '/es',
  'fr-FR': '/fr',
};

const reverseLanguageRouteMapping = Object.entries(languageRouteMapping).reduce(
  (acc, [lang, route]) => {
    acc[route || '/'] = lang;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Hook para gerenciar navegação e paths localizados para SEO multilíngue
 */
export const useLocalizedPath = () => {
  const { language: currentLanguage, changeLanguage: changeContextLanguage } = useLanguageContext();
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Obtém o prefixo da rota atual com base no idioma
   */
  const getLanguagePrefix = (language: string = currentLanguage): string => {
    return languageRouteMapping[language] || '';
  };

  /**
   * Remove o prefixo de idioma de um path
   */
  const stripLanguagePrefix = (path: string): string => {
    const prefixes = Object.values(languageRouteMapping).filter((p) => p !== '');
    for (const prefix of prefixes) {
      if (path.startsWith(prefix + '/') || path === prefix) {
        return path.slice(prefix.length) || '/';
      }
    }
    return path;
  };

  /**
   * Cria um path localizado para um idioma específico
   */
  const getLocalizedPath = (path: string, language?: string): string => {
    const lang = language || currentLanguage;
    const cleanPath = stripLanguagePrefix(path);
    const prefix = getLanguagePrefix(lang);
    
    if (!prefix) {
      return cleanPath;
    }
    
    return cleanPath === '/' ? prefix : `${prefix}${cleanPath}`;
  };

  /**
   * Navega para um path mantendo ou alterando o idioma
   */
  const navigateLocalized = (path: string, language?: string) => {
    const localizedPath = getLocalizedPath(path, language);
    navigate(localizedPath);
  };

  /**
   * Altera o idioma mantendo o mesmo path
   */
  const changeLanguage = async (newLanguage: string) => {
    const cleanPath = stripLanguagePrefix(location.pathname);
    const newPath = getLocalizedPath(cleanPath, newLanguage);
    
    await changeContextLanguage(newLanguage);
    navigate(newPath, { replace: true });
  };

  /**
   * Obtém todas as variações de URL do path atual para tags hreflang
   */
  const getAlternateUrls = (baseUrl: string = window.location.origin): Array<{
    lang: string;
    url: string;
    hreflang: string;
  }> => {
    const cleanPath = stripLanguagePrefix(location.pathname);
    const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
    
    return languages.map((lang) => {
      const localizedPath = getLocalizedPath(cleanPath, lang);
      const hreflangMap: Record<string, string> = {
        'pt-BR': 'pt-BR',
        'en-US': 'en-US',
        'es-ES': 'es-ES',
        'fr-FR': 'fr-FR',
      };
      
      return {
        lang,
        url: `${baseUrl}${localizedPath}`,
        hreflang: hreflangMap[lang] || lang,
      };
    });
  };

  /**
   * Obtém o idioma atual com base na URL
   */
  const getLanguageFromPath = (path: string = location.pathname): string => {
    for (const [route, lang] of Object.entries(reverseLanguageRouteMapping)) {
      if (route === '/' && !path.startsWith('/en') && !path.startsWith('/es') && !path.startsWith('/fr')) {
        return lang;
      }
      if (route !== '/' && path.startsWith(route)) {
        return lang;
      }
    }
    return 'pt-BR';
  };

  return {
    currentLanguage,
    getLanguagePrefix,
    stripLanguagePrefix,
    getLocalizedPath,
    navigateLocalized,
    changeLanguage,
    getAlternateUrls,
    getLanguageFromPath,
  };
};

