import React from 'react';
import clsx from 'clsx';

/**
 * Estado vazio com ícone circular, título e descrição (ex: tela de Edição).
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div className={clsx('flex flex-col items-center justify-center text-center py-12 px-4', className)}>
      {icon && (
        <div className="w-14 h-14 rounded-full bg-yby-tint text-yby-primary flex items-center justify-center mb-4 shadow-sm">
          {icon}
        </div>
      )}
      {title && <h3 className="text-base font-bold text-yby-heading mb-1">{title}</h3>}
      {description && <p className="text-sm text-yby-muted max-w-sm mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
