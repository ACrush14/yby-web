import React from 'react';
import { Zap, Droplet, Cloud, TrendingUp } from 'lucide-react';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white p-5 rounded-2xl border border-yby-border shadow-card flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: card.bg, color: card.color }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-yby-muted block leading-tight">
                {card.title}
              </span>
              <p className="text-lg md:text-xl font-extrabold text-yby-heading mt-1 tracking-tight">
                {card.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
