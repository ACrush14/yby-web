import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

/**
 * Campo de seleção (Dropdown) do Design System YBY.
 */
export const SelectField = React.forwardRef(function SelectField(
  {
    label,
    required = false,
    error,
    options = [],
    placeholder = 'Selecione',
    className = '',
    selectClassName = '',
    id,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={clsx('flex flex-col gap-1.5 w-full text-left', className)}>
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-yby-heading">
          {label}
          {required && <span className="text-yby-danger ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          ref={ref}
          className={clsx(
            'w-full bg-white text-yby-heading text-sm rounded-lg border border-yby-border px-3.5 py-2.5 min-h-[44px] pr-10 appearance-none transition-colors cursor-pointer',
            'focus:outline-none focus:border-yby-primary focus:ring-2 focus:ring-yby-tint focus:bg-yby-tint/20',
            error && 'border-yby-danger focus:border-yby-danger',
            selectClassName
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <div className="absolute right-3 pointer-events-none text-yby-muted">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && <span className="text-xs text-yby-danger font-medium">{error}</span>}
    </div>
  );
});
