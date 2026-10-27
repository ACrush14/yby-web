import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronDown, Search, X } from 'lucide-react';
import { getCooperativeTheme } from '@/domain/constants/cooperativeColors.js';

export function CooperativePillSelect({
  value,
  cooperatives = [],
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
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
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const filteredCoops = cooperatives.filter((c) =>
    (c.shortName || c.name).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Botão Pílula */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border min-w-[120px]',
          value
            ? 'shadow-sm'
            : 'border-dashed border-yby-border text-yby-muted hover:border-yby-primary hover:text-yby-heading bg-white'
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
        <div className="absolute left-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-popup border border-yby-border p-2 z-50">
          <div className="relative flex items-center mb-2">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-yby-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cooperativa"
              className="w-full text-xs pl-8 pr-2.5 py-1.5 bg-yby-surface/40 rounded-lg border border-yby-border focus:outline-none focus:border-yby-primary"
              autoFocus
            />
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1">
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
                    'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors',
                    isSelected
                      ? 'bg-yby-light text-yby-primary'
                      : 'text-yby-heading hover:bg-yby-surface'
                  )}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cTheme.color }}
                  />
                  <span className="truncate">{name}</span>
                </button>
              );
            })}
          </div>

          {/* Opção Sem cooperativa */}
          <div className="pt-2 mt-1 border-t border-yby-border/60">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
                setSearch('');
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-yby-muted hover:text-yby-danger hover:bg-red-50 transition-colors text-left"
            >
              <X className="w-3.5 h-3.5" />
              <span>Sem cooperativa</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
