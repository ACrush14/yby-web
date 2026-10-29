import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    src: '/assets/hero/banner-1.png',
    alt: 'YBY - Coleta Seletiva Descomplicada',
    title: 'Coleta Seletiva Descomplicada',
    subtitle: 'Soluções sustentáveis para condomínios, empresas e grandes geradores',
  },
  {
    src: '/assets/hero/banner-2.png',
    alt: 'YBY - Logística Reversa de Embalagens',
    title: 'Logística Reversa Certificada',
    subtitle: 'Rastreabilidade de embalagens com comprovação de créditos de reciclagem',
  },
  {
    src: '/assets/hero/banner-3.png',
    alt: 'YBY - Fortalecimento de Cooperativas',
    title: 'Impacto Social & Renda Digna',
    subtitle: 'Capacitação e remuneração justa para cooperativas de catadores',
  },
  {
    src: '/assets/hero/banner-4.png',
    alt: 'YBY - Economia Circular e Compostagem',
    title: 'Economia Circular & Compostagem',
    subtitle: 'Transformando resíduos orgânicos em adubo e regeneração ambiental',
  },
];

export function HeroBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  // Suporte a swipe tátil no mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const total = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) nextSlide();
    if (distance < -40) prevSlide();
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

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden select-none group bg-yby-surface border-y border-yby-border/60 shadow-inner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carrossel de Imagens do Hero YBY"
    >
      {/* Contêiner Panorâmico Full-Width de uma ponta a outra */}
      <div className="relative w-full aspect-[1840/640] sm:aspect-[1840/520] md:aspect-[1840/480] min-h-[200px] sm:min-h-[260px] md:min-h-[340px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-yby-cream/40 via-white to-yby-cream/40">
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
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Leve vinheta nos cantos para elegância visual */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Botão Slide Anterior (Extremo esquerdo) */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-yby-heading hover:text-yby-primary shadow-xl backdrop-blur-md border border-white/60 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Botão Próximo Slide (Extremo direito) */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-yby-heading hover:text-yby-primary shadow-xl backdrop-blur-md border border-white/60 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Barra Flutuante com Legenda da Solução e Dots de Paginação */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-2 rounded-2xl bg-black/55 backdrop-blur-md text-white border border-white/15 shadow-xl max-w-[90%]">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yby-light animate-pulse" />
            <span className="text-xs font-bold tracking-wide text-white drop-shadow-sm whitespace-nowrap">
              {activeSlide.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-8 h-2 bg-yby-light shadow-md'
                      : 'w-2.5 h-2 bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Ir para slide ${index + 1}: ${slide.title}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
