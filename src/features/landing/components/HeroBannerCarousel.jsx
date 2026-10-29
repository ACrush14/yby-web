import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    src: '/assets/hero/banner-1.png',
    alt: 'YBY - Coleta Seletiva Descomplicada',
    title: 'Coleta Seletiva Descomplicada',
    subtitle: 'Conectando empresas e condomínios a uma gestão eficiente de resíduos recicláveis',
  },
  {
    src: '/assets/hero/banner-2.png',
    alt: 'YBY - Logística Reversa de Embalagens',
    title: 'Logística Reversa Certificada',
    subtitle: 'Cumprimento de metas ambientais com rastreabilidade total e geração de dados ESG',
  },
  {
    src: '/assets/hero/banner-3.png',
    alt: 'YBY - Fortalecimento de Cooperativas',
    title: 'Impacto Social Positivo',
    subtitle: 'Geração de renda digna e capacitação para cooperativas de catadores de materiais recicláveis',
  },
  {
    src: '/assets/hero/banner-4.png',
    alt: 'YBY - Economia Circular e Compostagem',
    title: 'Economia Circular na Prática',
    subtitle: 'Transformando resíduos orgânicos e secos em valor e regeneração de sistemas',
  },
];

export function HeroBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const total = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, total]);

  return (
    <div
      className="relative w-full max-w-5xl mx-auto mt-10 md:mt-12 rounded-2xl md:rounded-3xl overflow-hidden border border-yby-border/80 shadow-card-elevated bg-white select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Carrossel de Imagens do Hero YBY"
    >
      {/* Contêiner das Imagens com proporção fluida */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/8] bg-yby-surface flex items-center justify-center overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Gradiente sutil inferior para legibilidade caso haja sobreposição */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Botão Slide Anterior */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 hover:bg-white text-yby-heading hover:text-yby-primary shadow-lg border border-yby-border/60 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-80 md:opacity-0 group-hover:opacity-100"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Botão Próximo Slide */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 hover:bg-white text-yby-heading hover:text-yby-primary shadow-lg border border-yby-border/60 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-80 md:opacity-0 group-hover:opacity-100"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Indicadores de Paginação / Dots */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-7 h-2 bg-yby-light shadow-sm'
                    : 'w-2 h-2 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Ir para slide ${index + 1}: ${slide.title}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
