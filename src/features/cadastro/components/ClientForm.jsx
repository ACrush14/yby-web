import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { InputField } from '@/shared/ui/InputField.jsx';
import { SelectField } from '@/shared/ui/SelectField.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { clientRepository } from '@/services/repositories/clientRepository.js';

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

  // Busca automática de CEP via ViaCEP
  const handleCepBlur = async () => {
    const rawCep = formData.cep.replace(/\D/g, '');
    if (rawCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            street: data.logradouro || prev.street,
            neighborhood: data.bairro || prev.neighborhood,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
          }));
          toast.info('Endereço preenchido automaticamente pelo CEP.');
        }
      } catch (err) {
        // silencioso
      }
    }
  };

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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-yby-border p-6 shadow-card space-y-6">
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
            value={formData.cep}
            onBlur={handleCepBlur}
            onChange={(e) => handleChange('cep', e.target.value)}
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
            options={['Ceará', 'Piauí', 'Maranhão', 'Rio Grande do Norte', 'Paraíba', 'Pernambuco', 'Bahia', 'São Paulo', 'Rio de Janeiro']}
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />

          <SelectField
            label="Cidade"
            required
            placeholder="Selecione"
            options={['Fortaleza', 'Caucaia', 'Maracanaú', 'Eusébio', 'Aquiraz', 'Sobral', 'Juazeiro do Norte']}
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
