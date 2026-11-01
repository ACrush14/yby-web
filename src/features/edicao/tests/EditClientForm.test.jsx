import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EditClientForm } from '../components/EditClientForm.jsx';
import { cepService } from '@/services/cepService.js';

describe('EditClientForm - Preenchimento Automático por CEP', () => {
  const mockClient = {
    id: 1,
    social_name: 'Empresa Teste',
    cnpj: '12.345.678/0001-90',
    responsible_name: 'Ana Souza',
    email: 'ana@empresa.com',
    phone: '(85) 99999-9999',
    username: 'empresa.teste',
    cep: '60160-230',
    street: 'Rua Desembargador Leite Albuquerque',
    number: '500',
    neighborhood: 'Aldeota',
    state: 'Ceará',
    city: 'Fortaleza',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('deve renderizar o formulário com os valores do cliente', () => {
    render(<EditClientForm client={mockClient} onCancel={vi.fn()} onSave={vi.fn()} />);

    expect(screen.getByDisplayValue('Empresa Teste')).toBeInTheDocument();
    expect(screen.getByDisplayValue('60160-230')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Rua Desembargador Leite Albuquerque')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Aldeota')).toBeInTheDocument();
  });

  it('deve buscar e preencher automaticamente rua, bairro, cidade e estado ao digitar 8 dígitos de CEP', async () => {
    vi.spyOn(cepService, 'getAddressByCep').mockResolvedValueOnce({
      cep: '01001-000',
      street: 'Praça da Sé',
      neighborhood: 'Sé',
      city: 'São Paulo',
      state: 'São Paulo',
      uf: 'SP',
    });

    render(<EditClientForm client={mockClient} onCancel={vi.fn()} onSave={vi.fn()} />);

    const cepInput = screen.getByLabelText(/CEP/i);
    const streetInput = screen.getByLabelText(/Rua/i);
    const neighborhoodInput = screen.getByLabelText(/Bairro/i);

    // Altera o CEP para 01001000
    fireEvent.change(cepInput, { target: { value: '01001000' } });

    await waitFor(() => {
      expect(cepService.getAddressByCep).toHaveBeenCalledWith('01001000');
    });

    await waitFor(() => {
      expect(streetInput.value).toBe('Praça da Sé');
      expect(neighborhoodInput.value).toBe('Sé');
    });
  });

  it('deve disparar onSave com os dados atualizados ao submeter o formulário', async () => {
    const handleSave = vi.fn();
    render(<EditClientForm client={mockClient} onCancel={vi.fn()} onSave={handleSave} />);

    const submitBtn = screen.getByRole('button', { name: /Salvar alterações/i });
    fireEvent.click(submitBtn);

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        social_name: 'Empresa Teste',
        cep: '60160-230',
      })
    );
  });
});
