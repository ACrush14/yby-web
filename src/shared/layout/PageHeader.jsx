import React from 'react';
import clsx from 'clsx';

/**
 * Cabeçalho padrão de página interna do YBY.
 * Exibe título, subtítulo e ações no topo direito.
 */
export function PageHeader({ title, subtitle, actions, className = '' }) {
  return (
    <div
      className={clsx(
        'flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6',
        className
      )}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-yby-heading tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-yby-muted mt-1 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          {actions}
        </div>
      )}
    </div>
  );
}
