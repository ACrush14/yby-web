import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HeroBannerCarousel } from '../components/HeroBannerCarousel.jsx';
import { CinematicHero } from '../components/CinematicHero.jsx';
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
    it('deve exibir email oficial, telefone/contato e redes sociais no rodapé enxuto', () => {
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

      // 3. Redes sociais
      expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
        'href',
        'https://www.instagram.com/somosyby/'
      );
      expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/company/somosyby'
      );
      expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
        'href',
        'https://www.facebook.com/somosYby'
      );

      // 4. Garante que os blocos removidos (Navegação, WhatsApp redundante e Logins de acesso) não estão no footer
      expect(screen.queryByRole('heading', { name: /Navegação/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /Enviar mensagem no WhatsApp para YBY/i })).not.toBeInTheDocument();
      expect(screen.queryByText(/Login Administrativo/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Acesso Cooperativa/i)).not.toBeInTheDocument();
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

  describe('CinematicHero', () => {
    it('deve renderizar o título cinematográfico com frases de efeito em linhas separadas e setas discretas', () => {
      render(
        <BrowserRouter>
          <CinematicHero />
        </BrowserRouter>
      );

      // Frases de efeito em linhas independentes
      expect(screen.getByText('Dados reais.')).toBeInTheDocument();
      expect(screen.getByText('Impacto mensurável.')).toBeInTheDocument();
      expect(screen.getByText('Economia circular.')).toBeInTheDocument();

      // Subtítulo focado em indicadores ambientais certificados
      expect(
        screen.getByText(/transformando cada coleta em indicadores ambientais certificados\./i)
      ).toBeInTheDocument();

      // Setas discretas de navegação
      expect(screen.getByRole('button', { name: /Foto anterior/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Próxima foto/i })).toBeInTheDocument();

      // Botão de ação
      expect(screen.getByRole('button', { name: /Acessar plataforma/i })).toBeInTheDocument();
    });
  });
});
