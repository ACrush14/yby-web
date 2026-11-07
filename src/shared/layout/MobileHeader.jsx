import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { YbyIcon } from '@/shared/ui/YbyIcon.jsx';

/**
 * Top Bar mobile de alta fidelidade conforme especificação do Figma (390 x 64).
 * Menu sanduíche à esquerda e símbolo oficial YBY centralizado.
 *
 * @param {object} props
 * @param {() => void} props.onOpenDrawer
 */
export function MobileHeader({ onOpenDrawer }) {
  const navigate = useNavigate();

  return (
    <header className="md:hidden h-16 bg-yby-surface border-b border-yby-border/80 px-4 flex items-center justify-between sticky top-0 z-20 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Botão Menu Sanduíche à Esquerda */}
      <button
        type="button"
        onClick={onOpenDrawer}
        className="w-11 h-11 rounded-2xl bg-white border border-yby-border flex items-center justify-center text-yby-heading hover:bg-yby-tint/60 active:scale-95 active:bg-yby-tint transition-all duration-150 shadow-sm cursor-pointer shrink-0"
        aria-label="Abrir menu lateral"
      >
        <Menu className="w-5 h-5 text-yby-heading" strokeWidth={2.2} />
      </button>

      {/* Símbolo e Nome YBY Rigorosamente Centralizados */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 cursor-pointer"
        onClick={() => navigate('/dashboard')}
        role="button"
        tabIndex={0}
        aria-label="Ir para o Dashboard"
      >
        <div className="w-10 h-10 rounded-xl bg-white border border-yby-border/70 flex items-center justify-center p-1.5 shadow-sm shrink-0">
          <YbyIcon variant="dark" className="w-6 h-6" />
        </div>
        <span className="font-extrabold text-xl tracking-tight text-yby-heading">
          YBY
        </span>
      </div>

      {/* Espaçador Simétrico à Direita para Manter o Balanceamento de Flex */}
      <div className="w-11 h-11 shrink-0 pointer-events-none" aria-hidden="true" />
    </header>
  );
}
