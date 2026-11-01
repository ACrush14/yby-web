import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/**
 * Converte string 'YYYY-MM-DD' em { year, month, day } de forma segura contra fuso horário.
 * @param {string} isoStr
 */
function parseISODate(isoStr) {
  if (!isoStr || typeof isoStr !== 'string') return null;
  const parts = isoStr.split('-');
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return null;
  return { year: y, month: m, day: d };
}

/**
 * Formata 'YYYY-MM-DD' para 'DD/MM/AAAA'.
 * @param {string} isoStr
 */
function formatToBR(isoStr) {
  const parsed = parseISODate(isoStr);
  if (!parsed) return '';
  return `${String(parsed.day).padStart(2, '0')}/${String(parsed.month).padStart(2, '0')}/${parsed.year}`;
}

/**
 * Formata ano, mês, dia para string ISO 'YYYY-MM-DD'.
 */
function formatToISO(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Componente DatePickerField customizado do Design System YBY.
 * Substitui o input[type="date"] nativo com seleção direta e facilitada de ano e mês.
 *
 * @param {object} props
 * @param {string} props.label - Rótulo do campo
 * @param {string} props.value - Data em formato ISO 'YYYY-MM-DD'
 * @param {(e: { target: { value: string, name?: string } }) => void} props.onChange
 * @param {string} [props.name]
 * @param {string} [props.placeholder='DD/MM/AAAA']
 * @param {boolean} [props.required=false]
 * @param {string} [props.error]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className]
 * @param {number} [props.startYear=2015] - Ano inicial no seletor
 * @param {number} [props.endYear=2035] - Ano final no seletor
 */
