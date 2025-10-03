import React, { useEffect, useState } from 'react';
import { Loader2, Globe, AlertTriangle } from 'lucide-react';
import { TranslationLazyLoader } from '../i18n/lazyLoader';

interface TranslationLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente que gerencia o carregamento de traduções
 */
const TranslationLoader: React.FC<TranslationLoaderProps> = ({ 
  children, 
  fallback 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [loadedLanguages, setLoadedLanguages] = useState<string[]>([]);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Carregar idiomas críticos primeiro
        await TranslationLazyLoader.preloadCriticalLanguages();
        
        // Carregar idiomas preferidos do usuário
        await TranslationLazyLoader.loadUserPreferredLanguages();

        setLoadedLanguages(TranslationLazyLoader.getLoadedLanguages());
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Erro ao Carregar Traduções
            </h2>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              Não foi possível carregar as traduções necessárias:
            </p>
            <p className="text-sm text-red-600 font-mono bg-red-50 p-2 rounded">
              {error.message}
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Carregando Traduções
            </h2>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              Preparando conteúdo em seu idioma preferido...
            </p>
            
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            </div>
          </div>

          <div className="text-sm text-gray-500 text-center">
            Idiomas carregados: {loadedLanguages.join(', ') || 'Nenhum'}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TranslationLoader;
