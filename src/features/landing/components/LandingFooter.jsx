import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { YbyIcon } from '@/shared/ui/YbyIcon.jsx';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';

export function LandingFooter() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const whatsappUrl =
    'https://wa.me/5585987273633?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20YBY.';

  return (
    <footer className="mt-auto border-t border-yby-border/80 bg-gradient-to-b from-white via-yby-cream/30 to-yby-cream/60">
      {/* Bloco Superior: Informações de Contato, Missão e WhatsApp */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Coluna 1: Marca e Propósito */}
          <div className="space-y-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 rounded-xl bg-yby-tint/60 border border-yby-border/60 flex items-center justify-center p-1.5 shadow-sm">
                <YbyIcon variant="dark" className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-yby-heading">
                YBY
              </span>
            </div>
            <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
              Startup de impacto que impulsiona a economia circular no Brasil através da gestão
              inteligente de resíduos, logística reversa inclusiva e valorização de cooperativas de
              catadores.
            </p>
            <div className="flex items-center gap-2 text-xs text-yby-muted">
              <MapPin className="w-4 h-4 text-yby-primary flex-shrink-0" />
              <span>Fortaleza, Ceará • Atuação Nacional</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="font-extrabold text-sm text-yby-heading uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm text-yby-muted">
              <li>
                <a href="#como-funciona" className="hover:text-yby-primary transition-colors">
                  Como funciona a plataforma
                </a>
              </li>
              <li>
                <a href="#impacto" className="hover:text-yby-primary transition-colors">
                  Impacto mensurável ESG
                </a>
              </li>
              <li>
                <a href="#funcionalidades" className="hover:text-yby-primary transition-colors">
                  Módulos e recursos
                </a>
              </li>
              <li>
                <a href="#para-quem" className="hover:text-yby-primary transition-colors">
                  Para empresas e cooperativas
                </a>
              </li>
              <li>
                <a
                  href="https://somosyby.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-yby-primary transition-colors font-medium"
                >
                  Site institucional YBY
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato Direto (Email e Telefone) */}
          <div>
            <h4 className="font-extrabold text-sm text-yby-heading uppercase tracking-wider mb-4">
              Contato & Atendimento
            </h4>
            <div className="space-y-3.5">
              {/* E-mail */}
              <a
                href="mailto:contato@somosyby.com.br"
                className="group flex items-start gap-3 p-3 rounded-xl bg-white border border-yby-border/60 shadow-sm hover:border-yby-primary/40 hover:bg-yby-tint/20 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-yby-tint text-yby-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-yby-muted uppercase tracking-wider block">
                    E-mail oficial
                  </span>
                  <span className="text-xs md:text-sm font-bold text-yby-heading group-hover:text-yby-primary transition-colors break-all">
                    contato@somosyby.com.br
                  </span>
                </div>
              </a>

              {/* Telefone / Contato */}
              <a
                href="tel:+5585987273633"
                className="group flex items-start gap-3 p-3 rounded-xl bg-white border border-yby-border/60 shadow-sm hover:border-yby-primary/40 hover:bg-yby-tint/20 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-yby-tint text-yby-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-yby-muted uppercase tracking-wider block">
                    Telefone / Contato
                  </span>
                  <span className="text-xs md:text-sm font-bold text-yby-heading group-hover:text-yby-primary transition-colors">
                    (85) 98727-3633
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Coluna 4: Botão de WhatsApp em Destaque */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-yby-heading uppercase tracking-wider mb-4">
                Fale Conosco
              </h4>
              <p className="text-xs md:text-sm text-yby-muted mb-4 leading-relaxed">
                Tire dúvidas sobre soluções de logística reversa, coleta seletiva e compostagem
                direto pelo WhatsApp.
              </p>

              {/* Botão de Enviar Mensagem via WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] select-none"
                aria-label="Enviar mensagem no WhatsApp para YBY"
              >
                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                <span>Enviar mensagem no WhatsApp</span>
              </a>
            </div>

            {/* Redes Sociais */}
            <div className="pt-5 mt-4 border-t border-yby-border/60">
              <span className="text-[11px] font-semibold text-yby-muted uppercase tracking-wider block mb-2">
                Acompanhe a YBY
              </span>
              <div className="flex items-center gap-3 text-xs font-semibold text-yby-muted">
                <a
                  href="https://www.instagram.com/somosyby/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yby-primary transition-colors"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://www.linkedin.com/company/somosyby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yby-primary transition-colors"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://www.facebook.com/somosYby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yby-primary transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linha Inferior com Copyright e Acessos */}
      <div className="border-t border-yby-border/70 bg-white/70 py-6 px-4 sm:px-6 lg:px-8 text-xs text-yby-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left">
            © {currentYear} YBY Soluções Sustentáveis. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5 font-semibold">
            <button
              type="button"
              onClick={() => navigate('/signIn')}
              className="hover:text-yby-primary transition-colors flex items-center gap-1"
            >
              Login Administrativo <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/signIn-client')}
              className="hover:text-yby-primary transition-colors flex items-center gap-1"
            >
              Acesso Cooperativa <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
