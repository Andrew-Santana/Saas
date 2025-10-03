import { Facebook, Instagram, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white text-2xl font-bold mb-4">{t('agendaPro.footer.brand')}</h3>
            <p className="text-slate-400 mb-4 leading-relaxed">
              {t('agendaPro.footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('agendaPro.footer.menu.title')}</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('services')} className="text-slate-400 hover:text-white transition">
                  {t('agendaPro.footer.menu.services')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="text-slate-400 hover:text-white transition">
                  {t('agendaPro.footer.menu.howItWorks')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="text-slate-400 hover:text-white transition">
                  {t('agendaPro.footer.menu.pricing')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="text-slate-400 hover:text-white transition">
                  {t('agendaPro.footer.menu.testimonials')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('agendaPro.footer.legal.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  {t('agendaPro.footer.legal.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  {t('agendaPro.footer.legal.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  {t('agendaPro.footer.legal.lgpd')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  {t('agendaPro.footer.legal.cookies')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('agendaPro.footer.newsletter.title')}</h4>
            <p className="text-slate-400 mb-4 text-sm">
              {t('agendaPro.footer.newsletter.description')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('agendaPro.footer.newsletter.placeholder')}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>{t('agendaPro.footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
