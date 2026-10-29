import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';

export function FloatingWhatsAppButton() {
  const whatsappUrl =
    'https://wa.me/5585987273633?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20YBY.';

  return (
    <aside
      className="fixed bottom-6 right-6 z-40"
      aria-label="Atendimento rápido via WhatsApp"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Falar no WhatsApp com a YBY"
      >
        <WhatsAppIcon className="w-7 h-7" />

        {/* Tooltip flutuante ao passar o mouse */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-yby-heading text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Falar no WhatsApp
        </span>
      </a>
    </aside>
  );
}
