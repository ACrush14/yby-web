import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DatePickerField } from './DatePickerField.jsx';

describe('DatePickerField Component', () => {
  it('deve renderizar o label e a data formatada em formato brasileiro (DD/MM/AAAA)', () => {
    render(<DatePickerField label="Data inicial" value="2026-10-01" onChange={() => {}} />);

    expect(screen.getByText('Data inicial')).toBeInTheDocument();
    const input = screen.getByDisplayValue('01/10/2026');
    expect(input).toBeInTheDocument();
  });

  it('deve abrir o popover de calendário ao clicar no input ou no botão do ícone', () => {
    render(<DatePickerField label="Data de Coleta" value="2026-10-15" onChange={() => {}} />);

    // Antes de abrir, não deve exibir a listagem de dias
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Clica no input para abrir
    fireEvent.click(screen.getByDisplayValue('15/10/2026'));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByLabelText(/Selecionar ano/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Selecionar mês/i)).toBeInTheDocument();
  });

  it('deve permitir trocar o ano diretamente através do seletor rápido de ano sem scroll excessivo', () => {
    const handleChange = vi.fn();
    render(<DatePickerField label="Data inicial" value="2026-10-01" onChange={handleChange} />);

    // Abre o calendário
    fireEvent.click(screen.getByDisplayValue('01/10/2026'));

    // Seleciona diretamente o ano 2024
    const yearSelect = screen.getByLabelText(/Selecionar ano/i);
    expect(yearSelect).toHaveValue('2026');

    fireEvent.change(yearSelect, { target: { value: '2024' } });
    expect(yearSelect).toHaveValue('2024');

    // Clica no dia 10 do calendário
    const dayBtn = screen.getByRole('button', { name: '10' });
    fireEvent.click(dayBtn);

    // Deve ter chamado onChange com '2024-10-10'
    expect(handleChange).toHaveBeenCalledWith({
      target: {
        value: '2024-10-10',
        name: undefined,
      },
    });
  });

  it('deve permitir limpar a data pelo botão Limpar', () => {
    const handleChange = vi.fn();
    render(<DatePickerField label="Data final" value="2026-10-31" onChange={handleChange} />);

    // Abre calendário
    fireEvent.click(screen.getByDisplayValue('31/10/2026'));

    // Clica em Limpar
    const clearBtn = screen.getByRole('button', { name: /Limpar/i });
    fireEvent.click(clearBtn);

    expect(handleChange).toHaveBeenCalledWith({
      target: {
        value: '',
        name: undefined,
      },
    });
  });

  it('deve fechar o calendário ao apertar Escape', () => {
    render(<DatePickerField label="Data inicial" value="2026-10-01" onChange={() => {}} />);

    fireEvent.click(screen.getByDisplayValue('01/10/2026'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
