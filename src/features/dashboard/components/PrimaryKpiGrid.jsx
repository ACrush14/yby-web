import React, { useState } from 'react';
import { Zap, Droplet, Cloud, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

/**
 * Formata o valor dos KPIs primários para garantir que o número e a unidade
 * fiquem legíveis, sem estourar o card nem sofrer corte em telas menores.
 * @param {{ value: string, isExpanded?: boolean }} props
 */
function FormattedKpiValue({ value, isExpanded = false }) {
  if (!value) return null;

  // Caso 1: Formato monetário "R$ 5.733,56"
  if (value.startsWith('R$ ')) {
    const amount = value.slice(3);
    return (
      <div className="inline-flex items-baseline gap-1 whitespace-nowrap flex-nowrap text-yby-heading">
        <span className="text-xs sm:text-sm font-bold text-yby-muted flex-shrink-0">R$</span>
        <span
          className={clsx(
            'font-extrabold tracking-tight whitespace-nowrap transition-all duration-200',
            isExpanded
              ? 'text-base sm:text-lg xl:text-xl'
              : 'text-sm sm:text-[15px] xl:text-base 2xl:text-lg'
          )}
        >
          {amount}
        </span>
      </div>
    );
  }

  // Caso 2: Formato com unidade ("266.049,94 MWh", "637.995,42 L", "129.806,64 kg CO₂e")
  const spaceIndex = value.indexOf(' ');
  if (spaceIndex !== -1) {
    const number = value.slice(0, spaceIndex);
    const unit = value.slice(spaceIndex + 1);
    return (
      <div className="inline-flex items-baseline gap-1 whitespace-nowrap flex-nowrap text-yby-heading">
        <span
          className={clsx(
            'font-extrabold tracking-tight whitespace-nowrap transition-all duration-200',
            isExpanded
              ? 'text-base sm:text-lg xl:text-xl'
              : 'text-sm sm:text-[15px] xl:text-base 2xl:text-lg'
          )}
        >
          {number}
        </span>
        <span
          className={clsx(
            'font-semibold text-yby-muted whitespace-nowrap flex-shrink-0 transition-all duration-200',
            isExpanded
              ? 'text-xs sm:text-sm'
              : 'text-[10px] sm:text-[11px] xl:text-xs'
          )}
        >
          {unit}
        </span>
      </div>
    );
  }

  return (
    <span
      className={clsx(
        'font-extrabold text-yby-heading tracking-tight whitespace-nowrap transition-all duration-200',
        isExpanded
          ? 'text-base sm:text-lg xl:text-xl'
          : 'text-sm sm:text-[15px] xl:text-base 2xl:text-lg'
      )}
    >
      {value}
    </span>
  );
}

export function PrimaryKpiGrid({ metrics }) {
  if (!metrics) return null;

  // Estado para suporte a toque em dispositivos móveis ("passar o dedo em cima")
  const [activeCardId, setActiveCardId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const cards = [
    {
      id: 'energy',
      title: 'Consumo de energia',
      detail: 'Energia elétrica evitada na rede',
      value: metrics.primary.energy,
      icon: Zap,
      bg: '#FDF0EC',
      color: '#E65124',
    },
    {
      id: 'water',
      title: 'Economia de água',
      detail: 'Água poupada em processos produtivos',
      value: metrics.primary.water,
      icon: Droplet,
      bg: '#E5F1F8',
      color: '#005885',
    },
    {
      id: 'co2',
      title: 'CO₂ evitado',
      detail: 'Emissões de gases de efeito estufa evitadas',
      value: metrics.primary.co2,
      icon: Cloud,
      bg: '#E9F1ED',
      color: '#2A5C43',
    },
    {
      id: 'climaticValue',
      title: 'Valor climático estimado',
      detail: 'Impacto socioambiental certificado',
      value: metrics.primary.climaticValue,
      icon: TrendingUp,
      bg: '#E6F0E8',
      color: '#267332',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4 mb-6 relative">
      {cards.map((card) => {
        const Icon = card.icon;
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
              'group relative rounded-2xl border transition-all duration-300 ease-out cursor-pointer select-none',
              'px-3.5 py-3 sm:px-4 sm:py-3.5 xl:px-4.5 xl:py-4 bg-white',
              isExpanded
                ? 'z-30 scale-[1.03] sm:scale-105 xl:scale-110 shadow-2xl shadow-yby-primary/15 border-yby-primary ring-2 ring-yby-primary/20 -translate-y-1'
                : 'z-10 shadow-card border-yby-border hover:-translate-y-1 hover:shadow-card-elevated hover:border-yby-primary/40'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'w-10 h-10 sm:w-11 sm:h-11 rounded-xl xl:rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out shadow-sm',
                  isExpanded ? 'scale-110 rotate-3' : 'group-hover:scale-110 group-hover:rotate-3'
                )}
                style={{ backgroundColor: card.bg, color: card.color }}
              >
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>

              <div className="min-w-0 flex-1">
                <span
                  className={clsx(
                    'text-[11px] sm:text-xs font-semibold text-yby-muted block leading-tight transition-colors',
                    isExpanded
                      ? 'text-yby-heading whitespace-normal break-words font-bold'
                      : 'truncate group-hover:text-yby-heading'
                  )}
                  title={card.title}
                >
                  {card.title}
                </span>

                <div className="mt-1 transition-transform">
                  <FormattedKpiValue value={card.value} isExpanded={isExpanded} />
                </div>
              </div>
            </div>

            {/* Expansão Informativa ao passar o mouse ou tocar */}
            <div
              className={clsx(
                'transition-all duration-300 ease-out overflow-hidden',
                isExpanded
                  ? 'max-h-16 opacity-100 mt-2.5 pt-2 border-t border-yby-border/60'
                  : 'max-h-0 opacity-0'
              )}
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-yby-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-yby-primary flex-shrink-0" />
                <span className="leading-tight">{card.detail}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
