import React from 'react';
import { Pencil, Trash2, Building2, Truck } from 'lucide-react';
import { Badge } from '@/shared/ui/Badge.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { ORGANIZATION_TYPES, ORGANIZATION_STATUS } from '@/domain/constants/organizationTypes.js';

export function OrganizationMobileCard({ org, onEdit, onDelete, onToggleStatus }) {
  const isCooperativa = org.type === ORGANIZATION_TYPES.COOPERATIVA;
  const isActive = org.status === ORGANIZATION_STATUS.ATIVA;

  return (
    <div className="bg-white rounded-2xl border border-yby-border p-4 shadow-card space-y-3 transition-all duration-300 hover:shadow-card-elevated hover:border-yby-primary/30">
      {/* Cabeçalho do Card */}
      <div className="flex items-start justify-between gap-3 border-b border-yby-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isCooperativa ? 'bg-yby-tint text-yby-primary' : 'bg-yby-surface text-yby-heading'
            }`}
          >
            {isCooperativa ? <Truck className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
          </div>
          <div>
            <h3 className="font-bold text-sm text-yby-heading leading-tight">{org.name}</h3>
            <span className="text-xs text-yby-muted font-mono block mt-0.5">{org.cnpj}</span>
          </div>
        </div>

        {isCooperativa ? (
          <Badge variant="green">{org.type}</Badge>
        ) : (
          <Badge variant="beige">{org.type}</Badge>
        )}
      </div>

      {/* Linha de Status com Switch */}
      <div className="flex items-center justify-between text-xs py-1">
        <span className="text-yby-muted font-semibold">Status de Atividade:</span>
        <button
          type="button"
          onClick={() => onToggleStatus(org)}
          className="inline-flex items-center gap-2 p-1 rounded-lg hover:bg-yby-surface transition-colors"
        >
          <div
            className={`w-8 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${
              isActive ? 'bg-yby-primary' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-white transition-transform ${
                isActive ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </div>
          <span className={`font-bold ${isActive ? 'text-yby-primary' : 'text-yby-muted'}`}>
            {org.status}
          </span>
        </button>
      </div>

      {/* Ações Mobile com Tap Targets amplos (>= 44px) */}
      <div className="flex items-center gap-2 pt-2 border-t border-yby-border/60">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(org)}
          className="flex-1 min-h-[44px]"
        >
          <Pencil className="w-4 h-4 mr-1.5" />
          Editar
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(org)}
          className="flex-1 min-h-[44px] bg-red-50 text-yby-danger border border-red-200 hover:bg-red-100"
        >
          <Trash2 className="w-4 h-4 mr-1.5" />
          Excluir
        </Button>
      </div>
    </div>
  );
}
