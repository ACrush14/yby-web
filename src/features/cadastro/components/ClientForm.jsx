import React, { useState, useMemo, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { InputField } from '@/shared/ui/InputField.jsx';
import { SelectField } from '@/shared/ui/SelectField.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { clientRepository } from '@/services/repositories/clientRepository.js';
import { useCepLookup } from '@/shared/hooks/useCepLookup.js';
import { BRAZILIAN_STATES } from '@/services/cepService.js';

export function ClientForm({ onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    social_name: '',
    cnpj: '',
    responsible_name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    state: 'Ceará',
    city: 'Fortaleza',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await clientRepository.create(formData);
      toast.success('Cliente/PEV cadastrado com sucesso!');
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error('Erro ao cadastrar cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-yby-border p-6 shadow-card space-y-6 transition-all duration-300 ease-out hover:shadow-card-elevated hover:border-yby-primary/30">
      {/* Seção 1: Dados básicos */}
      <div>
        <h3 className="text-base font-extrabold text-yby-heading mb-4 pb-2 border-b border-yby-border/60">
          Dados básicos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Razão social"
            required
            placeholder="Ex.: Empresa Ltda"
            value={formData.social_name}
            onChange={(e) => handleChange('social_name', e.target.value)}
          />

          <InputField
            label="Número de CNPJ"
            required
            placeholder="00.000.000/0000-00"
            value={formData.cnpj}
            onChange={(e) => handleChange('cnpj', e.target.value)}
          />

          <InputField
            label="Nome do responsável"
            required
            placeholder="Nome completo"
            value={formData.responsible_name}
            onChange={(e) => handleChange('responsible_name', e.target.value)}
          />

          <InputField
            label="E-mail"
            required
            type="email"
            placeholder="nome@empresa.com.br"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <InputField
            label="Telefone"
            placeholder="(85) 90000-0000"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />

          <InputField
            label="Usuário"
            required
            placeholder="nome.usuario"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />

          <InputField
            label="Senha"
            required
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite a senha"
            value={formData.password}
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

      {/* Seção 2: Endereço */}
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
            value={formData.cep}
            onBlur={handleCepBlur}
            onChange={handleCepChange}
            helperText={
              loadingCep
                ? 'Buscando endereço pelo CEP...'
                : 'Digite o CEP para preenchimento automático'
            }
          />

          <InputField
            label="Rua"
            required
            placeholder="Nome da rua"
            value={formData.street}
            onChange={(e) => handleChange('street', e.target.value)}
          />

          <InputField
            label="Número"
            required
            placeholder="0"
            value={formData.number}
            onChange={(e) => handleChange('number', e.target.value)}
          />

          <InputField
            label="Bairro"
            required
            placeholder="Bairro"
            value={formData.neighborhood}
            onChange={(e) => handleChange('neighborhood', e.target.value)}
          />

          <SelectField
            label="Estado"
            required
            placeholder="Selecione"
            options={BRAZILIAN_STATES}
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />

          <SelectField
            label="Cidade"
            required
            placeholder="Selecione"
            options={cityOptions}
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
      </div>

      {/* Ações no Rodapé */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-yby-border/60">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
