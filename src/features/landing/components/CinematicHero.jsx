import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Recycle,
  Zap,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const HERO_PHOTOS = [
  {
    id: 'catadores',
    src: '/assets/hero/hero-catadores.jpg',
    alt: 'Cooperativas de catadores de materiais recicláveis YBY',
    tag: 'Impacto Social & Renda',
    title: 'Cooperativas de Catadores',
    description: 'Capacitação, remuneração digna e desenvolvimento técnico em rede',
  },
  {
    id: 'empresas',
    src: '/assets/hero/hero-empresas.jpg',
    alt: 'Gestão de economia circular em empresas e condomínios',
    tag: 'Economia Circular',
    title: 'Grandes Geradores & Empresas',
    description: 'Gestão de resíduos ponto a ponto com pesagem e rastreabilidade',
  },
  {
    id: 'capsulas',
    src: '/assets/hero/hero-capsulas.jpg',
    alt: 'Logística reversa certificada de embalagens',
    tag: 'Logística Reversa',
    title: 'Rastreabilidade de Embalagens',
    description: 'Comprovação de metas ambientais em conformidade com a PNRS',
  },
  {
    id: 'compostagem',
    src: '/assets/hero/hero-compostagem.jpg',
    alt: 'Estação de compostagem e resíduos orgânicos',
    tag: 'Compostagem Orgânica',
    title: 'Regeneração de Solos',
    description: 'Transformação de resíduos orgânicos em adubo ecológico de alta qualidade',
  },
  {
    id: 'fundadores',
    src: '/assets/hero/hero-fundadores.jpg',
    alt: 'Rebeca Wermont e André Marques, cofundadores da Yby Soluções Sustentáveis',
    tag: 'Liderança & Propósito',
    title: 'Nossa Atuação em Campo',
    description: 'Startup de impacto impulsionando a cadeia da reciclagem no Brasil',
  },
];

export function CinematicHero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const total = HERO_PHOTOS.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const activePhoto = HERO_PHOTOS[currentIndex];

  const handleScrollToContent = () => {
    const el = document.getElementById('impacto');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-between bg-[#0A160E] text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Apresentação Principal da Plataforma YBY"
    >
      {/* 1. Camada de Imagens Fotográficas com Transição Suave */}
      <div className="absolute inset-0 z-0">
        {HERO_PHOTOS.map((photo, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={photo.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              } transform duration-1000`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.05]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Gradiente Atmosférico Escuro / Verde Floresta (Inspirado na Referência) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A160E]/50 via-[#0A160E]/75 to-[#0A160E] pointer-events-none" />

        {/* Brilho Verde Orgânico Difuso no Centro e Canto */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-lime-400/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* 2. Conteúdo Central Sobreposto com Tags Flutuantes */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 md:pt-40 pb-16 flex-1 flex flex-col items-center justify-center text-center">
        {/* Chips Flutuantes Estilo Glassmorphism (ao redor do cabeçalho) */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90 shadow-lg transition-transform hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span>Logística Reversa Certificada</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90 shadow-lg transition-transform hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Rastreabilidade PNRS</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90 shadow-lg transition-transform hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Impacto Social em Cooperativas</span>
          </div>
        </div>

        {/* Título Principal de Alto Impacto */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] max-w-4xl drop-shadow-md">
          Dados reais. Impacto mensurável. Economia circular.
        </h1>

        {/* Subtítulo Descritivo */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-normal">
          Conectamos empresas e condomínios a cooperativas de reciclagem, transformando cada coleta
          em indicadores ambientais certificados e renda digna.
        </p>

        {/* Botões de Ação em Pílula (Estilo da Imagem de Referência) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => navigate('/signIn')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm tracking-wide shadow-xl shadow-lime-500/20 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Acessar plataforma</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleScrollToContent}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Conhecer operação
          </button>
        </div>

        {/* Seletor Interativo das Fotografias do YBY */}
        <div className="mt-12 sm:mt-16 w-full max-w-3xl">
          <div className="flex items-center justify-between p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-2xl">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Abas com nomes das fotos */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto px-2 no-scrollbar">
              {HERO_PHOTOS.map((photo, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-lime-400 text-black shadow-md scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {photo.title}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[11px] text-white/60 mt-2 text-center font-medium">
            Foto atual: <span className="text-white font-bold">{activePhoto.title}</span> —{' '}
            {activePhoto.description}
          </p>
        </div>
      </div>

      {/* 3. Faixa de Métricas e Resultados (Parte Inferior da Referência) */}
      <div className="relative z-10 border-t border-white/10 bg-[#0A160E]/95 backdrop-blur-lg pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Impacto Certificado em Todo o Brasil
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Mais de 2.500 coletas transformadas em sustentabilidade mensurável
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/70 max-w-md">
              Conectamos a ponta geradora às cooperativas com pesagem digital, dados auditáveis para
              relatórios ESG e rastreabilidade integral.
            </p>
          </div>

          {/* Grid de Métricas com Destaque Neon/Lime (Inspirado no 95%, 20+, $5M+) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-lime-400 tracking-tight">
                +2.500
              </p>
              <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                Coletas Rastreáveis
              </span>
              <span className="text-[11px] text-white/50 block mt-0.5">
                Pesagens certificadas em sistema
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-lime-400 tracking-tight">
                12+
              </p>
              <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                Cooperativas Parceiras
              </span>
              <span className="text-[11px] text-white/50 block mt-0.5">
                Fortalecimento de catadores
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-lime-400 tracking-tight">
                14,2 ton
              </p>
              <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                CO₂ Mitigado
              </span>
              <span className="text-[11px] text-white/50 block mt-0.5">
                Redução de emissões comprovada
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-lime-400 tracking-tight">
                100%
              </p>
              <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                Conformidade PNRS
              </span>
              <span className="text-[11px] text-white/50 block mt-0.5">
                Dados válidos para auditoria ESG
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
