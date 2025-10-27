import React from 'react';
import { useLanguageContext } from '../contexts/LanguageContext';

interface LanguageAwareWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper que força re-renderização quando o idioma muda
 * Usa o contexto de idioma para garantir re-renderização
 */
export const LanguageAwareWrapper: React.FC<LanguageAwareWrapperProps> = ({ children }) => {
  const { language } = useLanguageContext();
  
  // Usar o idioma do contexto como key para forçar re-montagem completa
  // Quando language muda, todo o componente filho é desmontado e remontado
  return <div key={language}>{children}</div>;
};

export default LanguageAwareWrapper;

