import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { YbyIcon } from '@/shared/ui/YbyIcon.jsx';
import {
  Zap,
  Droplet,
  Cloud,
  TreePine,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Calendar,
  FileSpreadsheet,
  BarChart3,
  Share2,
} from 'lucide-react';
import { Button } from '@/shared/ui/Button.jsx';
import { CinematicHero } from './components/CinematicHero.jsx';
import { HeroBannerCarousel } from './components/HeroBannerCarousel.jsx';
import { LandingFooter } from './components/LandingFooter.jsx';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton.jsx';

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-yby-heading flex flex-col selection:bg-yby-light selection:text-yby-primary">
      {/* Top Navbar no Estilo Dark Atmosférico */}
      <header className="sticky top-0 z-30 bg-[#0A160E]/85 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center p-1.5 shadow-sm">
              <YbyIcon variant="white" className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              YBY
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/80">
            <a href="#como-funciona" className="hover:text-lime-400 transition-colors">
              Como funciona
            </a>
            <a href="#impacto" className="hover:text-lime-400 transition-colors">
              Impacto
            </a>
            <a href="#funcionalidades" className="hover:text-lime-400 transition-colors">
              Funcionalidades
            </a>
            <a href="#para-quem" className="hover:text-lime-400 transition-colors">
              Para quem
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/signIn')}
              className="px-6 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              Entrar
            </button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#0A160E] px-4 pt-2 pb-6 space-y-3">
            <a
              href="#como-funciona"
              className="block py-2 text-sm font-semibold text-white/80 hover:text-lime-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como funciona
            </a>
            <a
              href="#impacto"
              className="block py-2 text-sm font-semibold text-white/80 hover:text-lime-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impacto
            </a>
            <a
              href="#funcionalidades"
              className="block py-2 text-sm font-semibold text-white/80 hover:text-lime-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funcionalidades
            </a>
            <a
              href="#para-quem"
              className="block py-2 text-sm font-semibold text-white/80 hover:text-lime-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Para quem
            </a>
            <button
              type="button"
              className="w-full py-3 rounded-full bg-lime-400 text-black font-extrabold text-sm"
              onClick={() => navigate('/signIn')}
            >
              Entrar na Plataforma
            </button>
          </div>
        )}
      </header>

      {/* Hero Cinematográfico com Imagens de Fundo e Atmosfera Dark (Inspirado na Referência) */}
      <CinematicHero />

      {/* Seção Impacto Mensurável */}
      <section id="impacto" className="pt-20 sm:pt-24 pb-16 bg-yby-cream/40 border-b border-yby-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-yby-heading tracking-tight">
              Impacto Mensurável
            </h2>
            <p className="text-sm md:text-base text-yby-muted mt-2">
              O dashboard converte cada registro de coleta em indicadores de energia, água, carbono e árvores — prontos para o relatório de sustentabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
            {/* Card 1 */}
            <div className="group bg-white p-4 sm:p-5 xl:p-6 rounded-2xl border border-yby-border shadow-card flex items-center gap-3.5 xl:gap-4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-card-elevated hover:border-yby-orange/40 cursor-default">
              <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-2xl bg-[#FDF0EC] text-yby-orange flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <Zap className="w-6 h-6 xl:w-7 xl:h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] xl:text-xs font-semibold text-yby-muted uppercase tracking-wider block truncate group-hover:text-yby-orange transition-colors">
                  Energia evitada
                </span>
                <p className="text-base sm:text-lg lg:text-base xl:text-xl 2xl:text-2xl font-extrabold text-yby-heading mt-0.5 tracking-tight group-hover:translate-x-0.5 transition-transform flex items-baseline gap-1 flex-wrap">
                  <span>276.984</span>
                  <span className="text-xs sm:text-sm font-bold text-yby-muted">MWh</span>
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-4 sm:p-5 xl:p-6 rounded-2xl border border-yby-border shadow-card flex items-center gap-3.5 xl:gap-4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-card-elevated hover:border-yby-blue/40 cursor-default">
              <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-2xl bg-[#E5F1F8] text-yby-blue flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <Droplet className="w-6 h-6 xl:w-7 xl:h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] xl:text-xs font-semibold text-yby-muted uppercase tracking-wider block truncate group-hover:text-yby-blue transition-colors">
                  Água economizada
                </span>
                <p className="text-base sm:text-lg lg:text-base xl:text-xl 2xl:text-2xl font-extrabold text-yby-heading mt-0.5 tracking-tight group-hover:translate-x-0.5 transition-transform flex items-baseline gap-1 flex-wrap">
                  <span>24.036.493</span>
                  <span className="text-xs sm:text-sm font-bold text-yby-muted">L</span>
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-4 sm:p-5 xl:p-6 rounded-2xl border border-yby-border shadow-card flex items-center gap-3.5 xl:gap-4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-card-elevated hover:border-yby-teal/40 cursor-default">
              <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-2xl bg-[#E9F1ED] text-yby-teal flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <Cloud className="w-6 h-6 xl:w-7 xl:h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] xl:text-xs font-semibold text-yby-muted uppercase tracking-wider block truncate group-hover:text-yby-teal transition-colors">
                  CO₂e evitado
                </span>
                <p className="text-base sm:text-lg lg:text-base xl:text-xl 2xl:text-2xl font-extrabold text-yby-heading mt-0.5 tracking-tight group-hover:translate-x-0.5 transition-transform flex items-baseline gap-1 flex-wrap">
                  <span>133.585</span>
                  <span className="text-xs sm:text-sm font-bold text-yby-muted">kg</span>
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white p-4 sm:p-5 xl:p-6 rounded-2xl border border-yby-border shadow-card flex items-center gap-3.5 xl:gap-4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-card-elevated hover:border-yby-primary/40 cursor-default">
              <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-2xl bg-yby-tint text-yby-primary flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <TreePine className="w-6 h-6 xl:w-7 xl:h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] xl:text-xs font-semibold text-yby-muted uppercase tracking-wider block truncate group-hover:text-yby-primary transition-colors">
                  Árvores poupadas
                </span>
                <p className="text-base sm:text-lg lg:text-base xl:text-xl 2xl:text-2xl font-extrabold text-yby-heading mt-0.5 tracking-tight group-hover:translate-x-0.5 transition-transform flex items-baseline gap-1 flex-wrap">
                  <span>644</span>
                  <span className="text-xs sm:text-sm font-bold text-yby-muted">árvores</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-yby-heading tracking-tight">
            Como Funciona
          </h2>
          <p className="text-sm md:text-base text-yby-muted mt-2">
            Da escala semanal ao certificado de destinação final em 4 etapas estruturadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {[
            { step: '01', title: 'Cadastro', desc: 'Pontos de entrega (PEVs), cooperativas parceiras e gestores com perfis de acesso sob medida.' },
            { step: '02', title: 'Planejamento', desc: 'Grade semanal inteligente definindo qual cooperativa atende cada cliente em cada dia da semana.' },
            { step: '03', title: 'Coleta registrada', desc: 'Registro em campo com múltiplos resíduos, pesagem, evidências fotográficas e GPS.' },
            { step: '04', title: 'Relatório de impacto', desc: 'Auditoria completa em tempo real com exportação instantânea para Excel, PDF e Stories.' },
          ].map((item) => (
            <div
              key={item.step}
              className="group bg-white p-6 rounded-2xl border border-yby-border/80 shadow-card relative text-left transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-card-elevated hover:border-yby-primary/40 overflow-hidden cursor-default"
            >
              {/* Linha de acento animada no topo */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yby-primary to-yby-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-12 h-12 rounded-xl bg-yby-tint text-yby-primary font-extrabold text-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-yby-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-yby-heading mb-2 group-hover:text-yby-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Para Quem */}
      <section id="para-quem" className="py-20 bg-yby-cream/30 border-t border-yby-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-yby-heading tracking-tight">
              Para Quem
            </h2>
            <p className="text-sm md:text-base text-yby-muted mt-2">
              Soluções desenhadas para a realidade de cada ator da cadeia circular.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl border border-yby-border shadow-card relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2.5 hover:shadow-card-elevated hover:border-yby-primary/40 flex flex-col justify-between cursor-default">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-yby-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl font-bold text-yby-heading mb-3 group-hover:text-yby-primary transition-colors">
                  Empresas e PEVs
                </h3>
                <p className="text-sm text-yby-muted mb-6 leading-relaxed">
                  Condomínios residenciais, comerciais, indústrias e escolas que precisam comprovar destinação correta e obter métricas ESG transparentes.
                </p>
                <ul className="space-y-3 text-xs md:text-sm text-yby-heading font-medium">
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Histórico completo de coletas
                  </li>
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Certificados de impacto ambiental
                  </li>
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Artes prontas para Instagram Stories
                  </li>
                </ul>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl border border-yby-border shadow-card relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2.5 hover:shadow-card-elevated hover:border-yby-primary/40 flex flex-col justify-between cursor-default">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-yby-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl font-bold text-yby-heading mb-3 group-hover:text-yby-primary transition-colors">
                  Cooperativas
                </h3>
                <p className="text-sm text-yby-muted mb-6 leading-relaxed">
                  Equipes de triagem e coleta que precisam de rotas previsíveis, facilidade de apontamento no celular e valorização do seu trabalho.
                </p>
                <ul className="space-y-3 text-xs md:text-sm text-yby-heading font-medium">
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Escala semanal Segunda a Sexta
                  </li>
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Apontamento mobile simplificado
                  </li>
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Login rápido por código de acesso
                  </li>
                </ul>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl border border-yby-border shadow-card relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2.5 hover:shadow-card-elevated hover:border-yby-primary/40 flex flex-col justify-between cursor-default">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-yby-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl font-bold text-yby-heading mb-3 group-hover:text-yby-primary transition-colors">
                  Gestores
                </h3>
                <p className="text-sm text-yby-muted mb-6 leading-relaxed">
                  Administradoras e consultores que gerenciam carteiras de múltiplos condomínios e clientes corporativos de forma unificada.
                </p>
                <ul className="space-y-3 text-xs md:text-sm text-yby-heading font-medium">
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Visão consolidada de PEVs vinculados
                  </li>
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Auditoria de fotos e avarias
                  </li>
                  <li className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                    <CheckCircle2 className="w-4 h-4 text-yby-primary flex-shrink-0" /> Exportação massiva para Excel e PDF
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-yby-heading tracking-tight">
            Funcionalidades
          </h2>
          <p className="text-sm md:text-base text-yby-muted mt-2">
            Tudo o que sua organização precisa para gerir resíduos com rigor técnico e elegância.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group p-6 bg-yby-surface/40 border border-yby-border rounded-2xl flex gap-4 transition-all duration-300 ease-out hover:bg-white hover:-translate-y-1.5 hover:shadow-card-hover hover:border-yby-primary/40 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-white border border-yby-border text-yby-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-yby-tint group-hover:border-yby-primary/40">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-yby-heading group-hover:text-yby-primary transition-colors">
                  Planejamento semanal
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yby-tint text-yby-primary">Escala</span>
              </div>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                Grade interativa colorida por cooperativa com detecção de status de salvamento e seleção rápida dia a dia.
              </p>
            </div>
          </div>

          <div className="group p-6 bg-yby-surface/40 border border-yby-border rounded-2xl flex gap-4 transition-all duration-300 ease-out hover:bg-white hover:-translate-y-1.5 hover:shadow-card-hover hover:border-yby-primary/40 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-white border border-yby-border text-yby-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-yby-tint group-hover:border-yby-primary/40">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-yby-heading group-hover:text-yby-primary transition-colors">
                  Relatórios filtráveis
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yby-tint text-yby-primary">Exportação</span>
              </div>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                Filtre por resíduo, cooperativa e intervalo de datas com exportação em um clique para Excel (.xlsx) e PDF executivo.
              </p>
            </div>
          </div>

          <div className="group p-6 bg-yby-surface/40 border border-yby-border rounded-2xl flex gap-4 transition-all duration-300 ease-out hover:bg-white hover:-translate-y-1.5 hover:shadow-card-hover hover:border-yby-primary/40 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-white border border-yby-border text-yby-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-yby-tint group-hover:border-yby-primary/40">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-yby-heading group-hover:text-yby-primary transition-colors">
                  Dashboard ambiental
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yby-tint text-yby-primary">Impacto</span>
              </div>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                Indicadores de pegada de carbono, energia e água poupada com gráficos interativos e atalhos de período.
              </p>
            </div>
          </div>

          <div className="group p-6 bg-yby-surface/40 border border-yby-border rounded-2xl flex gap-4 transition-all duration-300 ease-out hover:bg-white hover:-translate-y-1.5 hover:shadow-card-hover hover:border-yby-primary/40 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-white border border-yby-border text-yby-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-yby-tint group-hover:border-yby-primary/40">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-yby-heading group-hover:text-yby-primary transition-colors">
                  Artes para Stories
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yby-tint text-yby-primary">Comunicação</span>
              </div>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                Gere imagens personalizadas em formato 1080x1920 prontas para redes sociais celebrando as conquistas sustentáveis da sua comunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA de Alta Conversão - Preenchido até o Rodapé */}
      <section className="w-full bg-gradient-to-br from-yby-dark via-yby-primary to-[#1B5324] text-white pt-16 md:pt-24 pb-14 md:pb-16 relative overflow-hidden">
        {/* Fade In Sutil no Topo (Transição Suave da Seção Clara para o Verde do CTA) */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-b from-white via-white/20 to-transparent pointer-events-none z-10" />

        {/* Efeito de brilho orgânico no fundo */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 -mb-12 -ml-12 w-80 h-80 bg-yby-light/15 rounded-full blur-2xl pointer-events-none" />

        {/* Fade Out Sutil na Base (Transição Suave do Verde do CTA para o Rodapé Dark) */}
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-40 bg-gradient-to-b from-transparent via-[#143E1B]/70 to-[#143E1B] pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-yby-light border border-white/20 shadow-sm">
              <YbyIcon variant="white" className="w-4 h-4" />
              Comece agora
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Pronto para transformar a gestão de resíduos da sua organização?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl">
              Acesse a plataforma web, monitore coletas em tempo real e gere indicadores ambientais certificados prontos para seu relatório ESG.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/signIn')}
                className="w-full sm:w-auto font-bold bg-white text-yby-dark hover:bg-yby-cream shadow-lg hover:scale-105 active:scale-95 transition-all text-base px-7 py-3.5"
              >
                Acessar Plataforma <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <button
                type="button"
                onClick={() => navigate('/signIn-client')}
                className="w-full sm:w-auto inline-flex items-center justify-center font-extrabold text-base px-7 py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-black shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-lime-300"
              >
                Portal da Cooperativa <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé Completo com Contato, Email, Redes Sociais e Botão de WhatsApp */}
      <LandingFooter />

      {/* Botão Flutuante de WhatsApp para Contato Direto */}
      <FloatingWhatsAppButton />
    </div>
  );
}
