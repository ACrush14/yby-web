import React, { useState } from 'react';
import { Zap, Droplet, Cloud, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

/**
 * Formata o valor dos KPIs primários para garantir que o número e a unidade
 * fiquem perfeitamente legíveis em uma linha, sem estourar nem quebrar no hover.
 * @param {{ value: string }} props
 */
function FormattedKpiValue({ value }) {
  if (!value) return null;

  // Caso 1: Formato monetário "R$ 5.733,56"
  if (value.startsWith('R$ ')) {
    const amount = value.slice(3);
    return (
      <div className="inline-flex items-baseline gap-1 whitespace-nowrap flex-nowrap text-yby-heading">
        <span className="text-xs sm:text-sm font-bold text-yby-muted flex-shrink-0">R$</span>
        <span className="font-extrabold tracking-tight whitespace-nowrap text-sm sm:text-[15px] xl:text-base 2xl:text-lg">
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
        <span className="font-extrabold tracking-tight whitespace-nowrap text-sm sm:text-[15px] xl:text-base 2xl:text-lg">
          {number}
        </span>
        <span className="font-semibold text-yby-muted whitespace-nowrap flex-shrink-0 text-[10px] sm:text-[11px] xl:text-xs">
          {unit}
        </span>
      </div>
    );
  }

  return (
    <span className="font-extrabold text-yby-heading tracking-tight whitespace-nowrap text-sm sm:text-[15px] xl:text-base 2xl:text-lg">
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
              'px-3 py-3 sm:px-3.5 sm:py-3.5 xl:px-4 xl:py-4 bg-white',
              isExpanded
                ? 'z-20 shadow-card-elevated border-yby-primary ring-1 ring-yby-primary/30 -translate-y-1'
                : 'z-10 shadow-card border-yby-border hover:-translate-y-1 hover:shadow-card-elevated hover:border-yby-primary/40'
            )}
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                className={clsx(
                  'w-9 h-9 sm:w-9.5 sm:h-9.5 xl:w-10 xl:h-10 rounded-xl xl:rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out shadow-sm',
                  isExpanded ? 'scale-105 rotate-2' : 'group-hover:scale-105 group-hover:rotate-2'
                )}
                style={{ backgroundColor: card.bg, color: card.color }}
              >
                <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>

              <div className="min-w-0 flex-1">
                <span
                  className="text-[10.5px] sm:text-[11px] xl:text-[11.5px] 2xl:text-xs font-semibold text-yby-muted group-hover:text-yby-heading block leading-tight transition-colors truncate whitespace-nowrap"
                  title={card.title}
                >
                  {card.title}
                </span>

                <div className="mt-1">
                  <FormattedKpiValue value={card.value} />
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
