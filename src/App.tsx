import { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Benefits from './components/Benefits';
import SEO from './components/SEO';
import { useStructuredData } from './hooks/useStructuredData';
import LocalizedRoutes from './components/LocalizedRoutes';
import { LanguageProvider } from './contexts/LanguageContext';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';

// Lazy loading para componentes pesados
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Pricing = lazy(() => import('./components/Pricing'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

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
  // Configurar basename para GitHub Pages (sem trailing slash)
  const basename = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.slice(0, -1);
  
  return (
    <LanguageProvider>
      <Router basename={basename}>
        <ChatbotWidget />
        <LocalizedRoutes LandingPage={LandingPage} />
      </Router>
    </LanguageProvider>
  );
}

export default App;
