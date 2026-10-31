import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HeroBannerCarousel } from '../components/HeroBannerCarousel.jsx';
import { HeroInteractiveShowcase } from '../components/HeroInteractiveShowcase.jsx';
import { HeroPartnerLogos } from '../components/HeroPartnerLogos.jsx';
import { LandingFooter } from '../components/LandingFooter.jsx';
import { FloatingWhatsAppButton } from '../components/FloatingWhatsAppButton.jsx';

describe('Landing Page - Componentes do Hero e Rodapé', () => {
  describe('HeroBannerCarousel', () => {
    it('deve renderizar o carrossel com as imagens oficiais e controles de navegação', () => {
      render(<HeroBannerCarousel />);

      // Verifica presença da região do carrossel
      const region = screen.getByRole('region', { name: /Carrossel de Imagens do Hero YBY/i });
      expect(region).toBeInTheDocument();

      // Verifica imagens carregadas
      const img1 = screen.getByAltText('YBY - Coleta Seletiva Descomplicada');
      expect(img1).toBeInTheDocument();
      expect(img1).toHaveAttribute('src', '/assets/hero/banner-1.png');

      // Verifica botões de navegação
      const nextBtn = screen.getByRole('button', { name: /Próxima imagem/i });
      const prevBtn = screen.getByRole('button', { name: /Imagem anterior/i });
      expect(nextBtn).toBeInTheDocument();
      expect(prevBtn).toBeInTheDocument();

      // Clica em próxima imagem
      fireEvent.click(nextBtn);
      const img2 = screen.getByAltText('YBY - Logística Reversa de Embalagens');
      expect(img2).toBeInTheDocument();
    });
  });

  describe('LandingFooter', () => {
    it('deve exibir email oficial, telefone/contato e botão de WhatsApp', () => {
      render(
        <BrowserRouter>
          <LandingFooter />
        </BrowserRouter>
      );

      // 1. Email oficial
      const emailLink = screen.getByRole('link', { name: /contato@somosyby.com.br/i });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:contato@somosyby.com.br');

      // 2. Telefone / Contato
      const phoneLink = screen.getByRole('link', { name: /\(85\) 98727-3633/i });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', 'tel:+5585987273633');

      // 3. Botão do WhatsApp para envio de mensagem
      const whatsappBtn = screen.getByRole('link', { name: /Enviar mensagem no WhatsApp para YBY/i });
      expect(whatsappBtn).toBeInTheDocument();
      expect(whatsappBtn.getAttribute('href')).toContain('https://wa.me/5585987273633');
      expect(whatsappBtn).toHaveAttribute('target', '_blank');

      // 4. Redes sociais
      expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
        'href',
        'https://www.instagram.com/somosyby/'
      );
      expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/company/somosyby'
      );
    });
  });

  describe('FloatingWhatsAppButton', () => {
    it('deve renderizar o botão flutuante com link direto para o WhatsApp da YBY', () => {
      render(<FloatingWhatsAppButton />);

      const floatingLink = screen.getByRole('link', { name: /Falar no WhatsApp com a YBY/i });
      expect(floatingLink).toBeInTheDocument();
      expect(floatingLink.getAttribute('href')).toContain('https://wa.me/5585987273633');
      expect(floatingLink).toHaveAttribute('target', '_blank');
    });
  });

  describe('HeroInteractiveShowcase', () => {
    it('deve alternar entre Dashboard, Tabela e Inscrição através das abas interativas', () => {
      render(<HeroInteractiveShowcase />);

      // Inicia em Dashboard
      expect(screen.getByText('Indicadores Ambientais ESG')).toBeInTheDocument();
      expect(screen.getByText('1.480 kWh')).toBeInTheDocument();

      // Clica na aba 2. Tabela de Coletas
      const tabelaTab = screen.getByRole('button', { name: /2\. Tabela de Coletas/i });
      fireEvent.click(tabelaTab);

      expect(screen.getByText('Planejamento e Registro de Coletas')).toBeInTheDocument();
      expect(screen.getByText('Coocencipe')).toBeInTheDocument();
      expect(screen.getByText('Rosa Virgínia')).toBeInTheDocument();

      // Clica na aba 3. Inscrição & Ponto
      const inscricaoTab = screen.getByRole('button', { name: /3\. Inscrição & Ponto/i });
      fireEvent.click(inscricaoTab);

      expect(screen.getByText('Inscrição e Cadastro de Ponto')).toBeInTheDocument();
      expect(screen.getByText('Condomínio Reserva das Palmeiras')).toBeInTheDocument();
    });
  });

  describe('HeroPartnerLogos', () => {
    it('deve renderizar a faixa de parceiros e cooperativas conectadas', () => {
      render(<HeroPartnerLogos />);

      expect(
        screen.getByText(/Cooperativas e organizações conectadas na plataforma YBY/i)
      ).toBeInTheDocument();
      expect(screen.getByText('Coocencipe')).toBeInTheDocument();
      expect(screen.getByText('Rosa Virgínia')).toBeInTheDocument();
      expect(screen.getByText('Rede Ceará')).toBeInTheDocument();
    });
  });
});
