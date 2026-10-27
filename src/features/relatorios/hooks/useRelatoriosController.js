import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { collectionRepository } from '@/services/repositories/collectionRepository.js';
import { cooperativeRepository } from '@/services/repositories/cooperativeRepository.js';
import { WASTE_LIST } from '@/domain/constants/wasteTypes.js';

export function useRelatoriosController() {
  const [collections, setCollections] = useState([]);
  const [cooperatives, setCooperatives] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [search, setSearch] = useState('');
  const [cooperative, setCooperative] = useState('');
  const [waste, setWaste] = useState('');
  const [startDate, setStartDate] = useState('2026-04-16');
  const [endDate, setEndDate] = useState('2026-10-16');

  // Modais
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [photoItem, setPhotoItem] = useState(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const data = await collectionRepository.getFiltered({
        search,
        cooperative,
        waste,
        startDate,
        endDate,
      });
      setCollections(data);
    } catch (err) {
      toast.error('Erro ao buscar relatórios de coletas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function init() {
      const coops = await cooperativeRepository.getAll();
      setCooperatives(coops);
      fetchCollections();
    }
    init();
  }, []);

  const handleApplyFilter = (e) => {
    e.preventDefault();
    fetchCollections();
    toast.info('Filtros aplicados.');
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await collectionRepository.delete(deletingId);
      setCollections((prev) => prev.filter((c) => c.id !== deletingId));
      toast.success(`Registro #${deletingId} excluído com sucesso.`);
    } catch (err) {
      toast.error('Erro ao excluir registro.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      await collectionRepository.update(id, updatedData);
      setCollections((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
      );
      toast.success(`Coleta #${id} atualizada com sucesso.`);
      setEditingItem(null);
    } catch (err) {
      toast.error('Erro ao atualizar coleta.');
    }
  };

  const handleExportExcel = () => {
    toast.success('Exportando planilha Excel (.xlsx) com múltiplas abas...');
  };

  const handleExportPdf = () => {
    toast.success('Gerando documento PDF executivo dos relatórios...');
  };

  return {
    collections,
    cooperatives,
    wasteList: WASTE_LIST,
    loading,
    filters: {
      search,
      setSearch,
      cooperative,
      setCooperative,
      waste,
      setWaste,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      handleApplyFilter,
    },
    modals: {
      editingItem,
      setEditingItem,
      deletingId,
      setDeletingId,
      photoItem,
      setPhotoItem,
      handleDelete,
      handleSaveEdit,
    },
    actions: {
      handleExportExcel,
      handleExportPdf,
    },
  };
}
