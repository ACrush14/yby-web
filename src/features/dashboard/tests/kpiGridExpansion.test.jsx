import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PrimaryKpiGrid } from '../components/PrimaryKpiGrid.jsx';
import { SecondaryKpiGrid } from '../components/SecondaryKpiGrid.jsx';

describe('KPI Grids - Comportamento de Hover e Touch para Revelação Completa', () => {
  const mockMetrics = {
    primary: {
      energy: '74.820,30 MWh',
      water: '182.410,15 L',
      co2: '36.540,80 kg CO₂e',
      climaticValue: 'R$ 1.620,40',
    },
    secondary: {
      socioenvironmental: 'R$ 14.850,00',
      oil: '1.240 L',
      trees: '380 un',
      landfillSpace: '42,5 m³',
    },
  };

  describe('PrimaryKpiGrid', () => {
    it('deve renderizar todos os 4 cards primários com seus valores e unidades completos', () => {
      render(<PrimaryKpiGrid metrics={mockMetrics} />);

      expect(screen.getByText('Consumo de energia')).toBeInTheDocument();
      expect(screen.getByText('Economia de água')).toBeInTheDocument();
      expect(screen.getByText('CO₂ evitado')).toBeInTheDocument();
      expect(screen.getByText('Valor climático estimado')).toBeInTheDocument();

      expect(screen.getByText('74.820,30')).toBeInTheDocument();
      expect(screen.getByText('MWh')).toBeInTheDocument();
      expect(screen.getByText('182.410,15')).toBeInTheDocument();
      expect(screen.getByText('L')).toBeInTheDocument();
      expect(screen.getByText('36.540,80')).toBeInTheDocument();
      expect(screen.getByText('kg CO₂e')).toBeInTheDocument();
      expect(screen.getByText('1.620,40')).toBeInTheDocument();
    });

    it('deve expandir e mostrar os detalhes ao passar o mouse (hover) ou tocar no card', () => {
      render(<PrimaryKpiGrid metrics={mockMetrics} />);

      const energyCard = screen.getByRole('button', {
        name: /Consumo de energia: 74\.820,30 MWh/i,
      });

      // Inicialmente não expandido (aria-expanded = false)
      expect(energyCard).toHaveAttribute('aria-expanded', 'false');

      // 1. Simula mouseEnter (hover)
      fireEvent.mouseEnter(energyCard);
      expect(energyCard).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Energia elétrica evitada na rede')).toBeInTheDocument();

      // Simula mouseLeave
      fireEvent.mouseLeave(energyCard);
      expect(energyCard).toHaveAttribute('aria-expanded', 'false');

      // 2. Simula toque com o dedo (touch/click)
      fireEvent.click(energyCard);
      expect(energyCard).toHaveAttribute('aria-expanded', 'true');

      // Clicar novamente recolhe
      fireEvent.click(energyCard);
      expect(energyCard).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('SecondaryKpiGrid', () => {
    it('deve renderizar os 4 cards secundários e expandir ao toque ou hover', () => {
      render(<SecondaryKpiGrid metrics={mockMetrics} />);

      expect(screen.getByText('BENEFÍCIO SOCIOAMBIENTAL')).toBeInTheDocument();
      expect(screen.getByText('PETRÓLEO POUPADO')).toBeInTheDocument();

      const oilCard = screen.getByRole('button', {
        name: /PETRÓLEO POUPADO: 1\.240 L/i,
      });

      expect(oilCard).toHaveAttribute('aria-expanded', 'false');

      // Hover
      fireEvent.mouseEnter(oilCard);
      expect(oilCard).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Economia de insumos fósseis na reciclagem')).toBeInTheDocument();

      fireEvent.mouseLeave(oilCard);
      expect(oilCard).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
