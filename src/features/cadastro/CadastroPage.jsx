import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/shared/layout/PageHeader.jsx';
import { PillTabs } from '@/shared/ui/PillTabs.jsx';
import { ClientForm } from './components/ClientForm.jsx';
import { CooperativeForm, ManagerForm } from './components/CooperativeForm.jsx';

export function CadastroPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'cliente';

  const tabs = [
    { id: 'cliente', label: 'Cliente' },
    { id: 'cooperativa', label: 'Cooperativa' },
    { id: 'gestor', label: 'Gestor' },
  ];

  const handleTabChange = (newTab) => {
    setSearchParams({ tab: newTab });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cadastro"
        subtitle="Cadastre clientes, cooperativas e gestores da plataforma"
      />

      {/* Abas em Pílula */}
      <PillTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      {/* Formulário da Aba Ativa */}
      {activeTab === 'cliente' && <ClientForm onCancel={() => {}} />}
      {activeTab === 'cooperativa' && <CooperativeForm onCancel={() => {}} />}
      {activeTab === 'gestor' && <ManagerForm onCancel={() => {}} />}
    </div>
  );
}
