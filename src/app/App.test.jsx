import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { toast } from 'sonner';
import { App } from './App.jsx';

describe('App - Toaster e Botão de Fechar (X)', () => {
  it('deve renderizar a aplicação com o Toaster configurado com botão de fechar', async () => {
    render(<App />);

    // Dispara um toast de teste
    toast.success('Organização atualizada com sucesso!');

    // Verifica que o toast aparece na tela
    const toastElement = await screen.findByText('Organização atualizada com sucesso!');
    expect(toastElement).toBeInTheDocument();

    // Verifica que o botão de fechar (X) está presente
    const closeButton = screen.getByRole('button', { name: /Close toast/i });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('data-close-button', 'true');

    // Clica no botão X para fechar o toast
    fireEvent.click(closeButton);

    // O toast deve ser descartado
    await waitFor(() => {
      expect(screen.queryByText('Organização atualizada com sucesso!')).not.toBeInTheDocument();
    });
  });
});
