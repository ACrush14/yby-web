import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MobileHeader } from '../MobileHeader.jsx';

describe('MobileHeader - Top Bar Mobile (390 x 64)', () => {
  it('deve renderizar o botão sanduíche à esquerda e disparar onOpenDrawer ao clicar', () => {
    const handleOpenDrawer = vi.fn();

    render(
      <MemoryRouter>
        <MobileHeader onOpenDrawer={handleOpenDrawer} />
      </MemoryRouter>
    );

    const menuButton = screen.getByRole('button', { name: /abrir menu lateral/i });
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(handleOpenDrawer).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar o símbolo oficial e o texto YBY centralizado', () => {
    render(
      <MemoryRouter>
        <MobileHeader onOpenDrawer={vi.fn()} />
      </MemoryRouter>
    );

    const logoCard = screen.getByRole('button', { name: /ir para o dashboard/i });
    expect(logoCard).toBeInTheDocument();
    expect(screen.getByText('YBY')).toBeInTheDocument();
    expect(screen.getByAltText('YBY')).toBeInTheDocument();
  });
});