export const DatePickerField = React.forwardRef(function DatePickerField(
  {
    label,
    value = '',
    onChange,
    name,
    placeholder = 'DD/MM/AAAA',
    required = false,
    error,
    disabled = false,
    className = '',
    startYear = 2015,
    endYear = 2035,
    id,
    align = 'auto',
    ...props
  },
  ref
) {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState(() => formatToBR(value));
  const [detectedAlign, setDetectedAlign] = useState('left');

  // Detecta se há espaço suficiente à direita do campo para evitar corte do calendário
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.left;
      if (spaceOnRight < 320) {
        setDetectedAlign('right');
      } else {
        setDetectedAlign('left');
      }
    }
  }, [isOpen]);

  // Atualiza alinhamento em caso de redimensionamento de janela
  useEffect(() => {
    if (!isOpen) return;
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceOnRight = window.innerWidth - rect.left;
        setDetectedAlign(spaceOnRight < 320 ? 'right' : 'left');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const computedAlign = align !== 'auto' ? align : detectedAlign;

  // Data atual de referência para navegação no calendário
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 1-12
  const currentDay = today.getDate();

  const parsedInitial = parseISODate(value);
  const [viewYear, setViewYear] = useState(parsedInitial ? parsedInitial.year : currentYear);
  const [viewMonth, setViewMonth] = useState(parsedInitial ? parsedInitial.month : currentMonth);

  // Sincroniza o valor de exibição sempre que a prop 'value' mudar externamente
  useEffect(() => {
    setDisplayValue(formatToBR(value));
    const parsed = parseISODate(value);
    if (parsed) {
      setViewYear(parsed.year);
      setViewMonth(parsed.month);
    }
  }, [value]);

  // Fecha o popup ao clicar fora ou apertar Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Emite a alteração no formato ISO 'YYYY-MM-DD'
  const emitChange = (isoString) => {
    setDisplayValue(formatToBR(isoString));
    if (onChange) {
      onChange({ target: { value: isoString, name } });
    }
  };

  // Navegação de mês
  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Seleciona um dia
  const handleSelectDay = (day) => {
    const iso = formatToISO(viewYear, viewMonth, day);
    emitChange(iso);
    setIsOpen(false);
  };

  // Atalho "Hoje"
  const handleSelectToday = () => {
    setViewYear(currentYear);
    setViewMonth(currentMonth);
    const iso = formatToISO(currentYear, currentMonth, currentDay);
    emitChange(iso);
    setIsOpen(false);
  };

  // Atalho "Limpar"
  const handleClear = (e) => {
    e?.stopPropagation();
    emitChange('');
    setIsOpen(false);
  };

  // Permite digitação manual no input com validação 'DD/MM/AAAA'
  const handleInputChange = (e) => {
    let inputVal = e.target.value.replace(/\D/g, '');
    if (inputVal.length > 8) inputVal = inputVal.slice(0, 8);

    let formatted = inputVal;
    if (inputVal.length > 2 && inputVal.length <= 4) {
      formatted = `${inputVal.slice(0, 2)}/${inputVal.slice(2)}`;
    } else if (inputVal.length > 4) {
      formatted = `${inputVal.slice(0, 2)}/${inputVal.slice(2, 4)}/${inputVal.slice(4)}`;
    }
    setDisplayValue(formatted);

    // Se completou os 8 dígitos (DD/MM/AAAA), valida e emite
    if (inputVal.length === 8) {
      const day = parseInt(inputVal.slice(0, 2), 10);
      const month = parseInt(inputVal.slice(2, 4), 10);
      const year = parseInt(inputVal.slice(4, 8), 10);

      if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1900 && year <= 2100) {
        const iso = formatToISO(year, month, day);
        setViewYear(year);
        setViewMonth(month);
        if (onChange) {
          onChange({ target: { value: iso, name } });
        }
      }
    } else if (inputVal.length === 0) {
      emitChange('');
    }
  };

  // Lista de anos para escolha direta rápida
  const minYear = Math.min(startYear, viewYear);
  const maxYear = Math.max(endYear, viewYear);
  const yearsList = [];
  for (let y = minYear; y <= maxYear; y++) {
    yearsList.push(y);
  }

  // Montagem da grade do calendário
  const firstDayOfWeek = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0 = Dom, ..., 6 = Sab
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth - 1, 0).getDate();

  const calendarDays = [];

  // Dias do mês anterior
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      month: viewMonth - 1 === 0 ? 12 : viewMonth - 1,
      year: viewMonth - 1 === 0 ? viewYear - 1 : viewYear,
      isCurrentMonth: false,
    });
  }

  // Dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: viewMonth,
      year: viewYear,
      isCurrentMonth: true,
    });
  }

  // Dias do próximo mês para completar semanas
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      month: viewMonth + 1 === 13 ? 1 : viewMonth + 1,
      year: viewMonth + 1 === 13 ? viewYear + 1 : viewYear,
      isCurrentMonth: false,
    });
  }

  // Calcula se o mês precisa de 5 ou 6 semanas para não cortar dias finais
  const lastCurrentMonthDayIdx = calendarDays.findIndex(
    (d, i) => i >= 27 && d.day === daysInMonth && d.isCurrentMonth
  );
  const totalDaysToShow = lastCurrentMonthDayIdx >= 35 ? 42 : 35;

  const selectedParsed = parseISODate(value);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div ref={containerRef} className={clsx('relative flex flex-col gap-1.5 w-full text-left', className)}>
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
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onClick={() => !disabled && setIsOpen(true)}
          className={clsx(
            'w-full bg-white text-yby-heading text-sm rounded-lg border border-yby-border px-3.5 py-2.5 min-h-[44px] pr-10 cursor-pointer',
            'placeholder:text-yby-muted/60',
            'hover:border-yby-primary transition-colors',
            'focus:outline-none focus:border-yby-primary focus:ring-2 focus:ring-yby-tint focus:bg-yby-tint/20',
            error && 'border-yby-danger hover:border-yby-danger focus:border-yby-danger focus:ring-red-100',
            disabled && 'opacity-60 cursor-not-allowed bg-yby-surface'
          )}
          {...props}
        />

        {/* Ícone de Calendário clicável */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className="absolute right-3 p-1 text-yby-muted hover:text-yby-primary transition-colors cursor-pointer"
          aria-label={isOpen ? 'Fechar calendário' : 'Abrir calendário'}
        >
          <CalendarIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Popover do Calendário - Alinhamento Inteligente para Evitar Cortes */}
      {isOpen && !disabled && (
        <div
          role="dialog"
          aria-label={`Seletor de data para ${label || 'campo'}`}
          className={clsx(
            'absolute top-full mt-2 z-50 w-[300px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-popup border border-yby-border p-3.5 animate-in fade-in zoom-in-95 duration-150',
            computedAlign === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {/* Cabeçalho: Seleção de Mês e Ano + Setas */}
          <div className="flex items-center justify-between gap-1.5 mb-3">
            <div className="flex items-center gap-1.5 flex-1">
              {/* Seletor Rápido de Mês */}
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                aria-label="Selecionar mês"
                className="bg-yby-surface/80 border border-yby-border text-xs font-bold text-yby-heading rounded-lg px-2 py-1.5 cursor-pointer hover:border-yby-primary focus:outline-none focus:ring-1 focus:ring-yby-primary flex-1"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={name} value={idx + 1}>
                    {name}
                  </option>
                ))}
              </select>

              {/* Seletor Rápido de Ano (Destaque para escolha fácil sem scroll infinito) */}
              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                aria-label="Selecionar ano"
                className="bg-yby-surface/80 border border-yby-border text-xs font-bold text-yby-primary rounded-lg px-2 py-1.5 cursor-pointer hover:border-yby-primary focus:outline-none focus:ring-1 focus:ring-yby-primary"
              >
                {yearsList.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Setas de navegação de mês */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Mês anterior"
                className="w-7 h-7 rounded-lg text-yby-muted hover:text-yby-primary hover:bg-yby-tint/60 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Próximo mês"
                className="w-7 h-7 rounded-lg text-yby-muted hover:text-yby-primary hover:bg-yby-tint/60 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dias da Semana */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {WEEK_DAYS.map((wd) => (
              <span key={wd} className="text-[11px] font-bold text-yby-muted uppercase tracking-wider py-1">
                {wd}
              </span>
            ))}
          </div>

          {/* Grade de Dias */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.slice(0, totalDaysToShow).map((item, idx) => {
              const isSelected =
                selectedParsed &&
                selectedParsed.day === item.day &&
                selectedParsed.month === item.month &&
                selectedParsed.year === item.year;

              const isToday =
                currentDay === item.day &&
                currentMonth === item.month &&
                currentYear === item.year;

              return (
                <button
                  key={`${item.year}-${item.month}-${item.day}-${idx}`}
                  type="button"
                  onClick={() => {
                    setViewYear(item.year);
                    setViewMonth(item.month);
                    handleSelectDay(item.day);
                  }}
                  className={clsx(
                    'w-8 h-8 mx-auto rounded-lg text-xs transition-all flex items-center justify-center select-none font-medium',
                    isSelected
                      ? 'bg-yby-primary text-white font-bold shadow-sm'
                      : isToday
                      ? 'border border-yby-primary text-yby-primary font-bold hover:bg-yby-tint/60'
                      : item.isCurrentMonth
                      ? 'text-yby-heading hover:bg-yby-tint hover:text-yby-primary'
                      : 'text-yby-muted/40 hover:text-yby-muted hover:bg-yby-surface'
                  )}
                >
                  {item.day}
                </button>
              );
            })}
          </div>

          {/* Rodapé do Popover: Ações Rápidas (Limpar, Hoje, Fechar) */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-yby-border/60 text-xs">
            <button
              type="button"
              onClick={handleClear}
              className="text-yby-muted hover:text-yby-danger font-semibold transition-colors px-1.5 py-0.5 rounded"
            >
              Limpar
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectToday}
                className="text-yby-primary hover:underline font-bold transition-colors px-1.5 py-0.5 rounded"
              >
                Hoje
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-yby-surface hover:bg-yby-border/60 text-yby-heading font-semibold px-2.5 py-1 rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
