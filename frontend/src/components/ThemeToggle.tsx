import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className={`relative inline-flex items-center justify-center rounded-md border border-border bg-background/70 px-3 py-2 text-sm font-medium text-foreground shadow-soft transition-colors duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${className}`.trim()}
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-yellow-500'}`}
        aria-hidden={!isDark}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100 text-blue-300' : '-rotate-90 scale-0 opacity-0'}`}
        aria-hidden={isDark}
      />
      <span className="sr-only">Alternar tema</span>
    </button>
  );
};

export default ThemeToggle;
