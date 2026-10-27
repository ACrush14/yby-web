import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { clientRepository } from '@/services/repositories/clientRepository.js';
import { cooperativeRepository } from '@/services/repositories/cooperativeRepository.js';

export function useEdicaoController() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'cliente';

  const [clients, setClients] = useState([]);
  const [cooperatives, setCooperatives] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [cList, coopList] = await Promise.all([
          clientRepository.getAll(),
          cooperativeRepository.getAll(),
        ]);
        setClients(cList);
        setCooperatives(coopList);
      } catch (err) {
        toast.error('Erro ao carregar dados para edição.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
    setSelectedEntity(null);
  };

  const handleSelectEntity = (entity) => {
    setSelectedEntity(entity);
  };

  const handleClearSelection = () => {
    setSelectedEntity(null);
  };

  const handleSaveClient = async (updatedData) => {
    if (!selectedEntity) return;
    try {
      setSaving(true);
      await clientRepository.update(selectedEntity.id, updatedData);
      toast.success('Dados cadastrais atualizados com sucesso!');
      setSelectedEntity((prev) => ({ ...prev, ...updatedData }));
    } catch (err) {
      toast.error('Erro ao salvar alterações.');
    } finally {
      setSaving(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    clients,
    cooperatives,
    selectedEntity,
    loading,
    saving,
    handleSelectEntity,
    handleClearSelection,
    handleSaveClient,
  };
}
