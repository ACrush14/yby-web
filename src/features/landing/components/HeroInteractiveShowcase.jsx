import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart3,
  Table as TableIcon,
  UserPlus,
  Zap,
  Droplet,
  Cloud,
  TreePine,
  CheckCircle2,
  Clock,
  Truck,
  Building2,
  Search,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

const TABS = [
  { id: 'dashboard', label: '1. Dashboard ESG', icon: BarChart3 },
  { id: 'tabela', label: '2. Tabela de Coletas', icon: TableIcon },
  { id: 'inscricao', label: '3. Inscrição & Ponto', icon: UserPlus },
];

export function HeroInteractiveShowcase() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const DURATION_MS = 6000;
  const INTERVAL_MS = 60;

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((curr) => {
            if (curr === 'dashboard') return 'tabela';
            if (curr === 'tabela') return 'inscricao';
            return 'dashboard';
          });
          return 0;
        }
        return prev + (INTERVAL_MS / DURATION_MS) * 100;
      });
    }, INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setProgress(0);
  };

  return (
    <div
      className="relative w-full max-w-2xl mx-auto rounded-3xl border border-yby-border/90 bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-card-elevated"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Demonstração interativa do fluxo da plataforma YBY"
    >
      {/* Top Bar com Navegação entre Etapas e Barra de Progresso */}
      <div className="border-b border-yby-border/70 bg-yby-surface/80 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            <span className="text-[11px] font-bold text-yby-muted ml-2 hidden sm:inline">
              yby.app/demonstracao
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yby-primary animate-ping" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-yby-primary">
              Fluxo ao vivo
            </span>
          </div>
        </div>

        {/* Abas Interativas (Dashboard -> Tabela -> Inscrição) */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-white text-yby-primary shadow-sm border border-yby-border'
                    : 'text-yby-muted hover:text-yby-heading hover:bg-white/50'
                }`}
                aria-pressed={isActive}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Linha de Progresso do Ciclo */}
        <div className="w-full bg-yby-border/50 h-1 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-yby-primary transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Conteúdo Dinâmico com Transição Visual Suave */}
      <div className="p-4 sm:p-6 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between relative bg-gradient-to-b from-white to-yby-cream/20">
        {activeTab === 'dashboard' && <DashboardStage />}
        {activeTab === 'tabela' && <TabelaStage />}
        {activeTab === 'inscricao' && <InscricaoStage />}
      </div>

      {/* Rodapé da Vitrine */}
      <div className="px-5 py-3 border-t border-yby-border/60 bg-yby-surface/60 flex items-center justify-between text-xs text-yby-muted">
        <span className="font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-yby-primary" />
          Rastreabilidade certificada em cadeia fechada
        </span>
        <button
          type="button"
          onClick={() => {
            if (activeTab === 'dashboard') handleTabChange('tabela');
            else if (activeTab === 'tabela') handleTabChange('inscricao');
            else handleTabChange('dashboard');
          }}
          className="font-bold text-yby-primary hover:underline inline-flex items-center gap-1"
        >
          Próxima etapa <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// 1. Etapa de Dashboard ESG
function DashboardStage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-yby-heading leading-tight">
            Indicadores Ambientais ESG
          </h3>
          <p className="text-xs text-yby-muted">Conversão automática de resíduos em impacto real</p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-yby-tint text-yby-primary border border-yby-light">
          Outubro 2026
        </span>
      </div>

      {/* Grid de 4 KPIs */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <div className="p-3 rounded-2xl bg-white border border-yby-border shadow-sm">
          <div className="flex items-center gap-2 text-yby-orange mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-yby-muted">Energia</span>
          </div>
          <p className="text-lg sm:text-xl font-extrabold text-yby-heading">1.480 kWh</p>
          <span className="text-[10px] font-semibold text-emerald-600">+14% vs mês anterior</span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-yby-border shadow-sm">
          <div className="flex items-center gap-2 text-yby-blue mb-1">
            <Droplet className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-yby-muted">Água</span>
          </div>
          <p className="text-lg sm:text-xl font-extrabold text-yby-heading">52.400 L</p>
          <span className="text-[10px] font-semibold text-emerald-600">Economia acumulada</span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-yby-border shadow-sm">
          <div className="flex items-center gap-2 text-yby-olive mb-1">
            <Cloud className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-yby-muted">Carbono</span>
          </div>
          <p className="text-lg sm:text-xl font-extrabold text-yby-heading">14,2 ton</p>
          <span className="text-[10px] font-semibold text-emerald-600">CO₂ evitado no ar</span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-yby-border shadow-sm">
          <div className="flex items-center gap-2 text-yby-primary mb-1">
            <TreePine className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-yby-muted">Árvores</span>
          </div>
          <p className="text-lg sm:text-xl font-extrabold text-yby-heading">218 mudas</p>
          <span className="text-[10px] font-semibold text-emerald-600">Equivalência de mata</span>
        </div>
      </div>

      {/* Gráfico Simulado de Coletas Semanais */}
      <div className="p-3.5 rounded-2xl bg-white border border-yby-border shadow-sm">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-yby-heading">Volume Coletado na Semana</span>
          <span className="font-bold text-yby-primary">3.240 kg total</span>
        </div>
        <div className="grid grid-cols-6 gap-2 items-end h-16 pt-2 border-b border-yby-border/60">
          {[
            { dia: 'Seg', pct: '60%', kg: '480' },
            { dia: 'Ter', pct: '85%', kg: '680' },
            { dia: 'Qua', pct: '45%', kg: '360' },
            { dia: 'Qui', pct: '95%', kg: '760' },
            { dia: 'Sex', pct: '70%', kg: '560' },
            { dia: 'Sáb', pct: '50%', kg: '400' },
          ].map((bar) => (
            <div key={bar.dia} className="flex flex-col items-center gap-1 h-full justify-end">
              <div
                className="w-full rounded-t-lg bg-yby-primary/80 hover:bg-yby-primary transition-all duration-300"
                style={{ height: bar.pct }}
                title={`${bar.kg} kg`}
              />
              <span className="text-[10px] text-yby-muted font-bold">{bar.dia}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Etapa de Tabela de Coletas
function TabelaStage() {
  const rows = [
    {
      id: 1,
      coop: 'Coocencipe',
      tipo: 'Cooperativa',
      residuo: 'Plástico PET & PEAD',
      peso: '420 kg',
      status: 'Concluída',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 2,
      coop: 'Rosa Virgínia',
      tipo: 'Cooperativa',
      residuo: 'Papelão e Embalagens',
      peso: '680 kg',
      status: 'Concluída',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 3,
      coop: 'Rede Ceará',
      tipo: 'Cooperativa',
      residuo: 'Alumínio & Metais',
      peso: '290 kg',
      status: 'Em trânsito',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 4,
      coop: 'Yby Soluções',
      tipo: 'Gestão Interna',
      residuo: 'Compostagem Orgânica',
      peso: '540 kg',
      status: 'Agendada',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <div className="space-y-3.5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-yby-heading leading-tight">
            Planejamento e Registro de Coletas
          </h3>
          <p className="text-xs text-yby-muted">Gestão ponto a ponto com cooperativas e datas</p>
        </div>
        <div className="relative hidden sm:block">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-yby-muted pointer-events-none" />
          <input
            type="text"
            readOnly
            value="Filtrado: Coletas do Dia"
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-yby-border rounded-xl font-medium text-yby-heading shadow-sm"
          />
        </div>
      </div>

      {/* Tabela Responsiva */}
      <div className="bg-white rounded-2xl border border-yby-border overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-yby-surface/80 border-b border-yby-border text-[11px] font-bold text-yby-muted uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Cooperativa / Parceiro</th>
              <th className="py-2.5 px-3">Tipo de Resíduo</th>
              <th className="py-2.5 px-3">Peso (Kg)</th>
              <th className="py-2.5 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yby-border/60">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-yby-tint/20 transition-colors">
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-1.5 font-bold text-yby-heading">
                    <Truck className="w-3.5 h-3.5 text-yby-primary flex-shrink-0" />
                    <span className="truncate">{row.coop}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 font-medium text-yby-muted truncate max-w-[130px]">
                  {row.residuo}
                </td>
                <td className="py-2.5 px-3 font-extrabold text-yby-heading">{row.peso}</td>
                <td className="py-2.5 px-3 text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${row.statusColor}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 rounded-2xl bg-yby-tint/40 border border-yby-light flex items-center justify-between text-xs">
        <span className="font-semibold text-yby-heading">
          Exportação imediata de relatórios em Excel (.xlsx) e PDF executivo
        </span>
        <span className="text-[11px] font-bold text-yby-primary underline cursor-default">
          Exportar
        </span>
      </div>
    </div>
  );
}

// 3. Etapa de Inscrição e Cadastro de Ponto de Coleta
function InscricaoStage() {
  return (
    <div className="space-y-3.5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-yby-heading leading-tight">
            Inscrição e Cadastro de Ponto
          </h3>
          <p className="text-xs text-yby-muted">
            Integre seu condomínio ou empresa à cadeia da cooperativa
          </p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Adesão Rápida
        </span>
      </div>

      {/* Formulário Interativo Simulado */}
      <div className="bg-white rounded-2xl border border-yby-border p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-yby-heading block mb-1">
              Nome da Organização
            </label>
            <div className="flex items-center gap-2 p-2 bg-yby-surface/60 border border-yby-border rounded-xl text-xs font-semibold text-yby-heading">
              <Building2 className="w-3.5 h-3.5 text-yby-primary" />
              <span>Condomínio Reserva das Palmeiras</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-yby-heading block mb-1">
              Tipo de Vínculo
            </label>
            <div className="p-2 bg-yby-surface/60 border border-yby-border rounded-xl text-xs font-semibold text-yby-heading">
              Cliente / Gerador de Resíduos
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-yby-heading block mb-1">
              Cooperativa Designada
            </label>
            <div className="p-2 bg-yby-tint/50 border border-yby-light rounded-xl text-xs font-bold text-yby-primary flex items-center justify-between">
              <span>Coocencipe (Fortaleza - CE)</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-yby-primary" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-yby-heading block mb-1">
              Frequência de Coleta
            </label>
            <div className="flex items-center gap-1.5 p-2 bg-yby-surface/60 border border-yby-border rounded-xl text-xs font-semibold text-yby-heading">
              <Clock className="w-3.5 h-3.5 text-yby-muted" />
              <span>Semanal (Terças e Quintas)</span>
            </div>
          </div>
        </div>

        {/* Botão de Finalização Simulado */}
        <div className="pt-2">
          <div className="w-full py-2.5 px-4 rounded-xl bg-yby-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ponto homologado e cadastrado no sistema</span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-yby-muted text-center font-medium">
        Permite ao administrador gerenciar papéis, emitir credenciais e acompanhar relatórios
        mensalmente.
      </div>
    </div>
  );
}
