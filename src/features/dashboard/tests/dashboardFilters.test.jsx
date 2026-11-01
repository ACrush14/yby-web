import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DashboardPage } from '../DashboardPage.jsx';
import { dashboardRepository } from '@/services/repositories/dashboardRepository.js';

describe('Dashboard - Filtros Rápidos (Ano Atual, Mês Atual e Semana Atual)', () => {
  it('deve renderizar os três botões de filtro rápido: Ano atual, Mês atual e Semana atual', async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Ano atual/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Mês atual/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Semana atual/i })).toBeInTheDocument();
    });
  });

  it('deve carregar os dados de Mês Atual por padrão com os dias do mês', async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      // Título do gráfico de peso adaptado para mês
      expect(screen.getByText('Coleta em peso (kg) no mês')).toBeInTheDocument();
      expect(screen.getByText('Peso coletado por dia no mês de Outubro/2026')).toBeInTheDocument();
    });
  });

  it('deve alternar para Ano Atual e exibir os meses do ano', async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Ano atual/i })).toBeInTheDocument();
    });

    const yearBtn = screen.getByRole('button', { name: /Ano atual/i });
    fireEvent.click(yearBtn);

    await waitFor(() => {
      expect(screen.getByText('Coleta em peso (kg) por mês')).toBeInTheDocument();
      expect(screen.getByText('Peso coletado por mês no ano de 2026')).toBeInTheDocument();
    });
  });

  it('deve alternar para Semana Atual e exibir os dias específicos', async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Semana atual/i })).toBeInTheDocument();
    });

    const weekBtn = screen.getByRole('button', { name: /Semana atual/i });
    fireEvent.click(weekBtn);

    await waitFor(() => {
      expect(screen.getByText('Coleta em peso (kg) na semana')).toBeInTheDocument();
      expect(screen.getByText(/Semana selecionada \(12\/10 a 18\/10\/2026\)/i)).toBeInTheDocument();
    });
  });

  it('o repositório deve retornar métricas adequadas para cada quickFilter', async () => {
    const yearMetrics = await dashboardRepository.getMetrics({ quickFilter: 'year' });
    expect(yearMetrics.periodType).toBe('year');
    expect(yearMetrics.monthlyWeight.some((d) => d.month === 'Jan')).toBe(true);

    const monthMetrics = await dashboardRepository.getMetrics({ quickFilter: 'month' });
    expect(monthMetrics.periodType).toBe('month');
    expect(monthMetrics.monthlyWeight.some((d) => d.month.includes('/10'))).toBe(true);

    const weekMetrics = await dashboardRepository.getMetrics({ quickFilter: 'week' });
    expect(weekMetrics.periodType).toBe('week');
    expect(weekMetrics.monthlyWeight.some((d) => d.month.includes('Seg (12/10)'))).toBe(true);
  });
});
