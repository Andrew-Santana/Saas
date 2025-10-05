import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Benefits from './components/Benefits';
import SEO from './components/SEO';
import { useStructuredData } from './hooks/useStructuredData';
import { ROUTES } from './constants';

// Lazy loading para componentes pesados
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Pricing = lazy(() => import('./components/Pricing'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

// Lazy loading para páginas de demonstração
const SalaoBelezaPage = lazy(() => import('./pages/SalaoBelezaPage'));
const BarbeariaPage = lazy(() => import('./pages/BarbeariaPage'));
const ClinicaVeterinariaPage = lazy(() => import('./pages/ClinicaVeterinariaPage'));
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage }))
);
const InventoryDemoPage = lazy(() => import('./pages/InventoryDemoPage'));
const NewsletterDemoPage = lazy(() => import('./pages/NewsletterDemoPage'));
const ProductShowcaseDemoPage = lazy(() => import('./pages/ProductShowcaseDemoPage'));
const ProductReviewsDemoPage = lazy(() => import('./pages/ProductReviewsDemoPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
  </div>
);

// Componente da Landing Page
function LandingPage() {
  const { getSoftwareApplicationSchema, getOrganizationSchema } = useStructuredData();
  
  // Combinar schemas para a página principal
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getSoftwareApplicationSchema(),
      getOrganizationSchema()
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        structuredData={structuredData}
        url="https://agendapro.com.br"
      />
      <Navbar />
      <Hero />
      <Partners />
      <Benefits />
      
      {/* Lazy loaded components with Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <HowItWorks />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Pricing />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <FAQ />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <CTA />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route
          path={ROUTES.DEMO_SALAO}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SalaoBelezaPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.DEMO_BARBEARIA}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <BarbeariaPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.DEMO_VETERINARIA}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ClinicaVeterinariaPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.DEMO_DASHBOARD}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.DEMO_INVENTORY}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <InventoryDemoPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.DEMO_NEWSLETTER}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NewsletterDemoPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.DEMO_PRODUCT_SHOWCASE}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductShowcaseDemoPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.DEMO_PRODUCT_REVIEWS}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductReviewsDemoPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
