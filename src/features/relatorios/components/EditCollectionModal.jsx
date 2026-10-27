import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { InputField } from '@/shared/ui/InputField.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { toast } from 'sonner';

export function EditCollectionModal({ item, onClose, onSave }) {
  const [weightKg, setWeightKg] = useState(item.weightKg);
  const [justification, setJustification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!justification.trim()) {
      toast.error('A justificativa de edição é obrigatória.');
      return;
    }
    onSave(item.id, {
      weightKg: Number(weightKg),
      justification,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-yby-border shadow-popup relative">
        <div className="flex items-center justify-between border-b border-yby-border/60 pb-3 mb-4">
          <div>
            <h3 className="font-extrabold text-lg text-yby-heading">Editar Coleta #{item.id}</h3>
            <p className="text-xs text-yby-muted">{item.pev} · {item.date}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-yby-muted hover:text-yby-heading hover:bg-yby-surface"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Peso Total Corrigido (kg)"
            required
            type="number"
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-yby-heading">
              Justificativa de Edição <span className="text-yby-danger">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Descreva o motivo da alteração do peso ou dados da coleta..."
              className="w-full text-sm p-3 rounded-lg border border-yby-border focus:outline-none focus:border-yby-primary focus:ring-2 focus:ring-yby-tint"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-yby-border/60">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
