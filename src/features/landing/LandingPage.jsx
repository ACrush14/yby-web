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

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-yby-heading flex flex-col selection:bg-yby-light selection:text-yby-primary">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-yby-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-yby-tint/60 border border-yby-border/60 flex items-center justify-center p-1.5 shadow-sm">
              <YbyIcon variant="dark" className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-yby-heading">
              YBY
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-yby-muted">
            <a href="#como-funciona" className="hover:text-yby-primary transition-colors">Como funciona</a>
            <a href="#impacto" className="hover:text-yby-primary transition-colors">Impacto</a>
            <a href="#funcionalidades" className="hover:text-yby-primary transition-colors">Funcionalidades</a>
            <a href="#para-quem" className="hover:text-yby-primary transition-colors">Para quem</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="primary" size="md" onClick={() => navigate('/signIn')}>
              Entrar
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-yby-heading hover:bg-yby-surface"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-yby-border bg-white px-4 pt-2 pb-6 space-y-3">
            <a
              href="#como-funciona"
              className="block py-2 text-sm font-semibold text-yby-muted hover:text-yby-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como funciona
            </a>
            <a
              href="#impacto"
              className="block py-2 text-sm font-semibold text-yby-muted hover:text-yby-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impacto
            </a>
            <a
              href="#funcionalidades"
              className="block py-2 text-sm font-semibold text-yby-muted hover:text-yby-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funcionalidades
            </a>
            <a
              href="#para-quem"
              className="block py-2 text-sm font-semibold text-yby-muted hover:text-yby-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Para quem
            </a>
            <Button variant="primary" fullWidth onClick={() => navigate('/signIn')}>
              Entrar na Plataforma
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-yby-cream/50 to-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yby-tint border border-yby-light text-yby-primary text-xs font-bold uppercase tracking-wider">
            Plataforma ESG de Coleta Seletiva
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yby-heading tracking-tight leading-[1.15]">
            Gestão de resíduos com dados de impacto
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-yby-muted max-w-2xl mx-auto leading-relaxed">
            Conectamos geradores de resíduos a cooperativas de reciclagem, transformando cada coleta em indicadores ambientais certificados.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/signIn')} className="w-full sm:w-auto">
              Acessar plataforma <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => {
              const el = document.getElementById('como-funciona');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} className="w-full sm:w-auto">
              Conhecer operação
            </Button>
          </div>
        </div>
      </section>

      {/* Seção Impacto Mensurável */}
      <section id="impacto" className="py-16 bg-yby-cream/40 border-y border-yby-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-yby-heading tracking-tight">
              Impacto Mensurável
            </h2>
            <p className="text-sm md:text-base text-yby-muted mt-2">
              O dashboard converte cada registro de coleta em indicadores de energia, água, carbono e árvores — prontos para o relatório de sustentabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-yby-border shadow-card flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF0EC] text-yby-orange flex items-center justify-center flex-shrink-0">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-yby-muted uppercase">Energia evitada</span>
                <p className="text-xl md:text-2xl font-extrabold text-yby-heading mt-0.5">276.984 MWh</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-yby-border shadow-card flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E5F1F8] text-yby-blue flex items-center justify-center flex-shrink-0">
                <Droplet className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-yby-muted uppercase">Água economizada</span>
                <p className="text-xl md:text-2xl font-extrabold text-yby-heading mt-0.5">24.036.493 L</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-yby-border shadow-card flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E9F1ED] text-yby-teal flex items-center justify-center flex-shrink-0">
                <Cloud className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-yby-muted uppercase">CO₂e evitado</span>
                <p className="text-xl md:text-2xl font-extrabold text-yby-heading mt-0.5">133.585 kg</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-yby-border shadow-card flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-yby-tint text-yby-primary flex items-center justify-center flex-shrink-0">
                <TreePine className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-yby-muted uppercase">Árvores poupadas</span>
                <p className="text-xl md:text-2xl font-extrabold text-yby-heading mt-0.5">644 árvores</p>
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
            <div key={item.step} className="bg-white p-6 rounded-2xl border border-yby-border/80 shadow-sm relative text-left">
              <div className="w-12 h-12 rounded-xl bg-yby-tint text-yby-primary font-extrabold text-lg flex items-center justify-center mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-yby-heading mb-2">{item.title}</h3>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">{item.desc}</p>
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
            <div className="bg-white p-8 rounded-2xl border border-yby-border shadow-card">
              <h3 className="text-xl font-bold text-yby-heading mb-3">Empresas e PEVs</h3>
              <p className="text-sm text-yby-muted mb-6 leading-relaxed">
                Condomínios residenciais, comerciais, indústrias e escolas que precisam comprovar destinação correta e obter métricas ESG transparentes.
              </p>
              <ul className="space-y-3 text-xs md:text-sm text-yby-heading font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Histórico completo de coletas</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Certificados de impacto ambiental</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Artes prontas para Instagram Stories</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-yby-border shadow-card">
              <h3 className="text-xl font-bold text-yby-heading mb-3">Cooperativas</h3>
              <p className="text-sm text-yby-muted mb-6 leading-relaxed">
                Equipes de triagem e coleta que precisam de rotas previsíveis, facilidade de apontamento no celular e valorização do seu trabalho.
              </p>
              <ul className="space-y-3 text-xs md:text-sm text-yby-heading font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Escala semanal Segunda a Sexta</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Apontamento mobile simplificado</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Login rápido por código de acesso</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-yby-border shadow-card">
              <h3 className="text-xl font-bold text-yby-heading mb-3">Gestores</h3>
              <p className="text-sm text-yby-muted mb-6 leading-relaxed">
                Administradoras e consultores que gerenciam carteiras de múltiplos condomínios e clientes corporativos de forma unificada.
              </p>
              <ul className="space-y-3 text-xs md:text-sm text-yby-heading font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Visão consolidada de PEVs vinculados</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Auditoria de fotos e avarias</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-yby-primary" /> Exportação massiva para Excel e PDF</li>
              </ul>
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
          <div className="p-6 bg-yby-surface/50 border border-yby-border rounded-2xl flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-yby-border text-yby-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-yby-heading">Planejamento semanal</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yby-tint text-yby-primary">Escala</span>
              </div>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                Grade interativa colorida por cooperativa com detecção de status de salvamento e seleção rápida dia a dia.
              </p>
            </div>
          </div>

          <div className="p-6 bg-yby-surface/50 border border-yby-border rounded-2xl flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-yby-border text-yby-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-yby-heading">Relatórios filtráveis</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yby-tint text-yby-primary">Exportação</span>
              </div>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                Filtre por resíduo, cooperativa e intervalo de datas com exportação em um clique para Excel (.xlsx) e PDF executivo.
              </p>
            </div>
          </div>

          <div className="p-6 bg-yby-surface/50 border border-yby-border rounded-2xl flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-yby-border text-yby-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-yby-heading">Dashboard ambiental</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yby-tint text-yby-primary">Impacto</span>
              </div>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                Indicadores de pegada de carbono, energia e água poupada com gráficos interativos e atalhos de período.
              </p>
            </div>
          </div>

          <div className="p-6 bg-yby-surface/50 border border-yby-border rounded-2xl flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-yby-border text-yby-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-yby-heading">Artes para Stories</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yby-tint text-yby-primary">Comunicação</span>
              </div>
              <p className="text-xs md:text-sm text-yby-muted leading-relaxed">
                Gere imagens personalizadas em formato 1080x1920 prontas para redes sociais celebrando as conquistas sustentáveis da sua comunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="mt-auto border-t border-yby-border bg-yby-cream/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-yby-muted">
          <div className="flex items-center gap-2">
            <YbyIcon variant="dark" className="w-5 h-5" />
            <span className="font-extrabold text-lg text-yby-heading">YBY</span>
            <span className="text-yby-muted ml-2">© {new Date().getFullYear()} YBY Soluções Sustentáveis. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <button onClick={() => navigate('/signIn')} className="hover:text-yby-primary">Login Administrativo</button>
            <button onClick={() => navigate('/signIn-client')} className="hover:text-yby-primary">Acesso Cooperativa</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
