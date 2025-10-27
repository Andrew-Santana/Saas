import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import BarbeariaPage from '../pages/BarbeariaPage';
import SalaoBelezaPage from '../pages/SalaoBelezaPage';
import ClinicaVeterinariaPage from '../pages/ClinicaVeterinariaPage';
const TestWrapper = ({ children }) => (_jsx(I18nextProvider, { i18n: i18n, children: _jsx(BrowserRouter, { children: children }) }));
describe('Demo Pages Integration Tests', () => {
    beforeEach(async () => {
        await i18n.init();
    });
    describe('BarbeariaPage', () => {
        test('should render without translation errors', async () => {
            await i18n.changeLanguage('pt-BR');
            render(_jsx(TestWrapper, { children: _jsx(BarbeariaPage, {}) }));
            // Verificar se os elementos principais estão presentes
            expect(screen.getByText(/Barbearia Moderna/i)).toBeInTheDocument();
            expect(screen.getByText(/Agendamento Online/i)).toBeInTheDocument();
            expect(screen.getByText(/Nossos Serviços/i)).toBeInTheDocument();
        });
        test('should render in English', async () => {
            await i18n.changeLanguage('en-US');
            render(_jsx(TestWrapper, { children: _jsx(BarbeariaPage, {}) }));
            expect(screen.getByText(/Modern Barbershop/i)).toBeInTheDocument();
            expect(screen.getByText(/Online Booking/i)).toBeInTheDocument();
            expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
        });
        test('should render in Spanish', async () => {
            await i18n.changeLanguage('es-ES');
            render(_jsx(TestWrapper, { children: _jsx(BarbeariaPage, {}) }));
            expect(screen.getByText(/Barbería Moderna/i)).toBeInTheDocument();
            expect(screen.getByText(/Reserva Online/i)).toBeInTheDocument();
            expect(screen.getByText(/Nuestros Servicios/i)).toBeInTheDocument();
        });
        test('should render in French', async () => {
            await i18n.changeLanguage('fr-FR');
            render(_jsx(TestWrapper, { children: _jsx(BarbeariaPage, {}) }));
            expect(screen.getByText(/Barbier Moderne/i)).toBeInTheDocument();
            expect(screen.getByText(/Réservation en ligne/i)).toBeInTheDocument();
            expect(screen.getByText(/Nos Services/i)).toBeInTheDocument();
        });
    });
    describe('SalaoBelezaPage', () => {
        test('should render without translation errors', async () => {
            await i18n.changeLanguage('pt-BR');
            render(_jsx(TestWrapper, { children: _jsx(SalaoBelezaPage, {}) }));
            expect(screen.getByText(/Salão de Beleza Elegance/i)).toBeInTheDocument();
            expect(screen.getByText(/Agendamento Online/i)).toBeInTheDocument();
            expect(screen.getByText(/Nossos Serviços/i)).toBeInTheDocument();
        });
        test('should render in English', async () => {
            await i18n.changeLanguage('en-US');
            render(_jsx(TestWrapper, { children: _jsx(SalaoBelezaPage, {}) }));
            expect(screen.getByText(/Elegance Beauty Salon/i)).toBeInTheDocument();
            expect(screen.getByText(/Online Booking/i)).toBeInTheDocument();
            expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
        });
        test('should render in Spanish', async () => {
            await i18n.changeLanguage('es-ES');
            render(_jsx(TestWrapper, { children: _jsx(SalaoBelezaPage, {}) }));
            expect(screen.getByText(/Salón de Belleza Elegance/i)).toBeInTheDocument();
            expect(screen.getByText(/Reserva Online/i)).toBeInTheDocument();
            expect(screen.getByText(/Nuestros Servicios/i)).toBeInTheDocument();
        });
        test('should render in French', async () => {
            await i18n.changeLanguage('fr-FR');
            render(_jsx(TestWrapper, { children: _jsx(SalaoBelezaPage, {}) }));
            expect(screen.getByText(/Salon de Beauté Elegance/i)).toBeInTheDocument();
            expect(screen.getByText(/Réservation en ligne/i)).toBeInTheDocument();
            expect(screen.getByText(/Nos Services/i)).toBeInTheDocument();
        });
    });
    describe('ClinicaVeterinariaPage', () => {
        test('should render without translation errors', async () => {
            await i18n.changeLanguage('pt-BR');
            render(_jsx(TestWrapper, { children: _jsx(ClinicaVeterinariaPage, {}) }));
            expect(screen.getByText(/Clínica Veterinária PetCare/i)).toBeInTheDocument();
            expect(screen.getByText(/Agendamento Online/i)).toBeInTheDocument();
            expect(screen.getByText(/Nossos Serviços/i)).toBeInTheDocument();
        });
        test('should render in English', async () => {
            await i18n.changeLanguage('en-US');
            render(_jsx(TestWrapper, { children: _jsx(ClinicaVeterinariaPage, {}) }));
            expect(screen.getByText(/PetCare Veterinary Clinic/i)).toBeInTheDocument();
            expect(screen.getByText(/Online Booking/i)).toBeInTheDocument();
            expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
        });
        test('should render in Spanish', async () => {
            await i18n.changeLanguage('es-ES');
            render(_jsx(TestWrapper, { children: _jsx(ClinicaVeterinariaPage, {}) }));
            expect(screen.getByText(/Clínica Veterinaria PetCare/i)).toBeInTheDocument();
            expect(screen.getByText(/Reserva Online/i)).toBeInTheDocument();
            expect(screen.getByText(/Nuestros Servicios/i)).toBeInTheDocument();
        });
        test('should render in French', async () => {
            await i18n.changeLanguage('fr-FR');
            render(_jsx(TestWrapper, { children: _jsx(ClinicaVeterinariaPage, {}) }));
            expect(screen.getByText(/Clinique Vétérinaire PetCare/i)).toBeInTheDocument();
            expect(screen.getByText(/Réservation en ligne/i)).toBeInTheDocument();
            expect(screen.getByText(/Nos Services/i)).toBeInTheDocument();
        });
    });
    describe('Cross-language Consistency', () => {
        test('should have same number of services across languages', async () => {
            const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
            let serviceCounts = {};
            for (const language of languages) {
                await i18n.changeLanguage(language);
                const barbershopServices = i18n.getFixedT(language)('barbershopPage.services.items', { returnObjects: true });
                serviceCounts[language] = barbershopServices.length;
            }
            // Todos devem ter o mesmo número de serviços
            const counts = Object.values(serviceCounts);
            const allSame = counts.every(count => count === counts[0]);
            expect(allSame).toBe(true);
        });
        test('should have same number of professionals across languages', async () => {
            const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
            let professionalCounts = {};
            for (const language of languages) {
                await i18n.changeLanguage(language);
                const barbershopProfessionals = i18n.getFixedT(language)('barbershopPage.professionals.items', { returnObjects: true });
                professionalCounts[language] = barbershopProfessionals.length;
            }
            // Todos devem ter o mesmo número de profissionais
            const counts = Object.values(professionalCounts);
            const allSame = counts.every(count => count === counts[0]);
            expect(allSame).toBe(true);
        });
    });
});
