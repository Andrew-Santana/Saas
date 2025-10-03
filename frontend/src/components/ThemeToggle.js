import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
const ThemeToggle = ({ className = '' }) => {
    const { isDark, toggleTheme } = useTheme();
    return (_jsxs("button", { type: "button", onClick: toggleTheme, "aria-label": isDark ? 'Ativar modo claro' : 'Ativar modo escuro', className: `relative inline-flex items-center justify-center rounded-md border border-border bg-background/70 px-3 py-2 text-sm font-medium text-foreground shadow-soft transition-colors duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${className}`.trim(), children: [_jsx(Sun, { className: `h-5 w-5 transition-all duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-yellow-500'}`, "aria-hidden": !isDark }), _jsx(Moon, { className: `absolute h-5 w-5 transition-all duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100 text-blue-300' : '-rotate-90 scale-0 opacity-0'}`, "aria-hidden": isDark }), _jsx("span", { className: "sr-only", children: "Alternar tema" })] }));
};
export default ThemeToggle;
