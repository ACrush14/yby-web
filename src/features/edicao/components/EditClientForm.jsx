import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Save } from 'lucide-react';
import { InputField } from '@/shared/ui/InputField.jsx';
import { SelectField } from '@/shared/ui/SelectField.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { useCepLookup } from '@/shared/hooks/useCepLookup.js';
import { BRAZILIAN_STATES } from '@/services/cepService.js';

export function EditClientForm({ client, saving = false, onCancel, onSave }) {
  const [formData, setFormData] = useState({ ...client });

  useEffect(() => {
    setFormData({ ...client });
  }, [client]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressFound = useCallback((address) => {
    setFormData((prev) => ({
      ...prev,
      street: address.street || prev.street,
      neighborhood: address.neighborhood || prev.neighborhood,
      city: address.city || prev.city,
      state: address.state || prev.state,
    }));
  }, []);

  const { loading: loadingCep, lookupCep, formatCep } = useCepLookup(handleAddressFound);

  const handleCepChange = (e) => {
    const formatted = formatCep(e.target.value);
    handleChange('cep', formatted);

    const raw = formatted.replace(/\D/g, '');
    if (raw.length === 8) {
      lookupCep(raw);
    }
  };

  const handleCepBlur = () => {
    if (formData.cep) {
      const raw = formData.cep.replace(/\D/g, '');
      if (raw.length === 8) {
        lookupCep(raw);
      }
    }
  };

  const cityOptions = useMemo(() => {
    const baseCities = [
      'Fortaleza',
      'Caucaia',
      'Maracanaú',
      'Eusébio',
      'Aquiraz',
      'Sobral',
      'Juazeiro do Norte',
      'Crato',
      'Itapipoca',
      'Maranguape',
    ];
    if (formData.city && !baseCities.includes(formData.city)) {
      return [formData.city, ...baseCities];
    }
    return baseCities;
  }, [formData.city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-yby-border p-6 shadow-card space-y-6 transition-all duration-300 ease-out hover:shadow-card-elevated hover:border-yby-primary/30">
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
            placeholder="00000-000"
            maxLength={9}
            value={formData.cep || ''}
            onChange={handleCepChange}
            onBlur={handleCepBlur}
            helperText={loadingCep ? 'Buscando endereço...' : undefined}
          />

          <InputField
            label="Rua"
            required
            placeholder="Nome da rua / logradouro"
            value={formData.street || ''}
            onChange={(e) => handleChange('street', e.target.value)}
          />

          <InputField
            label="Número"
            required
            placeholder="123"
            value={formData.number || ''}
            onChange={(e) => handleChange('number', e.target.value)}
          />

          <InputField
            label="Bairro"
            required
            placeholder="Bairro"
            value={formData.neighborhood || ''}
            onChange={(e) => handleChange('neighborhood', e.target.value)}
          />

          <SelectField
            label="Estado"
            required
            options={BRAZILIAN_STATES}
            value={formData.state || 'Ceará'}
            onChange={(e) => handleChange('state', e.target.value)}
          />

          <SelectField
            label="Cidade"
            required
            options={cityOptions}
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
