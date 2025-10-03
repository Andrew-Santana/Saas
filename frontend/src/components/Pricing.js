import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export default function Pricing() {
    const { t } = useTranslation();
    const plans = [
        {
            nameKey: 'agendaPro.pricing.plans.starter.name',
            priceKey: 'agendaPro.pricing.plans.starter.price',
            descriptionKey: 'agendaPro.pricing.plans.starter.description',
            featuresKey: 'agendaPro.pricing.plans.starter.features',
            ctaKey: 'agendaPro.pricing.plans.starter.cta',
            highlighted: false,
        },
        {
            nameKey: 'agendaPro.pricing.plans.pro.name',
            priceKey: 'agendaPro.pricing.plans.pro.price',
            descriptionKey: 'agendaPro.pricing.plans.pro.description',
            featuresKey: 'agendaPro.pricing.plans.pro.features',
            ctaKey: 'agendaPro.pricing.plans.pro.cta',
            popularKey: 'agendaPro.pricing.plans.pro.popular',
            highlighted: true,
        },
        {
            nameKey: 'agendaPro.pricing.plans.advanced.name',
            priceKey: 'agendaPro.pricing.plans.advanced.price',
            descriptionKey: 'agendaPro.pricing.plans.advanced.description',
            featuresKey: 'agendaPro.pricing.plans.advanced.features',
            ctaKey: 'agendaPro.pricing.plans.advanced.cta',
            highlighted: false,
        },
    ];
    return (_jsx("section", { id: "pricing", className: "py-20 bg-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-900 mb-4", children: t('agendaPro.pricing.title') }), _jsx("p", { className: "text-xl text-slate-600 max-w-2xl mx-auto mb-2", children: t('agendaPro.pricing.subtitle') }), _jsx("p", { className: "text-emerald-600 font-medium", children: t('agendaPro.pricing.freeTrial') })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: plans.map((plan, index) => (_jsxs("div", { className: `rounded-2xl p-8 ${plan.highlighted
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl transform scale-105 relative'
                            : 'bg-white border-2 border-slate-200 shadow-lg'}`, children: [plan.highlighted && (_jsx("div", { className: "absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold", children: t(plan.popularKey) })), _jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: `text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`, children: t(plan.nameKey) }), _jsx("p", { className: `text-sm mb-4 ${plan.highlighted ? 'text-emerald-50' : 'text-slate-600'}`, children: t(plan.descriptionKey) }), _jsxs("div", { className: "mb-2", children: [_jsx("span", { className: `text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`, children: t(plan.priceKey) }), _jsx("span", { className: `text-lg ${plan.highlighted ? 'text-emerald-50' : 'text-slate-600'}`, children: "/m\u00EAs" })] })] }), _jsx("ul", { className: "space-y-4 mb-8", children: t(plan.featuresKey, { returnObjects: true }).map((feature, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(Check, { className: `flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-emerald-600'}`, size: 20 }), _jsx("span", { className: `text-sm ${plan.highlighted ? 'text-white' : 'text-slate-700'}`, children: feature })] }, i))) }), _jsx("button", { className: `w-full py-3 px-6 rounded-lg font-semibold transition ${plan.highlighted
                                    ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'}`, children: t(plan.ctaKey) })] }, index))) }), _jsx("p", { className: "text-center text-slate-600 mt-12 max-w-2xl mx-auto", children: t('agendaPro.pricing.footer') })] }) }));
}
