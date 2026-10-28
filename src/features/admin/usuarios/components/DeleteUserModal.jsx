import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/shared/ui/Button.jsx';

export function DeleteUserModal({ user, onClose, onConfirm }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-yby-border shadow-popup relative space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-red-50 text-yby-danger flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-yby-heading leading-tight">
              Excluir usuário?
            </h3>
            <p className="text-xs text-yby-muted mt-0.5">Esta ação não poderá ser desfeita</p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-yby-heading leading-relaxed">
          Tem certeza de que deseja revogar o acesso e excluir o usuário{' '}
          <strong className="text-yby-danger font-bold">"{user.name}"</strong> ({user.email})?
        </p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-yby-border/60">
          <Button type="button" variant="outline" onClick={onClose} autoFocus>
            Cancelar
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            Sim, excluir usuário
          </Button>
        </div>
      </div>
    </div>
  );
}
