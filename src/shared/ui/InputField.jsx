import React from 'react';
import clsx from 'clsx';

/**
 * Campo de entrada de texto do Design System YBY.
 * Inclui label, asterisco vermelho de obrigatoriedade e feedback de foco verde suave.
 */
export const InputField = React.forwardRef(function InputField(
  {
    label,
    required = false,
    error,
    helperText,
    rightElement,
    className = '',
    inputClassName = '',
    id,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={clsx('flex flex-col gap-1.5 w-full text-left', className)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-yby-heading">
          {label}
          {required && <span className="text-yby-danger ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'w-full bg-white text-yby-heading text-sm rounded-lg border border-yby-border px-3.5 py-2.5 min-h-[44px]',
            'placeholder:text-yby-muted/60 transition-colors',
            'focus:outline-none focus:border-yby-primary focus:ring-2 focus:ring-yby-tint focus:bg-yby-tint/20',
            error && 'border-yby-danger focus:border-yby-danger focus:ring-red-100',
            rightElement && 'pr-10',
            inputClassName
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center text-yby-muted">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <span className="text-xs text-yby-danger font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-yby-muted">{helperText}</span>
      ) : null}
    </div>
  );
});
