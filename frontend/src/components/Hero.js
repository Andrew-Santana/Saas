import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Calendar, PlayCircle, Smartphone, Monitor, X, Scissors, PawPrint, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../hooks/useAnalytics';
import { ROUTES, ANALYTICS_EVENTS } from '../constants';
export default function Hero() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    // Dados das demonstrações usando traduções
    const demos = [
        {
            id: 'salao',
            title: t('agendaPro.demoModal.demos.salao.title'),
            description: t('agendaPro.demoModal.demos.salao.description'),
            icon: Scissors,
            color: 'from-pink-500 to-rose-600',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200',
            features: t('agendaPro.demoModal.demos.salao.features', { returnObjects: true }),
            url: ROUTES.DEMO_SALAO,
            keywords: 'agendamento salão beleza, software salão, gestão salão de beleza'
        },
        {
            id: 'barbearia',
            title: t('agendaPro.demoModal.demos.barbearia.title'),
            description: t('agendaPro.demoModal.demos.barbearia.description'),
            icon: Monitor,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            features: t('agendaPro.demoModal.demos.barbearia.features', { returnObjects: true }),
            url: ROUTES.DEMO_BARBEARIA,
            keywords: 'agendamento barbearia, software barbearia, gestão barbearia'
        },
        {
            id: 'veterinaria',
            title: t('agendaPro.demoModal.demos.veterinaria.title'),
            description: t('agendaPro.demoModal.demos.veterinaria.description'),
            icon: PawPrint,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            features: t('agendaPro.demoModal.demos.veterinaria.features', { returnObjects: true }),
            url: ROUTES.DEMO_VETERINARIA,
            keywords: 'agendamento veterinária, software veterinária, gestão clínica veterinária'
        }
    ];
    const handleWatchDemoClick = () => {
        trackEvent(ANALYTICS_EVENTS.WATCH_DEMO_CLICK, {
            event_category: 'engagement',
            event_label: 'hero_demo',
        });
        setIsDemoModalOpen(true);
    };
    const handleDemoSelection = (demoId, demoTitle) => {
        trackEvent(ANALYTICS_EVENTS.DEMO_SELECTION_CLICK, {
            event_category: 'engagement',
            event_label: demoId,
            demo_type: demoTitle
        });
        setIsDemoModalOpen(false);
        // Redirecionar para a página específica usando React Router
        navigate(`/demonstracoes/${demoId}`);
    };
    const handleCloseModal = () => {
        setIsDemoModalOpen(false);
    };
    const handleFreeTrialClick = () => {
        trackEvent(ANALYTICS_EVENTS.FREE_TRIAL_CLICK, {
            event_category: 'engagement',
            event_label: 'hero_cta',
        });
    };
    return (_jsxs("section", { id: "hero", className: "pt-24 pb-16 bg-gradient-to-br from-slate-50 to-slate-100", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { className: "text-center lg:text-left", children: [_jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6", children: t('agendaPro.hero.title') }), _jsx("p", { className: "text-xl text-slate-600 mb-8 leading-relaxed", children: t('agendaPro.hero.subtitle') }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8", children: [_jsx("button", { onClick: handleFreeTrialClick, className: "bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5", "aria-label": "Iniciar teste gr\u00E1tis de 14 dias", children: t('agendaPro.hero.freeTrial') }), _jsxs("button", { onClick: handleWatchDemoClick, className: "bg-white text-slate-700 px-8 py-4 rounded-lg hover:bg-slate-50 transition font-semibold text-lg border-2 border-slate-200 flex items-center justify-center gap-2", "aria-label": "Assistir demonstra\u00E7\u00E3o do produto", children: [_jsx(PlayCircle, { size: 24, "aria-hidden": "true" }), t('agendaPro.hero.watchDemo')] })] }), _jsxs("div", { className: "flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-600", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "text-emerald-600", size: 20, "aria-hidden": "true" }), _jsxs("span", { children: [_jsx("strong", { className: "text-slate-900", children: "5.000+" }), " ", t('agendaPro.hero.companies')] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-yellow-400 text-lg", "aria-label": "Avalia\u00E7\u00E3o 4.9 de 5 estrelas", children: "\u2605\u2605\u2605\u2605\u2605" }), _jsxs("span", { children: [_jsx("strong", { className: "text-slate-900", children: "4.9" }), " ", t('agendaPro.hero.rating')] })] })] })] }), _jsx("div", { className: "relative", role: "img", "aria-label": "Demonstra\u00E7\u00E3o visual da plataforma AgendaPro", children: _jsxs("div", { className: "relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 aspect-square flex items-center justify-center", children: [_jsx("div", { className: "absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 transform rotate-3", children: _jsx(Smartphone, { size: 48, className: "text-emerald-600", "aria-hidden": "true" }) }), _jsx("div", { className: "absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 transform -rotate-3", children: _jsx(Monitor, { size: 48, className: "text-teal-600", "aria-hidden": "true" }) }), _jsx("div", { className: "bg-white rounded-xl shadow-lg p-6 w-full max-w-sm", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-4 bg-slate-200 rounded w-3/4", "aria-hidden": "true" }), _jsx("div", { className: "h-4 bg-slate-200 rounded w-1/2", "aria-hidden": "true" }), _jsx("div", { className: "grid grid-cols-3 gap-2 mt-6", children: [...Array(9)].map((_, i) => (_jsx("div", { className: "h-12 bg-emerald-100 rounded", "aria-hidden": "true" }, i))) }), _jsx("div", { className: "h-12 bg-emerald-600 rounded mt-4", "aria-hidden": "true" })] }) })] }) })] }) }), isDemoModalOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center p-6 border-b border-slate-200", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900", children: t('agendaPro.demoModal.title') }), _jsx("p", { className: "text-slate-600 mt-1", children: t('agendaPro.demoModal.subtitle') })] }), _jsx("button", { onClick: handleCloseModal, className: "text-slate-400 hover:text-slate-600 transition-colors", "aria-label": t('agendaPro.demoModal.closeButton'), children: _jsx(X, { size: 24 }) })] }), _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "grid md:grid-cols-3 gap-6", children: demos.map((demo) => {
                                        const IconComponent = demo.icon;
                                        return (_jsxs("div", { className: `group bg-white border-2 ${demo.borderColor} rounded-xl hover:border-emerald-300 transition-all duration-300 hover:shadow-lg`, children: [_jsxs("div", { className: `bg-gradient-to-br ${demo.color} p-6 rounded-t-xl text-center`, children: [_jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3", children: _jsx(IconComponent, { className: "text-white", size: 24 }) }), _jsx("h3", { className: "text-lg font-bold text-white mb-1", children: demo.title }), _jsx("p", { className: "text-white/90 text-sm", children: demo.description })] }), _jsxs("div", { className: "p-6", children: [_jsx("ul", { className: "space-y-2 mb-6", children: demo.features.map((feature, index) => (_jsxs("li", { className: "flex items-center gap-2 text-slate-700 text-sm", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" }), _jsx("span", { children: feature })] }, index))) }), _jsxs("button", { onClick: () => handleDemoSelection(demo.id, demo.title), className: `w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r ${demo.color} text-white hover:shadow-md flex items-center justify-center gap-2`, children: [_jsx("span", { children: t(`agendaPro.demoModal.demos.${demo.id}.button`) }), _jsx(ChevronRight, { size: 16 })] })] })] }, demo.id));
                                    }) }), _jsxs("div", { className: "mt-8 pt-6 border-t border-slate-200 text-center", children: [_jsx("p", { className: "text-slate-600 mb-4", children: t('agendaPro.demoModal.footer.text') }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [_jsx("button", { className: "bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium", children: t('agendaPro.demoModal.footer.expertButton') }), _jsx("button", { className: "bg-slate-100 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-200 transition font-medium", children: t('agendaPro.demoModal.footer.trialButton') })] })] })] })] }) }))] }));
}
