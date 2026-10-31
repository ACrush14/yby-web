import React from 'react';
import { Mail, Phone, Instagram, Linkedin, Facebook } from 'lucide-react';

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0A1F0F] text-white py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 text-xs">
        {/* Contato Direto (E-mail e Telefone com Ícones) */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
          <a
            href="mailto:contato@somosyby.com.br"
            className="group flex items-center gap-2.5 text-white/90 hover:text-lime-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 text-lime-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/20 transition-all shadow-sm">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider block">
                E-mail oficial
              </span>
              <span className="font-bold text-white group-hover:text-lime-400 transition-colors text-xs">
                contato@somosyby.com.br
              </span>
            </div>
          </a>

          <a
            href="tel:+5585987273633"
            className="group flex items-center gap-2.5 text-white/90 hover:text-lime-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 text-lime-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/20 transition-all shadow-sm">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider block">
                Telefone / Contato
              </span>
              <span className="font-bold text-white group-hover:text-lime-400 transition-colors text-xs">
                (85) 98727-3633
              </span>
            </div>
          </a>
        </div>

        {/* Copyright Centralizado */}
        <p className="text-center text-white/60 text-xs order-last lg:order-none">
          © {currentYear} YBY Soluções Sustentáveis. Todos os direitos reservados.
        </p>

        {/* Acompanhe a YBY (Ícones Sociais - Recuados à esquerda para não sobrepor o WhatsApp) */}
        <div className="flex items-center gap-2.5 lg:mr-20 xl:mr-24">
          <span className="text-[11px] font-extrabold text-white/70 uppercase tracking-wider mr-1">
            Acompanhe a YBY:
          </span>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/somosyby/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram @somosyby"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-lime-400 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/company/somosyby"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn YBY"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-lime-400 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/somosYby"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook YBY"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-lime-400 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
