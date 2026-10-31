import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_PHOTOS = [
  {
    id: 'catadores',
    src: '/assets/hero/hero-catadores.jpg',
    alt: 'Cooperativas de catadores de materiais recicláveis YBY',
    tag: 'Impacto Social & Renda',
    title: 'Cooperativas de Catadores',
  },
  {
    id: 'empresas',
    src: '/assets/hero/hero-empresas.jpg',
    alt: 'Gestão de economia circular em empresas e condomínios',
    tag: 'Economia Circular',
    title: 'Grandes Geradores & Empresas',
  },
  {
    id: 'capsulas',
    src: '/assets/hero/hero-capsulas.jpg',
    alt: 'Logística reversa certificada de embalagens',
    tag: 'Logística Reversa',
    title: 'Rastreabilidade de Embalagens',
  },
  {
    id: 'compostagem',
    src: '/assets/hero/hero-compostagem.jpg',
    alt: 'Estação de compostagem e resíduos orgânicos',
    tag: 'Compostagem Orgânica',
    title: 'Regeneração de Solos',
  },
  {
    id: 'fundadores',
    src: '/assets/hero/hero-fundadores.jpg',
    alt: 'Rebeca Wermont e André Marques, cofundadores da Yby Soluções Sustentáveis',
    tag: 'Liderança & Propósito',
    title: 'Nossa Atuação em Campo',
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

  const handleScrollToContent = () => {
    const el = document.getElementById('impacto');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center bg-[#0A160E] text-white overflow-hidden select-none"
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
                className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.05]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Gradiente Atmosférico Escuro / Verde Floresta */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A160E]/50 via-[#0A160E]/70 to-[#0A160E] pointer-events-none" />

        {/* Brilho Verde Orgânico Difuso */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-lime-400/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* 2. Setas Discretas de Navegação (Esquerda e Direita) */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/25 hover:bg-black/55 text-white/50 hover:text-white backdrop-blur-sm border border-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/25 hover:bg-black/55 text-white/50 hover:text-white backdrop-blur-sm border border-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        aria-label="Próxima foto"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* 3. Conteúdo Central Sobreposto com Tipografia de Alto Impacto */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 md:px-14 py-20 sm:py-28 flex flex-col items-center justify-center text-center">
        {/* Título Principal de Alto Impacto - Frases de Efeito em Linhas Separadas */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] max-w-4xl drop-shadow-md">
          <span className="block">Dados reais.</span>
          <span className="block">Impacto mensurável.</span>
          <span className="block text-white">Economia circular.</span>
        </h1>

        {/* Subtítulo Descritivo */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-normal">
          Conectamos empresas e condomínios a cooperativas de reciclagem, transformando cada coleta
          em indicadores ambientais certificados.
        </p>

        {/* Botões de Ação em Pílula */}
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
      </div>

      {/* 4. Indicador Discreto de Navegação (Dots Minimalistas) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_PHOTOS.map((photo, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                isActive ? 'w-6 h-1.5 bg-lime-400' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Ver foto ${index + 1}: ${photo.title}`}
            />
          );
        })}
      </div>
    </section>
  );
}
