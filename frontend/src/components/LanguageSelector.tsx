import React, { useState } from 'react';
import { Globe, Check, Loader2 } from 'lucide-react';
import { supportedLanguagesList } from '../i18n';
import { useSmartTranslation } from '../hooks/useSmartTranslation';

interface LanguageSelectorProps {
  className?: string;
  showFlags?: boolean;
  showNames?: boolean;
}

/**
 * Seletor de idioma com lazy loading
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  showFlags = true,
  showNames = true
}) => {
  const { changeLanguage, isLanguageLoaded, loadingLanguages } = useSmartTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('pt-BR');

  const handleLanguageChange = async (languageCode: string) => {
    if (languageCode === currentLanguage) {
      setIsOpen(false);
      return;
    }

    try {
      await changeLanguage(languageCode);
      setCurrentLanguage(languageCode);
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao mudar idioma:', error);
    }
  };

  const getCurrentLanguageInfo = () => {
    return supportedLanguagesList.find(lang => lang.code === currentLanguage) || supportedLanguagesList[0];
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="Selecionar idioma"
      >
        <Globe className="h-4 w-4 text-gray-600" />
        {showFlags && (
          <span className="text-lg">{getCurrentLanguageInfo().flag}</span>
        )}
        {showNames && (
          <span className="text-sm font-medium text-gray-700">
            {getCurrentLanguageInfo().name}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {supportedLanguagesList.map((language) => {
                const isLoading = loadingLanguages.includes(language.code);
                const isLoaded = isLanguageLoaded(language.code);
                const isCurrent = language.code === currentLanguage;

                return (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    disabled={isLoading}
                    className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                      isCurrent ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      {showFlags && (
                        <span className="text-lg">{language.flag}</span>
                      )}
                      <span className="text-sm font-medium">
                        {language.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {isLoading && (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                      )}
                      {isCurrent && !isLoading && (
                        <Check className="h-4 w-4 text-blue-500" />
                      )}
                      {!isLoaded && !isLoading && !isCurrent && (
                        <div className="h-2 w-2 bg-gray-300 rounded-full" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
