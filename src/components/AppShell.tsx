import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Languages, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { useI18n } from '../hooks/useI18n';

type NavItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  to?: string;
  href?: string;
};

export const AppShell = () => {
  const { t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = React.useMemo<NavItem[]>(
    () => [
      {
        key: 'dashboard',
        label: t('navigation.dashboard'),
        icon: <LayoutDashboard className="h-4 w-4" />,
        to: '/dashboard',
      },
      {
        key: 'language-demo',
        label: t('language.select'),
        icon: <Languages className="h-4 w-4" />,
        to: '/language-demo',
      },
      {
        key: 'docs',
        label: 'Docs',
        icon: <BookOpen className="h-4 w-4" />,
        href: 'https://laravel.com/docs',
      },
    ],
    [t]
  );

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-card/95 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-hover"
            onClick={closeMobileMenu}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-gold shadow-soft">
              <svg className="h-5 w-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="whitespace-nowrap">SaaS Starter</span>
          </Link>

          <nav className="hidden items-center gap-4 text-sm font-medium text-muted-foreground lg:flex">
            {navItems.map(({ key, label, icon, to, href }) =>
              to ? (
                <Link
                  key={key}
                  to={to}
                  className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {icon}
                  {label}
                </Link>
              ) : (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {icon}
                  {label}
                </a>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <LanguageSelector className="w-36" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="app-shell-mobile-menu"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-card/80 text-foreground shadow-soft transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div id="app-shell-mobile-menu" className="border-t border-border/70 bg-card/95 sm:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5">
              <nav className="flex flex-col gap-3 text-sm font-medium">
                {navItems.map(({ key, label, icon, to, href }) =>
                  to ? (
                    <Link
                      key={key}
                      to={to}
                      onClick={closeMobileMenu}
                      className="inline-flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {icon}
                      {label}
                    </Link>
                  ) : (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeMobileMenu}
                      className="inline-flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {icon}
                      {label}
                    </a>
                  )
                )}
              </nav>
              <LanguageSelector className="w-full" />
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <Outlet />
      </main>
    </div>
  );
};
