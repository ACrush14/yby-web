import React from 'react';
import { Truck, Building2, ShieldCheck } from 'lucide-react';

const PARTNERS = [
  { name: 'Coocencipe', type: 'Cooperativa de Catadores', icon: Truck },
  { name: 'Rosa Virgínia', type: 'Associação de Reciclagem', icon: Truck },
  { name: 'Rede Ceará', type: 'Rede de Cooperativas', icon: Truck },
  { name: 'Ticiana Rolim Empreendimentos', type: 'Grande Gerador', icon: Building2 },
  { name: 'Hospital Jayme da Fonte', type: 'Saúde & Gestão ESG', icon: Building2 },
];

export function HeroPartnerLogos() {
  return (
    <div className="w-full pt-12 pb-8 border-t border-yby-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold text-yby-muted uppercase tracking-wider mb-6 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-yby-primary" />
          Cooperativas e organizações conectadas na plataforma YBY
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 opacity-85">
          {PARTNERS.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-yby-border/50 shadow-sm hover:shadow hover:border-yby-primary/30 transition-all duration-200 cursor-default"
              >
                <div className="w-7 h-7 rounded-lg bg-yby-tint text-yby-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-extrabold text-yby-heading block leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-yby-muted block font-medium">
                    {partner.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
