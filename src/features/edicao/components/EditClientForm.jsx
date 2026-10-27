import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save } from 'lucide-react';
import { InputField } from '@/shared/ui/InputField.jsx';
import { SelectField } from '@/shared/ui/SelectField.jsx';
import { Button } from '@/shared/ui/Button.jsx';

export function EditClientForm({ client, saving = false, onCancel, onSave }) {
  const [formData, setFormData] = useState({ ...client });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({ ...client });
  }, [client]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-yby-border p-6 shadow-card space-y-6">
      {/* Dados básicos */}
      <div>
        <h3 className="text-base font-extrabold text-yby-heading mb-4 pb-2 border-b border-yby-border/60">
          Dados básicos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Razão social"
            required
            value={formData.social_name || formData.name || ''}
            onChange={(e) => handleChange('social_name', e.target.value)}
          />

          <InputField
            label="Número de CNPJ"
            required
            value={formData.cnpj || ''}
            onChange={(e) => handleChange('cnpj', e.target.value)}
          />

          <InputField
            label="Nome do responsável"
            required
            value={formData.responsible_name || 'Maria Silva'}
            onChange={(e) => handleChange('responsible_name', e.target.value)}
          />

          <InputField
            label="E-mail"
            required
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <InputField
            label="Telefone"
            value={formData.phone || '(85) 90000-0000'}
            onChange={(e) => handleChange('phone', e.target.value)}
          />

          <InputField
            label="Usuário"
            required
            value={formData.username || 'empresa.exemplo'}
            onChange={(e) => handleChange('username', e.target.value)}
          />

          <InputField
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={formData.password || '••••••••'}
            onChange={(e) => handleChange('password', e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-yby-muted hover:text-yby-heading p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
        </div>
      </div>

      {/* Endereço */}
      <div>
        <h3 className="text-base font-extrabold text-yby-heading mb-4 pb-2 border-b border-yby-border/60">
          Endereço
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="CEP"
            required
            value={formData.cep || '60000-000'}
            onChange={(e) => handleChange('cep', e.target.value)}
          />

          <InputField
            label="Rua"
            required
            value={formData.street || 'Rua Exemplo'}
            onChange={(e) => handleChange('street', e.target.value)}
          />

          <InputField
            label="Número"
            required
            value={formData.number || '123'}
            onChange={(e) => handleChange('number', e.target.value)}
          />

          <InputField
            label="Bairro"
            required
            value={formData.neighborhood || 'Centro'}
            onChange={(e) => handleChange('neighborhood', e.target.value)}
          />

          <SelectField
            label="Estado"
            required
            options={['Ceará', 'Piauí', 'Maranhão', 'Rio Grande do Norte', 'Paraíba', 'Pernambuco', 'Bahia', 'São Paulo', 'Rio de Janeiro']}
            value={formData.state || 'Ceará'}
            onChange={(e) => handleChange('state', e.target.value)}
          />

          <SelectField
            label="Cidade"
            required
            options={['Fortaleza', 'Caucaia', 'Maracanaú', 'Eusébio', 'Aquiraz', 'Sobral', 'Juazeiro do Norte']}
            value={formData.city || 'Fortaleza'}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
      </div>

      {/* Ações no Rodapé */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-yby-border/60">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={saving}>
          <Save className="w-4 h-4 mr-2" />
          Salvar alterações
        </Button>
      </div>
    </form>
  );
}
