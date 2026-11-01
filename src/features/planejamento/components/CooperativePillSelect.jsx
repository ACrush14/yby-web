import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronDown, Search, Check } from 'lucide-react';
import { getCooperativeTheme } from '@/domain/constants/cooperativeColors.js';

export function CooperativePillSelect({
  value,
  cooperatives = [],
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [openUpwards, setOpenUpwards] = useState(false);
  const popoverRef = useRef(null);

  const theme = getCooperativeTheme(value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (popoverRef.current) {
        const rect = popoverRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 260 && rect.top > 260) {
          setOpenUpwards(true);
        } else {
          setOpenUpwards(false);
        }
      }
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const searchLower = search.trim().toLowerCase();
  const filteredCoops = cooperatives.filter((c) =>
    (c.shortName || c.name).toLowerCase().includes(searchLower)
  );

  const shouldShowNoneOption =
    !searchLower ||
    'sem cooperativa nenhuma nenhum nada'.includes(searchLower);

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Botão Pílula */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border min-w-[120px] hover:scale-[1.03] active:scale-[0.98] select-none hover:shadow-sm',
          value
            ? 'shadow-sm'
            : 'border-solid border-yby-border text-yby-muted hover:border-yby-primary hover:text-yby-heading bg-white'
        )}
        style={
          value
            ? {
                backgroundColor: theme.bg,
                color: theme.color,
                borderColor: theme.border,
              }
            : undefined
        }
      >
        <div className="flex items-center gap-1.5 truncate">
          {value ? (
            <>
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: theme.color }}
              />
              <span className="truncate">{value}</span>
            </>
          ) : (
            <span className="text-yby-muted">Selecionar</span>
          )}
        </div>
        <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
      </button>

      {/* Popover com busca */}
      {isOpen && (
        <div
          className={clsx(
            'absolute left-0 w-56 bg-white rounded-xl shadow-popup border border-yby-border p-2 z-50',
            openUpwards ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          )}
        >
          <div className="relative flex items-center mb-2">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-yby-muted pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cooperativa"
              className="w-full text-xs pl-8 pr-2.5 py-1.5 bg-yby-surface/40 rounded-lg border border-yby-border focus:outline-none focus:border-yby-primary"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1">
            {/* Opção Sem cooperativa (não selecionar nada) */}
            {shouldShowNoneOption && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={clsx(
                    'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors',
                    !value
                      ? 'bg-yby-light text-yby-primary'
                      : 'text-yby-heading hover:bg-yby-surface'
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-yby-muted/50 flex-shrink-0 bg-white" />
                    <span className="truncate">Sem cooperativa</span>
                  </div>
                  {!value && <Check className="w-3.5 h-3.5 text-yby-primary flex-shrink-0" />}
                </button>
                {filteredCoops.length > 0 && (
                  <div className="border-t border-yby-border/60 my-1" />
                )}
              </>
            )}

            {/* Cooperativas cadastradas */}
            {filteredCoops.map((coop) => {
              const name = coop.shortName || coop.name;
              const cTheme = getCooperativeTheme(name);
              const isSelected = value === name;

              return (
                <button
                  key={coop.id}
                  type="button"
                  onClick={() => {
                    onChange(name);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={clsx(
                    'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors',
                    isSelected
                      ? 'bg-yby-light text-yby-primary'
                      : 'text-yby-heading hover:bg-yby-surface'
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cTheme.color }}
                    />
                    <span className="truncate">{name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-yby-primary flex-shrink-0" />}
                </button>
              );
            })}

            {filteredCoops.length === 0 && !shouldShowNoneOption && (
              <div className="py-2 px-2 text-xs text-yby-muted text-center">
                Nenhuma cooperativa encontrada
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
