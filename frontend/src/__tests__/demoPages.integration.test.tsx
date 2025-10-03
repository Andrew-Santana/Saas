import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import BarbeariaPage from '../pages/BarbeariaPage';
import SalaoBelezaPage from '../pages/SalaoBelezaPage';
import ClinicaVeterinariaPage from '../pages/ClinicaVeterinariaPage';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </I18nextProvider>
);

describe('Demo Pages Integration Tests', () => {
  beforeEach(async () => {
    await i18n.init();
  });

  describe('BarbeariaPage', () => {
    test('should render without translation errors', async () => {
      await i18n.changeLanguage('pt-BR');
      
      render(
        <TestWrapper>
          <BarbeariaPage />
        </TestWrapper>
      );

      // Verificar se os elementos principais estão presentes
      expect(screen.getByText(/Barbearia Moderna/i)).toBeInTheDocument();
      expect(screen.getByText(/Agendamento Online/i)).toBeInTheDocument();
      expect(screen.getByText(/Nossos Serviços/i)).toBeInTheDocument();
    });

    test('should render in English', async () => {
      await i18n.changeLanguage('en-US');
      
      render(
        <TestWrapper>
          <BarbeariaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Modern Barbershop/i)).toBeInTheDocument();
      expect(screen.getByText(/Online Booking/i)).toBeInTheDocument();
      expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    });

    test('should render in Spanish', async () => {
      await i18n.changeLanguage('es-ES');
      
      render(
        <TestWrapper>
          <BarbeariaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Barbería Moderna/i)).toBeInTheDocument();
      expect(screen.getByText(/Reserva Online/i)).toBeInTheDocument();
      expect(screen.getByText(/Nuestros Servicios/i)).toBeInTheDocument();
    });

    test('should render in French', async () => {
      await i18n.changeLanguage('fr-FR');
      
      render(
        <TestWrapper>
          <BarbeariaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Barbier Moderne/i)).toBeInTheDocument();
      expect(screen.getByText(/Réservation en ligne/i)).toBeInTheDocument();
      expect(screen.getByText(/Nos Services/i)).toBeInTheDocument();
    });
  });

  describe('SalaoBelezaPage', () => {
    test('should render without translation errors', async () => {
      await i18n.changeLanguage('pt-BR');
      
      render(
        <TestWrapper>
          <SalaoBelezaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Salão de Beleza Elegance/i)).toBeInTheDocument();
      expect(screen.getByText(/Agendamento Online/i)).toBeInTheDocument();
      expect(screen.getByText(/Nossos Serviços/i)).toBeInTheDocument();
    });

    test('should render in English', async () => {
      await i18n.changeLanguage('en-US');
      
      render(
        <TestWrapper>
          <SalaoBelezaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Elegance Beauty Salon/i)).toBeInTheDocument();
      expect(screen.getByText(/Online Booking/i)).toBeInTheDocument();
      expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    });

    test('should render in Spanish', async () => {
      await i18n.changeLanguage('es-ES');
      
      render(
        <TestWrapper>
          <SalaoBelezaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Salón de Belleza Elegance/i)).toBeInTheDocument();
      expect(screen.getByText(/Reserva Online/i)).toBeInTheDocument();
      expect(screen.getByText(/Nuestros Servicios/i)).toBeInTheDocument();
    });

    test('should render in French', async () => {
      await i18n.changeLanguage('fr-FR');
      
      render(
        <TestWrapper>
          <SalaoBelezaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Salon de Beauté Elegance/i)).toBeInTheDocument();
      expect(screen.getByText(/Réservation en ligne/i)).toBeInTheDocument();
      expect(screen.getByText(/Nos Services/i)).toBeInTheDocument();
    });
  });

  describe('ClinicaVeterinariaPage', () => {
    test('should render without translation errors', async () => {
      await i18n.changeLanguage('pt-BR');
      
      render(
        <TestWrapper>
          <ClinicaVeterinariaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Clínica Veterinária PetCare/i)).toBeInTheDocument();
      expect(screen.getByText(/Agendamento Online/i)).toBeInTheDocument();
      expect(screen.getByText(/Nossos Serviços/i)).toBeInTheDocument();
    });

    test('should render in English', async () => {
      await i18n.changeLanguage('en-US');
      
      render(
        <TestWrapper>
          <ClinicaVeterinariaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/PetCare Veterinary Clinic/i)).toBeInTheDocument();
      expect(screen.getByText(/Online Booking/i)).toBeInTheDocument();
      expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    });

    test('should render in Spanish', async () => {
      await i18n.changeLanguage('es-ES');
      
      render(
        <TestWrapper>
          <ClinicaVeterinariaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Clínica Veterinaria PetCare/i)).toBeInTheDocument();
      expect(screen.getByText(/Reserva Online/i)).toBeInTheDocument();
      expect(screen.getByText(/Nuestros Servicios/i)).toBeInTheDocument();
    });

    test('should render in French', async () => {
      await i18n.changeLanguage('fr-FR');
      
      render(
        <TestWrapper>
          <ClinicaVeterinariaPage />
        </TestWrapper>
      );

      expect(screen.getByText(/Clinique Vétérinaire PetCare/i)).toBeInTheDocument();
      expect(screen.getByText(/Réservation en ligne/i)).toBeInTheDocument();
      expect(screen.getByText(/Nos Services/i)).toBeInTheDocument();
    });
  });

  describe('Cross-language Consistency', () => {
    test('should have same number of services across languages', async () => {
      const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
      let serviceCounts: { [key: string]: number } = {};

      for (const language of languages) {
        await i18n.changeLanguage(language);
        
        const barbershopServices = i18n.getFixedT(language)('barbershopPage.services.items', { returnObjects: true }) as any[];
        serviceCounts[language] = barbershopServices.length;
      }

      // Todos devem ter o mesmo número de serviços
      const counts = Object.values(serviceCounts);
      const allSame = counts.every(count => count === counts[0]);
      expect(allSame).toBe(true);
    });

    test('should have same number of professionals across languages', async () => {
      const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
      let professionalCounts: { [key: string]: number } = {};

      for (const language of languages) {
        await i18n.changeLanguage(language);
        
        const barbershopProfessionals = i18n.getFixedT(language)('barbershopPage.professionals.items', { returnObjects: true }) as any[];
        professionalCounts[language] = barbershopProfessionals.length;
      }

      // Todos devem ter o mesmo número de profissionais
      const counts = Object.values(professionalCounts);
      const allSame = counts.every(count => count === counts[0]);
      expect(allSame).toBe(true);
    });
  });
});
