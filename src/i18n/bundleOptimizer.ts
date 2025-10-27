/**
 * Otimizador de bundle para traduções
 */

// Configurações de otimização
export const BUNDLE_OPTIMIZATION_CONFIG = {
  // Idiomas críticos (carregados imediatamente)
  criticalLanguages: ['pt-BR', 'en-US'],
  
  // Idiomas secundários (carregados sob demanda)
  secondaryLanguages: ['es-ES', 'fr-FR'],
  
  // Tamanho máximo do bundle inicial (em KB)
  maxInitialBundleSize: 500,
  
  // Tamanho máximo por tradução (em KB)
  maxTranslationSize: 200,
  
  // Timeout para carregamento (em ms)
  loadingTimeout: 5000,
  
  // Cache de traduções
  enableCache: true,
  cacheExpiration: 24 * 60 * 60 * 1000, // 24 horas
};

/**
 * Analisa o tamanho dos bundles de tradução
 */
export const analyzeBundleSizes = async (): Promise<{
  [language: string]: {
    size: number;
    compressed: number;
    gzipped: number;
  };
}> => {
  const analysis: any = {};

  for (const language of BUNDLE_OPTIMIZATION_CONFIG.criticalLanguages) {
    try {
      const module = await import(`./locales/${language}/translation.json`);
      const jsonString = JSON.stringify(module.default);
      const size = new Blob([jsonString]).size;
      
      analysis[language] = {
        size,
        compressed: Math.round(size * 0.7), // Estimativa
        gzipped: Math.round(size * 0.3), // Estimativa
      };
    } catch (error) {
      console.error(`Erro ao analisar ${language}:`, error);
    }
  }

  return analysis;
};

/**
 * Otimiza o carregamento de traduções baseado na conexão
 */
export const optimizeForConnection = (): {
  preloadLanguages: string[];
  lazyLoadLanguages: string[];
} => {
  // Detectar tipo de conexão
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) {
    // Conexão desconhecida, usar configuração padrão
    return {
      preloadLanguages: BUNDLE_OPTIMIZATION_CONFIG.criticalLanguages,
      lazyLoadLanguages: BUNDLE_OPTIMIZATION_CONFIG.secondaryLanguages,
    };
  }

  const { effectiveType, downlink } = connection;
  
  // Conexão rápida (4G, 5G)
  if (effectiveType === '4g' || effectiveType === '5g' || downlink > 2) {
    return {
      preloadLanguages: ['pt-BR', 'en-US', 'es-ES'],
      lazyLoadLanguages: ['fr-FR'],
    };
  }
  
  // Conexão média (3G)
  if (effectiveType === '3g' || downlink > 0.5) {
    return {
      preloadLanguages: BUNDLE_OPTIMIZATION_CONFIG.criticalLanguages,
      lazyLoadLanguages: BUNDLE_OPTIMIZATION_CONFIG.secondaryLanguages,
    };
  }
  
  // Conexão lenta (2G)
  return {
    preloadLanguages: ['pt-BR'],
    lazyLoadLanguages: ['en-US', 'es-ES', 'fr-FR'],
  };
};

/**
 * Gera estratégia de carregamento baseada no contexto
 */
export const generateLoadingStrategy = (): {
  strategy: 'aggressive' | 'balanced' | 'conservative';
  preloadLanguages: string[];
  lazyLoadLanguages: string[];
  preloadDelay: number;
} => {
  const connectionOptimization = optimizeForConnection();
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Dispositivo móvel
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  // Dispositivo com pouca memória
  const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  
  // Determinar estratégia
  let strategy: 'aggressive' | 'balanced' | 'conservative';
  
  if (isMobile || isLowMemory) {
    strategy = 'conservative';
  } else if (connectionOptimization.preloadLanguages.length > 2) {
    strategy = 'aggressive';
  } else {
    strategy = 'balanced';
  }
  
  return {
    strategy,
    preloadLanguages: connectionOptimization.preloadLanguages,
    lazyLoadLanguages: connectionOptimization.lazyLoadLanguages,
    preloadDelay: strategy === 'conservative' ? 2000 : 0,
  };
};

/**
 * Monitora performance de carregamento
 */
export class TranslationPerformanceMonitor {
  private static metrics: {
    [language: string]: {
      loadTime: number;
      size: number;
      error?: string;
    };
  } = {};

  static startLoading(language: string): void {
    this.metrics[language] = {
      loadTime: performance.now(),
      size: 0,
    };
  }

  static endLoading(language: string, size: number, error?: string): void {
    if (this.metrics[language]) {
      this.metrics[language].loadTime = performance.now() - this.metrics[language].loadTime;
      this.metrics[language].size = size;
      this.metrics[language].error = error;
    }
  }

  static getMetrics(): typeof this.metrics {
    return { ...this.metrics };
  }

  static getAverageLoadTime(): number {
    const times = Object.values(this.metrics)
      .filter(metric => !metric.error)
      .map(metric => metric.loadTime);
    
    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  }

  static clearMetrics(): void {
    this.metrics = {};
  }
}

export default BUNDLE_OPTIMIZATION_CONFIG;
