import React from 'react';
import { Zap, Droplet, Cloud, TrendingUp } from 'lucide-react';

/**
 * Formata o valor dos KPIs primários para garantir que o número e a unidade
 * fiquem legíveis, sem estourar o card nem cortar dígitos em qualquer resolução.
 * @param {{ value: string }} props
 */
function FormattedKpiValue({ value }) {
  if (!value) return null;

  // Caso 1: Formato monetário "R$ 5.733,56"
  if (value.startsWith('R$ ')) {
    const amount = value.slice(3);
    return (
      <div className="inline-flex items-baseline gap-1 text-yby-heading">
        <span className="text-xs sm:text-sm font-bold text-yby-muted">R$</span>
        <span className="text-base sm:text-[17px] xl:text-lg 2xl:text-xl font-extrabold tracking-tight">
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
      <div className="inline-flex items-baseline gap-1 flex-wrap text-yby-heading">
        <span className="text-base sm:text-[17px] xl:text-lg 2xl:text-xl font-extrabold tracking-tight">
          {number}
        </span>
        <span className="text-[11px] sm:text-xs font-semibold text-yby-muted whitespace-nowrap">
          {unit}
        </span>
      </div>
    );
  }

  return (
    <span className="text-base sm:text-[17px] xl:text-lg 2xl:text-xl font-extrabold text-yby-heading tracking-tight">
      {value}
    </span>
  );
}

export function PrimaryKpiGrid({ metrics }) {
  if (!metrics) return null;

  const cards = [
    {
      title: 'Consumo de energia',
      value: metrics.primary.energy,
      icon: Zap,
      bg: '#FDF0EC',
      color: '#E65124',
    },
    {
      title: 'Economia de água',
      value: metrics.primary.water,
      icon: Droplet,
      bg: '#E5F1F8',
      color: '#005885',
    },
    {
      title: 'CO₂ evitado',
      value: metrics.primary.co2,
      icon: Cloud,
      bg: '#E9F1ED',
      color: '#2A5C43',
    },
    {
      title: 'Valor climático estimado',
      value: metrics.primary.climaticValue,
      icon: TrendingUp,
      bg: '#E6F0E8',
      color: '#267332',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group bg-white px-3.5 py-3.5 sm:px-4 sm:py-4 xl:px-4.5 xl:py-5 rounded-2xl border border-yby-border shadow-card flex items-center gap-2.5 sm:gap-3 xl:gap-3.5 min-h-[92px] sm:min-h-[96px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card-elevated hover:border-yby-primary/40 cursor-default select-none overflow-hidden"
          >
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl xl:rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 shadow-sm"
              style={{ backgroundColor: card.bg, color: card.color }}
            >
              <Icon className="w-5 h-5 xl:w-5.5 xl:h-5.5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] sm:text-xs font-semibold text-yby-muted block leading-tight break-words group-hover:text-yby-heading transition-colors">
                {card.title}
              </span>
              <div className="mt-1 group-hover:translate-x-0.5 transition-transform">
                <FormattedKpiValue value={card.value} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
