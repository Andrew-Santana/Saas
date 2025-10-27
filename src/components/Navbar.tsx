import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-900">{t('agendaPro.brand')}</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-700 hover:text-slate-900 transition">
              {t('agendaPro.navbar.services')}
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-slate-700 hover:text-slate-900 transition">
              {t('agendaPro.navbar.howItWorks')}
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-slate-700 hover:text-slate-900 transition">
              {t('agendaPro.navbar.testimonials')}
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-slate-700 hover:text-slate-900 transition">
              {t('agendaPro.navbar.pricing')}
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-slate-700 hover:text-slate-900 transition">
              {t('agendaPro.navbar.faq')}
            </button>
            <LanguageSelector className="w-32" />
            <button
              onClick={() => scrollToSection('hero')}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
            >
              {t('agendaPro.navbar.freeTrial')}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left text-slate-700 hover:text-slate-900 py-2">
              {t('navbar.services')}
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-slate-700 hover:text-slate-900 py-2">
              {t('navbar.howItWorks')}
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-slate-700 hover:text-slate-900 py-2">
              {t('navbar.testimonials')}
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-slate-700 hover:text-slate-900 py-2">
              {t('navbar.pricing')}
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-slate-700 hover:text-slate-900 py-2">
              {t('navbar.faq')}
            </button>
            <LanguageSelector className="w-full" />
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
            >
              {t('agendaPro.navbar.freeTrial')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
