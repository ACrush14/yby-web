import React from 'react';
import { Skeleton } from '../Skeleton.jsx';

/**
 * Esqueleto estrutural para a página de Cadastro.
 * Simula abas em pílula e os campos de formulário cadastral.
 */
export function CadastroSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2 pb-2">
        <Skeleton variant="text" className="w-40 h-8 rounded-lg" />
        <Skeleton variant="text" className="w-72 max-w-full h-4 rounded-md" />
      </div>

      {/* Pill Tabs Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton variant="rectangular" className="w-28 h-10 rounded-xl" />
        <Skeleton variant="rectangular" className="w-32 h-10 rounded-xl" />
        <Skeleton variant="rectangular" className="w-28 h-10 rounded-xl" />
      </div>

      {/* Form Card Skeleton */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-yby-border shadow-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Skeleton variant="text" className="w-28 h-3.5" />
            <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" className="w-28 h-3.5" />
            <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" className="w-24 h-3.5" />
            <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" className="w-24 h-3.5" />
            <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton variant="text" className="w-24 h-3.5" />
          <Skeleton variant="rectangular" className="w-full h-24 rounded-xl" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-yby-border/60">
          <Skeleton variant="rectangular" className="w-28 h-10 rounded-xl" />
          <Skeleton variant="rectangular" className="w-36 h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
