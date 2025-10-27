import { useCallback, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'saas-theme-preference';

const isBrowser = typeof window !== 'undefined';

const getStoredTheme = (): Theme | null => {
  if (!isBrowser) return null;

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return null;
};

const getSystemTheme = (): Theme => {
  if (!isBrowser) return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyThemeClass = (theme: Theme) => {
  if (!isBrowser) return;

  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = getStoredTheme() ?? getSystemTheme();
    applyThemeClass(initial);
    return initial;
  });

  useEffect(() => {
    applyThemeClass(theme);
    if (isBrowser) {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    if (!isBrowser) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      const stored = getStoredTheme();
      if (stored) return; // user preference wins
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme]
  );

  return value;
};

export type UseThemeReturn = ReturnType<typeof useTheme>;
