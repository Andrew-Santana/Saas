import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserPlus, Palette, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export default function HowItWorks() {
    const { t } = useTranslation();
    const steps = t('agendaPro.howItWorks.steps', { returnObjects: true });
    const icons = [UserPlus, Palette, Share2];
    return (_jsx("section", { id: "how-it-works", className: "py-20 bg-slate-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-900 mb-4", children: t('agendaPro.howItWorks.title') }), _jsx("p", { className: "text-xl text-slate-600 max-w-2xl mx-auto", children: t('agendaPro.howItWorks.subtitle') })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-12 relative", children: steps.map((step, index) => {
                        const IconComponent = icons[index];
                        return (_jsx("div", { className: "relative", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg", children: _jsx(IconComponent, { className: "text-white", size: 36 }) }), _jsx("div", { className: "absolute top-10 left-1/2 w-full h-0.5 bg-emerald-200 -z-10 hidden md:block last:hidden" }), _jsxs("div", { className: "bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition", children: [_jsxs("div", { className: "text-emerald-600 font-bold text-lg mb-2", children: [t('agendaPro.howItWorks.stepLabel'), " ", index + 1] }), _jsx("h3", { className: "text-xl font-semibold text-slate-900 mb-3", children: step.title }), _jsx("p", { className: "text-slate-600 leading-relaxed", children: step.description })] })] }) }, index));
                    }) })] }) }));
}
