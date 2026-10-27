import React, { useState } from 'react';
import { toast } from 'sonner';
import { InputField } from '@/shared/ui/InputField.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { cooperativeRepository } from '@/services/repositories/cooperativeRepository.js';

export function CooperativeForm({ onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    code_access: '',
    employees: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await cooperativeRepository.create(formData);
      toast.success('Cooperativa cadastrada com sucesso!');
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error('Erro ao cadastrar cooperativa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-yby-border p-6 shadow-card space-y-6">
      <div>
        <h3 className="text-base font-extrabold text-yby-heading mb-4 pb-2 border-b border-yby-border/60">
          Dados da Cooperativa
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Nome da Cooperativa"
            required
            placeholder="Ex.: Coocencipe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <InputField
            label="Código de Acesso (Login Coletores)"
            required
            placeholder="Ex.: coop2026"
            value={formData.code_access}
            onChange={(e) => setFormData({ ...formData, code_access: e.target.value })}
            helperText="Usado pelos coletores para acessar o ponto de coleta."
          />

          <InputField
            label="Quantidade de Colaboradores / Cooperados"
            type="number"
            placeholder="Ex.: 25"
            value={formData.employees}
            onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-yby-border/60">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          Cadastrar Cooperativa
        </Button>
      </div>
    </form>
  );
}

export function ManagerForm({ onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Gestor cadastrado com sucesso!');
      if (onSuccess) onSuccess();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-yby-border p-6 shadow-card space-y-6">
      <div>
        <h3 className="text-base font-extrabold text-yby-heading mb-4 pb-2 border-b border-yby-border/60">
          Dados do Gestor
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Nome de Usuário"
            required
            placeholder="nome.gestor"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />

          <InputField
            label="E-mail"
            required
            type="email"
            placeholder="gestor@empresa.com.br"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <InputField
            label="Senha Provisória"
            required
            type="password"
            placeholder="Digite a senha"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-yby-border/60">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          Cadastrar Gestor
        </Button>
      </div>
    </form>
  );
}
