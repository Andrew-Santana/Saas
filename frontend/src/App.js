import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Benefits from './components/Benefits';
import SEO from './components/SEO';
import { useStructuredData } from './hooks/useStructuredData';
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
// Loading component
const LoadingSpinner = () => (_jsx("div", { className: "flex justify-center items-center py-20", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" }) }));
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
    return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsx(SEO, { structuredData: structuredData, url: "https://agendapro.com.br" }), _jsx(Navbar, {}), _jsx(Hero, {}), _jsx(Partners, {}), _jsx(Benefits, {}), _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(HowItWorks, {}) }), _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(Pricing, {}) }), _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(Testimonials, {}) }), _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(FAQ, {}) }), _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(CTA, {}) }), _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(Footer, {}) })] }));
}
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/demonstracoes/salao", element: _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(SalaoBelezaPage, {}) }) }), _jsx(Route, { path: "/demonstracoes/barbearia", element: _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(BarbeariaPage, {}) }) }), _jsx(Route, { path: "/demonstracoes/veterinaria", element: _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(ClinicaVeterinariaPage, {}) }) })] }) }));
}
export default App;
