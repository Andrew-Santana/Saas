import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { ROUTES } from '../constants';
import LanguageAwareWrapper from './LanguageAwareWrapper';
import i18n from '../i18n';

// Lazy loading para páginas de demonstração
const SalaoBelezaPage = lazy(() => import('../pages/SalaoBelezaPage'));
const BarbeariaPage = lazy(() => import('../pages/BarbeariaPage'));
const ClinicaVeterinariaPage = lazy(() => import('../pages/ClinicaVeterinariaPage'));
const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((module) => ({ default: module.DashboardPage }))
);
const InventoryDemoPage = lazy(() => import('../pages/InventoryDemoPage'));
const BancoHorasPage = lazy(() => import('../pages/BancoHorasPage'));
const NewsletterDemoPage = lazy(() => import('../pages/NewsletterDemoPage'));
const ProductShowcaseDemoPage = lazy(() => import('../pages/ProductShowcaseDemoPage'));
const ProductReviewsDemoPage = lazy(() => import('../pages/ProductReviewsDemoPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
  </div>
);

interface LocalizedRoutesProps {
  LandingPage: React.ComponentType;
}

export const LocalizedRoutes: React.FC<LocalizedRoutesProps> = ({ LandingPage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getLanguageFromPath, currentLanguage } = useLocalizedPath();

  // Sincronizar idioma da URL com i18n ao montar e quando a URL mudar
  useEffect(() => {
    const urlLanguage = getLanguageFromPath(location.pathname);
    const currentI18nLanguage = i18n.language;
    
    if (urlLanguage && urlLanguage !== currentI18nLanguage) {
      // A URL tem um idioma diferente do i18n atual, atualizar
      console.log(`[LocalizedRoutes] Mudando idioma de ${currentI18nLanguage} para ${urlLanguage}`);
      i18n.changeLanguage(urlLanguage).catch((error) => {
        console.error('Erro ao mudar idioma:', error);
      });
    }
  }, [location.pathname, getLanguageFromPath]);

  // Definir as rotas base (sem prefixo de idioma)
  const baseRoutes = [
    { path: ROUTES.HOME, element: <LandingPage />, exact: true },
    { path: ROUTES.DEMO_SALAO, element: <SalaoBelezaPage /> },
    { path: ROUTES.DEMO_BARBEARIA, element: <BarbeariaPage /> },
    { path: ROUTES.DEMO_VETERINARIA, element: <ClinicaVeterinariaPage /> },
    { path: ROUTES.DEMO_DASHBOARD, element: <DashboardPage /> },
    { path: ROUTES.DEMO_INVENTORY, element: <InventoryDemoPage /> },
    { path: ROUTES.DEMO_TIME_BANK, element: <BancoHorasPage /> },
    { path: ROUTES.DEMO_NEWSLETTER, element: <NewsletterDemoPage /> },
    { path: ROUTES.DEMO_PRODUCT_SHOWCASE, element: <ProductShowcaseDemoPage /> },
    { path: ROUTES.DEMO_PRODUCT_REVIEWS, element: <ProductReviewsDemoPage /> },
  ];

  // Prefixos de idioma
  const languagePrefixes = ['', '/en', '/es', '/fr'];

  return (
    <Routes key={currentLanguage}>
      {/* Gerar rotas para cada prefixo de idioma */}
      {languagePrefixes.map((prefix) =>
        baseRoutes.map((route, index) => {
          const fullPath = prefix === '' ? route.path : `${prefix}${route.path}`;
          return (
            <Route
              key={`${prefix}-${index}`}
              path={fullPath}
              element={
                <LanguageAwareWrapper>
                  <Suspense fallback={<LoadingSpinner />}>
                    {route.element}
                  </Suspense>
                </LanguageAwareWrapper>
              }
            />
          );
        })
      )}
    </Routes>
  );
};

export default LocalizedRoutes;
