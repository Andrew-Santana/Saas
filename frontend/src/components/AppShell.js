import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Languages, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { useI18n } from '../hooks/useI18n';
export const AppShell = () => {
    const { t } = useI18n();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const navItems = React.useMemo(() => [
        {
            key: 'dashboard',
            label: t('navigation.dashboard'),
            icon: _jsx(LayoutDashboard, { className: "h-4 w-4" }),
            to: '/dashboard',
        },
        {
            key: 'language-demo',
            label: t('language.select'),
            icon: _jsx(Languages, { className: "h-4 w-4" }),
            to: '/language-demo',
        },
        {
            key: 'docs',
            label: 'Docs',
            icon: _jsx(BookOpen, { className: "h-4 w-4" }),
            href: 'https://laravel.com/docs',
        },
    ], [t]);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground transition-colors", children: [_jsxs("header", { className: "sticky top-0 z-40 border-b border-border/70 bg-card/95 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-card/80", children: [_jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-hover", onClick: closeMobileMenu, children: [_jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-gold shadow-soft", children: _jsx("svg", { className: "h-5 w-5 text-navy", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }), _jsx("span", { className: "whitespace-nowrap", children: "SaaS Starter" })] }), _jsx("nav", { className: "hidden items-center gap-4 text-sm font-medium text-muted-foreground lg:flex", children: navItems.map(({ key, label, icon, to, href }) => to ? (_jsxs(Link, { to: to, className: "inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", children: [icon, label] }, key)) : (_jsxs("a", { href: href, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", children: [icon, label] }, key))) }), _jsxs("div", { className: "hidden items-center gap-3 sm:flex", children: [_jsx(LanguageSelector, { className: "w-36" }), _jsx(ThemeToggle, {})] }), _jsxs("div", { className: "flex items-center gap-2 sm:hidden", children: [_jsx(ThemeToggle, {}), _jsx("button", { type: "button", onClick: () => setIsMobileMenuOpen((open) => !open), "aria-expanded": isMobileMenuOpen, "aria-controls": "app-shell-mobile-menu", "aria-label": isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu', className: "inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-card/80 text-foreground shadow-soft transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background", children: isMobileMenuOpen ? _jsx(X, { className: "h-5 w-5" }) : _jsx(Menu, { className: "h-5 w-5" }) })] })] }), isMobileMenuOpen && (_jsx("div", { id: "app-shell-mobile-menu", className: "border-t border-border/70 bg-card/95 sm:hidden", children: _jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5", children: [_jsx("nav", { className: "flex flex-col gap-3 text-sm font-medium", children: navItems.map(({ key, label, icon, to, href }) => to ? (_jsxs(Link, { to: to, onClick: closeMobileMenu, className: "inline-flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary", children: [icon, label] }, key)) : (_jsxs("a", { href: href, target: "_blank", rel: "noreferrer", onClick: closeMobileMenu, className: "inline-flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary", children: [icon, label] }, key))) }), _jsx(LanguageSelector, { className: "w-full" })] }) }))] }), _jsx("main", { className: "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12", children: _jsx(Outlet, {}) })] }));
};
