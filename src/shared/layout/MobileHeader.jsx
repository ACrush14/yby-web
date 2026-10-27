import React from 'react';
import { Menu } from 'lucide-react';
import { YbyIcon } from '@/shared/ui/YbyIcon.jsx';

/**
 * Cabeçalho fixo no topo para dispositivos móveis com botão Hamburguer.
 * @param {object} props
 * @param {() => void} props.onOpenDrawer
 */
export function MobileHeader({ onOpenDrawer }) {
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 bg-yby-surface border-b border-yby-border sticky top-0 z-20">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-yby-tint/60 border border-yby-border/60 flex items-center justify-center p-1 shadow-sm">
          <YbyIcon variant="dark" className="w-5 h-5" />
        </div>
        <span className="font-extrabold text-lg tracking-tight text-yby-heading">
          YBY
        </span>
      </div>

      <button
        type="button"
        onClick={onOpenDrawer}
        className="w-10 h-10 rounded-lg bg-white border border-yby-border flex items-center justify-center text-yby-heading hover:bg-yby-tint transition-colors shadow-sm"
        aria-label="Abrir menu lateral"
      >
        <Menu className="w-5 h-5" />
      </button>
    </header>
  );
}
