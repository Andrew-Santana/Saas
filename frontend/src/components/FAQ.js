import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from './SEO';
import { useStructuredData } from '../hooks/useStructuredData';
export default function FAQ() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(0);
    const { getFAQSchema } = useStructuredData();
    const faqs = t('agendaPro.faq.questions', { returnObjects: true });
    return (_jsxs("section", { id: "faq", className: "py-20 bg-white", children: [_jsx(SEO, { title: "Perguntas Frequentes", description: "Tire suas d\u00FAvidas sobre o AgendaPro. Encontre respostas para as perguntas mais comuns sobre nossa plataforma de agendamento.", structuredData: getFAQSchema() }), _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-900 mb-4", children: t('agendaPro.faq.title') }), _jsx("p", { className: "text-xl text-slate-600", children: t('agendaPro.faq.subtitle') })] }), _jsx("div", { className: "space-y-4", children: faqs.map((faq, index) => (_jsxs("div", { className: "border-2 border-slate-200 rounded-xl overflow-hidden hover:border-emerald-200 transition", itemScope: true, itemType: "https://schema.org/Question", children: [_jsxs("button", { onClick: () => setOpenIndex(openIndex === index ? null : index), className: "w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition", children: [_jsx("span", { className: "font-semibold text-slate-900 text-lg pr-4", itemProp: "name", children: faq.question }), _jsx(ChevronDown, { className: `flex-shrink-0 text-emerald-600 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`, size: 24 })] }), openIndex === index && (_jsx("div", { className: "px-6 py-5 bg-slate-50 border-t border-slate-200", itemScope: true, itemType: "https://schema.org/Answer", children: _jsx("p", { className: "text-slate-700 leading-relaxed", itemProp: "text", children: faq.answer }) }))] }, index))) })] })] }));
}
