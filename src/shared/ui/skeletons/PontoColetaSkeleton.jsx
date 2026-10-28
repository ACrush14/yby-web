import React from 'react';
import { Skeleton } from '../Skeleton.jsx';

/**
 * Esqueleto estrutural para o Ponto de Coleta em campo.
 * Simula a visão mobile de rota de PEVs e formulário de apontamento com foto.
 */
export function PontoColetaSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Skeleton variant="rectangular" className="w-36 h-6 rounded-md" />
        <Skeleton variant="rectangular" className="w-36 h-6 rounded-full" />
      </div>

      <div className="space-y-2">
        <Skeleton variant="text" className="w-48 h-8 rounded-lg" />
        <Skeleton variant="text" className="w-72 max-w-full h-4 rounded-md" />
      </div>

      {/* Rota de PEVs Skeleton */}
      <div className="bg-yby-surface p-4 sm:p-5 rounded-2xl border border-yby-border space-y-3">
        <Skeleton variant="text" className="w-44 h-5" />
        <div className="space-y-2.5">
          <Skeleton variant="rectangular" className="w-full h-16 rounded-xl" />
          <Skeleton variant="rectangular" className="w-full h-16 rounded-xl" />
        </div>
      </div>

      {/* Formulário de Coleta Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-yby-border shadow-card space-y-5">
        <Skeleton variant="text" className="w-56 h-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
        </div>
        <Skeleton variant="rectangular" className="w-full h-28 rounded-xl" />
        <Skeleton variant="rectangular" className="w-full h-12 rounded-xl" />
      </div>
    </div>
  );
}
