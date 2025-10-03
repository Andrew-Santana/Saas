import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguagesList } from '../i18n';
const LanguageSelector = ({ className = '' }) => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.resolvedLanguage || i18n.language;
    const changeLanguage = (lng) => {
        if (!lng || lng === currentLanguage)
            return;
        i18n.changeLanguage(lng);
    };
    return (_jsx("div", { className: `relative inline-block text-left ${className}`, children: _jsx("select", { value: currentLanguage, onChange: (e) => changeLanguage(e.target.value), className: "block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md bg-white text-slate-900 shadow-sm", children: supportedLanguagesList.map((lang) => (_jsxs("option", { value: lang.code, children: [lang.flag, " ", lang.name] }, lang.code))) }) }));
};
export default LanguageSelector;
