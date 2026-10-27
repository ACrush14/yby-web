import React from 'react';
import clsx from 'clsx';

/**
 * Abas em formato de pílula (ex: Cliente | Cooperativa | Gestor).
 * @param {object} props
 * @param {Array<{ id: string, label: string }>} props.tabs
 * @param {string} props.activeTab
 * @param {(tabId: string) => void} props.onChange
 */
export function PillTabs({ tabs = [], activeTab, onChange, className = '' }) {
  return (
    <div className={clsx('flex items-center gap-2 overflow-x-auto p-1 bg-yby-surface/40 rounded-xl w-fit', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[40px] whitespace-nowrap active:scale-[0.98]',
              isActive
                ? 'bg-yby-primary text-white shadow-sm -translate-y-0.5'
                : 'text-yby-muted hover:text-yby-heading hover:bg-yby-surface hover:-translate-y-0.5'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
