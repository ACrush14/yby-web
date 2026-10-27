import React from 'react';
import clsx from 'clsx';

/**
 * Botão base do Design System YBY.
 * @param {object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.fullWidth=false]
 * @param {boolean} [props.loading=false]
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-yby-primary text-white hover:bg-yby-primary-hover focus:ring-yby-primary border border-transparent shadow-sm',
    secondary:
      'bg-yby-surface text-yby-heading hover:bg-yby-border focus:ring-yby-primary border border-yby-border',
    outline:
      'bg-transparent text-yby-primary hover:bg-yby-tint border border-yby-primary focus:ring-yby-primary',
    ghost:
      'bg-transparent text-yby-heading hover:bg-yby-surface border border-transparent focus:ring-yby-primary',
    danger:
      'bg-yby-danger text-white hover:bg-red-700 focus:ring-yby-danger border border-transparent shadow-sm',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2.5 min-h-[44px]',
    lg: 'text-base px-6 py-3 min-h-[48px]',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Carregando...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
