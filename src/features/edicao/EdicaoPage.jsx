import React from 'react';
import { Search } from 'lucide-react';
import { useEdicaoController } from './hooks/useEdicaoController.js';
import { PageHeader } from '@/shared/layout/PageHeader.jsx';
import { PillTabs } from '@/shared/ui/PillTabs.jsx';
import { EntitySearchSelector } from './components/EntitySearchSelector.jsx';
import { EditClientForm } from './components/EditClientForm.jsx';
import { EmptyState } from '@/shared/ui/EmptyState.jsx';

export function EdicaoPage() {
  const {
    activeTab,
    setActiveTab,
    clients,
    cooperatives,
    selectedEntity,
    saving,
    handleSelectEntity,
    handleClearSelection,
    handleSaveClient,
  } = useEdicaoController();

  const tabs = [
    { id: 'cliente', label: 'Cliente' },
    { id: 'cooperativa', label: 'Cooperativa' },
    { id: 'gestor', label: 'Gestor' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edição"
        subtitle="Atualize os dados cadastrais de clientes, cooperativas e gestores"
      />

      {/* Abas em Pílula */}
      <PillTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          handleClearSelection();
        }}
      />

      {/* Seletor de Busca */}
      <EntitySearchSelector
        label={`Selecionar ${activeTab}`}
        placeholder={`Buscar e selecionar um ${activeTab}`}
        items={activeTab === 'cliente' ? clients : cooperatives}
        selectedId={selectedEntity?.id}
        onSelect={handleSelectEntity}
      />

      {/* Estado com Registro Selecionado OU Estado Vazio Ilustrado */}
      {selectedEntity ? (
        <EditClientForm
          client={selectedEntity}
          saving={saving}
          onCancel={handleClearSelection}
          onSave={handleSaveClient}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-yby-border shadow-card p-8">
          <EmptyState
            icon={<Search className="w-6 h-6 stroke-[2.5]" />}
            title={`Selecione um ${activeTab}`}
            description={`Escolha um ${activeTab} na lista acima para editar os dados cadastrais.`}
          />
        </div>
      )}
    </div>
  );
}
