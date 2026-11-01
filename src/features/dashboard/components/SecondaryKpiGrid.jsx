import React, { useState } from 'react';
import clsx from 'clsx';

export function SecondaryKpiGrid({ metrics }) {
  if (!metrics) return null;

  const [activeCardId, setActiveCardId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const cards = [
    {
      id: 'socioenvironmental',
      title: 'BENEFÍCIO SOCIOAMBIENTAL',
      value: metrics.secondary.socioenvironmental,
      accentColor: '#267332',
      detail: 'Retorno econômico para a cooperativa e catadores',
    },
    {
      id: 'oil',
      title: 'PETRÓLEO POUPADO',
      value: metrics.secondary.oil,
      accentColor: '#005885',
      detail: 'Economia de insumos fósseis na reciclagem',
    },
    {
      id: 'trees',
      title: 'ÁRVORES POUPADAS',
      value: metrics.secondary.trees,
      accentColor: '#2A5C43',
      detail: 'Preservação de celulose virgem e florestas',
    },
    {
      id: 'landfillSpace',
      title: 'ESPAÇO EM ATERRO SANITÁRIO',
      value: metrics.secondary.landfillSpace,
      accentColor: '#E65124',
      detail: 'Volume desviado do descarte municipal',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4 mb-6 relative">
      {cards.map((card) => {
        const isHovered = hoveredCardId === card.id;
        const isActive = activeCardId === card.id;
        const isExpanded = isHovered || isActive;

        return (
          <div
            key={card.id}
            tabIndex={0}
            role="button"
            aria-label={`${card.title}: ${card.value}`}
            aria-expanded={isExpanded}
            onMouseEnter={() => setHoveredCardId(card.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            onClick={() => setActiveCardId((prev) => (prev === card.id ? null : card.id))}
            onTouchStart={() => setActiveCardId(card.id)}
            onFocus={() => setHoveredCardId(card.id)}
            onBlur={() => {
              setHoveredCardId(null);
              setActiveCardId(null);
            }}
            className={clsx(
              'group rounded-2xl border relative transition-all duration-300 ease-out cursor-pointer select-none',
              'px-3.5 py-3 sm:px-4 sm:py-3.5 xl:px-4.5 xl:py-4',
              isExpanded
                ? 'z-20 bg-white scale-[1.03] sm:scale-105 shadow-xl border-yby-primary/60 ring-2 ring-yby-primary/15 -translate-y-1'
                : 'bg-yby-zebra hover:bg-white border-yby-border/80 hover:-translate-y-1 hover:shadow-card-hover hover:border-yby-primary/30'
            )}
          >
            {/* Barra de acento colorida no topo */}
            <div
              className={clsx(
                'absolute top-0 left-0 right-0 rounded-t-2xl transition-all duration-300',
                isExpanded ? 'h-2' : 'h-1.5 group-hover:h-2'
              )}
              style={{ backgroundColor: card.accentColor }}
            />
            <span
              className={clsx(
                'text-[10px] sm:text-[10.5px] xl:text-[11px] font-bold tracking-tight uppercase block transition-colors leading-tight',
                isExpanded
                  ? 'text-yby-heading whitespace-normal break-words'
                  : 'text-yby-muted truncate group-hover:text-yby-heading'
              )}
              title={card.title}
            >
              {card.title}
            </span>
            <p
              className={clsx(
                'font-extrabold text-yby-heading mt-1 tracking-tight whitespace-nowrap transition-all duration-200',
                isExpanded ? 'text-base sm:text-lg xl:text-xl' : 'text-sm sm:text-base xl:text-lg'
              )}
              title={card.value}
            >
              {card.value}
            </p>

            {/* Detalhe exibido ao expandir */}
            <div
              className={clsx(
                'transition-all duration-300 ease-out overflow-hidden',
                isExpanded
                  ? 'max-h-12 opacity-100 mt-2 pt-1.5 border-t border-yby-border/60'
                  : 'max-h-0 opacity-0'
              )}
            >
              <span className="text-[10px] sm:text-[10.5px] font-medium text-yby-muted leading-tight block">
                {card.detail}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
