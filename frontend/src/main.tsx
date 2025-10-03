import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import i18n from './i18n'; // Importar configuração do i18n

// Aguardar inicialização do i18n
const initApp = async () => {
  await i18n.isInitialized;
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
};

initApp();
