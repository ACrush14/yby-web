import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CooperativePillSelect } from '../components/CooperativePillSelect.jsx';

describe('CooperativePillSelect', () => {
  const mockCooperatives = [
    { id: 1, name: 'Yby Soluções Sustentáveis', shortName: 'Yby' },
    { id: 2, name: 'Coocencipe', shortName: 'Coocencipe' },
  ];

  it('deve exibir borda contínua (border-solid) e texto "Selecionar" quando nenhum valor estiver selecionado', () => {
    render(
      <CooperativePillSelect
        value=""
        cooperatives={mockCooperatives}
        onChange={vi.fn()}
      />
    );

    const button = screen.getByRole('button', { name: /Selecionar/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('border-solid');
    expect(button.className).not.toContain('border-dashed');
  });

  it('deve exibir o nome da cooperativa e disparar onChange ao selecionar outra opção', () => {
    const handleChange = vi.fn();
    render(
      <CooperativePillSelect
        value="Yby"
        cooperatives={mockCooperatives}
        onChange={handleChange}
      />
    );

    const button = screen.getByRole('button', { name: /Yby/i });
    expect(button).toBeInTheDocument();

    // Abrir o popover
    fireEvent.click(button);

    // Clicar em Coocencipe
    const option = screen.getByRole('button', { name: /Coocencipe/i });
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('Coocencipe');
  });

  it('permite limpar a seleção com "Sem cooperativa"', () => {
    const handleChange = vi.fn();
    render(
      <CooperativePillSelect
        value="Yby"
        cooperatives={mockCooperatives}
        onChange={handleChange}
      />
    );

    const button = screen.getByRole('button', { name: /Yby/i });
    fireEvent.click(button);

    const clearButton = screen.getByRole('button', { name: /Sem cooperativa/i });
    fireEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('deve exibir a opção "Sem cooperativa" no topo da lista com estado ativo quando não houver valor', () => {
    render(
      <CooperativePillSelect
        value=""
        cooperatives={mockCooperatives}
        onChange={vi.fn()}
      />
    );

    const selectButton = screen.getByRole('button', { name: /Selecionar/i });
    fireEvent.click(selectButton);

    const noneOption = screen.getByRole('button', { name: /Sem cooperativa/i });
    expect(noneOption).toBeInTheDocument();
    expect(noneOption.className).toContain('bg-yby-light text-yby-primary');
  });

  it('permite filtrar as cooperativas pelo campo de busca', () => {
    render(
      <CooperativePillSelect
        value=""
        cooperatives={mockCooperatives}
        onChange={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Selecionar/i }));

    const searchInput = screen.getByPlaceholderText(/Buscar cooperativa/i);
    fireEvent.change(searchInput, { target: { value: 'Cooc' } });

    expect(screen.queryByRole('button', { name: /Yby/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Coocencipe/i })).toBeInTheDocument();
  });
});
