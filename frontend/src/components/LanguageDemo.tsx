import React from 'react';
import { useI18n } from '../hooks/useI18n';
import LanguageSelector from './LanguageSelector';

const LanguageDemo: React.FC = () => {
  const { t, i18n } = useI18n();

  const currentLanguage = i18n.language;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('languageDemo.title')}
        </h1>
        <p className="text-gray-600 mb-6">
          {t('languageDemo.description')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{t('languageDemo.currentLanguage')}</h2>
        <p className="text-lg">
          <span className="font-medium">{currentLanguage}</span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{t('languageDemo.selectYourLanguage')}</h2>
        <LanguageSelector />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">{t('languageDemo.greeting')}</h3>
          <p className="text-gray-700">
            {t('languageDemo.greeting', { name: 'João', count: 5 })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">{t('languageDemo.plural.message_one')}</h3>
          <p className="text-gray-700">
            {t('languageDemo.plural.message_one', { count: 1 })}
          </p>
          <p className="text-gray-700 mt-2">
            {t('languageDemo.plural.message_other', { count: 10 })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{t('languageDemo.interpolationExample')}</h3>
        <p className="text-gray-700">
          {t('languageDemo.interpolationExample', { 
            user: 'Maria', 
            date: new Date().toLocaleDateString() 
          })}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{t('languageDemo.dynamicContent')}</h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            {t('languageDemo.itemCount', { count: 1 })}
          </p>
          <p className="text-gray-700">
            {t('languageDemo.itemCount_plural', { count: 5 })}
          </p>
          <p className="text-gray-700">
            {t('languageDemo.dateExample', { date: new Date().toLocaleDateString() })}
          </p>
          <p className="text-gray-700">
            {t('languageDemo.currencyExample', { price: '$99.99' })}
          </p>
          <p className="text-gray-700">
            {t('languageDemo.numberExample', { number: 12345 })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{t('languageDemo.nestedTranslation')}</h3>
        <p className="text-gray-700">
          {t('languageDemo.nestedTranslation', { 
            nested: t('languageDemo.nestedValue') 
          })}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{t('languageDemo.complexExample')}</h3>
        <p className="text-gray-700">
          {t('languageDemo.complexExample', { 
            val: 'primeiro valor', 
            anotherVal: 'segundo valor' 
          })}
        </p>
      </div>

      <div className="text-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          {t('languageDemo.buttonText')}
        </button>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>{t('languageDemo.footerText')}</p>
      </div>
    </div>
  );
};

export default LanguageDemo;