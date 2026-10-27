import React from 'react';

export function SecondaryKpiGrid({ metrics }) {
  if (!metrics) return null;

  const cards = [
    {
      title: 'BENEFÍCIO SOCIOAMBIENTAL',
      value: metrics.secondary.socioenvironmental,
      accentColor: '#267332',
    },
    {
      title: 'PETRÓLEO',
      value: metrics.secondary.oil,
      accentColor: '#005885',
    },
    {
      title: 'ÁRVORES POUPADAS',
      value: metrics.secondary.trees,
      accentColor: '#2A5C43',
    },
    {
      title: 'ESPAÇO EM ATERRO SANITÁRIO',
      value: metrics.secondary.landfillSpace,
      accentColor: '#E65124',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group bg-yby-zebra hover:bg-white p-4 sm:p-5 rounded-2xl border border-yby-border/80 relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover hover:border-yby-primary/30 cursor-default select-none"
        >
          {/* Barra de acento colorida no topo */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5 group-hover:h-2 transition-all duration-300"
            style={{ backgroundColor: card.accentColor }}
          />
          <span className="text-[10px] font-bold tracking-wider text-yby-muted uppercase block group-hover:text-yby-heading transition-colors">
            {card.title}
          </span>
          <p className="text-lg md:text-xl font-extrabold text-yby-heading mt-1.5 tracking-tight group-hover:translate-x-0.5 transition-transform">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
