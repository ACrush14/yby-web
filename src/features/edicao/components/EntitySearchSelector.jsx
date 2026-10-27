import React from 'react';
import { SelectField } from '@/shared/ui/SelectField.jsx';

export function EntitySearchSelector({
  label = 'Selecionar cliente',
  placeholder = 'Buscar e selecionar um cliente',
  items = [],
  selectedId,
  onSelect,
}) {
  const options = items.map((item) => ({
    value: item.id,
    label: item.name || item.social_name,
  }));

  return (
    <div className="bg-white p-5 rounded-2xl border border-yby-border shadow-card mb-6 transition-all duration-300 ease-out hover:shadow-card-elevated hover:border-yby-primary/30">
      <h3 className="text-sm font-extrabold text-yby-heading mb-3">
        {label}
      </h3>
      <SelectField
        placeholder={placeholder}
        options={options}
        value={selectedId || ''}
        onChange={(e) => {
          const found = items.find((it) => it.id === Number(e.target.value));
          onSelect(found || null);
        }}
        selectClassName="border-yby-primary/40 focus:border-yby-primary text-sm"
      />
    </div>
  );
}
